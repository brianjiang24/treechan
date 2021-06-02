const Discord = require('discord.js');
const {client} = require('../command-base');
const Levels = require('discord-xp');
const Embed = new Discord.MessageEmbed().setColor('#69f385').setFooter('TreeChan', 'https://i.imgur.com/l7NjjAC.png').setTimestamp();

module.exports = {
    commands: 'leaderboard',
    minArgs: 0,
    maxArgs: 0,
    callback: async (message, arguments, text) => {
        const rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, 10); // We grab top 10 users with most xp in the current server.

        if (rawLeaderboard.length < 1) return reply("Nobody's in leaderboard yet.");
        
        const leaderboard = await Levels.computeLeaderboard(client, rawLeaderboard, true); // We process the leaderboard.

        const lb = leaderboard.map(e => `${e.position}. ${e.username}#${e.discriminator}\nLevel: ${e.level}\nXP: ${e.xp.toLocaleString()}`); // We map the outputs.

        message.channel.send(`**Leaderboard**:\n\n${lb.join("\n\n")}`);
    }
}