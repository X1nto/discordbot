const functions = require('../../functions.js') 
module.exports = {
	name: 'dgisbozi',
    description: 'გვეუბნება დღის ბოზს',
    usage: '<command name>',
    aliases: ['db'],
    guildonly: false,
    devonly: false,
    args: false,
    modCommand: false,
    category: 'Misc',
    cooldown: '10',
    execute(message, args) {
        const randomBozi = message.guild.members.cache.filter(m =>  !
        m.user.bot).random();
        return message.channel.send(`${randomBozi.user} არის დღის ბოზი!`)
    },
};
