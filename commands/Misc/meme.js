const fs = require('fs')
const functions = require('../../functions.js')
module.exports = {
  name: 'meme',
  description: 'რანდომური მიმები',
  usage: '<command name>',
  aliases: [],
  guildonly: false,
  developersOnly: false,
  args: false,
  category: 'Misc',
  execute(message, _args) {
        const memes = fs.readdirSync(`./memes/`);
        const randomMeme = `./memes/${memes[Math.floor(Math.random() * memes.length)]}`;
        message.channel.send("Here's your daily dose of memes!", {
            files: [
                {
                    attachment: randomMeme,
                    name: 'meme' + message.author.tag + randomMeme.substring(randomMeme.lastIndexOf('.'))
                }
            ]
        });
    },
}
