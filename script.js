const socket  = io('http://localhost:3000') // hosting socket application

const messageForm  = document.getElementById('send-container')
const messageInput  = document.getElementById('message-input')
const messageonscreen = document.getElementById('message-container')
const onlineUsers = document.getElementById('online-container')

let fetchbtn = document.getElementById('fetch-btn')

const name = prompt('what is your name')

appendMessage(`You joined as ${name}`)
socket.emit('user-joined',name)
socket.on('chat-message',data=>{
    //console.log(data);
    appendMessage(data)
})

socket.on('online-users',data=>{
    console.log('users data is',data.usersarr)
    appendUsers(data.usersarr)
})
socket.on('print-user',data=>{
    var name = data.name
    var a = name.toString()
    var b = ' has joined'
    var c = a.concat(b.toString())
    appendMessage(c)
    //appendUsers(data.usersarr)
    //console.log(data.usersarr)
    
})

socket.on('user-disconnected',name=>{
    appendMessage(`user ${name} disconnected`)
})
messageForm.addEventListener('submit',e=>{
    e.preventDefault()
    // to prevent the page from getting referesh
    const message = messageInput.value 
    var a = 'You:'
    var b = a.concat(message.toString())
    appendMessage(b)
    //console.log(b)
    var m1 = `${name}: `
    var m2 = (m1.toString()).concat(message.toString())
    console.log(m2)
    socket.emit('send-chat-message',m2)//emit ka use data bhejne ke liye kiya jata hai
    //on ka use data receive krne k liye kiya jata hai.
    messageInput.value = ''
})
function appendMessage(message)
{
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageonscreen.append(messageElement)
}
function appendUsers(users)
{
    //const messageElement = document.createElement('div')
    //messageElement.innerText = message
    //onlineUsers.append(messageElement)


    console.log(users)
    //<p id="demo"></p>


//var cars = ["BMW", "Volvo", "Saab", "Ford", "Fiat", "Audi"];
var text = "";
var i;

for(const property in users) {
    text+=`* ${users[property]}`+"<br>";
    console.log(`user[${property}] = ${users[property]}`);
}
/*for (i = 0; i < users.length; i++) {
  text += users[i] + "<br>";
  //console.log(users[i]);
}*/

onlineUsers.innerHTML = text;

}

fetchbtn.addEventListener('click',buttonClickHandler)
function buttonClickHandler(){
    console.log('you have clicked fetchbtn ');
    const xhr = new XMLHttpRequest();

    xhr.open('GET','http://192.168.0.107:8080/harry.txt',true);

    xhr.onprogress = function()
    {
        console.log('on progress')
    }

    xhr.onload = function(){
        console.log(this.responseText)
    }
    xhr.send();
}