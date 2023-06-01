const logOutBtn = document.querySelector('.logout')

logOutBtn.addEventListener('click', async ()=>{
    const url = 'http://localhost:3000/users/logout'
    const response = await fetch(url, {
        method: "DELETE",
        headers: {
            'Content-Type' : 'application/json'
        }
    })

    if(response.ok) window.location.href = '/users/login'
    else console.log(response.status)
})