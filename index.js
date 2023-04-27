
//Boilerplating stuff; dw about it
const { Client, ChannelType, Events, GatewayIntentBits, EmbedBuilder,  ActivityType, TextChannel, ThreadAutoArchiveDuration, MessageCollector } = require('discord.js');
const token = process.env['TOKEN']
const fs = require('fs');
const path = require('path');
const prefix = '!';
console.log(GatewayIntentBits)
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
	],
});
const express = require('express');
// WEBSITE SET UP
// To Cheese Hosting
const app = express()
const port = 3000;
app.get('/', (req, res) => res.send('Hello World!'));
app.listen(port, () => console.log(`Keep Alicce listening at http://localhost:${port}`))
//status
let status = [{
    name: ' totallyamqzing\'s YT Channel',
    type: ActivityType.Streaming,
    url: 'https://www.youtube.com/watch?v=tOxUd-jhORo',
    },
             
    {
    name: ' suupre\'s YT Channel',
    type: ActivityType.Streaming,
    url: 'https://www.youtube.com/watch?v=3c7qSHxi7Nw',
}];


client.on('ready', (c) => { //right but urs wont be displayed we can make it rotate
  console.log(`${c.user.tag} is online.`);
  
  const updateDelay = 5; // in seconds
  let currentIndex = 0;

  setInterval(() => {
    const activity = status[currentIndex];
    client.user.setActivity(activity);

    // update currentIndex
    // if it's the last one, get back to 0
    currentIndex = currentIndex >= status.length - 1 
      ? 0
      : currentIndex + 1;
  }, updateDelay * 1000);

});

client.on(Events.MessageCreate, async msg => {
  if (msg.author.bot) return;
  
  const args = msg.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  if(command === "ping"){
    msg.reply("pong")
  }
  if(msg.content === "good bot"){
    msg.reply(":heart: :)")
  }

  if(msg.content === "thanks ethan"){
    msg.reply("this is pretty epic")
  }
  
  if(command === "carry"){
    try{
      if(msg.channel.id != "1100787561787576332"){
        msg.delete()
        return;
      }
      msg.delete();
      user = msg
        .member.user.tag;
      let channel = client.channels.cache.get("1100787561787576332")

      
      if(args[0] == "slayer"){
        
        const slayerThread = await channel.threads
          .create({
             name: 'carry-slayer-' + msg.author.username,
             autoArchiveDuration: ThreadAutoArchiveDuration.OneHour,
             type: ChannelType.PublicThread,
           })
          .catch(console.error);
        const embedSlayer = new EmbedBuilder()
              .setTitle(`Parameters`)
              .setDescription("Archived in an hour of inactivity")
              .addFields({ name: '1. ', value: "Completions & low levels are FREE" })
              .addFields({ name: '2. ', value: "Higher levels are paid; Price can be negotiated" })
              .addFields({ name: '3. ', value: "Blaze Slayer & VoidGloom t4 are not sold" })
              .setTimestamp()
              .setFooter({text: "Created by ethqnol#261 & suupre#0001"})
        slayerThread.send({embeds : [embedSlayer]})
        
      } else if (args[0] == "doogans"){
        
        const doogansThread = await channel.threads
          .create({
             name: 'carry-doogan-' + msg.author.username,
             autoArchiveDuration: ThreadAutoArchiveDuration.OneHour,
             type: ChannelType.PublicThread,
           })
          .catch(console.error);
        const embedDoogans = new EmbedBuilder()
              .setTitle(`Parameters`)
              .setDescription("Archived in an hour of inactivity")
              .addFields({ name: '1. ', value: "Completions are Free! (Please don't mess up S+ though)" })
              .addFields({ name: '2. ', value: "Catacombs Level or repeated completions are paid." })
              .addFields({ name: '3. ', value: "Not Carrying Mastermode; teaching secrets is free." })
              .setTimestamp()
              .setFooter({text: "Created by ethqnol#261 & suupre#0001"})
        doogansThread.send({embeds : [embedDoogans]})
        
      } else if (args[0] == "other"){
          const otherThread = await channel.threads
          .create({
             name: 'carry-other-' + msg.author.username,
             autoArchiveDuration: ThreadAutoArchiveDuration.OneHour,
             type: ChannelType.PublicThread,
           })
          .catch(console.error);
        const otherEmbed = new EmbedBuilder()
              .setTitle(`Parameters`)
              .setDescription("Archived in an hour of inactivity")
              .addFields({ name: '1. ', value: "Negotiate Pricing" })
              .addFields({ name: '2. ', value: "No Carrying Blaze Slayer, MM, or Voidgloom t4" })
              .setTimestamp()
              .setFooter({text: "Created by ethqnol#261 & suupre#0001"})
        otherThread.send({embeds : [otherEmbed]})
      }
    } catch (error) {
      console.log(error)
    }
  }

  if(command === "bothelp"){
    msg.delete();
    const helpembed = new EmbedBuilder()
              .setTitle(`Help :D`)
              .setDescription("Help for KFCartel Bot")
              .addFields({ name: '1. !carry', value: "only useable in #carries; args: [doogans, slayer, other]" })
              .addFields({ name: '2. good bot', value: "tells the bot that it is a good bot" })
              .addFields({ name: '3. !bothelp', value: "This command" })
              .addFields({ name: '4. !ping', value: "used to determine if bot is down" })
              .setTimestamp()
              .setFooter({text: "Created by ethqnol#261 & suupre#0001"})
    msg.channel.send({embeds: [helpembed]})
  }

});


client.login(token)