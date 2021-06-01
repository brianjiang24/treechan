const Discord = require('discord.js');
const Embed = new Discord.MessageEmbed().setColor('#69f385').setFooter('TreeChan', 'https://i.imgur.com/l7NjjAC.png').setTimestamp();

module.exports = {
    commands: 'setlog',
    expectedArgs: '<channel ID>',
    minArgs: 1,
    maxArgs: 1,
    permissions: 'MANAGE_GUILD',
    callback: async (message, arguments, text) => {
        message.delete();

        const channelid = arguments[0];
        
        const channel = message.guild.channels.cache.find(chan => chan.id === channelid);

        if(!channel) return message.channel.send(Embed.setDescription('Channel not found'));

        return message.channel.send(Embed.setDescription(`Moderation logs will now appear in ${channel}`));

    }
}