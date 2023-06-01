const form = document.getElementById('form')
const username = document.getElementById('username')
const password = document.getElementById('password')

form.addEventListener('submit', async (e)=>{
    e.preventDefault()

    const url = "http://localhost:3000/admin/login"
    const body = {
        username: username.value,
        password: password.value
    }
    const response = await fetch(url,{
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(body)
    })

    if(response.status === 400){
        const data = await response.json()
        if(data.err === 'admin'){
            setError(username, "Not A Admin..!")
        }
        else if(data.err === "password"){
            setSuccess(username)
            setError(password, "Password Not Matching..!")
        }
    } else if(response.status === 200) {
        window.location.href = "/admin"
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
