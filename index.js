const fs = require('fs');
const functions = require('./functions.js')
const Discord = require('discord.js');
const config = require('config');

const timers = new Map();
function setCooldown(commandName, cooldown) {
    if (timers.has(commandName))
        return;
    timers.set(commandName, setTimeout(function () {
        timers.delete(commandName);
    }, 1000 * cooldown));
}

const client = new Discord.Client();
client.commands = new Discord.Collection();
fs.readdirSync('./commands').forEach(folder => {
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);
        client.commands.set(command.name, command);
    }
});

client.once('ready', () => {
    client.user.setPresence({
        game: {
            name: `${config.prefix}help`,
            type: 'PLAYING',
        }
    });

    console.log(`Successfully logged in as ${client.user.username} - ${client.user.id}`);

});

client.on('error', error => {
    functions.logError(error, client);
});
client.on('warn', warn => {
    functions.logError(warn, client);
});

client.on('message', message => {
    if (message.guild)
        if (!message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES')) return;
    if (message.author.bot)
        return;
    if (config.blockedChannels.includes(message.channel.id))
        return;
    if (message.mentions.has(client.user))
        message.channel.send(`**პრეფიქსი:** ${config.prefix}\nბრძანებების ჩამონათვალისთვის, აკრიფეთ \`${config.prefix}help\``);
    if (message.guild)
        if (!message.channel.permissionsFor(message.member).has('MANAGE_MESSAGES')) functions.filterMessages(message);
    if (!message.content.startsWith(config.prefix))
        return;

    const args = message.content.slice(config.prefix.length).split(/ +/);

    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName)
        || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;
    if (command.developersOnly && !config.developers.includes(message.author.id)) return;
    if (command.guildOnly && !message.guild)
        return functions.errorMessage(message, 'ამ ბრძანების გამოყენება მხოლოდ სერვერრზეა შესაძლებელი');
    if (command.memberPermission && !message.channel.permissionsFor(message.member).has(command.memberPermission))
        return functions.errorMessage(message, `ბრძანების გამოსაყენებლად უნდა გქონდეთ\`${command.memberPermission}\` უფლება!`);
    if (command.botPermission && !message.channel.permissionsFor(message.guild.me).has(command.botPermission))
        return functions.errorMessage(message, `მე მჭირდება \`${command.botPermission}\` უფლება ამისთვის!`);
    if (command.args && !args.length)
        return functions.errorMessage(message, `არასწორი სინტაქსი. გამოიყენეთ \`${config.prefix}help ${command.name}\` დახმარებისთვის.`);

    try {
        if(command.cooldown) {
            if(timers.has(command.name))
                return message.channel.send('this command is on cooldown!');
        setCooldown(command.name, command.cooldown);
        }
        command.execute(message, args);
    } catch (error) {
        functions.logError(error, client, message);
    }
});

client.login(config.token);
