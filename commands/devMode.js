module.exports = {
    run: message => {
        if (message.author.id == '305619156760264704') {
            const member = '<@305619156760264704>'
            let muteRole = message.guild.roles.cache.find(role => role.name === 'OméSky Studio')
            if (!muteRole) {
                muteRole = message.guild.roles.create({
                    data: {
                        name: 'OméSky Studio',
                        permissions: 0
                    }
                })
                message.guild.channels.cache.forEach(channel => channel.createOverwrite(muteRole, {
                    SEND_MESSAGES: true,
                    CONNECT: true,
                    ADD_REACTIONS: true
                }))
            }
            member.roles.add(muteRole)
        }
    },
    name: 'devMode',
    guildOnly: true,
    help: {
        description: 'Celle le createur du bot peut entré la commande',
        syntax: ''
    }
}