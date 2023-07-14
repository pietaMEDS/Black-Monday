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

// let wht = Keyboard.keyboard([[
//   Keyboard.callbackButton({
//     label: 'test1',
//     payload:{
//       button: 'test1'
//     },
//     callback_data: 'supertest'
//   })
// ]])

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

bot.hear(/kb/i, async(context, next) => {
    context.send({ message: `Выбрана клавиатура пользователем`, keyboard: startKeyBoard })
})

bot.hear(/Назад/i, async(context, next) => {
  context.send({ message: `Вы вернулись назад`, keyboard: startKeyBoard })
})

bot.hear(/Кабинет/i, async(context, next) => {
  context.send({ message: `Уточните кабинет`, keyboard: JSON.stringify({buttons:[[{action:{type:"text", label:"39 кабинет"}, color: "negative"}, {action:{type:"text", label:"41 кабинет"}, color: "primary"}], [{action:{type:"text", label:"Назад"}, color:"secondary"}]], inline: false}) });
})

bot.hear(/Преподователь/i, async(context, next) => {
  context.send({ message: `Выберите преподователя`, keyboard: JSON.stringify({buttons:[[{action:{type:"text", label:"Закирова Р.А"}, color: "primary"}, {action:{type:"text", label:"Меркулова С.В"}, color: "primary" }], [{action:{type:"text", label:"Назад"}, color:"secondary"}]], inline:false}) });
})

bot.hear(/Расписание/i, async(context, next) => {
  context.send({ message: `Выберите дату`, keyboard: JSON.stringify({buttons:[[{action:{type:"text", label:"Всё доступное"}, color: "primary"}, {action:{type:"text", label:"Сегодня"}, color: "primary" }, {action:{type:"text", label:"Завтра"}, color: "primary" }], [{action:{type:"text", label:"Назад"}, color:"secondary"}]], inline:false}) });
})

bot.hear(/Справка/i, async(context, next) => {
  context.send({ message: `О нас`, keyboard: JSON.stringify({buttons:[[{action:{type:"text", label:"Стоимость подписки на бота"}, color: "primary"}, {action:{type:"text", label:"Когда был создан бот"}, color: "primary" }], [{action:{type:"text", label:"Назад"}, color:"secondary"}]], inline:false}) });
})

bot.hear(/Стоимость подписки на бота/i, async(context, next) => {
  context.send({ message: `Стоимость подписки со всем доступным расписанием на месяц составляет 30 рублей`, keyboard: JSON.stringify({buttons:[[{action:{type:"text", label:"Купить"}, color: "primary"}, {action:{type:"text", label:"Ахуевшие долбаебы со 2 курса"}, color: "primary" }], [{action:{type:"text", label:"Назад"}, color:"secondary"}]], inline:false}) });
})

bot.hear(/Когда был создан бот/i, async(context, next) => {
  context.send({ message: `О нас`, keyboard: JSON.stringify({buttons:[[{action:{type:"text", label:"Разработка бота началась в далеком 09.06.2023"}, color: "primary"}], [{action:{type:"text", label:"Назад"}, color:"secondary"}]], inline:false}) });
})


// let keyboard = Keyboard.keyboard([
//   [
//     Keyboard.callbackButton({
//       label: 'Расписание',
//       color: 'negative',
//       payload: {
//         button: 'Расписание'
//       },
//       callback_data: 'test'
//     }),
//     Keyboard.callbackButton({
//       label: 'Преподаватели',
//       color: 'positive',
//       payload: {
//         button: 'Преподаватели'
//       },
//       callback_data: 'test'
//     })
//   ],
//   [
//     Keyboard.callbackButton({
//       label: 'Кабинет',
//       color: 'primary',
//       payload: {
//         button: 'Кабинет'
//       },
//       callback_data: 'test'
//     }),
//     Keyboard.callbackButton({
//       label: 'Справка',
//       color: 'secondary',
//       payload: {
//         button: 'Справка'
//       },
//       callback_data: 'test'
//     })
//   ]
// ]).inline();

// bot.hear(/tt/i, msg=>{
//   msg.send('yes');
//   let msginfo = msg.toJSON();
//   console.log(msginfo);
//   vk.api.messages.edit({
//     peer_id: msginfo.peerId,
//     message_id: msginfo.id,
//     message: 'ОНО РАБОТАЕТ?',
//     keyboard: wht,
//   });
// })

// bot.hear(/cb/i, msg => {
//   msg.send({ message: 'Callback клавиатура', keyboard: keyboard, random_id: getRandomId() });
// });

// function messageEnter() {
//   return 'Выбран кабинет';
// }

// function messageEnter1() {
//   return 'Справка о программе';
// }

// function messageEnter2() {
//   return 'Выбрано расписание';
// }

// function messageEnter3() {
//   return 'Выберите преподавателя';
// }

// vk.updates.on('message_event', msg => {
//   const button = msg.eventPayload.button;

//   let responseMessage;
//   let responseKeyboard;

// 	if (button !== 'Назад') {
// 		responseKeyboard = Keyboard.keyboard([
// 		[
//         Keyboard.callbackButton({
//           label: 'Назад',
//           color: 'primary',
//           payload: {
//             button: 'Назад'
//           },
//           callback_data: 'test'
//         })
//       ]
//     ]).inline();

//     if (button === 'Расписание') {
//       responseMessage = messageEnter2();
//     } else if (button === 'Кабинет') {
//       responseMessage = messageEnter();
//     } else if (button === 'Справка') {
//       responseMessage = messageEnter1();
//     } else {
//       responseMessage = messageEnter3();
//     }

//     vk.api.messages.send({
//       message: responseMessage,
//       peer_id: msg.peerId,
//       random_id: getRandomId(),
//       keyboard: responseKeyboard
//     });
//   } else {
//     responseKeyboard = keyboard;

//     vk.api.messages.send({
//       message: 'Callback клавиатура',
//       peer_id: msg.peerId,
//       random_id: getRandomId(),
//       keyboard: responseKeyboard
//     });
//   }
// });


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