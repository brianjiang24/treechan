const Discord = require('discord.js');
const Log = require('../../models/logchan');
const Embed = new Discord.MessageEmbed().setColor('#69f385').setFooter('TreeChan', 'https://i.imgur.com/l7NjjAC.png');

module.exports = {
    commands: 'setlog',
    expectedArgs: '<channel ID>',
    minArgs: 1,
    maxArgs: 1,
    permissions: 'MANAGE_GUILD',
    callback: async (message, arguments, text) => {
        message.delete();

        const channelid = arguments[0];
        
        let logid = message.guild.channels.cache.find(chan => chan.id === channelid);

        if(!logid) return message.channel.send(Embed.setDescription('Channel is not found').setTimestamp());

        await new Log({
            server: message.guild.id,
            logchan: channelid,
            mod: message.author
        }).save();

        return message.channel.send(Embed.setDescription(`Success! Moderation logs will now appear in ${logid}`).setTimestamp());
    }
}
