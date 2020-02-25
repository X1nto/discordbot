const Discord = require('discord.js');
const { token, prefix } = require('config');
const client = new Discord.Client();

client.once('ready', () => {
	console.log('Connected!');
});

client.on('message', message => {
	console.log(message.content);
});

client.login(token);
