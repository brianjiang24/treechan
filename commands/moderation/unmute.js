const Discord = require('discord.js');
const Embed = new Discord.MessageEmbed().setColor('#69f385').setFooter('TreeChan', 'https://i.imgur.com/l7NjjAC.png').setTimestamp();
module.exports = {
    commands: 'unmute',
    expectedArgs: '<@member>',
    minArgs: 1,
    maxArgs: 1,
    permissions: 'MANAGE_MESSAGES',
    callback: async (message, arguments, text) => {
        const member = message.mentions.members.first() || message.guild.members.cache.get(arguments[0]);
        if(!member) return message.channel.send(Embed.setDescription('Member is not found.'));
        const role = message.guild.roles.cache.find(role => role.name === 'Muted');
        if(!role) {
            try {
                message.channel.send(Embed.setDescription('Creating muted role...'));

                let muterole = await message.guild.roles.create({
                    data: {
                        name: 'Muted',
                        permissions: []
                    }
                });
                message.guild.channels.cache.filter(channel => channel.type === 'text').forEach(async (channel, id) => {
                    await channel.createOverwrite(muterole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false,
                    })
                });
                message.channel.edit(Embed.setDescription('Muted role creation successful.'));
            } catch (error) {
                console.log(error);
            }
        };
        const user = message.mentions.users.first();
        if(!member.roles.cache.has(role.id)) {
            return message.channel.send(Embed.setDescription(`${user.tag} is not muted.`));
        } else {
            member.roles.remove(role);
            return message.channel.send(Embed.setDescription(`${user.tag} has been unmuted.`));
        }
    }
} 