const Discord = require('discord.js');
const Embed = new Discord.MessageEmbed().setColor('#000000').setFooter('OugiBot', 'https://i.imgur.com/xfahmFj.png').setTimestamp();
module.exports = {
    commands: 'ping',
    minArgs: 0,
    maxArgs: 0,
    callback: (message, arguments, text) => {
        message.channel.send(Embed.setDescription(`**Calculating ${message.author.username}'s ping...**`)).then(msg => {
        const ping = msg.createdTimestamp - message.createdTimestamp;
         msg.edit(Embed.setDescription(`**:ping_pong: Hello ${message.author}! Your ping rate is: ${ping}ms**`));
        });
    }      
}
