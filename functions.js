const Discord = require('discord.js');
const config = require('config');

exports.Discord = Discord;
module.exports = {
    newEmbed() {
        return new Discord.MessageEmbed().setTimestamp().setColor(Math.random().toString(16).slice(2, 8).toUpperCase());
    },
    logError(err, client, msg) {
        if (msg)
            msg.reply('უპს, მოხდა შეცდომა. იხილეთ ლოგები').then(message => message.delete(3000));
        console.error(err);
    },
    getRole(message, args, spot) {
        const roleInput = args[spot];
        let role = message.guild.roles.cache.get(roleInput);
        if (!role) role = message.guild.roles.cache.get(roleInput.substring(3, roleInput.length - 1));
        if (!role) role = message.guild.roles.cache.find(role => role.name.substring(0, roleInput.length).toLowerCase() === roleInput.toLowerCase());
        return role ? role : false;
    },
    noRole(message) {
        message.reply('არასწორი როლი')
            .then(message => message.delete(3000));
    },
    getMember(message, args, spot) {
        const memberInput = args[spot];
        let member = message.guild.members.cache.get(memberInput);
        if (!member) member = message.guild.members.cache.get(memberInput.substring(3, memberInput.length - 1));
        if (!member) member = message.guild.members.cache.some(member => member.user.username.substring(0, memberInput.length).toLowerCase() === memberInput.toLowerCase()) ? 'reactions' : false;
        return member ? member : false;
    },
    noMember(message) {
        message.reply('არასწორი წევრი')
            .then(message => message.delete(3000));
    },
    errorMessage(message, text) {
        message.reply(text)
            .then(msg => {
                msg.delete(3000);
                if (message.guild)
                    message.delete(3000);
            });
    },
    isMemberHigher(member1, member2) {
        return member1.highestRole.comparePositionTo(member2.highestRole) > 0;
    },
    async imageStore(message, image) {
        const msg = await message.client.channels.cache.get(config.imageStorage).send({
            files: [
                {
                    attachment: image,
                    name: message.author.username + '.png'
                }
            ]
        });
        return msg.attachments.first().url;
    }
};
