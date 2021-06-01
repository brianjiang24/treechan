const Discord = require('discord.js');
const Levels = require('discord-xp');
const Embed = new Discord.MessageEmbed().setColor('#69f385').setFooter('TreeChan', '/icon.png').setTimestamp();

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
                const user = await Levels.fetch(target.id, message.guild.id); // Selects the target from the database.
                
                if (!user) return message.channel.send("Seems like this user has not earned any xp so far."); // If there isnt such user in the database, we send a message in general.
                
                message.channel.send(`> **${target.tag}** is currently level ${user.level}.`); // We show the level.
            }
        }  
    }
}