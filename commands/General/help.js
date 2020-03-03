const functions = require('../../functions.js');
const config = require('config')
module.exports = {
    name: 'help',
    description: 'ბრძანებების ჩამონათვალი',
    usage: '<command name>',
    aliases: ['info', 'i'],
    guildonly: false,
    devonly: false,
    args: false,
    modCommand: false,
    category: 'General',
    cooldown: '5',
    execute(message, args) {
        const output = functions.newEmbed().setAuthor('დახმარების მენიუ', message.author.avatarURL);

        if (!args.length) {
            const commands = {
                General: [],
                Misc: [],
                Admin: []
            };
            message.client.commands.forEach(command => {
                const category = commands[command.category] || commands.Misc;
                category.push(`\`${config.prefix}${command.name}\` - *${command.description}*`);
            });
            output
                .setTitle("**აქ არის ყველა შესაძლო ბრძანება**")
                .addField('**მთავარი ბრძანებები**', commands.General.join('\n'), false)
                .addField('**მოდერატორებისთვის**', commands.Admin.join('\n'), false)
                .addField('**სხვ.**', commands.Misc.join('\n'), false)
                .setFooter(`აკრიფეთ ${config.prefix}help [ბრძანების სახელი] ამ ბრძანებაზე დახმარების მისაღებად.`)
            return message.channel.send(output)
        }

        const name = args[0].toLowerCase();
        const command = message.client.commands.get(name) || message.client.commands.find(c => c.aliases && c.aliases.includes(name));
        if (!command)
            return message.reply('არასწროი ბრძანება!');

        const info = [
            `**სახელი:** \`${command.name}\``,
            `**აღწერა:** \`${command.description ? command.description : '-'}\``,
            `**გრძელი აღწერა:** \`${command.extended ? command.extended : '-'}\``,
            `**გამოყენება:** \`${config.prefix}${command.name}${command.usage ? ' ' + command.usage : ''}\``,
            `**სწრაფი ღილაკები:** \`${command.aliases.length ? command.aliases.join(', ') : '-'}\``
        ];
        output.setAuthor(message.author.tag, message.author.avatarURL).setDescription(info.join('\n\n'));
        message.channel.send(output);
    },
};
