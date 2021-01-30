# AverageiFunnier
This is a simple bot I'm working on in JavaScript to work with Discord and iFunny.
It uses [discord.js](https://github.com/discordjs/discord.js) and [ifunny.js](https://github.com/discordjs/discord.js) as dependencies.
As far as I know, ifunny.js doesn't have any available documentation, so feel free to use this to help you get started.
I'm working on it slowly, as I'm in school as well as I'm relatively new to JavaScript, so feel free to make a pull request or make your own fork.
Keep in mind this uses GNU GPL v3.0 license, meaning anything you make with it must also use it or a similar license.

# tokens.json
please create a tokens.json with the following format.
```json
{
  "discord": "discord token here",

  "ifunny": {
    "bot": {
      "email": "ifunny bot email here",
      "password": "ifunny bot password here"
    },

    "main": {
      "email": "your ifunny email",
      "password": "your ifunny password"
    }
  }
}
```
