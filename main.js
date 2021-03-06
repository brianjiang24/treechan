const path = require('path');
const fs = require('fs');
const Discord = require('discord.js');
const mongoose = require('mongoose'); 
const Levels = require('discord-xp');
const Action = require('./models/actions');
// const { prefix, token, passcode} = require('./config.json');

//Connect to MongoDB
const db = `mongodb+srv://admin:${process.env.PASSCODE}@cluster0.823cd.mongodb.net/discord?retryWrites=true&w=majority`;
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
.then((result) => console.log('Successfully connected to MongoDB'))
.catch((err) => console.log(err)); 
Levels.setURL(`${db}`);
 

const client = new Discord.Client();
const Embed = new Discord.MessageEmbed().setColor('#69f385').setFooter('TreeChan', 'https://i.imgur.com/l7NjjAC.png')
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.on('ready', async () => {
  console.log('The client is ready!')

  client.user.setPresence({
    status: 'online',
    activity: {
     type: 'PLAYING',
     name: 'Always watching over you 👀',
    },
   });

  const baseFile = 'command-base.js'
  const commandBase = require(`./commands/${baseFile}`)

  const readCommands = (dir) => {
    const files = fs.readdirSync(path.join(__dirname, dir))
    for (const file of files) {
      const stat = fs.lstatSync(path.join(__dirname, dir, file))
      if (stat.isDirectory()) {
        readCommands(path.join(dir, file))
      } else if (file !== baseFile) {
        const option = require(path.join(__dirname, dir, file))
        commandBase(client, option)
      }
    }
  }
  readCommands('commands')
})

client.on('guildMemberAdd', async member => { 
  const newrole = member.guild.roles.cache.find(role => role.name === 'Visitors'); 
  member.roles.add(newrole); 
  const channel = member.guild.channels.cache.find(channel => channel.id === '768131737698959362');
  if (!channel) return;
    channel.send(Embed
      .setTitle(`Welcome to ${member.guild.name}!`)
      .setDescription(`Hello! Please make sure to read the rules and guidelines of our server. When you are ready, please type +apply into the text box to answer some basic questions about you and we will get you set up right away!`)
      .setTimestamp()
    );
});

client.on("message", async (message) => {
  if (!message.guild) return;
  if (message.author.bot) return;
  
  const randomAmountOfXp = Math.floor(Math.random() * 29) + 1; // Min 1, Max 30
  const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomAmountOfXp);
  if (hasLeveledUp) {
    const user = await Levels.fetch(message.author.id, message.guild.id);
    message.channel.send(Embed.setDescription(`${message.author}, Congratulations! You have leveled up to **${user.level}**. :tada:`).setTimestamp());
  }
});

client.login(process.env.TOKEN); 