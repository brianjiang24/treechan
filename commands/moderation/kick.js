const Discord = require('discord.js');
const Action = require('../../models/actions');
const Embed = new Discord.MessageEmbed().setColor('#69f385').setFooter('TreeChan', 'https://imgur.com/a/SBB1zdl').setTimestamp();

module.exports = {
    commands: 'kick',
    expectedArgs: '<@member> <reason>',
    minArgs: 1,
    maxArgs: null,
    permissions: 'KICK_MEMBERS',
    callback: (message, arguments, text) => {
        
        const user = message.mentions.users.first();
        if (user) {
            const member = message.guild.member(user);
            if (arguments[0] = member) {
                member.kick().then(async() => {
                    message.channel.send(Embed.setDescription(`Successfully kicked ${user}`));

                    if(arguments[1] === undefined) reason = '-'; else reason = arguments.slice(1).join(' ');

                    await new Action({
                        action: 'Kick',
                        member: user,
                        mod: message.author,
                        reason,
                        current: true
                    }).save();

                    const info = await Action.find({action: 'Kick', member: user, mod: message.author, reason, current: true}).limit(1).sort({$natural:-1});
                    
                    message.channel.send(new Discord.MessageEmbed()
                        .setColor('#000000')
                        .setTitle(`:boot: Kicked: ${info[0].member}`)
                        .addFields(
                            { name: 'Member:', value: `${info[0].member}`, inline: true },
                            { name: 'Staff:', value: `${info[0].mod}`, inline: true },
                            { name: 'Reason:', value: `${info[0].reason}`, inline: true },
                        )
                        .setFooter(`ID: ${info[0]._id}`,'https://imgur.com/a/SBB1zdl')
                        .setTimestamp()
                    );  
                  })
                  .catch(err => {
                    message.channel.send(Embed.setDescription(`Unable to kicked the user.`));
                    console.error(err);
                });
            } else {
                message.channel.send(Embed.setDescription(`User is not found anywhere on the server. Please try again.`));
            }
        } 
    }
}