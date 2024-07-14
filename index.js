const { Bot } = require('grammy');

const bot = new Bot('7260237598:AAEx1pRGTVe9xNHUgVz5T3MdWTVU8S6EWJU'); // Replace with your actual bot token

bot.api.setMyCommands([
    { command: "start", description: "Start Bot" },
    { command: "lovetap", description: "Open LoveTap Mini App" },
    ]);
// Handle the /start command
bot.command('start', async (ctx) => {
    ctx.reply('Welcome! I am a simple chat bot.');
    let user = ctx.message.from;
    console.log(user);
});

bot.command('lovetap', async (ctx) => {
    let user = ctx.message.from;
    console.log(user);
    // const webLink = "https://lovetapbot.vercel.app";
    const webLink = "https://suited-prepared-hyena.ngrok-free.app";
    ctx.reply("Hi! lets get you started Click the button below", {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Get Started",
              web_app: {
                url: webLink,
              },
            },
          ],
        ],
      },
    });
});

// Start the bot (using long polling)
bot.start();