const tBody = document.getElementById('tBody')


const fetchData = async ()=>{
    const url = "http://localhost:3000/admin/api/get-all-user"
    
    const response = await fetch(url,{
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json'
        }
    })

    if(response.status === 200){
        const data = await response.json()
        tBody.innerHTML = ''
        for(let i = 0; i < data.length; i++){
            const newRow = document.createElement('tr')
            newRow.classList.add('table-active')
        
            const no = document.createElement('th')
            no.scope = 'row'
            no.innerHTML = i + 1
        
            const username = document.createElement('td')
            username.innerHTML = data[i].username
        
            const email = document.createElement('td')
            email.innerHTML = data[i].email

            const icons = document.createElement('td')
            if(!data[i].admin){
                icons.innerHTML = `<i class="fa-solid fa-pen edit"></i><i class="ms-3 fa-solid fa-trash del"></i>`
            } else icons.innerHTML = '<i class="edit"></i><i class="del"></i>'

            const access = document.createElement('td')
            access.innerHTML =  data[i].admin ? '<i class="fa-solid fa-user-gear access"></i>' :'<i class="fa-solid fa-user access"></i>'

        
            newRow.appendChild(no)
            newRow.appendChild(username)
            newRow.appendChild(email)
            newRow.appendChild(icons)
            newRow.appendChild(access)
        
            tBody.appendChild(newRow)


            
            const userCount = tBody.querySelectorAll('.edit').length

            for(let i = 0; i < userCount; i++){
                const edit = tBody.querySelectorAll('.edit')[i]
                const del = tBody.querySelectorAll('.del')[i]
                const access = tBody.querySelectorAll('.access')[i]

                edit.addEventListener('click', ()=>{
                    const tr = edit.parentElement.parentElement
                    let index = tr.querySelector('th').innerText
                    index = index - 1

                    const values = { 
                        username: data[index].username,
                        email: data[index].email
                    }
                    const valuesJSON = JSON.stringify(values)
                    window.location.href = `http://localhost:3000/admin/update-user?data=${encodeURIComponent(valuesJSON)}`
                })

                del.addEventListener('click', ()=>{
                    const tr = del.parentElement.parentElement
                    let index = tr.querySelector('th').innerText
                    index = index - 1

                    const dt = {username: data[index].username}
                    const URL = 'http://localhost:3000/admin/'
                    fetch(URL,{
                        method: 'POST',
                        headers: {
                            'Content-Type' : 'application/json'
                        },
                        body: JSON.stringify(dt)
                    })
                    .then(res => {
                        if(res.status === 200) fetchData()
                    })
                    .catch(err => console.log(err.message))
                   
                })

                access.addEventListener('click',  ()=>{
                    console.log("Event")
                    const tr = access.parentElement.parentElement
                    let index = tr.querySelector('th').innerHTML
                    index = index - 1

                    const url = 'http://localhost:3000/admin/update-user'
                    const userAccess = data[index].admin
                    const body = {
                        admin: userAccess ? false : true,
                        username: data[index].username
                    }
                    fetch(url,{
                        method: 'PUT',
                        headers: {
                            'Content-Type' : 'application/json'
                        },
                        body: JSON.stringify(body)
                    })
                    .then(res => {
                        if(res.ok) {
                            fetchData()
                        }
                        else console.log(res.status)
                    })
                    .catch(err =>{
                        console.log(err)
                    })
                })
            }

        }
        
    }
}

fetchData()


setInterval(fetchData, 5000)




const logOutBtn = document.querySelector('.logout')

logOutBtn.addEventListener('click', async()=>{
    const url = 'http://localhost:3000/admin/logout'
    const response = await fetch(url,{
        method: 'DELETE',
        headers: {
            'Content-Type' : 'application/json'
        }
    })
    if(response.ok) window.location.href = '/admin/login'
    else console.log('OOPS something wrong..!')
})




/**Side Msg */
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