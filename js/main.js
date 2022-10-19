
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
  const registerProducts = document.querySelector('.register-products')
  const listProducts = document.querySelector('.list-products')
  const registerRequests = document.querySelector('.register-requests')
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
        case 'register-products':
          registerProducts.classList.remove('hidden')
          panel.classList.add('hidden')
          break
        case 'list-products':
          listProducts.classList.remove('hidden')
          panel.classList.add('hidden')
          break
        case 'register-requests':
          registerRequests.classList.remove('hidden')
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

function addEventDeleteProduct(){
  const buttonsDelete = document.querySelectorAll('.list-products a')
  buttonsDelete.forEach((button) => {
    button.addEventListener("click", function(e){
      e.preventDefault()
      const id = button.dataset.id
      fetch(`http://localhost:5000/api/products/${id}`, {
        method: 'DELETE'
      }).then((response) => {
        response.json().then((data) => {
          if(data.message === 'success'){
            alert("Produto removido com sucesso")
            listProducts()
          }else{
            alert("Ops, ocorreu um erro! Tente novamente!")
          }
        })
      })
    })
  })
}

function listProducts(){
  const list = document.querySelector('.products')
  let htmlProduct = ''

  fetch('http://localhost:5000/api/products').then((resolve) => {
    resolve.json().then((data) => {
      data.forEach((product) => {
        htmlProduct += `
        <li>
         ${product.name} | R$ ${product.price} | ${product.description}
         <a href = "#" class = "button-delete" data-id = "${product._id}">[excluir]</a>
        </li>     
        `
      })

      list.innerHTML = htmlProduct
      addEventDeleteProduct()
    })
  })
}

function verifyCampusAddProducts(name, price, description){
  let verifyError = false

  const inputName = document.forms['registerProducts']['name']
  const regexName = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/
  const verifyName = regexName.test(name)
  if(!verifyName){
    verifyError = true
    inputName.classList.add('errorInput')
    const span = inputName.nextElementSibling
    span.innerHTML = 'Insira o nome do produto'
  }else{
    inputName.classList.remove('errorInput')
    const span = inputName.nextElementSibling
    span.innerHTML = ''
  }

  const inputPrice = document.forms['registerProducts']['price']
  if(!price){
    verifyError = true
    inputPrice.classList.add('errorInput')
    const span = inputPrice.nextElementSibling
    span.innerHTML = 'Insira o preço do produto'
  }else{
    inputPrice.classList.remove('errorInput')
    const span = inputPrice.nextElementSibling
    span.innerHTML = ''
  }

  const inputDescription = document.forms['registerProducts']['description']
  if(!description){
    verifyError = true
    inputDescription.classList.add('errorInput')
    const span = inputDescription.nextElementSibling
    span.innerHTML = 'Insira a descrição do produto'
  }else{
    inputDescription.classList.remove('errorInput')
    const span = inputDescription.nextElementSibling
    span.innerHTML = ''
  }

  return verifyError
}

function addProducts(){
  const formRegister = document.querySelector('#registerProducts')

  formRegister.addEventListener("submit", function(e){
    e.preventDefault()

    const name = document.forms['registerProducts']['name'].value
    const price = document.forms['registerProducts']['price'].value
    const description = document.forms['registerProducts']['description'].value
    const verifyForm = verifyCampusAddProducts(name, price, description)

    if(!verifyForm){
      fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          price,
          description
        })
      }).then((response) => {
        response.json().then((data) => {
          if(data.message === 'success'){
            formRegister.reset()
            alert("Produto cadastrado com sucesso")
          }else{
            alert("Ops, não foi possível cadastrar o produto! Tente novamente!")
          }
        })
      })
    }
  })
}

function addEventEditRequest(){
  const buttonsEdit = document.querySelectorAll(".edit-status")
  const listRequests = document.querySelector('.list-requests')
  const editStatus = document.querySelector('.edit-status-request')

  buttonsEdit.forEach((button) => {
    button.addEventListener("click", function(e){
      e.preventDefault()
      editStatus.classList.remove('hidden')
      listRequests.classList.add('hidden')
      const id = button.dataset.id
      document.forms['formEdit'].id.value = id
    })
  })
}

function listRequests(){
  const list = document.querySelector('.requests')
  let htmlRequest = ''

  fetch('http://localhost:5000/api/requests').then((response) => {
    response.json().then((data) => {
      data.forEach((request) => {
        htmlRequest += `
          <li> 
            <p>Nome: ${request.name}</p>
            <p>Endereço: ${request.address}</p>
            <p>Telefone: ${request.phone}</p>
            <p>Pedido: ${request.product}</p>
            <p>Preço: R$ ${request.price}</p>
            <p>Status do pedido: ${request.status}</p>
            <a href = "#" class = "edit-status" data-id = "${request._id}" data-status = "${request.status}">[alterar status do pedido]</a>
          </li>
        `
      })
      list.innerHTML = htmlRequest
      addEventEditRequest()
    })
  })
}

function verifyCampusAddRequests(name, address, phone, request, price, status){
  let verifyError = false

  const inputName = document.forms['registerRequests']['name']
  const regexName = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/
  const verifyName = regexName.test(name)

  if(!verifyName){
    verifyError = true
    inputName.classList.add('errorInput')
    const span = inputName.nextElementSibling
    span.innerHTML = 'Insira o seu nome'
  }else{
    inputName.classList.remove('errorInput')
    const span = inputName.nextElementSibling
    span.innerHTML = ''
  }

  const inputAddress = document.forms['registerRequests']['address']
  if(!address){
    verifyError = true
    inputAddress.classList.add('errorInput')
    const span = inputAddress.nextElementSibling
    span.innerHTML = 'Insira o seu endereço'
  }else{
    inputAddress.classList.remove('errorInput')
    const span = inputAddress.nextElementSibling
    span.innerHTML = ''
  }

  const inputPhone = document.forms['registerRequests']['phone']
  if(!phone){
    verifyError = true
    inputPhone.classList.add('errorInput')
    const span = inputPhone.nextElementSibling
    span.innerHTML = 'Insira o seu telefone de contato'
  }else{
    inputPhone.classList.remove('errorInput')
    const span = inputPhone.nextElementSibling
    span.innerHTML = ''
  }

  const inputRequest =  document.forms['registerRequests']['product']
  if(!request){
    verifyError = true
    inputRequest.classList.add('errorInput')
    const span = inputRequest.nextElementSibling
    span.innerHTML = 'Insira o seu pedido'
  }else{
    inputRequest.classList.remove('errorInput')
    const span = inputRequest.nextElementSibling
    span.innerHTML = ''
  }

  const inputPrice = document.forms['registerRequests']['price']
  if(!price){
    verifyError = true
    inputPrice.classList.add('errorInput')
    const span = inputPrice.nextElementSibling
    span.innerHTML = 'Insira o valor do pedido'
  }else{
    inputPrice.classList.remove('errorInput')
    const span = inputPrice.nextElementSibling
    span.innerHTML = ''
  }

  const inputStatus = document.forms['registerRequests']['statusRequest']
  if(!status){
    verifyError = true
    inputStatus.classList.add('errorInput')
    const span = inputStatus.nextElementSibling
    span.innerHTML = 'Insira o status do pedido'
  }else{
    inputStatus.classList.remove('errorInput')
    const span = inputStatus.nextElementSibling
    span.innerHTML = ''
  }

  return verifyError
}

function addRequests(){
  const formRegister = document.querySelector('.registerRequests')
  
  formRegister.addEventListener("submit", function(e){
    e.preventDefault()

    const name = document.forms['registerRequests']['name'].value
    const address = document.forms['registerRequests']['address'].value
    const product = document.forms['registerRequests']['product'].value
    const phone = document.forms['registerRequests']['phone'].value
    const price = document.forms['registerRequests']['price'].value
    const status = document.forms['registerRequests']['statusRequest'].value
    const verifyForm = verifyCampusAddRequests(name, address, phone, product, price, status)

    console.log(verifyForm)
    if(!verifyForm){
      fetch('http://localhost:5000/api/requests', {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          address,
          phone,
          product,
          price,
          status
        })
      }).then((response) => {
        response.json().then((data) => {
          if(data.message === 'success'){
            formRegister.reset()
            alert("Pedido cadastrado com sucesso!")
          }else{
            alert("Ops, ocorreu um erro! Tente novamente!")
          }
        })
      })
    }
  })
}

function editStatus(){
  const formEdit = document.querySelector('.formEdit')
  const listRequests = document.querySelector('.list-requests')
  const editStatus = document.querySelector('.edit-status-request')

  formEdit.addEventListener("submit", function(e){
    e.preventDefault()

    const id = document.forms['formEdit']['id'].value
    const status = document.forms['formEdit']['statusRequest'].value

    fetch(`http://localhost:5000/api/requests/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        status
      })
    }).then((response) => {
      response.json().then((data) => {
        if(data.message === 'success'){
          alert("Produto alterado com sucesso")
          editStatus.classList.add('hidden')
          listRequests.classList.remove('hidden')
          listRequests()
        }else{
          alert("Ops, houve um erro! Tente novamente!")
        }
      })
      })

  })
}

login()
panel()
listCustomers()
addCustomers()
listProducts()
addProducts()
listRequests()
addRequests()
editStatus()