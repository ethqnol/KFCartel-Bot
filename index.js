
//Boilerplating stuff; dw about it

const { Client, ChannelType, Events, GatewayIntentBits, EmbedBuilder,  ActivityType, TextChannel, ThreadAutoArchiveDuration, MessageCollector } = require('discord.js');
const csv = require('csv-parser')
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

  
  if(msg.content === "good bot"){
    msg.reply(":heart: :)")
  }
  
  if(msg.content === "ping duckii"){
    msg.delete()
    let arrOfPing = JSON.parse(fs.readFileSync('pingduckii.json'))
    arrOfPing.push(msg.member.user.tag)
    fs.writeFileSync('pingduckii.json', JSON.stringify(arrOfPing, null, 2));
    msg.channel.send("<@728668170084155425>")
  }

  if(msg.content.toLowerCase() === "fuck you"){
    msg.delete()
  }
  
  if (msg.author.bot || !msg.content.startsWith(prefix)) return;
  
  const args = msg.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  if(command === "ching"){
    msg.reply("chong")
  }

  if(command === "recentpinger"){
    let data = JSON.parse(fs.readFileSync('pingduckii.json'))
    msg.reply(`@${data[data.length-1]}`)
  }
  
  if(command === "carry"){
    try{
      if(msg.channel.id != "1100495236012191894"){
        msg.delete()
        return;
      }
      msg.delete();
      user = msg.member.user.tag;
      let channel = client.channels.cache.get("1100495236012191894")
      let slayer = "1102278836147736656"
      let doogans = "1102278957010792559"
      let all = "1102279005475983520"
      
      if(args[0] == "slayer"){
        let flagSl = false
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
        slayerThread.send(`<@&${slayer}> <@&${all}>`);
        while(flagSl != true){
            const collected = await slayerThread.awaitMessages({ max:1, time: 0 });
            let collectedContent = collected.first().content
            if(collected.first().content === "!cancel"){
              slayerThread.delete();
              flagSl = true;
              break
            }
          }
        
      } else if (args[0] == "doogans"){
        let flagDo = false
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
        doogansThread.send(`<@&${doogans}> <@&${all}>`);
        while(flagDo != true){
            const collected = await doogansThread.awaitMessages({ max:1, time: 0 });
            let collectedContent = collected.first().content
            if(collected.first().content === "!cancel"){
              doogansThread.delete();
              flagDo = true;
              break
            }
          }
        
      } else if (args[0] == "other"){
        let flagOther = false
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
        otherThread.send("<@&" + all + ">");
        while(flagOther != true){
            const collected = await otherThread.awaitMessages({ max:1, time: 0 });
            let collectedContent = collected.first().content

            if(collected.first().content === "!cancel"){
              otherThread.delete();
              flagOther = true;
              break
            }
          }
        
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
              .addFields({ name: '5. !bzmargin', value: "!bzmargin [amount to spend] [quantity] [length of list]" })
              .setTimestamp()
              .setFooter({text: "Created by ethqnol#2613 & suupre#0001"})
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

    if(afford.toString().slice(-1) == "k"){
      afford = Number(''.concat(afford.toString().substring(0, afford.length -1), "000"))

    }else if(afford.toString().slice(-1) == "m"){
      afford = Number(''.concat(afford.toString().substring(0, afford.length -1), "000000"))
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
        bz.setFooter({text: "Created by ethqnol#2613 & suupre#0001"})
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
        if (!isNaN(item.buyPrice) && !isNaN(item.sellPrice) && item.sellPrice < (afford / quant) && item.buyPrice - item.sellPrice < item.buyPrice * 0.5 && item.backlog < 3){
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
  if(command === "updatecrafting"){
    const url = 'https://raw.githubusercontent.com/kr45732/skyblock-plus-data/main/InternalNameMappings.json';  
    function parseSlot(slotValue) {
      let itemData = {
        element: "empty",
        amount: 0
      };
    
      if (slotValue && slotValue.trim() !== "") {
        let parts = slotValue.split(":");
        itemData.element = parts[0].toString();
        itemData.amount = parseInt(parts[1]) || 0;
      }
    
    
      return itemData;
    }
    async function acquireRecipe(){
  
      axios.get(url)
        .then(async response => {
          const jsonObject = response.data;
          let recipeArray = [];
    
          for (let itemId in jsonObject) {
            if (Object.prototype.hasOwnProperty.call(jsonObject, itemId)) {
              let item = jsonObject[itemId];
              if (item.recipe && !item.npc_buy && !(itemId.includes("GENERATOR"))){
                let recipe = item.recipe;
                let recipeObj = {
                  id: itemId,
                  name: item.name,
                  slots: {
                    A1: {element: parseSlot(recipe.A1).element , amount: parseSlot(recipe.A1).amount},
                    A2: {element: parseSlot(recipe.A2).element , amount: parseSlot(recipe.A2).amount},
                    A3: {element: parseSlot(recipe.A3).element , amount: parseSlot(recipe.A3).amount},
                    B1: {element: parseSlot(recipe.B1).element , amount: parseSlot(recipe.B1).amount},
                    B2: {element: parseSlot(recipe.B2).element , amount: parseSlot(recipe.B2).amount},
                    B3: {element: parseSlot(recipe.B3).element , amount: parseSlot(recipe.B3).amount},
                    C1: {element: parseSlot(recipe.C1).element , amount: parseSlot(recipe.C1).amount},
                    C2: {element: parseSlot(recipe.C2).element , amount: parseSlot(recipe.C2).amount},
                    C3: {element: parseSlot(recipe.C3).element , amount: parseSlot(recipe.C3).amount}
                  }
                };
              recipeArray.push(recipeObj);
              //console.log(recipeObj.slots)
              }
            }
          }
          fs.writeFileSync('data.json', JSON.stringify(recipeArray, null, 2));
          //console.log(recipeArray); // This will output the recipe array to the console
        })
        .catch(error => {
          console.log(error);
        });
    }
    acquireRecipe()
    msg.reply("Recipes Updated")
  }
  if(command === "getrecipe"){
    let itemName = args.join(" ")

    const craftList = JSON.parse(fs.readFileSync('data.json'));
    let recipe = [];
    for (let itemId in craftList) {
      if (Object.prototype.hasOwnProperty.call(craftList, itemId)) {
        
        let item = craftList[itemId];
        if (item.name.toLowerCase() == itemName.toLowerCase()) {
          if (item.slots) {
            recipe.push(item.slots);
          } else {
            return `${itemName} does not have a recipe.`;
          }
        }
      }
    }
    if (recipe.length === 0) {
      msg.reply(`Could not find ${itemName}.`);
    } else {
      recipe = recipe[0]
      const recipeEm = new EmbedBuilder()
              .setTitle(`Recipe`)
              .setDescription("Provides Recipes :D")
              .addFields({ name: 'Slot 1', value: `${snakeToPascalCase(recipe.A1.element)} x${recipe.A1.amount}`, inline: true },
                        { name: 'Slot 2', value: `${snakeToPascalCase(recipe.A2.element)} x${recipe.A2.amount}`, inline: true },
                        { name: 'Slot 3', value: `${snakeToPascalCase(recipe.A3.element)} x${recipe.A3.amount}`, inline: true})
              .addFields({ name: 'Slot 4', value: `${snakeToPascalCase(recipe.B1.element)} x${recipe.B1.amount}`, inline: true },
                        { name: 'Slot 5', value: `${snakeToPascalCase(recipe.B2.element)} x${recipe.B2.amount}`, inline: true },
                        { name: 'Slot 6', value: `${snakeToPascalCase(recipe.B3.element)} x${recipe.B3.amount}`, inline: true})
              .addFields({ name: 'Slot 7', value: `${snakeToPascalCase(recipe.C1.element)} x${recipe.C1.amount}`, inline: true },
                        { name: 'Slot 8', value: `${snakeToPascalCase(recipe.C2.element)} x${recipe.C2.amount}`, inline: true },
                        { name: 'Slot 9', value: `${snakeToPascalCase(recipe.C3.element)} x${recipe.C3.amount}`, inline: true})
              .setTimestamp()
              .setFooter({text: "Created by ethqnol#261 & suupre#0001"})
    msg.channel.send({embeds: [recipeEm]})
    }

  }
  if(command === "poll"){
  msg.delete()
  const pollQuestion = args.join(" ")
  
  const pollsembed = new EmbedBuilder()
              .setColor('#0099ff')
              .setTitle(`_New Poll By ${msg.member.user.tag}_`)
              .setDescription(" ")
              .addFields({name:" ", value: `**${pollQuestion}**`})

  msg.channel.send({ embeds: [pollsembed]})
    .then(sentEmbed => {
        sentEmbed.react("👍")
        sentEmbed.react("👎")})
  
  }
  if(command === "getminionprice"){
    try{
      let minion = args.join(" ") 
      const url = 'https://raw.githubusercontent.com/kr45732/skyblock-plus-data/main/InternalNameMappings.json';  
      const fs = require('fs');

      minion = minion.toLowerCase()
      let words = minion.split(" ");
      for (let i = 0; i < words.length; i++) {
          words[i] = words[i][0].toUpperCase() + words[i].substr(1);
      }
      words = words.join(" ");

      words = "".concat(words.substring(0, words.length - 1), words.slice(-1).toUpperCase())
      minion = words
      console.log(minion)
      
      async function acquireRecipe(){
        axios.get(url)
          .then(async response => {
            const jsonObject = response.data;
            let recipeArray = [];
      
            for (let itemId in jsonObject) {
              if (Object.prototype.hasOwnProperty.call(jsonObject, itemId)) {
                let item = jsonObject[itemId];
                if (item.recipe && !item.npc_buy && (itemId.includes("GENERATOR"))){
                  let recipe = item.recipe;
                  let recipeObj = {
                    id: itemId,
                    name: item.name,
                    slots: {
                      A1: {element: parseSlot(recipe.A1).element , amount: parseSlot(recipe.A1).amount},
                      A2: {element: parseSlot(recipe.A2).element , amount: parseSlot(recipe.A2).amount},
                      A3: {element: parseSlot(recipe.A3).element , amount: parseSlot(recipe.A3).amount},
                      B1: {element: parseSlot(recipe.B1).element , amount: parseSlot(recipe.B1).amount},
                      B2: {element: parseSlot(recipe.B2).element , amount: parseSlot(recipe.B2).amount},
                      B3: {element: parseSlot(recipe.B3).element , amount: parseSlot(recipe.B3).amount},
                      C1: {element: parseSlot(recipe.C1).element , amount: parseSlot(recipe.C1).amount},
                      C2: {element: parseSlot(recipe.C2).element , amount: parseSlot(recipe.C2).amount},
                      C3: {element: parseSlot(recipe.C3).element , amount: parseSlot(recipe.C3).amount}
                    }
                  };
                recipeArray.push(recipeObj);
      
                }
              }
            }
            fs.writeFileSync('minion.json', JSON.stringify(recipeArray, null, 2));
          })
          .catch(error => {
            console.log(error);
          });
      }
      
      function parseSlot(slotValue) {
        let itemData = {
          element: "empty",
          amount: 0
        };
      
        if (slotValue && slotValue.trim() !== "") {
          let parts = slotValue.split(":");
          itemData.element = parts[0].toString();
          itemData.amount = parseInt(parts[1]) || 0;
        }
      
      
        return itemData;
      }
      
      acquireRecipe()
      function returnRecipe(itemName){
        const craftList = JSON.parse(fs.readFileSync('minion.json'));
        let recipe = [];
        for (let itemId in craftList) {
          if (Object.prototype.hasOwnProperty.call(craftList, itemId)) {
            
            let item = craftList[itemId];
            if (item.name == itemName || item.id == itemName) {
              if (item.slots) {
                recipe.push(item.slots);
              } else {
                return `${itemName} does not have a recipe.`;
              }
            }
          }
        }
        if (recipe.length === 0) {
          return null;
        } else {
          return recipe[0];
        }
      }
      
      function calcSlots(recipe){
        let slotMats = []
        for(const [slot, value] of Object.entries(recipe)){
          if(slot != "B2"){
            slotMats.push({
              element: value.element,
              amount: value.amount
            })
          }
        }
        return slotMats;
      }
      
      function calcMinion(recipe){
        let mats = calcSlots(recipe)
        if(!(recipe.B2.element.includes("WOOD_AXE") || recipe.B2.element.includes("WOOD_PICKAXE") || recipe.B2.element.includes("WOOD_SWORD") || recipe.B2.element.includes("WOOD_HOE") || recipe.B2.element.includes("FISHING_ROD") || recipe.B2.element.includes("SNOW") ||recipe.B2.element.includes("FLOWER"))){
          mats = mats.concat(calcMinion(returnRecipe(recipe.B2.element)))
        }
        return mats
      }
        
      function collapseReqs(reqs){
        return reqs.reduce((a, c) => {
          const e = a[c.element] 
          if(!e){
            a[c.element] = c.amount
          } else {
            a[c.element] = e + c.amount
          }
          return a
        }, {})
      
      }
      
       async function calcMats(dict){
        let totalCost = 0;
      
        for(const [item, amount] of Object.entries(dict)){
          const unitCost = await getCost(item)
          totalCost += unitCost * amount
        }
        console.log(totalCost)
        return totalCost
      }
   
      
      const bzurl = 'https://bazaar.cc2.workers.dev/?summary=true';  
      async function getCost(itemName) {
        try {
          itemName = itemName.replaceAll("-", "_")
          const response = await axios.get(bzurl);
          const content = response.data;
          const rows = content.split('\n');
          const data = rows.map(row => row.split(','));
      
          for (let i = 1; i < data.length; i++) {
            const item = {
              name: data[i][0],
              buyPrice: Number(data[i][5]),
              sellPrice: Number(data[i][1]),
            };
            if (itemName == item.name){
              return item.buyPrice;
            }
          }
              
        } catch (error) {
          console.error('Failed to fetch data:', error);
        }
      }
  
      
      function getTotalMinionCost(minion){
        return calcMats(collapseReqs(calcMinion(returnRecipe(minion))))
      }
      getTotalMinionCost(minion)
        .then(cost => msg.channel.send({embeds: [new EmbedBuilder()
                                                  .setTitle(`Minion Cost Calculator`)
                                                  .setDescription("Uses recursion to calculate the rough price of a minion")
                                                  .addFields({ name: `${minion} cost:`, value: `_**${Math.floor(cost)} coins**_` })
                                                  .setTimestamp()
                                                  .setFooter({text: "Created by ethqnol#2613 & suupre#0001"})]}))
    }catch (error) {
      console.log(error)
      msg.reply("There was an error getting the minion. Please double check you minion name")
    }

  }

  if(command === "slayerbossdesc"){
    msg.delete()
    try{
      let results = []
      fs.createReadStream('slayer.csv')
        .pipe(csv())
        .on('data', (data) => {
          results.push(data);
        })
        .on('end', () => {
          try{
            let rev = results.filter((result) => result.name.startsWith("Rev"));
            let tara = results.filter((result) => result.name.startsWith("Taran"));
            let wolf = results.filter((result) => result.name.startsWith("Sven"));
            let eman = results.filter((result) => result.name.startsWith("Voidgloom"));
  
            let slayer = args[0] || "rev"
            let tier = args[1] || 1
      
            if(slayer === "rev"){
              const revEmb = new EmbedBuilder()
                .setTitle(`Rev ${tier} Description`)
                .addFields({name: `Boss:`, value: `${rev[tier - 1].name}`})
                .addFields({name: `Lore:`, value: `${rev[tier - 1].description}`})
                .addFields({name: `Health & Damage`, value: `${rev[tier - 1].specs}`})
                .setTimestamp()
                .setFooter({text: "Data acquired by Kilometers#7771"})
         
              msg.channel.send({embeds: [revEmb]})
            }else if(slayer === "tara"){
              const tarEmb = new EmbedBuilder()
                .setTitle(`Tara ${tier} Description`)
                .addFields({name: `Boss:`, value: `${tara[tier - 1].name}`})
                .addFields({name: `Lore:`, value: `${tara[tier - 1].description}`})
                .addFields({name: `Health & Damage`, value: `${tara[tier - 1].specs}`})
                .setTimestamp()
                .setFooter({text: "Data acquired by Kilometers#7771"})
              msg.channel.send({embeds: [tarEmb]})
            }else if(slayer === "wolf"){
              const wolfEmb = new EmbedBuilder()
                .setTitle(`wolf ${tier} Description`)
                .addFields({name: `Boss:`, value: `${wolf[tier - 1].name}`})
                .addFields({name: `Lore:`, value: `${wolf[tier - 1].description}`})
                .addFields({name: `Health & Damage`, value: `${wolf[tier - 1].specs}`})
                .setTimestamp()
                .setFooter({text: "Data acquired by Kilometers#7771"})
              msg.channel.send({embeds: [wolfEmb]})
            }else if(slayer === "eman"){
              const vEmb = new EmbedBuilder()
                .setTitle(`Eman ${tier} Description`)
                .addFields({name: `Boss:`, value: `${eman[tier - 1].name}`})
                .addFields({name: `Lore:`, value: `${eman[tier - 1].description}`})
                .addFields({name: `Health & Damage`, value: `${eman[tier - 1].specs}`})
                .setTimestamp()
                .setFooter({text: "Data acquired by Kilometers#7771"})
              msg.channel.send({embeds: [vEmb]})
            }
          }catch(error){
            msg.reply("Could not find slayer")
          }
  
            
        });
    
      
    }catch(error){
      console.log(error)
      msg.reply("Could not find slayer")
    }
  }
  



//TODO; PROVIDE A LIST OF ITEMS for recipe

//TODO; BAZAAR ITEM FINDER/PRICE RETURNER

  
});


client.login(token)