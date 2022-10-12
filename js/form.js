class AjaxForm{
  constructor(selector, settings){
    this.settings = settings
    this.form = document.querySelector(selector)
    this.fields = this.form.elements
    this.errors = []

    this.form.addEventListener('submit', (e) => {
      e.preventDefault()

      if (this.isValid()) {
        this.submit()
      }
    })

    this.form.addEventListener('input', (e) => this.validationField(e.target.name))
  }

  isValid() {
    const validators = this.settings.validators

    if(validators) {
      
      for(const fieldName in validators) {
        this.validationField(fieldName)
      }
    }

    if (!this.errors.length) {
      return true
    } else {
      return false
    }
  }

  validationField(fieldName) {
      
    if(fieldName && this.settings.validators[fieldName]) {
      try {  // проверяем есть заполнен ли fieldName и есть ли в AjaxForm(validators) такая функция
      this.settings.validators[fieldName](this.fields[fieldName]) // вызываем эту функцию в аргумент кладем имя поля которое нужно вернуть
      this.hideError(fieldName)
      } catch (error) {
        this.showError(fieldName, error.message)
      }
    }
  }

  showError(fieldName, text) {
    if (fieldName) {
      this.errors.push(fieldName)
      const field = this.fields[fieldName].closest ? this.fields[fieldName] : this.fields[fieldName][0]
      field.closest('label').classList.add('error')

      if (this.settings.placeholder) {
        field.placeholder = text
      }
    }
  }

  hideError(fieldName) {
    if (this.errors.length) {
      const field = this.fields[fieldName].closest ? this.fields[fieldName] : this.fields[fieldName][0]
      this.errors = this.errors.filter((field) => {
        field != fieldName
      })
      field.closest('label').classList.remove('error')
    }
  }

  getJSON() {
    return JSON.stringify(Object.fromEntries(new FormData(this.form)))
  }

  async submit() {
    try {
      const response = await fetch(this.settings.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: this.getJSON()
      })

      var body = await response.json()

      if (response.statusCode >= 400) {
        throw new Error('Invalid response')
      }

      this.settings.success(body)
      this.form.reset()

    } catch (error) {
      this.settings.error(error.message)
  }
}
}

new AjaxForm('#form', {
  url: "https://webdev-api.loftschool.com/sendmail",
  placeholder: true,
  validators: {
    name: function(field) {
      if(field.value.length < 3) {
        throw new Error('Name not valid');
      } 
    },
    phone: function(field) {
      if(field.value.length < 3) {
        throw new Error('phone not valid');
      } 
    },
    comment: function(field) {
      if(!field.value.length) {
      throw new Error('text not valid');
      }
    },
    dontcall: function(field) {
      if(!field.checked) {
      throw new Error('is not checked');
      }
    },
  },
  error:(body) => {
    console.log(body);
  },
  success:(body) => { 
    console.log(body.message) }

})