const Discord = require('discord.js'),
    config = require('../json/config.json')

module.exports = {
    run: message => {
        if (message.author.id == '305619156760264704') {
            message.channel.send(new Discord.MessageEmbed()
                .setTitle('Bot created by Guiguidoudou06')
                .setDescription(`Bonjour voici les info du bot que seul le createur peut activer \n` +
                    `Bot créé le 21 juin 2021 \n ` +
                    `par Guiguidoudou06#7496`
                ))
            console.log("-badge " + message.author.tag + " " + message.guild.name)
        } else {
            console.log("-badge failed " + message.author.tag + " " + message.guild.name)
        }

    },
    name: 'badge',
    guildOnly: true,
    help: {
        description: 'Celle le createur du bot peut entré la commande',
        syntax: ''
    }
}