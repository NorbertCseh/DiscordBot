const Discord = require("discord.js");
const client = new Discord.Client();
const Axios = require("axios");
const Cheerio = require("cheerio");
const keys = require("./keys");

client.on("ready", () => {
  console.log("Connected as: " + client.user.tag);
  client.guilds.forEach(guild => {
    console.log(guild.name);
    guild.channels.forEach(channel => {
      console.log(` - ${channel.name} ${channel.type} ${channel.id}`);
    });
  });
});

client.on("message", receiveMessage => {
  if (receiveMessage.author == client.user) {
    return;
  }
  if (receiveMessage.content.startsWith("!")) {
    let uri = `http://api.giphy.com/v1/gifs/search?q=${processCommand(
      receiveMessage
    )}&api_key=${keys.discordApiKey}&limit=5`;
    Axios.get(uri)
      .then(function(response) {
        try {
          receiveMessage.channel.send(response.data.data[0].url);
        } catch (err) {
          receiveMessage.channel.send(
            `No result for ${processCommand(receiveMessage)}`
          );
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  if (receiveMessage.content == "Trump pls") {
    Axios.get("https://twitter.com/realDonaldTrump?lang=hu")
      .then(function(response) {
        if (response.status == 200) {
          const html = response.data;
          const cHtml = Cheerio.load(html);

          let tweets = [];

          cHtml(
            ".TweetTextSize, .TweetTextSize--normal, .js-tweet-text, .tweet-text"
          ).each((i, elm) => {
            tweets[i] = cHtml(elm).text();
          });
          receiveMessage.channel.send(
            tweets[Math.floor(Math.random() * tweets.length)]
          );
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  if (receiveMessage.content == "Tomi pls") {
    Axios.get("https://www.reddit.com/r/dankmemes/")
      .then(function(response) {
        if (response.status == 200) {
          const html = response.data;
          const cHtml = Cheerio.load(html);

          let imgs = [];

          cHtml("._2_tDEnGMLxpM6uOa2kaDB3").each((i, elm) => {
            imgs[i] = cHtml(elm).attr("src");
          });
          receiveMessage.channel.send(
            imgs[Math.floor(Math.random() * imgs.length)]
          );
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }
});

function processCommand(messageIn) {
  return messageIn.content.substr(1).replace(" ", "+");
}

client.login(keys.chanelKey);
