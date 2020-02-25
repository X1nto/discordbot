const fs = require('fs');
const Discord = require('discord.js');
const config = require('config');
const client = new Discord.Client();

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', () => {
	console.log('Connected!');
});

client.on('message', message => {
	console.log(message.content);
});

client.on('message', message => {
    if (message.guild)
        if (!message.channel.permissionsFor(message.guild.me).has('SEND_MESSAGES')) return;
    if (message.author.bot)
        return;
    if (config.blockedChannels.includes(message.channel.id))
        return;
    if (message.isMentioned(client.user))
        message.channel.send(`**Prefix:** ${config.prefix}\nFor a list of commands, type \`${config.prefix}help\``);
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
        return functions.errorMessage(message, 'This command can only be used on a server!');
    if (command.memberPermission && !message.channel.permissionsFor(message.member).has(command.memberPermission))
        return functions.errorMessage(message, `You cannot use this command as it requires you to have the \`${command.memberPermission}\` Permission!`);
    if (command.botPermission && !message.channel.permissionsFor(message.guild.me).has(command.botPermission))
        return functions.errorMessage(message, `I require the \`${command.botPermission}\` Permission to do this!`);
    if (command.args && !args.length)
        return functions.errorMessage(message, `Missing input. Please refer to the \`${config.prefix}help ${command.name}\` page.`);

    try {
        command.execute(message, args, sfw);
    } catch (error) {
        functions.logError(error, client, message);
    }
});

client.login(token);
