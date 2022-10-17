
function login(){
  const defaultUser = 'admin'
  const defaultPassword = 'administrador123'
  const formLogin = document.querySelector('#form-login')
  const loading = document.querySelector('.loading')
  const login = document.querySelector('.login')
  const panel = document.querySelector('.panel')

  formLogin.addEventListener('submit', function(e){
    e.preventDefault()
    const user = document.forms['form-login']['user'].value
    const password = document.forms['form-login']['password'].value
    const verifyLogin = user === defaultUser && password === defaultPassword ? true : false

    if(!verifyLogin){
      formLogin.reset()
      return alert("Usuário ou senha incorretos, tente novamente!")
    }
    
    loading.classList.remove('hidden')
    login.classList.add('hidden')

    setTimeout(function(){
      panel.classList.remove('hidden')
      loading.classList.add('hidden')
    },600)
  })
}

function panel(){
  const buttons = document.querySelectorAll('.panel a')
  const registerCustomer = document.querySelector('.register-customers')
  const listCustomers = document.querySelector('.list-customers')
  const panel = document.querySelector('.panel')

  buttons.forEach((button) => {
    button.addEventListener("click", function(e){
      e.preventDefault()
      const option = button.dataset.option
      
      switch(option){
        case 'register-customers':
          registerCustomer.classList.remove('hidden')
          panel.classList.add('hidden')
          break
        case 'list-customers':
          listCustomers.classList.remove('hidden')
          panel.classList.add('hidden')
          break
      }
    })
  })
}

function addEventDeleteCustomer(){
  const buttonsDelete = document.querySelectorAll(".button-delete")
  buttonsDelete.forEach((button) => {
    button.addEventListener("click", function(e){
      e.preventDefault()
      const id = this.dataset.id

      fetch(`http://localhost:5000/api/customers/${id}`, {
        method: 'DELETE'
      }).then((response) => {
        response.json().then((data) => {
          if(data.message === 'success'){
            alert("Cliente removido com sucesso")
            listCustomers()
          }else{
            alert("Ops, houve um erro! Tente novamente!")
          }
        })
      })
    })
  })
}

function listCustomers(){
  const list = document.querySelector('.customers')
  let htmlCustomer = ''
  fetch('http://localhost:5000/api/customers').then(response => {
    response.json().then(data => {
      data.forEach((customer) => {
        htmlCustomer += `
          <li>
            ${customer.name} | ${customer.age} anos | ${customer.email}
            <a href = "#" class = "button-delete"  data-id = "${customer._id}">[excluir]</a>
          </li>
        `
      })

      list.innerHTML = htmlCustomer
      addEventDeleteCustomer()
    })
  })
}

function verifyCampusAddCustomers(name, age, email, password){
  let verifyError = false

  const inputName = document.forms['registerCustomer']['name']
  const regexName = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/
  const verifyName = regexName.test(name)
  if(!verifyName){
    verifyError = true
    inputName.classList.add('errorInput')
    const span = inputName.nextElementSibling
    span.innerHTML = 'Por favor, preencha seu nome'
  }else{
    inputName.classList.remove('errorInput')
    const span = inputName.nextElementSibling
    span.innerHTML = ''
  }


  const inputAge = document.forms['registerCustomer']['age']
  if(!age){
    verifyError = true
    inputAge.classList.add('errorInput')
    const span = inputAge.nextElementSibling
    span.innerHTML = 'Por favor, preencha sua idade'
  }else{
    inputAge.classList.remove('errorInput')
    const span = inputAge.nextElementSibling
    span.innerHTML = ''
  }
  

  const inputEmail = document.forms['registerCustomer']['email']
  const regexEmail = /\S+@\S+\.\S+/
  const verifyEmail = regexEmail.test(email)

  if(!verifyEmail){
    verifyError = true
    inputEmail.classList.add('errorInput')
    const span = inputEmail.nextElementSibling
    span.innerHTML = 'Por favor, preencha o campo de e-mail'
  }else{
    inputEmail.classList.remove('errorInput')
    const span = inputEmail.nextElementSibling
    span.innerHTML = ''
  }


  const inputPassword = document.forms['registerCustomer']['password']
  if(!password || password.length < 6){
    verifyError = true
    inputPassword.classList.add('errorInput')
    const span = inputPassword.nextElementSibling
    span.innerHTML = 'Por favor, preencha o campo de senha'
  }else{
    inputPassword.classList.remove('errorInput')
    const span = inputPassword.nextElementSibling
    span.innerHTML = ''
  }
  
  return verifyError
}

function addCustomers(){
  const formRegister = document.querySelector('#registerCustomer')
  
  formRegister.addEventListener("submit", function(e){
    e.preventDefault()
    
    const name = document.forms['registerCustomer']['name'].value
    const age = document.forms['registerCustomer']['age'].value
    const email = document.forms['registerCustomer']['email'].value
    const password = document.forms['registerCustomer']['password'].value
    const verifyForm = verifyCampusAddCustomers(name, age, email, password)

    
    if(!verifyForm){
      fetch('http://localhost:5000/api/customers', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          age,
          email,
          password
        })
      }).then((response) => {
        response.json().then((data) => {
          if(data.message === 'success'){
            formRegister.reset()
            alert("Cliente cadastrado com sucesso!")
          }else{
            formRegister.reset()
            alert("Ops, ocorreu um erro! Tente novamente!")
          }
        })
      })
      
    }
  
  })
}

login()
panel()
listCustomers()
addCustomers()