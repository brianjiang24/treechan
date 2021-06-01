const Discord = require('discord.js');
const Levels = require('discord-xp');
const Embed = new Discord.MessageEmbed().setColor('#69f385').setFooter('TreeChan', 'https://imgur.com/a/SBB1zdl').setTimestamp();

module.exports = {
    commands: 'rank',
    expectedArgs: '<@member>',
    minArgs: 1,
    maxArgs: 1,
    callback: async (message, arguments, text) => {

        const target = message.mentions.users.first();
        if (target) {
            const member = message.guild.member(target);
            if (arguments[0] = member) {
                const user = await Levels.fetch(target.id, message.guild.id); 
                
                if (!user) return message.channel.send(Embed.setDescription(`**Seems like this user has not earned any xp so far.**`)); 
                
                message.channel.send(Embed.setDescription(`**:trophy: ${target.tag} is currently level ${user.level}.**`)); 
            }
        }  
    }
}