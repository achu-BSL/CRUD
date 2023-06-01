const form = document.querySelector("#form");
const userName = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password')
const confirmPassword = document.getElementById('confirm_password')


const regEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const url = "http://localhost:3000/users/register"


form.addEventListener('submit', async (e) =>{
    e.preventDefault()

    const data = {
        username: userName.value,
        email: email.value,
        password: password.value,
        confirmpassword: confirmPassword.value
    }

    const response = await fetch(url,{
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(data)
    })

    if(response.status == 400){
        setError(userName, 'Username is not available...!')
        showMessage("Give another username")
    } else if(response.status == 409){
        setSuccess(userName)
        setError(email, 'Email is already taken...!')
        showMessage("Provide another email")
    }else {
        if(checkValid()) {
            showMessage('Register Success')
            window.location.href = '/users/login'
        }
    }

})

const setError = (element, message)=>{
    const inputControl = element.parentElement
    const errorDisplay = inputControl.querySelector('.err')

    errorDisplay.innerHTML = message
    inputControl.classList.add('err')
    inputControl.classList.remove('success')
}

const setSuccess = (element)=>{
    const inputControl = element.parentElement
    const errorDisplay = inputControl.querySelector('.err')

    errorDisplay.innerHTML = ''
    inputControl.classList.add('success')
    inputControl.classList.remove('err')
}

const checkValid = ()=>{
    let NoErr = true
    const userNameValue = userName.value.trim()
    const emailValue = email.value.trim()
    const passwordValue = password.value.trim()
    const confirmPasswordValue = confirmPassword.value.trim()

    if(userNameValue == ''){
        setError(userName, 'Please Provide Username.')
        showMessage("Username can't be empty.")
        NoErr = false
    }else {
        setSuccess(userName)
    }


    if(regEx.test(emailValue)){
        setSuccess(email)
    } else {
        setError(email, 'Please Provide valid Email.')
        showMessage("Email not valid")
        NoErr = false
    }

    if(passwordValue.length < 8){
        setError(password, "Password should be at least 8 character.")
        showMessage("At least 8 letter")
        NoErr = false
    } else {
        setSuccess(password)
        if(passwordValue != confirmPasswordValue){
            setError(confirmPassword, "Not Match.")
            showMessage("Faild to match")
            NoErr = false
        } else {
            setSuccess(confirmPassword)
        }
    }

    return NoErr
}


/**Password visiblity */

const passIcon = document.querySelector('#passIcon')
const conPassIcon = document.querySelector('#conPassIcon')


passIcon.addEventListener('click', ()=>{

    if(passIcon.classList.contains('fa-eye')){
        passIcon.classList.remove('fa-eye')
        passIcon.classList.add('fa-eye-slash')
        password.type = 'text'
    } else {
        passIcon.classList.remove('fa-eye-slash')
        passIcon.classList.add('fa-eye')
        password.type = 'password'
    }
})

conPassIcon.addEventListener('click', ()=>{

    if(conPassIcon.classList.contains('fa-eye')){
        conPassIcon.classList.remove('fa-eye')
        conPassIcon.classList.add('fa-eye-slash')
        confirmPassword.type = 'text'
    } else {
        conPassIcon.classList.remove('fa-eye-slash')
        conPassIcon.classList.add('fa-eye')
        confirmPassword.type = 'password'
    }
})






/**Right Message */

const msgQueue = document.getElementById('msgQueue')

function showMessage(msg){
    const msgContainer = document.createElement('div')
    msgContainer.classList.add('msg')
    msgContainer.textContent = msg
    msgQueue.appendChild(msgContainer)

    setTimeout(function(){
        msgContainer.remove()
    }, 5000)
}