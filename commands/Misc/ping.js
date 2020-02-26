const functions = require('../../functions.js')
module.exports = {
    name: 'ping',
    description: 'პინგი',
    usage: '<command name>',
    aliases: '',
    guildonly: false,
    devonly: false,
    args: false,
    modCommand: false,
    category: 'Misc',
    execute(message, args) {
        return message.channel.send(`პინგი: \`${Math.floor(message.client.ping)}ms\``)
    }
}

