import { Bot } from '@maxhub/max-bot-api';
import dotenv from 'dotenv';

dotenv.config();

const MAX_BOT_TOKEN: string | undefined = process.env.MAX_BOT_TOKEN;

if (MAX_BOT_TOKEN === undefined) {
  throw new Error('Enviroment variable MAX_BOT_TOKEN is not defined');
}

const bot = new Bot(MAX_BOT_TOKEN);

// Установка подсказок с доступными командами
bot.api.setMyCommands([
  {
    name: '/menu',
    description: 'Открыть меню с информацией',
  },
]);

// Обработчик события запуска бота
bot.on('bot_started', (ctx) =>
  ctx.reply(
    '**Привет!** Ты попал в **MafBot**, который поможет тебе соориентироваться в нашем маф-клубе, для дальнейших действий нажми на кнопку снизу или напиши в чат `/menu`',
    {
      format: 'markdown',
      attachments: [
        {
          type: 'inline_keyboard',
          payload: {
            buttons: [
              [
                {
                  type: 'callback',
                  text: 'Меню',
                  payload: 'menu',
                },
              ],
            ],
          },
        },
      ],
    },
  ),
);

bot.start();
console.log('Bot started');
