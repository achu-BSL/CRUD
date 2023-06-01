const form = document.getElementById("form")
const userName = document.getElementById("username")
const password = document.getElementById("password")

const url = "http://localhost:3000/users/login"




form.addEventListener('submit',async (e) => {
    e.preventDefault()
    const data = {
        username: userName.value,
        password: password.value
        }

    try {
        console.log(data)
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(data)
        })
        if(response.status === 404){
            setError(username, 'User Not Found!')
            showMessage("User Not Foun..!")
        } else if (response.status === 400){
            console.log("hi")
            setSuccess(username)
            setError(password, 'Inccorect Password..!')
            showMessage('Inccorect Password...!')
        } else {
            showMessage('Login Success.')
            window.location.href = '/'
        }
    } catch (err) {
        console.log(err)
    }

})


const setError = (element, message)=>{
    const inputControler = element.parentElement
    const errorDisplay = inputControler.querySelector('.err')

    errorDisplay.innerHTML = message
    inputControler.classList.add('err')
    inputControler.classList.remove('success')
}

const setSuccess = (element)=>{
    const inputControler = element.parentElement
    const errorDisplay = inputControler.querySelector('.err')

    errorDisplay.innerHTML = ''
    inputControler.classList.add('success')
    inputControler.classList.remove('err')
}

/**Password visible event */

const icon = document.querySelector('#passIcon')

icon.addEventListener('click', ()=>{

    if(icon.classList.contains('fa-eye')){
        icon.classList.remove('fa-eye')
        icon.classList.add('fa-eye-slash')
        password.type = 'text'
    } else {
        icon.classList.remove('fa-eye-slash')
        icon.classList.add('fa-eye')
        password.type = 'password'
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