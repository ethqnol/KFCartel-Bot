const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } = require('discord.js');
const scathaBoat = new AttachmentBuilder("ScathaBoat.gif", {name: 'ScathaBoat.gif', description: "scatha boat..."});

module.exports = {
	data: new SlashCommandBuilder()
		.setName('scathaboat')
		.setDescription('*enough internet for today*'),
	async execute(interaction) {
		try {
      interaction.reply({files: [scathaBoat]});
    } catch (error) {
      console.error('Error retrieving meme:', error);
      interaction.reply('Oops, something went wrong. Maybe this is your cue to touch grass :D');
    }
	},
};
