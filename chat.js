$(() => {
    // onclick
    $('#send').click(() => {
        sendMessage({
            name: $('#name').val(),
            message: $('#message').val()
        })
    })

    let socket = io()
    socket.on('message', addMessages)

    getMessages()
})

function sendMessage(message){
    console.log('sending message')
    $.post('http://localhost:3000/messages', message)
}

function getMessages(){
    console.log('getting messages')
    $.get('http://localhost:3000/messages', (data) => {
        data.forEach(message => {
            addMessages(message)
        });
    })
}

function addMessages(message){
    console.log("adding Messages")
    $('#messages').append(`
    <h4> ${message.name}</h4>
    <p> ${message.message}</p>`)
}