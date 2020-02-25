const Discord = require('discord.js')
const config = require('config')

exports.newEmbed = () => {
    return new Discord.RichEmbed().setTimestamp().setColor(Math.random().toString(16).slice(2, 8).toUpperCase())
};

exports.getRole = (message, args, spot) => {
    const roleInput = args[spot];
    let role = message.guild.roles.get(roleInput);
    if (!role) role = message.guild.roles.get(roleInput.substring(3, roleInput.length - 1));
    if (!role) role = message.guild.roles.find(role => role.name.substring(0, roleInput.length).toLowerCase() === roleInput.toLowerCase());
    return role ? role : false;
};
exports.noRole = (message) => {
    message.reply('არასწორი როლი')
        .then(message => message.delete(3000));
};
exports.getMember = (message, args, spot) => {
    const memberInput = args[spot];
    let member = message.guild.members.get(memberInput);
    if (!member) member = message.guild.members.get(memberInput.substring(3, memberInput.length - 1));
    if (!member) member = message.guild.members.find(member => member.user.username.substring(0, memberInput.length).toLowerCase() === memberInput.toLowerCase());
    return member ? member : false;
};
exports.noMember = (message) => {
    message.reply('არასწორი წევრი')
        .then(message => message.delete(3000));
};

exports.reply = (message, text) => {
    message.reply(text)
        .then(message => message.delete(3000));
};
