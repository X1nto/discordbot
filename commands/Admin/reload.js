const fs = require('fs')
module.exports = {
    name: 'reload',
    description: 'Reloads a command. Bot Owner only.',
    usage: '[command]',
    guildonly: false,
    devonly: true,
    args: true,
    modCommand: false,
    category: 'Dev',
    execute(message, args) {
        if (!args.length) return message.channel.send(`You didn't pass any command to reload, ${message.author}!`);

        if (args[0] == 'all') {
            var output = []
            var commands = ''
            var helper = ''
            fs.readdirSync('./commands').forEach(folder => {
                const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
                for (const file of commandFiles) {
                    for (const k of message.client.commands.keys()) {
                        helper = message.client.commands.get(k)
                                || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(k));
                        commands = helper.name
                        delete require.cache[require.resolve(`./${folder}/${commandFiles}`)];

                        try {
                            const newCommand = require(`./${folder}/${commandFiles}.js`);
                            message.client.commands.set(newCommand.name, newCommand);
                        } catch (error) {
                            console.log(error);
                            message.channel.send(`There was an error while reloading a command \`${commandFiles}\`:\n\`${error.message}\``);
                        }
                        output.push(`Command \`${commandFiles}\` was reloaded!`);
                    }
                    return message.channel.send(output.join('\n'))      
                }
            })
            
        const commandName = args[0].toLowerCase();
        const command = message.client.commands.get(commandName)
            || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
        const commandFinal = command.name

        if (!command) return message.channel.send(`There is no command with name or alias \`${commandName}\`, ${message.author}!`);

        delete require.cache[require.resolve(`./${folder}${commandFinal}.js`)];

        try {
            const newCommand = require(`./${folder}${commandFinal}.js`);
            message.client.commands.set(newCommand.name, newCommand);
        } catch (error) {
            console.log(error);
            message.channel.send(`There was an error while reloading a command \`${commandName}\`:\n\`${error.message}\``);
        }
        message.channel.send(`Command \`${commandFinal}\` was reloaded!`);
        }
    },
};
