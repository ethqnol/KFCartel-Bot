const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fetch = require("node-fetch-commonjs")
let url  = "https://api.dictionaryapi.dev/api/v2/entries/en/"


module.exports = {
	data: new SlashCommandBuilder()
		.setName('define')
		.setDescription('defines a word')
    .addStringOption(option =>
		option.setName('word')
			.setDescription('word you want to have defined')
      .setRequired(true)
      .setMaxLength(2000)),
	async execute(interaction) {

		const wordInput = interaction.options.getString('word').trim().toLowerCase()
    let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${wordInput}`
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if(!data[0]) return interaction.reply("Could Not Find Word");
    
        let parts = data[0].meanings;
        const defEmbed = new EmbedBuilder()
          .setTitle(`Definition for ${wordInput}`)
          .addFields(parts.map((part, i) => {
            let partOfSpeech = part.partOfSpeech
            let partDefs = part.definitions
            let theDefs = partDefs.reduce((past, def) =>{ 
              let newItem = past + ` **_Definition:_** ${def.definition} \n\n`
              if(newItem.length > 1000){
                return past
              }else{
                return newItem
              }
            },  " ")

            if(wordInput.trim().toLowerCase() == "grandpa"){
              theDefs = ` **_Definition:_**: code name for the guy also referred to as Suupre (Suus). The individual "Suupre", is allgedly ancient, hence the the term which is used to refer to him. He has allegedly used the phrase \"back in my day\".`
            }
            
            return {name: `${i + 1}) __${partOfSpeech}__`, value: `>>> ${theDefs}`}
          }))
          .setTimestamp()
          .setFooter({text: "Created by ethqnol#2613 & suupre#0001"})

        interaction.reply({embeds : [defEmbed]})        
      })
      .catch(error => console.error(error));

    
    
	},
};