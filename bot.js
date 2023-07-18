const data = require('./data.json');

const { VK, Keyboard, getRandomId } = require('vk-io');

const { HearManager } = require('@vk-io/hear');

const VkBot = require('node-vk-bot-api');

const service = new VkBot(data.token);

const cmds = require('./commands.js');

const vk = new VK({
    token: data.token
});
const bot = new HearManager();

vk.updates.on('message_new', bot.middleware);

const startKeyBoard = Keyboard.keyboard ([
  [
    Keyboard.textButton({
      label: 'Расписание',
      color: Keyboard.SECONDARY_COLOR
    }),
    Keyboard.textButton({
      label: 'Кабинет',
      color: Keyboard.PRIMARY_COLOR
    }),
  ],
  [
    Keyboard.textButton({
      label: 'Преподователь',
      color: Keyboard.POSITIVE_COLOR
    }),
    Keyboard.textButton({
      label: 'Справка',
      color: Keyboard.NEGATIVE_COLOR
    }),
  ]
])

bot.hear(/start/i, async(context, next) => {
    context.send({ message: `Клавиатура`, keyboard: startKeyBoard })
})

bot.hear(/Назад/i, async(context, next) => {
  context.send({ message: `Вы вернулись назад`, keyboard: startKeyBoard })
})

bot.hear(/Кабинет/i, async(context, next) => {
  context.send({ message: `Напишите кабинет`, keyboard: JSON.stringify({buttons:[[{action:{type:"text", label:"Назад"}, color:"secondary"}]], inline: false}) });
})

bot.hear(/Преподователь/i, async(context, next) => {
  context.send({ message: `Ф.И.О преподавателя`, keyboard: JSON.stringify({buttons:[[{action:{type:"text", label:"Назад"}, color:"secondary"}]], inline:false}) });
})

bot.hear(/Расписание/i, async(context, next) => {
  context.send({ message: `Напиши свою группу`, keyboard: JSON.stringify({buttons:[[{action:{type:"text", label:"Назад"}, color:"secondary"}]], inline: false}) });
})

bot.hear(/Справка/i, async(context, next) => {
  context.send({ message: `О нас`, keyboard: JSON.stringify({buttons:[[{action:{type:"text", label:"Когда был создан бот"}, color: "primary" }, {action:{type:"text", label:"Стоимость бота в месяц"}, color: "primary" }], [{action:{type:"text", label:"Назад"}, color:"secondary"}]], inline:false}) });
})

bot.hear(/Стоимость бота в месяц/i, async(context, next) => {
  context.send({ message: `Стоимость подписки в месяц 50 рублей`, keyboard: JSON.stringify({buttons:[[{action:{type:"text", label:"Купить"}, color: "negative" }], [{action:{type:"text", label:"Назад"}, color:"secondary"}]], inline:false}) });
})

bot.hear(/Когда был создан бот/i, async(context, next) => {
  context.send({ message: `Разработка бота началась в далеком 09.06.2023`, keyboard: JSON.stringify({buttons:[[{action:{type:"text", label:"Назад"}, color:"secondary"},]], inline:false}) });
})

bot.hear('stoprequest', msg=>{
	vk.updates.stop();
  service.stop();
});

async function start(){
  let workb = service.startPolling((err) => {
    if (err) {
      console.error('BOT Error : ' + err);
    }
  });
  let works = vk.updates.start().catch(console.error);
  await workb & works;
  console.log('Бот запущен!!');
  return workb, works
} ;

start();