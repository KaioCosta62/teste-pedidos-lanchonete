
// Tela de login
function login(){
  const defaultUser = 'admin'
  const defaultPassword = 'administrador123'
  const formLogin = document.querySelector('#form-login')
  const loading = document.querySelector('.loading')
  const login = document.querySelector('.login')
  const menu = document.querySelector('header')
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
      menu.classList.remove('hidden')
      loading.classList.add('hidden')
    },600)
  })
}

// Painel administrativo
function panel(){
  const buttons = document.querySelectorAll('header a')
  const registerCustomer = document.querySelector('.register-customers')
  const listCustomers = document.querySelector('.list-customers')
  const registerProducts = document.querySelector('.register-products')
  const listProducts = document.querySelector('.list-products')
  const registerRequests = document.querySelector('.register-requests')
  const listRequests = document.querySelector('.list-requests')

  
  buttons.forEach((button) => {
    button.addEventListener("click", function(e){
      e.preventDefault()
      const option = button.dataset.option
      
      
      switch(option){
        case 'register-customers':
          listCustomers.classList.add('hidden')
          registerProducts.classList.add('hidden')
          listProducts.classList.add('hidden')
          registerRequests.classList.add('hidden')
          listRequests.classList.add('hidden')
          registerCustomer.classList.remove('hidden')
          break
        case 'list-customers':
          registerProducts.classList.add('hidden')
          listProducts.classList.add('hidden')
          registerRequests.classList.add('hidden')
          listRequests.classList.add('hidden')
          registerCustomer.classList.add('hidden')
          listCustomers.classList.remove('hidden')
          break
        case 'register-products':
          listProducts.classList.add('hidden')
          registerRequests.classList.add('hidden')
          listRequests.classList.add('hidden')
          registerCustomer.classList.add('hidden')
          listCustomers.classList.add('hidden')
          registerProducts.classList.remove('hidden')
          break
        case 'list-products':
          registerRequests.classList.add('hidden')
          listRequests.classList.add('hidden')
          registerCustomer.classList.add('hidden')
          listCustomers.classList.add('hidden')
          registerProducts.classList.add('hidden')
          listProducts.classList.remove('hidden')
          break
        case 'register-requests':
          listRequests.classList.add('hidden')
          registerCustomer.classList.add('hidden')
          listCustomers.classList.add('hidden')
          registerProducts.classList.add('hidden')
          listProducts.classList.add('hidden')
          registerRequests.classList.remove('hidden')
          break
        case 'list-requests':
          registerCustomer.classList.add('hidden')
          listCustomers.classList.add('hidden')
          registerProducts.classList.add('hidden')
          listProducts.classList.add('hidden')
          registerRequests.classList.add('hidden')
          listRequests.classList.remove('hidden')
          break

      }

    
    })
  })

 
}

// Collection Clientes
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
            listCustomers()
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
            ${customer.name} | ${customer.email}
            <a href = "#" class = "button-delete"  data-id = "${customer._id}">[excluir]</a>
          </li>
        `
      })

      list.innerHTML = htmlCustomer
      addEventDeleteCustomer()
    })
  })
}

function verifyCampusAddCustomers(name, email, phone, address){
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


  const inputPhone = document.forms['registerCustomer']['phone']
  if(!phone){
    verifyError = true
    inputPhone.classList.add('errorInput')
    const span = inputPhone.nextElementSibling
    span.innerHTML = 'Por favor, informe seu telefone de contato'
  }else{
    inputPhone.classList.remove('errorInput')
    const span = inputPhone.nextElementSibling
    span.innerHTML = ''
  }
  
  const inputAddress = document.forms['registerCustomer']['address']
  if(!address){
    verifyError = true
    inputAddress.classList.add('errorInput')
    const span = inputAddress.nextElementSibling
    span.innerHTML = 'Por favor, preencha o seu endereço'
  }else{
    inputAddress.classList.remove('errorInput')
    const span = inputAddress.nextElementSibling
    span.innerHTML = ''
  }
  
  return verifyError
}

function addCustomers(){
  const formRegister = document.querySelector('#registerCustomer')
  
  formRegister.addEventListener("submit", function(e){
    e.preventDefault()
    
    const name = document.forms['registerCustomer']['name'].value
    const email = document.forms['registerCustomer']['email'].value
    const phone = document.forms['registerCustomer']['phone'].value
    const address = document.forms['registerCustomer']['address'].value

    const verifyForm = verifyCampusAddCustomers(name, email, phone, address)

    
    if(!verifyForm){
      fetch('http://localhost:5000/api/customers', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          address
        })
      }).then((response) => {
        response.json().then((data) => {
          if(data.message === 'success'){
            formRegister.reset()
            alert("Cliente cadastrado com sucesso!")
            listCustomers()
          }else{
            formRegister.reset()
            alert("Ops, ocorreu um erro! Tente novamente!")
          }
        })
      })
      
    }
  
  })
}




// Collection Produtos
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
            listProducts()
            alert("Produto removido com sucesso")         
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
         ${product.name} | R$ ${product.price}
         <a href = "#" class = "button-delete" data-id = "${product._id}">[excluir]</a>
        </li>     
        `
      })

      list.innerHTML = htmlProduct
      addEventDeleteProduct()
    })
  })
}

function verifyCampusAddProducts(name, price){
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

  return verifyError
}

function addProducts(){
  const formRegister = document.querySelector('#registerProducts')
  formRegister.addEventListener("submit", function(e){
    e.preventDefault()

    const name = document.forms['registerProducts']['name'].value
    const price = document.forms['registerProducts']['price'].value
    const verifyForm = verifyCampusAddProducts(name, price)

    if(!verifyForm){
      fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          price
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




// Collection Pedidos
function addEventEditRequest(){
  const buttonsEdit = document.querySelectorAll(".edit-status")
  const listRequests = document.querySelector('.list-requests')
  const editStatus = document.querySelector('.edit-status-request')

  console.log(buttonsEdit)
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
      data.requests.forEach((request) => {
        htmlRequest += `
        <li> 
          <p>Código do Cliente: ${request.codeCustomer}</p>
          <p>Código do Produto: ${request.codeProduct}</p>
          <p>Data de criação: ${request.dataCriation}</p>
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

function verifyCampusAddRequests(codeCustomer, codeProduct, dataCriation, status){
  let verifyError = false

  const inputCodeCustomer = document.forms['registerRequests']['codeCustomer']
  if(!codeCustomer){
    verifyError = true
    inputCodeCustomer.classList.add('errorInput')
    const span = inputCodeCustomer.nextElementSibling
    span.innerHTML = 'Insira o código do cliente'
  }else{
    inputCodeCustomer.classList.remove('errorInput')
    const span = inputCodeCustomer.nextElementSibling
    span.innerHTML = ''
  }

  const inputCodeProduct = document.forms['registerRequests']['codeProduct']
  if(!codeProduct){
    verifyError = true
    inputCodeProduct.classList.add('errorInput')
    const span = inputCodeProduct.nextElementSibling
    span.innerHTML = 'Insira o código do produto'
  }else{
    inputCodeProduct.classList.remove('errorInput')
    const span = inputCodeProduct.nextElementSibling
    span.innerHTML = ''
  }

  const inputDataCriation = document.forms['registerRequests']['dataCriation']
  if(!dataCriation){
    verifyError = true
    inputDataCriation.classList.add('errorInput')
    const span = inputDataCriation.nextElementSibling
    span.innerHTML = 'Insira a data de criação do produto'
  }else{
    inputDataCriation.classList.remove('errorInput')
    const span = inputDataCriation.nextElementSibling
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
  const codeCustomer = document.querySelector('.codeCustomer')
  const codeProducts = document.querySelector('.codeProduct')
  let optionsCustomers = ''
  let optionProducts = ''

  fetch('http://localhost:5000/api/requests').then((response) => {
    response.json().then((data) => {
      data.customers.forEach((customer) => {
        optionsCustomers += `
          <option>${customer.name}</option>
        `
      })
      codeCustomer.innerHTML = optionsCustomers
    })

  })

  fetch('http://localhost:5000/api/requests').then((response) => {
    response.json().then((data) => {
      data.products.forEach((product) => {
        optionProducts += `
          <option>${product.name}</option>
        `
      })

      
      codeProducts.innerHTML = optionProducts
    })
  })

 
  formRegister.addEventListener("submit", function(e){
    e.preventDefault()

    const codeCustomer = document.forms['registerRequests']['codeCustomer'].value
    const codeProduct = document.forms['registerRequests']['codeProduct'].value
    const dataCriation = document.forms['registerRequests']['dataCriation'].value
    const status = document.forms['registerRequests']['statusRequest'].value
    const verifyForm = verifyCampusAddRequests(codeCustomer, codeProduct, dataCriation, status)

 
    
    if(!verifyForm){
      fetch('http://localhost:5000/api/requests', {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          codeCustomer,
          codeProduct,
          dataCriation,
          status
        })
      }).then((response) => {
        response.json().then((data) => {
          if(data.message === 'success'){
            formRegister.reset()
            alert("Pedido cadastrado com sucesso!")
            listRequests()
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
          listRequests.classList.remove('hidden')
          editStatus.classList.add('hidden')
        }else{
          alert("Ops, houve um erro! Tente novamente!")
        }
      })
    })
  })
}

function exit(){
  const buttonsExit = document.querySelectorAll('.exit')
  
  buttonsExit.forEach((button) => {
    button.addEventListener("click", function(e){
      e.preventDefault()
      const parentElement = button.parentElement
      parentElement.classList.add('hidden')
    })
  })
}

function openMenu(){
  const iconMenu = document.querySelector('.menu')

  iconMenu.addEventListener("click", function(){
    document.querySelector('header ul').classList.toggle('open')
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
exit()
openMenu()