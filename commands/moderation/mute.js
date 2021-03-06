const Discord = require('discord.js');
const Action = require('../../models/actions');
const Log = require('../../models/logchan');
const Embed = new Discord.MessageEmbed().setColor('#69f385').setFooter('TreeChan', 'https://i.imgur.com/l7NjjAC.png');

module.exports = {
    commands: 'mute', 
    expectedArgs: '<@member> <#> <reason>',
    minArgs: 1,
    maxArgs: null,
    permissions: 'MANAGE_MESSAGES',
    callback: async (message, arguments, text) => {
        const member = message.mentions.members.first() || message.guild.members.cache.get(arguments[0]);
        if(!member) return message.channel.send(Embed.setDescription('Member is not found.').setTimestamp());
        const role = message.guild.roles.cache.find(role => role.name === 'Muted');
        if(!role) {
            try {
                message.channel.send(Embed.setDescription('Creating muted role...').setTimestamp());

                let muterole = await message.guild.roles.create({
                    data: {
                        name: 'Muted',
                        permissions: []
                    }
                });
                message.guild.channels.cache.filter(channel => channel.type === 'text').forEach(async (channel, id) => {
                    await channel.createOverwrite(muterole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false,
                    })
                });
                message.channel.edit(Embed.setDescription('Muted role creation successful.'));
            } catch (error) {
                console.log(error);
            }
        };
        const user = message.mentions.users.first();
    
        if(member.roles.cache.has(role.id)) return message.channel.send(Embed.setDescription(`${user} has already been muted.`)); //need to fix

        const time = arguments[1];

        if(!time || !isFinite(time)){ 
            await member.roles.add(role);
            message.channel.send(Embed.setDescription(`${user} is now muted permanently.`).setTimestamp());

            if(arguments[1] === undefined) reason = '-'; else reason = args.slice(1).join(' ');

            await new Action({
                action: 'Mute',
                member: user,
                memberid: user.id,
                mod: message.author,
                reason,
                current: true
            }).save();

            const info = await Action.find({action: 'Mute', member: user, mod: message.author, reason, current: true}).limit(1).sort({$natural:-1});
            const loginfo = await Log.find({server: message.guild.id}).limit(1).sort({$natural:-1});

            let logid = message.guild.channels.cache.find(channel => channel.id === `${loginfo[0].logchan}`);

            //console.log(info[0].action);

            logid.send(new Discord.MessageEmbed()
                .setColor('#69f385')
                .setTitle(`:mute: Muted: ${info[0].member}`)
                .addFields(
                    { name: 'Member:', value: `${info[0].member}`, inline: true },
                    { name: 'Staff:', value: `${info[0].mod}`, inline: true },
                    { name: 'Reason:', value: `${info[0].reason}`, inline: true },
                )
                .setFooter(`ID: ${info[0]._id}`,'https://i.imgur.com/l7NjjAC.png')
                .setTimestamp()
            );
            
        } else { 
            await member.roles.add(role);
            message.channel.send(Embed.setDescription(`${user} is now muted for ${time} min(s)`).setTimestamp());
            setTimeout(function(){member.roles.remove(role);}, (arguments[1] * 60000));

            let reason = arguments.slice(2).join(' ');

            const expires = new Date();
            expires.setSeconds(expires.getSeconds() + arguments[1] * 60);

            await new Action({
                action: 'Temp Mute',
                member: user,
                mod: message.author,
                reason,
                expires,
                current: true
            }).save();

            const info = await Action.find({action: 'Temp Mute', member: user, mod: message.author, reason, expires, current: true}).limit(1).sort({$natural:-1});
            const loginfo = await Log.find({server: message.guild.id}).limit(1).sort({$natural:-1});

            let logid = message.guild.channels.cache.find(channel => channel.id === `${loginfo[0].logchan}`);

            logid.send(new Discord.MessageEmbed()
                .setColor('#69f385')
                .setTitle(`:mute: Temp Muted: ${info[0].member}`)
                .addFields(
                    { name: 'Member:', value: `${info[0].member}`, inline: true },
                    { name: 'Staff:', value: `${info[0].mod}`, inline: true },
                    { name: 'Reason:', value: `${info[0].reason}`, inline: true },
                    { name: 'Duration:', value: `${time} min(s)`, inline: true },
                )
                .setFooter(`ID: ${info[0]._id}`,'https://i.imgur.com/l7NjjAC.png')
                .setTimestamp()
            );
        }
    }
}