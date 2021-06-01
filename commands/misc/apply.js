const Discord = require('discord.js');
const Embed = new Discord.MessageEmbed();
module.exports = {
    commands: 'apply',
    minArgs: 0,
    maxArgs: 0,
	callback: async (message, arguments, text) => {    
        //If a user types +apply in a certain channel => Load questions
      
        let msg = await message.channel.send(Embed
            .setColor('#69f385')
            .setTitle(':page_with_curl: Question 1')
            .setDescription(`**Do you agree to the rules and guidelines of ${message.guild.name}?**`)
            .setFooter('TreeChan', '/icon.png')
            .setTimestamp());
            await msg.react('👍');
            await msg.react('👎');

            const filter = (reaction, user) => {
                return ['👍', '👎'].includes(reaction.emoji.name) && user.id === message.author.id;
            };
            
            msg.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
                .then(collected => {
                    const reaction = collected.first();
            
                    if (reaction.emoji.name === '👍') {
                        message.reply('you reacted with a thumbs up.');
                    } else {
                        message.reply('you reacted with a thumbs down.');
                    }
                })
                .catch(collected => {
                    message.reply('you reacted with neither a thumbs up, nor a thumbs down.');
                });
                
    }
}