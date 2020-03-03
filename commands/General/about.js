const functions = require('../../functions.js')
module.exports = {
    name: 'about',
    description: 'ბოტის შესახებ',
    aliases: ["install", "howtoinstall", "installguide", "ig"],
    guildonly: false,
    devonly: false,
    args: false,
    modCommand: false,
    category: 'General',
    execute(message, args) {
      const output = functions.newEmbed()
        output
          .setTitle("About this bot")
          .setDescription(`This bot was created by <@423915768191647755>`);
        return message.channel.send(output)
    },
}; 
