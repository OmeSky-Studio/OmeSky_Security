const Discord = require('discord.js')
const client = new Discord.Client()
const config = require('./json/config.json')
const fs = require('fs')

client.commands = new Discord.Collection();
client.message = new Discord.Collection();

var old_msg = []
var run = false
var debugMode = false
client.on('ready', () => {
    console.log('I am ready!')
    client.user.setPresence({
        status: 'online',
        activity: {
            type: "COMPETING",
            name: "Security Server (-help)",
        }
    });
    run = true
})

fs.readdir('./commands', (err, files) => {
    if (err) throw err
    files.forEach(file => {
        if (!file.endsWith('.js')) return
        const command = require(`./commands/${file}`)
        console.log(`command: ${file}`);
        client.commands.set(command.name, command)
    })
})

fs.readdir('./message', (err, files) => {
    if (err) throw err
    files.forEach(file => {
        if (!file.endsWith('.js')) return
        const msg = require(`./message/${file}`)
        console.log("Message: " + msg.name);
        client.message.set(msg.name, msg)
    })
})

//COMMANDS MESSAGE
client.on('message', message => {

    if (debugMode) console.log(message.guild.name + ' ' + message.channel.name + " | " + message.content);

    if (message.type !== 'DEFAULT' || message.author.bot) return

    const args = message.content.trim().split(/ +/g)
    const commandName = args.shift().toLowerCase()
    if (!commandName.startsWith(config.prefix)) return
    const command = client.commands.get(commandName.slice(config.prefix.length))
    if (!command) return
    if (command.guildOnly && !message.guild) return message.channel.send('Cette commande ne peut être utilisée que dans un serveur.')
    command.run(message, args, client)
})

//MESSAGE MESSAGE
client.on('message', (message) => {
        if (message.author.bot) return
        const args = message.content.trim().split(/ +/g)
        const msgName = args.shift().toLowerCase()
        const command = client.message.get(msgName)

        if (!command) return

        command.run(message, args, client)

    })
    //spam
const AntiSpam = require('discord-anti-spam');
const antiSpam = new AntiSpam({
    warnThreshold: 3, // Amount of messages sent in a row that will cause a warning.
    muteThreshold: 4, // Amount of messages sent in a row that will cause a mute
    kickThreshold: 7, // Amount of messages sent in a row that will cause a kick.
    banThreshold: 7, // Amount of messages sent in a row that will cause a ban.
    maxInterval: 2000, // Amount of time (in milliseconds) in which messages are considered spam.
    warnMessage: '{@user}, Please stop spamming.', // Message that will be sent in chat upon warning a user.
    kickMessage: '**{user_tag}** has been kicked for spamming.', // Message that will be sent in chat upon kicking a user.
    muteMessage: '**{user_tag}** has been muted for spamming.', // Message that will be sent in chat upon muting a user.
    banMessage: '**{user_tag}** has been banned for spamming.', // Message that will be sent in chat upon banning a user.
    maxDuplicatesWarning: 1, // Amount of duplicate messages that trigger a warning.
    maxDuplicatesKick: 10, // Amount of duplicate messages that trigger a warning.
    maxDuplicatesBan: 12, // Amount of duplicate messages that trigger a warning.
    maxDuplicatesMute: 8, // Ammount of duplicate message that trigger a mute.
    ignoredPermissions: ['ADMINISTRATOR'], // Bypass users with any of these permissions.
    ignoreBots: true, // Ignore bot messages.
    verbose: true, // Extended Logs from module.
    ignoredMembers: [], // Array of User IDs that get ignored.
    muteRoleName: "Muted", // Name of the role that will be given to muted users!
    removeMessages: true // If the bot should remove all the spam messages when taking action on a user!
        // And many more options... See the documentation.
});
client.on('message', msg => {
    antiSpam.message(msg)
})

client.on('guildCreate', guild => {
    console.log("--------------------------INVITATION--------------------------")
    console.log("Invitater sur : " + guild.name + " by " + `<@${guild.ownerID}>`)
    console.log("--------------------------------------------------------------")
})

client.on('guildDelete', guild => {
    console.log("--------------------------EXPULTION-------------------------")
    console.log("Expulser de : " + guild.name + " by " + `<@${guild.ownerID}>`)
    console.log("------------------------------------------------------------")
})

client.login(process.env.TOKEN);