const fs = require('fs')
const functions = require('../../functions.js')
module.exports = {
  name: 'bozi',
  description: 'ბოზის სურათი',
  usage: '<command name>',
  aliases: [],
  guildonly: false,
  developersOnly: false,
  args: false,
  category: 'Misc',
  execute(message, args) { 
      const bozi = [`./images/bozi.jpg`]
      message.channel.send('Here\'s our slut', {files: bozi})
   },
}
