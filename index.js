const fs = require("fs");

const tokens = require("./tokens.json");
const config = require("./config.json");

const discord = require("discord.js");
const client = new discord.Client();
client.commands = new discord.Collection();

const getPrefix = async (guildID) => {

}

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	client.commands.set(command.name, command);
}


client.once("ready", () => {
  console.log("Ready!");
  client.user.setActivity("!help", { type: "PLAYING" });
});

client.on("message", message => {
    if (!message.content.startsWith(config.prefix) || message.author.bot) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName)
			|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))
			|| null;
    if (command !== null) {
      command.execute(message, args);
    };
});


client.login(tokens.discord);
