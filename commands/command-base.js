const prefix = `${process.env.PREFIX}`
const Discord = require('discord.js');
const Embed = new Discord.MessageEmbed().setColor('#000000').setFooter('OugiBot', 'https://i.imgur.com/xfahmFj.png').setTimestamp();

const validatePermissions = (permissions) =>{
    const validPermissions = [
        'CREATE_INSTANT_INVITE',
        'KICK_MEMBERS',
        'BAN_MEMBERS',
        'ADMINISTRATOR',
        'MANAGE_CHANNELS',
        'MANAGE_GUILD',
        'ADD_REACTIONS',
        'VIEW_AUDIT_LOG',
        'PRIORITY_SPEAKER',
        'STREAM',
        'VIEW_CHANNEL',
        'SEND_MESSAGES',
        'SEND_TTS_MESSAGES',
        'MANAGE_MESSAGES',
        'EMBED_LINKS',
        'ATTACH_FILES',
        'READ_MESSAGE_HISTORY',
        'MENTION_EVERYONE',
        'USE_EXTERNAL_EMOJIS',
        'VIEW_GUILD_INSIGHTS',
        'CONNECT',
        'SPEAK',
        'MUTE_MEMBERS',
        'DEAFEN_MEMBERS',
        'MOVE_MEMBERS',
        'USE_VAD',
        'CHANGE_NICKNAME',
        'MANAGE_NICKNAMES',
        'MANAGE_ROLES',
        'MANAGE_WEBHOOKS',
        'MANAGE_EMOJIS',
    ]
    for (const permission of permissions){
        if(!validPermissions.includes(permission)){
            throw new Error(`Unknown permission node "${permission}"`)
        }
    }
}

module.exports = (client, commandOptions) => {
    let {
        commands,
        expectedArgs = '',
        minArgs = 0,
        maxArgs = null,
        permissions = [],
        requiredRoles = [],
        callback,
    } = commandOptions 

    if(typeof commands === 'string'){
        commands = [commands]
    }

    if(permissions.length){
        if(typeof permissions === 'string'){
            permissions = [permissions]
        }
        validatePermissions(permissions);
    }

    client.on('message', (message) => {
        const { member, content, guild } = message
    
        for (const alias of commands) {
          const command = `${prefix}${alias.toLowerCase()}`
          
          if (content.toLowerCase().startsWith(`${command} `) || content.toLowerCase() === command) {
              for (const permission of permissions) {
                  if(!message.guild) return;
                  if (!member.hasPermission(permission)) {
                      message.channel.send(Embed.setDescription('You do not have permission to use this command.'));
                      return
                    }
                }
                for (const requiredRole of requiredRoles) {
                    const role = guild.roles.cache.find((role) => role.name === requiredRole);
                    if (!role || !member.roles.cache.has(role.id)) {
                        message.channel.send(Embed.setDescription(`You must have the "${requiredRole}" role to use this command.`));
                        return
                    }
                }
                const arguments = content.split(/[ ]+/);
                
                arguments.shift();
                
                if (arguments.length < minArgs || (maxArgs !== null && arguments.length > maxArgs)) {
                    message.channel.send(Embed.setDescription(`Incorrect syntax! Use ${prefix}${alias} ${expectedArgs}`));
                    return
                }
                callback(message, arguments, arguments.join(' '), client);
                return
            }
        }
    })
}


