const Discord = require('discord.js');
const { Chess } = require('chess.js');
const chess = new Chess();
module.exports = {
    commands: 'move',
    expectedArgs: '<notation>',
    minArgs: 1,
    maxArgs: 1,
    callback: (message, arguments, text) => { 
        chess.move(arguments[0]);
        const fen = chess.fen().replace(/ /g, "%20");
        message.channel.send(`https://chessboardimage.com/${fen}.png`);
    }
}