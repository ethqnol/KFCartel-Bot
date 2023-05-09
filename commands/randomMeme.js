const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch-commonjs')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('meme')
		.setDescription('Sends a random meme!'),
	async execute(interaction) {
		try {
      const response = await fetch(`https://www.reddit.com/r/memes/random.json`);
      const [post] = await response.json();
      const memeData = post.data.children[0].data;

      const embed = new EmbedBuilder()
        .setTitle(memeData.title)
        .setImage(memeData.url)
        .setURL(`https://www.reddit.com${memeData.permalink}`)
        .setTimestamp()
        .setFooter({text: "By ethqnol#1000 & suupre#0001\n Memes From Reddit"})

      interaction.reply({embeds: [embed]});
    } catch (error) {
      console.error('Error retrieving meme:', error);
      interaction.reply('Failed to retrieve a meme. Please try again later.');
    }
	},
};

