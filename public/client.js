const socket=io();
let name;
const textarea=document.querySelector('#textarea');
const messagearea=document.querySelector('.message-area');

do{
    name=prompt('Enter your name');
}while(!name);

textarea.addEventListener('keypress',(e)=>{
    if(e.key==='Enter'){
        sendmessage(e.target.value);
        e.preventDefault();
    }
})

function sendmessage(message){
    let msg={
        user:name,
        message:message.trim()
    }
    //append
    appendmessage(msg,'outgoing');
    textarea.value=''
    scroll();

    //socket message
    socket.emit('message',msg);
}

function appendmessage(msg,type){
    let mainDiv=document.createElement('div');
    mainDiv.classList.add(type,'message');
    let markup=`
        <h4>${msg.user}</h4>
        <p>${msg.message}</h4>
    `
    mainDiv.innerHTML=markup;
    messagearea.appendChild(mainDiv);
}

socket.on('message',(msg)=>{
    appendmessage(msg,'incoming');
    scroll();
})

function scroll(){
    messagearea.scrollTop=messagearea.scrollHeight;
}