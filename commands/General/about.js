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
  async execute(message, args) {
    functions
      .newEmbed()
      .setTitle("About this bot")
      .setDescription(`This bot was created by <@423915768191647755>`);
	},
}; 
