const Discord = require('discord.js');
const Embed = new Discord.MessageEmbed().setColor('#000000').setFooter('OugiBot', 'https://i.imgur.com/xfahmFj.png').setTimestamp();
module.exports = {
	commands: 'dice',
    minArgs: 0,
    maxArgs: 0,
    callback: (message, arguments, text) => {
        let result = Math.floor(Math.random() * Math.floor(6));
        message.channel.send(Embed.setDescription(`**:game_die: You landed on ${result}**`));
	},
};