const data = require('./data.json');

const { VK, Keyboard, getRandomId } = require('vk-io');

const { HearManager } = require('@vk-io/hear');

const VkBot = require('node-vk-bot-api');

const service = new VkBot(data.token);

const cmds = require('./commands.js');

const parser = require("./parser.js");

const { startKeyBoard, Reference, backButton, priceBot, group } = require("./button.js")

const vk = new VK({
    token: data.token
});
const bot = new HearManager();

let week;

vk.updates.on('message_new', bot.middleware);

bot.hear(/start/i, async(context, next) => {
    context.send({ message: `Клавиатура`, keyboard: startKeyBoard })
})

bot.hear(/Назад/i, async(context, next) => {
  context.send({ message: `Вы вернулись назад`, keyboard: startKeyBoard })
})

bot.hear(/Кабинет/i, async(context, next) => {
  context.send({ message: `Напишите кабинет`, keyboard: backButton });
})

console.log(backButton)

bot.hear(/Преподователь/i, async(context, next) => {
  context.send({ message: `Ф.И.О преподавателя`, keyboard: backButton })
});

bot.hear(/Расписание/i, async(context, next) => {
  context.send({ message: `Напиши свою группу (пример 'ОооОо-77-7')`, keyboard: backButton });
})

bot.hear(/Справка/i, async(context, next) => {
  context.send({ message: `О нас`, keyboard: Reference});
})

bot.hear(/Стоимость бота в месяц/i, async(context, next) => {
  context.send({ message: `Стоимость подписки в месяц 50 рублей`, keyboard: priceBot });
})

bot.hear(/Информация о боте/i, async(context, next) => {
  context.send({ message: `Разработчиками бота являются \n Фролов Владислав \n Объедков Никита \n Пичугин Максим \n\n Разработка бота началась в далеком 11.07.2023 \n Стоимость подписки на бота составляет 50 рублей в месяц`, keyboard: startKeyBoard });
})

bot.hear(/Купить подписку/i, async(context, next) => {
  context.send({ message: `Стоимость подписки 50 рублей в месяц`, keyboard: JSON.stringify({buttons:[[{action:{type:"open_link", link:'https://qiwi.com/payment/form/99?extra%5B%27account%27%5D=+79026157767&amountInteger=500&currency=643&extra%5B%27comment%27%5D=ЗА%20БОТА', label:"Купить"}}], [{action:{type:"text", label:"Назад"}, color:"secondary"}]], inline:false}) });
})

bot.hear(/^[а-я]{1,5}-\d{2}-\d$/i, async(context, next) => {
  week = parser.parse(context.text.toLowerCase());
  context.send({ message: `Выбери подгруппу`, keyboard: group });
})

bot.hear(/Первая/i, async(context, next) => {
  parser.output(context,'Первая', week);
  context.send({ message: `----------------------------------------------------------------------------------------------------`, keyboard: startKeyBoard })

})




bot.hear(/Вторая/i, async(context, next) => {
  parser.output(context,'Вторая', week);
  context.send({ message: `----------------------------------------------------------------------------------------------------`, keyboard: startKeyBoard })
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
}

start();