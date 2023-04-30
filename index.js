
//Boilerplating stuff; dw about it
const { Client, ChannelType, Events, GatewayIntentBits, EmbedBuilder,  ActivityType, TextChannel, ThreadAutoArchiveDuration, MessageCollector } = require('discord.js');
const token = process.env['TOKEN']
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const prefix = '!';
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

function snakeToPascalCase(name) {
  const words = name.toLowerCase().split('_');
  const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
  return capitalizedWords.join(' ');
}

client.on(Events.MessageCreate, async msg => {
  if (msg.author.bot) return;
  
  const args = msg.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  if(command === "ching"){
    msg.reply("chong")
  }
  if(msg.content === "good bot"){
    msg.reply(":heart: :)")
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


  if(command === "bzmargin"){
    msg.delete()
    let topFew = args[2] || 5
    let afford = args[0] || 10000000
    let quant = args[1] || 1
    if(topFew > 10){
      topFew = 5
    }
    
    const url = 'https://bazaar.cc2.workers.dev/?summary=true';  
    async function fetchData() {
      try {
        const response = await axios.get(url);
        const content = response.data;
        const rows = content.split('\n');
        const data = rows.map(row => row.split(','));
        const topMargins = calculateMargins(data);
        console.log(topMargins);
        fs.writeFileSync('output.csv', topMargins.map(item => `${item.name},${item.buyPrice},${item.sellPrice},${item.margin}`).join('\n'));
            
        const bz = new EmbedBuilder()
                  .setTitle(`Bazaar Margins:`)
        for (let i = 0; i < topMargins.length; i++) {
                bz.addFields({name: ` ${i+1}) ${snakeToPascalCase(topMargins[i].name)}`, value: `Margin: ${topMargins[i].margin}\n Buy: ${topMargins[i].buyPrice}\n Sell: ${topMargins[i].sellPrice}`});
        }
        
        bz.setTimestamp()
        bz.setFooter({text: "Created by ethqnol#261 & suupre#0001"})
        msg.channel.send({embeds: [bz]})
        
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    }
    
    function calculateMargins(data) {
      const items = [];
      for (let i = 1; i < data.length; i++) {
        const item = {
          name: data[i][0],
          buyPrice: Number(data[i][5]),
          sellPrice: Number(data[i][1]),
          sellVolume: Number(data[i][2]),
          sellMovingWeek: Number(data[i][3]),
          backlog: Number(data[i][2])/(Number(data[i][3])/7) // sellVolume / (sellMovingWeek / 7.0)
        };
        if (!isNaN(item.buyPrice) && !isNaN(item.sellPrice) && item.sellPrice < (afford / quant) && item.buyPrice - item.sellPrice < item.buyPrice * 0.3 && item.backlog < 3){
          item.margin = item.buyPrice - item.sellPrice;
          items.push(item);
        }
      }
      items.sort((a, b) => b.margin - a.margin);
      if(items.length < topFew){
        topFew = items.length
      }
      const topMargins = items.slice(0, topFew).map(item => ({
        name: item.name,
        buyPrice: item.buyPrice.toLocaleString(),
        sellPrice: item.sellPrice.toLocaleString(),
        margin: item.margin.toLocaleString()
      }));
      return topMargins;
    }
    fetchData()



    
  }




  

});


client.login(token)