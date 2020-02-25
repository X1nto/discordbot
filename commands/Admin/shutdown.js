module.exports = {
    name: 'shutdown',
    description: 'ბოტის გათიშვა (მხოლოდ ადმინებისთვის)',
    usage: ' ',
    aliases: ['die'],
    guildonly: false,
    devonly: true,
    args: false,
    modCommand: false,
    category: 'Admin',
    execute(message, args) {
        message.channel.send('*დამენძრა*').then(() => {
            process.exit();
        })
    },
};
