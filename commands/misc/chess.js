const Discord = require('discord.js');
const { Chess } = require('chess.js'); //Credits to Jeff Hlywa and 15 contributers of chess.js library. 
const chess = new Chess();
const Embed2 = new Discord.MessageEmbed().setColor('#69f385').setFooter('TreeChan', 'https://i.imgur.com/l7NjjAC.png').setTimestamp();

module.exports = {
    commands: 'chess',
    expectedArgs: 'help or <@member>',
    minArgs: 1,
    maxArgs: 1,
    callback: async (message, arguments, text) => { 
        const user = message.mentions.users.first();

        if (arguments[0] === 'help'){
            const Embed1 = new Discord.MessageEmbed();

            message.channel.send(Embed1
                .setColor('#69f385')
                .setAuthor(`TreeChan Chess Manual ♟️`)
                .setDescription(`Welcome to the TreeChan Chess Manual! Here you will find help on executing the commands necessary to have a successful game of chess with friends! OugiBot relies on standard algebraic notation (AN) from its users and then generate and display an image of the updated chessboard. Description of how to use AN is listed below.`)
                .addFields(
                    { name: 'Command Examples:', value: `
                    __+move e1__ (moves the pawn to e1 square)
                    __+move Nc3__ (moves the knight to the c3 square)
                    __+move exd6__ (ex denotes a pawn capture on d6 square)
                    __+move Qxd4__ (moves the queen to capture a piece on d4)`},
                    { name: 'Chess Initials', value: `
                    **K:** King 
                    **Q:** Queen 
                    **R:** Rook 
                    **B:** Bishop 
                    **N:** Knight`, inline: true },
                    { name: 'Capturing', value: `
                    If you are capturing with a pawn, denote it with ex-. 
                    Otherwise denote it with initials + x + capture square`, inline: true },
                    { name: 'Castling', value: `**0-0** for Kingside castling 
                    **0-0-0** for Queenside castling`, inline: true },
                )
                .setFooter('TreeChan', 'https://i.imgur.com/l7NjjAC.png')
                .setTimestamp());

        } else if (user) {
            
            const member = message.guild.member(user);
            
            if (arguments[0] = member) {

                let msg = await message.channel.send(Embed2.setDescription(`${user}, ${message.author} has challenged you to a chess match. Do you accept?`));

                await msg.react("👍");
                await msg.react("👎");

                const filter = (reaction, user) => {
                    return ['👍', '👎'].includes(reaction.emoji.name) && user.id === member.id;
                };

                msg.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
                .then(collected => {
                    const reaction = collected.first();
            
                    if (reaction.emoji.name === '👍' ) {

                        const startboard = chess.fen().replace(/ /g, "%20"); 
                        message.channel.send(Embed2.setDescription(`Success!, ${message.author} You have started a chess match against ${user}`));
                            message.channel.send(`https://chessboardimage.com/${startboard}.png`);
                            
                            const originalSender = message.author.id;
                            const filter = message => message.author.id === originalSender;
                            const time = 15000;
                            const collector = message.channel.createMessageCollector(filter, { time });
                            
                            collector.on('collect', message => {
                                if(message.content === '+move'){ 
                                    client.commands.get('move').callback(message, arguments, text);
                                }
                            });
                    } else {
                        message.channel.send(Embed2.setDescription(`${message.author}, ${user} has declined your match request.`));
                    }
                })
                .catch(collected => {
                    message.channel.send(Embed2.setDescription(`Times Up!, Please react sooner next time.`));
                });
            } 
        } else {
            message.channel.send(Embed2.setDescription(`Not a valid command. Please use +chess help for additional information.`));
        }
    }
}