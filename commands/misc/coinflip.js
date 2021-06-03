const Discord = require('discord.js');
const Embed = new Discord.MessageEmbed().setColor('#69f385').setFooter('TreeChan', 'https://i.imgur.com/l7NjjAC.png');
module.exports = {
	commands: 'coinflip',
    minArgs: 0,
    maxArgs: 0,
    callback: (message, arguments, text) => {
        let result = Math.floor(Math.random() * Math.floor(2));
        if (result == 1){
            message.channel.send(Embed.setDescription(`:coin: Your coin landed on heads!`).setTimestamp());
        } else {
            message.channel.send(Embed.setDescription(`:coin: Your coin landed on tails!`).setTimestamp());
        }
	},
};