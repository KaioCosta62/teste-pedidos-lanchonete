function login(){
  const formLogin = document.querySelector('#form-login')
  const defaultUser = 'admin'
  const defaultPassword = 'admin123'

  formLogin.addEventListener('submit', function(e){
    e.preventDefault()
    const user = document.forms['form-login']['user'].value
    const password = document.forms['form-login']['password'].value
    const verifyLogin = user === defaultUser && password === defaultPassword ? true : false

    if(!verifyLogin){
      formLogin.reset()
      return alert("Usuário ou senha incorretos, tente novamente!")
    }
    document.querySelector('.login').style.display = 'none'
  })
}

login()