
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

  if(!name){
    verifyError = true
    alert("Preencha o campo")
  }

  if(!age){
    verifyError = true
    alert("Preencha o campo")
  }

  if(!email){
    verifyError = true
    alert("Preencha o campo")
  }

  if(!password){
    verifyError = true
    alert("Preencha o campo")
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