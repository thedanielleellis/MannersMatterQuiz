class User { 
    constructor(id, username) {
        this.id = id;
        this.username = username;
    }

    //render user instance method
    renderUser() {
        let usersDiv = document.getElementById("users-container")
    
        usersDiv.innerHTML +=
        `
        <h3>Username: ${this.username}</h3>
 
        <button class="delete-bttn" data-id=${this.id} onclick="deleteUser()">Delete User</button>
        `
    }
}