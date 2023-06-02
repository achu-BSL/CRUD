const formInp = document.getElementById('form')
const usernameInp = document.getElementById('username')
const emailInp = document.getElementById('email')

const urlParms = new URLSearchParams(window.location.search)
const encodedeJSON = urlParms.get('data')
const valuesJSON = decodeURIComponent(encodedeJSON)
const value = JSON.parse(valuesJSON)

let exEmail = value.email
let exUsername = value.username

usernameInp.value = exUsername
emailInp.value = exEmail

const url = 'http://localhost:3000/admin/update-user'

formInp.addEventListener('submit', async (e)=>{
    e.preventDefault()

    const data = {
        username: usernameInp.value,
        email: emailInp.value,
        exUsername: exUsername,
        exEmail: exEmail
    }

    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(data)
    })
    if(response.status === 400){
        const data = await response.json()
        
        if(data.err === 'username already taken'){
            setError(usernameInp, 'User Name Not Available..!')
            showMessage("User Name Not Available..")
        } else if (data.err === 'email already taken'){
            setSuccess(usernameInp)
            setError(emailInp, 'Email Already Taken..')
            showMessage('Email Already Taken..')
        } else if (data.err === 'Nothing changed'){
            setError(usernameInp, 'No changes')
            setError(emailInp, 'No changes')
            showMessage("No changes")
        }
    } else if (response.status === 200){
        exUsername = usernameInp.value
        exEmail = emailInp.value
        setSuccess(usernameInp , 'update success.')
        setSuccess(emailInp)
        showMessage('Updated Success...')
    } 
})


const setError = (element, message)=>{
    const inputControler = element.parentElement
    const errorDisplay = inputControler.querySelector('.err')

    errorDisplay.innerHTML = message
    inputControler.classList.remove('success')
    inputControler.classList.add('err')
}

const setSuccess = (element, message)=>{
    const inputControler = element.parentElement
    const errorDisplay = inputControler.querySelector('.err')

    errorDisplay.innerHTML = message || ''
    inputControler.classList.remove('err')
    inputControler.classList.add('success')
}



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