document.addEventListener("DOMContentLoaded", () => {
    createForm();
    fetchUsers()
})

const BASE_URL = "http://127.0.0.1:3000"

//******read - fetch users index********* 

function fetchUsers() {
    fetch(`${BASE_URL}/users`)
        .then(resp => resp.json())
        .then(users => {
            //we do something with the data fetched
            for (const user of users) {
                let u = new User(user.id, user.username)
                u.renderUser();
            }
        })
}

//*******create - create a new user*********

//create a form
function createForm() {
    let usersForm = document.getElementById("users-form")

    usersForm.innerHTML +=
    `
    <form>
        Enter A Username: <input type="text" id="username"><br>
        <input type="submit" value="Create User">
        
    </form>
    `
    
    //invoke function userFormSubmission
    usersForm.addEventListener("submit", userFormSubmission)
}

function userFormSubmission(){
    event.preventDefault();
    //grab values from user
    let username = document.getElementById("username").value 

    let user = {
        username: username,
    }

    //once form is submitted => fetch `post` to my backend
    fetch(`${BASE_URL}/users`, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user) 
    } ) 
    .then(resp => resp.json())
    .then(user => {
        let u = new User(user.id, user.username)
        u.renderUser(); 
    })
 }

//******delete - delete a user*******

function deleteUser(){ 
    let userId = parseInt(event.target.dataset.id)

    fetch(`${BASE_URL}/users/${userId}`, {
        method: 'DELETE'
    })

    this.location.reload()
} 