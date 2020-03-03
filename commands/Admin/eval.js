module.exports = {
    name: 'eval',
    description: 'Runs code provided by dev.',
    usage: '',
    aliases: ['debug', 'code'],
    guildonly: false,
    devonly: true,
    args: true,
    modCommand: false,
    category: 'Admin',
    async execute(message, args) {
        const functions = require('../../functions.js');
        const config = require('config');
        let output;
        try {
            output = await eval(args.join(' '));
        }
        catch (err) {
            message.channel.send(`An error occured!\n\`\`\`js\n${err.stack}\`\`\``);
        }
        try {
            if (!output) return;
            const jsonobj = typeof output !== 'object' ? JSON.parse(output) : output;
            const out = JSON.stringify(jsonobj, null, '\t');
            message.channel.send(`\`\`\`js\n${out.replace(config.token, '[REDACTED]').replace(config.mongoString, '[REDACTED]')}\`\`\``);
        }
        catch (err) {
            try {
                message.channel.send(output);
            }
            catch (err) {
                message.channel.send(`An error occured!\n\`\`\`js\n${err.stack}\`\`\``);
            }
        }
    },
};
