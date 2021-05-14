const Discord = require('discord.js');
const Embed = new Discord.MessageEmbed().setColor('#000000').setDescription(`**:coin: Your coin landed on tails!**`).setTimestamp();
module.exports = {
	commands: 'coinflip',
    minArgs: 0,
    maxArgs: 0,
    callback: (message, arguments, text) => {
        let result = Math.floor(Math.random() * Math.floor(2));
        if (result == 1){
            message.channel.send(Embed.setDescription(`**:coin: Your coin landed on heads!**`));
        } else {
            message.channel.send(Embed.setDescription(`**:coin: Your coin landed on tails!**`));
        }
	},
};