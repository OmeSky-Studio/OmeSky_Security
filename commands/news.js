const Discord = require('discord.js')

module.exports = {
    run: async(message, args) => {
        message.channel.send(new Discord.MessageEmbed()
            .setTitle('News:')
            .setDescription("-Ajout de la command -news \n" +
                "-Ajout de message de politaise (ça va ? , ...)"
            ))

    },
    name: 'news',
    guildOnly: true,
    help: {
        description: 'Cette commande permet de voir les nouveautés',
        syntax: 'rien de beau par ici'
    }
}