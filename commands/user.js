const discord = require("discord.js");
const ifunny = require("iFunny");

module.exports = {
  name: "user",
  aliases: "ifunnier",
  brief: "Sends info about an iFunnier",
  help: "Sends a detailed embed about an iFunny user by nick or by ID",
  usage: "<username || id>",
  async execute(message, args) {
    if (args.length < 1) {
      return message.channel.send("I need a user to search for")
    }

    let ifunnier = await ifunny.User.by_nick(args[0])
    .catch(err => message.channel.send(err));

    if (ifunnier !== null) {
      let postStats = `Original: ${await ifunnier.original_post_count}\n`;
      postStats += `Total: ${await ifunnier.post_count}`;;
      postStats += `Features: ${await ifunnier.feature_count}`;
      postStats += `Smiles: ${await ifunnier.smile_count}`;

      let pfp = await ifunnier.profile_image.url
        || "https://images-eu.ssl-images-amazon.com/images/I/41Yv6VC-fdL.png"
      let page = `https://ifunny.co/user${await ifunnier.nick}`

      let embed = new discord.MessageEmbed()
        .setAuthor(
          await ifunnier.nick,
          pfp,
          page
        )
      message.channel.send({ embed: embed })
      .catch(err => message.channel.send(err));
    } else {
      message.channel.send(`${args} is not a valid user`)
    }
  }
};
/*
.addField(
  "Posts",
  postStats
).setImage(await ifunnier.cover_image || defaultPFP);
*/
