const discord = require("discord.js");
const ifunny = require("iFunny");
const {commify, noEveryone, getUser} = require("../src/methods")
const {robot} = require("../src/ifunny")

const daysToNext = async (user) => {
  let milestones = {
          'Meme explorer': 5, 'Meme bro': 25, 'Meme daddy': 50,
          'Dank memer': 100, 'Meme master baker': 200,
          'Deep fried memer': 300, 'Saucy memer': 500,
          'Original Meme Gangster': 666, 'Meme demon': 911,
          'Steal beams of memes': 1000, 'Meme dealer': 1500,
          'iFunny Veteran': 2000, "Chef's meme agent": 3000
      };
  return milestones[await user.rank] - await user.days;
};

const verified = async user => {
  if (await user.is_verified) {
    return `${await user.nick} <:ifunnyverified:768264154628096060>`;
  } else {
    return await user.nick;
  }
};

module.exports = {
  name: "user",
  aliases: ["user"],
  brief: "Sends info about an iFunnier",
  help: "Sends a detailed embed about an iFunny user by nick or by ID",
  usage: "<username || id>",
  async execute(message, args) {
    if (args.length < 1) {
      return message.channel.send("I need a user to search for")
    }

    let user = await getUser(args[0]);

    if (user !== null) {
      let posts = `Original: \`${await commify(await user.original_post_count)}\`\n`
          posts += `Features: \`${await commify(await user.feature_count)}\`\n`
          posts += `Smiles: \`${await commify(await user.smile_count)}\`\n`
          posts += `Total: \`${await commify(await user.post_count)}\``;

      let subStats = `Subs: \`${await commify(await user.subscriber_count)}\`\n`
        subStats += `Subbed: \`${await commify(await user.subscription_count)}\``;

      let days = `Days: \`${await commify(await user.days)}\`\n`
        days += `Days left: \`${await commify(await daysToNext(user))}\``;

      let pfp = (await user.profile_image).url
        || "https://images-eu.ssl-images-amazon.com/images/I/41Yv6VC-fdL.png";

      let cover = (await user.cover_image).url
        || "https://www.divinewings.co.in/admin/images/pageBanner/default/default-banner.jpg";


      let embed = new discord.MessageEmbed()
        .setColor("YELLOW")
        .setTitle(
          await verified(user)
        ).setURL(
          `https://ifunny.co/user/${await user.nick}`
        ).setDescription(await user.about)

        .addFields(
          {name: await user.rank, value: days},
          {name: "Posts", value: posts},
          {name: "Sub Counts", value: subStats}
        )
        .setImage(cover).setThumbnail(pfp)
        .setFooter(`ID: ${user.id}`)
        .setTimestamp()

      message.channel.send({ embed: embed })
      .catch(err => message.channel.send(err));
    } else {
      message.channel.send(`${await noEveryone(args[0])} is not a valid user`);
    }
  }
};
/*
.addField(
  "Posts",
  postStats
).setImage(await user.cover_image || defaultPFP);
*/
