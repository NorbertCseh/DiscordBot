const Discord = require("discord.js");
const client = new Discord.Client();
const Axios = require("axios");
const Cheerio = require("cheerio");
const keys = require("./keys");
const kifacsaro = "563253385050980354"

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
    )}&api_key=${keys.giphyKey}&limit=5`;
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
          const $ = Cheerio.load(html);

          let tweets = [];

          $(
            ".TweetTextSize, .TweetTextSize--normal, .js-tweet-text, .tweet-text"
          ).each((i, elm) => {
            tweets[i] = $(elm).text();
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
          const $ = Cheerio.load(html);

          let imgs = [];

          $("._2_tDEnGMLxpM6uOa2kaDB3").each((i, elm) => {
            imgs[i] = $(elm).attr("src");
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
  if (receiveMessage.content == "Movie") {
    Axios.get(
      "https://www.imdb.com/search/title?groups=top_250&sort=user_rating"
    )
      .then(function(response) {
        if (response.status == 200) {
          const html = response.data;
          const $ = Cheerio.load(html);
          const movies = [];
          $(".lister-item-content").each((i, elm) => {
            let rank = $(elm)
              .find(".lister-item-index, .unbold, .text-primary")
              .text();
            rank = rank.length == 8 ? rank.slice(0, 1) : rank.slice(0, 2);

            let year = $(elm)
              .find(".lister-item-index, .unbold, .text-primary")
              .text();
            year = year.length == 8 ? year.slice(3, 7) : year.slice(4, 8);

            let title = $(elm)
              .find("a")
              .text();
            title = title.slice(0, title.indexOf("1"));

            let score = $(elm)
              .find(".inline-block, .ratings-imdb-rating")
              .attr("data-value");

            const movie = {
              rank,
              title,
              year,
              score
            };
            movies.push(movie);
          });
          let randomNum = Math.floor(Math.random() * movies.length);

          receiveMessage.channel.send(
            movies[randomNum].rank +
              ". " +
              movies[randomNum].title +
              " " +
              movies[randomNum].year +
              " " +
              movies[randomNum].score
          );
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  if (receiveMessage.content == "Kifacsar") {
    Axios.get("https://www.pornhub.com/pornstars?o=t")
      .then(function(response) {
        if (response.status == 200) {
          const html = response.data;
          const $ = Cheerio.load(html);

          let actors = [];

          $(".wrap").each((i, elm) => {
            actors[i] = $(elm)
              .find(".title, .js-mxp")
              .attr("data-mxptext");
          });
          actors = actors.filter(el => {
            return el != null;
          });
          let randomNum = Math.floor(Math.random() * actors.length);
          receiveMessage.channel.send(
            actors[randomNum] +
              ` https://www.pornhub.com/pornstar/${actors[randomNum].replace(
                " ",
                "-"
              )}`
          );
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  if (receiveMessage.content == "Norbi pls") {
    let randomNumber = Math.floor(Math.random() * 2000);

    Axios.get(`https://www.urbandictionary.com/random.php?page=${randomNumber}`)
      .then(function(response) {
        if (response.status == 200) {
          const html = response.data;
          const $ = Cheerio.load(html);

          let words = [];

          $(".def-panel").each((i, elm) => {
            let title = $(elm)
              .find(".def-header")
              .find(".word")
              .text();

            let definition = $(elm)
              .find(".meaning")
              .text();

            let example = $(elm)
              .find(".example")
              .text();
            const word = {
              title,
              definition,
              example
            };
            words.push(word);
          });
          let rnd = Math.floor(Math.random() * words.length);
          receiveMessage.channel.send(
            words[rnd].title +
              "\n\nDefinition:\n\n" +
              words[rnd].definition +
              "\n\nExample:\n\n" +
              words[rnd].example
          );
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  if (receiveMessage.content.startsWith(">")) {
    let urbanURL = `https://www.urbandictionary.com/define.php?term=${processCommand(
      receiveMessage
    )}`;
    Axios.get(urbanURL)
      .then(function(response) {
        if (response.status == 200) {
          const html = response.data;
          const $ = Cheerio.load(html);

          let words = [];

          $(".def-panel").each((i, elm) => {
            let title = $(elm)
              .find(".def-header")
              .find(".word")
              .text();

            let definition = $(elm)
              .find(".meaning")
              .text();

            let example = $(elm)
              .find(".example")
              .text();
            const word = {
              title,
              definition,
              example
            };
            words.push(word);
          });
          receiveMessage.channel.send(
            words[0].title +
              "\n\nDefinition:\n\n" +
              words[0].definition +
              "\n\nExample:\n\n" +
              words[0].example
          );
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  if (receiveMessage.content == "Lil G") {
    Axios.get("https://www.youtube.com/channel/UC9H7VRN9CXme4eIBYKAD8Uw/videos")
      .then(function(response) {
        if (response.status == 200) {
          const html = response.data;
          const $ = Cheerio.load(html);
          let videos = [];

          $("h3").each((i, elm) => {
            videos[i] = $(elm)
              .find("a")
              .attr("href");
          });
          videos = videos.filter(el => {
            return el != null;
          });
          receiveMessage.channel.send(
            "https://www.youtube.com" +
              videos[Math.floor(Math.random() * videos.length)]
          );
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  if (receiveMessage.content == "Szenny") {
    Axios.get("https://www.youtube.com/user/catscareofficial/videos")
      .then(function(response) {
        if (response.status == 200) {
          const html = response.data;
          const $ = Cheerio.load(html);
          let videos = [];

          $("h3").each((i, elm) => {
            videos[i] = $(elm)
              .find("a")
              .attr("href");
          });
          videos = videos.filter(el => {
            return el != null;
          });
          receiveMessage.channel.send(
            "https://www.youtube.com" +
              videos[Math.floor(Math.random() * videos.length)]
          );
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  if (receiveMessage.content == "Dé:Nash") {
    Axios.get("https://www.youtube.com/channel/UCbgbVUSZ2I6fAAHiWxfZoOQ/videos")
      .then(function(response) {
        if (response.status == 200) {
          const html = response.data;
          const $ = Cheerio.load(html);
          let videos = [];

          $("h3").each((i, elm) => {
            videos[i] = $(elm)
              .find("a")
              .attr("href");
          });
          videos = videos.filter(el => {
            return el != null;
          });
          receiveMessage.channel.send(
            "https://www.youtube.com" +
              videos[Math.floor(Math.random() * videos.length)]
          );
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  if (receiveMessage.content == "Tomi Paul") {
    Axios.get("https://www.youtube.com/channel/UCG8rbF3g2AMX70yOd8vqIZg/videos")
      .then(function(response) {
        if (response.status == 200) {
          const html = response.data;
          const $ = Cheerio.load(html);
          let videos = [];

          $("h3").each((i, elm) => {
            videos[i] = $(elm)
              .find("a")
              .attr("href");
          });
          videos = videos.filter(el => {
            return el != null;
          });
          receiveMessage.channel.send(
            "https://www.youtube.com" +
              videos[Math.floor(Math.random() * videos.length)]
          );
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  if (receiveMessage.content == "Info") {
          receiveMessage.channel.send(
            "!Valami: Random Gif Valamiről\n>Valami: Valami definicióját magyarázza\nTrump pls: A vezetőnk szentírásaiből idéz\nNorbi pls: Random szó és magyarázat\nTomi pls: Dankmemes\nMovie: Random film\nKifacsar: Ha megnyugodnál\nLil G: Minőségi zenék\nSzenny: Még több jó zene\nDé:Nash: Vallásunk alapja\nTomi Paul: You will see.\nPeti pls: IDK"
          );
  }
  if (receiveMessage.content == "Peti pls") {
    const imgArray = [
      "https://media.discordapp.net/attachments/563253385050980352/638831559595786260/Nevtelen2.png",
      "https://media.discordapp.net/attachments/563253385050980352/638773822014881792/Nevtelen.png",
      "https://media.discordapp.net/attachments/563253385050980352/639035257022054411/Nevtelen3.png",
      "https://cdn.discordapp.com/attachments/563253385050980352/639175699940507678/43496509_244823789539694_3379126671872360448_n.jpg",
      "https://media.discordapp.net/attachments/563253385050980352/639372559594553354/neonreszeg.png"
    ]
    receiveMessage.channel.send(
      imgArray[Math.floor(Math.random() * imgArray.length)]
    );
}

  if (receiveMessage.content === "Ping") {
    receiveMessage.channel.send(
      "Pong"
    );
  }


  if (receiveMessage.content === 'nem tudom') {
    receiveMessage.channel.send(
      "faszt nem"
    );
  }
  
});

function processCommand(messageIn) {
  return messageIn.content.substr(1).replace(" ", "+");
}

client.login(keys.discordApiKey);
