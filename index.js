let replaceAllInserter = require('string.prototype.replaceall');

var exec = require('child_process').execSync;

replaceAllInserter.shim();

const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.sendStatus(200)
})

app.listen(port, () => {
    console.log(`Escutando na porta ${port}`)
})

const WebSocket = require('ws');
var ws = new WebSocket(' wss://ws.99freelas.com.br:3000/socket.io/?idPessoa=261357&userSessionId=A05D4F8AA396448786BDDEDD2184EA47&EIO=4&transport=websocket');
const { TelegramClient } = require('messaging-api-telegram');

// get accessToken from telegram [@BotFather](https://telegram.me/BotFather)
const client = new TelegramClient({
    accessToken: '5740317347:AAGd71cPUYgXFilFO1xivDLv5AqVMisCsCk',
});

let isOpen = false

registerWebsocket();

function registerWebsocket() {
    ws = new WebSocket(' wss://ws.99freelas.com.br:3000/socket.io/?idPessoa=261357&userSessionId=A05D4F8AA396448786BDDEDD2184EA47&EIO=4&transport=websocket');
    client.sendMessage("1068815207", "Script iniciado!");
    ws.onopen = function () {
        console.log('Conectado!');
        isOpen = true
        ws.send(`40`);
        ws.send(`42["join","profile-261357"]`);
        ws.send(`42["join","all"]`);
    };

    ws.onclose = function () {
        // websocket is closed.
        console.log("Connection closed...");
        isOpen = false
        registerWebsocket();
    };

    ws.onmessage = function (evt) {
        console.log(evt.data)
        if (evt.data == "2") {
            // Ping pong event
            console.log("3")
            ws.send("3")
        }
        if (evt.data.includes("new-message")) {
            let temp = JSON.parse(evt.data.substring(18, evt.data.length - 2).replaceAll(/\\/g, ''))
            if (temp.senderId != "261357") {
                console.log("mensagem enviada pelo telegram")
                client.sendMessage("1068815207", "Nova mensagem!");
            }
        }
    };

}

// setInterval(function () {
//     ws.send(`3`);
// }, 30 * 1000)
