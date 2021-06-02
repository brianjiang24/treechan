const Discord = require('discord.js');
const Levels = require('discord-xp');
const client = new Discord.Client();
client.login(process.env.TOKEN);
const Embed = new Discord.MessageEmbed().setColor('#69f385').setFooter('TreeChan', 'https://i.imgur.com/l7NjjAC.png').setTimestamp();

module.exports = {
    commands: 'leaderboard',
    minArgs: 0,
    maxArgs: 0,
    callback: async (message, arguments, text) => {
        const rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, 10); 

        if (rawLeaderboard.length < 1) return reply(Embed.setDescription(`**Nobody is in the leaderboard yet.`));
        
        const leaderboard = await Levels.computeLeaderboard(client, rawLeaderboard, true); 

        const lb = leaderboard.map(e => `${e.position}. ${e.username}#${e.discriminator}\nLevel: ${e.level}\nXP: ${e.xp.toLocaleString()}`);

        message.channel.send(Embed.setDescription(`**Leaderboard**:\n\n${lb.join("\n\n")}`));
    }
}