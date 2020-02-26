module.exports = {
    name: 'reload',
    description: 'ბრძანების გადატვირთვა (მხოლოდ ადმინებისთვის)',
    usage: '[command]',
    guildonly: false,
    devonly: true,
    args: true,
    modCommand: false,
    category: 'Admin',
    execute(message, args) {
        if (!args.length) return message.channel.send(`მიუთითეთ ბრძანების სახელი`);

        if (args[0] == 'all') {
            var output = []
            var commands = ''
            var helper = ''
            for (const k of message.client.commands.keys()) {
                helper = message.client.commands.get(k)
                        || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(k));
                commands = helper.name
                delete require.cache[require.resolve(`../${folder}/${commands}.js`)];

                try {
                    const newCommand = require(`../${folder}/${commands}.js`);
                    message.client.commands.set(newCommand.name, newCommand);
                } catch (error) {
                    console.log(error);
                    message.channel.send(`შეცდომა \`${commands}\`-ის გადატვირთვის დროს:\n\`${error.message}\``);
                }
                output.push(`ბრძანება \`${commands}\` წარმატებით გადაიტვირთა!`);
            }
            return message.channel.send(output.join('\n'))      
    }

        const commandName = args[0].toLowerCase();
        const command = message.client.commands.get(commandName)
            || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
        const commandFinal = command.name

        if (!command) return message.channel.send(`არასწორი ბრძანების სახელი, ${message.author}!`);

        delete require.cache[require.resolve(`./${commandFinal}.js`)];

        try {
            const newCommand = require(`../${folder}${commandFinal}.js`);
            message.client.commands.set(newCommand.name, newCommand);
        } catch (error) {
            console.log(error);
            message.channel.send(`შეცდომა გადატვირთვის დროს \n\`${error.message}\``);
        }
        message.channel.send(`\`${commandFinal}\` ბრძანება წარმატებით გადაიტვირთა!`);

    },
};
