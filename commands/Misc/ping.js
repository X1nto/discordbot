const functions = require('../../functions.js')
module.exports = {
    name: 'help',
    description: 'ბრძანებების ჩამონათვალი',
    usage: '<command name>',
    aliases: ['command', 'info', 'i'],
    guildonly: false,
    devonly: false,
    args: false,
    modCommand: false,
    category: 'General',
    execute(message, args) {
        const prefix = require('config')
        const argu = message.content.slice(prefix.length).split(/ +/);
	    const command = argu.shift().toLowerCase();
        return message.channel.send(command, argu)
    }
}

