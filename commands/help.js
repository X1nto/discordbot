const functions = require('../functions.js')
module.exports = {
    name: 'help',
    description: 'ბრძანებების ჩამონათვალი',
    usage: '<command name>',
    aliases: ['command', 'info', 'i'],
    guildonly: false,
    devonly: false,
    args: false,
    modCommand: false,
    category: 'General',
    execute(message, args) {
        const output = functions.newEmbed().setAuthor('დახმარების მენიუ', message.author.avatarURL)
        const { commands } = message.client;

        if (!args.length) {
            var generalCommandList = []
            var adminCommandList = []
            var otherCommandList = []
            var helper = ''
            for (const k of message.client.commands.keys()) {
                helper = message.client.commands.get(k)
                switch (helper.category) {
                    case 'General':
                        generalCommandList.push(`\`${functions.prefix}${helper.name}\` - *${helper.description}*`);
                        break;
                    case 'Admin':
                        adminCommandList.push(`\`${functions.prefix}${helper.name}\` - *${helper.description}*`);
                        break;
                    case 'Other':
                        otherCommandList.push(`\`${functions.prefix}${helper.name}\` - *${helper.description}*`);
                        break;
                    default:
                        otherCommandList.push(`\`${functions.prefix}${helper.name}\` - *${helper.description}*`);
                        break;
                }
            }
            output
                .setTitle("აქ არის ყველა შესაძლო ბრძანება")
                .addField('მთავარი ბრძანებები', generalCommandList.join('\n'), false)
                .addField('მოდერატორის ბრძანებები', adminCommandList.join('\n'), false)
                .addField('სხვ. ბრძანებები', otherCommandList.join('\n'), false)
                .setFooter(`აკრიფეთ ${functions.prefix}help [ბრძანების სახელი] ამ ბრძანებაზე დახმარების მისაღებად.`)
            return message.channel.send(output)
        }

        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

        if (!command) {
            return message.reply('არასწორი ბრძანება!');
        }

        var helper = `**სახელი:** \`${command.name}\`\n`;

        if (command.description) helper += (`\n**აღწერა:** \`${command.description}\`\n`);
        if (command.usage) helper += (`\n**გამოყენება:** \`${functions.prefix}${command.name} ${command.usage}\`\n`);
        if (command.aliases) helper += (`\n**სწრაფი ღილაკები:** \`${command.aliases.join(', ')}\``); else helper += (`\n**სწრაფი ღილაკები:** -`)
        output.setAuthor(message.author.username + '#' + message.author.discriminator, message.author.avatarURL).setDescription(helper)

        message.channel.send(output);
    },
}; 
