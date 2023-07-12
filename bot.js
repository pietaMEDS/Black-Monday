const { VK, Keyboard, getRandomId } = require('vk-io');

const { HearManager } = require('@vk-io/hear');

const cmds = require('./commands.js');

const vk = new VK({
    token: 'vk1.a.R02T_0UFLYce8ahpwPKlwHGBHQvfWCLzWL2wPxvOTL5NzBGGBkKmR_z4oLaOZ4io4T0_1Wxt_PfYYJXZ_LnKpZ0Fzt2JHktQbDqpXZM8PFsDlhK7Y8MDdqVzXSlmTU77FAs0zY9HXV86vSfy1gixQrBh0fYSUS0tXl-p4hRFYBcpTZTehtYMUrLRo1xQBBMiha4uAYu8CsEyAvOCSJsNoQ'
})
const bot = new HearManager();

vk.updates.on('message_new', bot.middleware)

// vk.updates.on('message_new', (context, next) => {
// 	const { messagePayload } = context;

// 	context.state.command = messagePayload && messagePayload.command
// 		? messagePayload.command
// 		: null;
//     console.log('"' + context.text + '"' +' by ' + context.$groupId);
//     console.log(context);
//     cmds.textToArray(context);
// 	return next();
// });

bot.hear(/обычные/i, msg => {
	let keyboard = Keyboard
	.keyboard([[
		Keyboard.textButton({
			label: 'Красная кнопка',
			color: 'negative'
		}),
		Keyboard.textButton({
			label: 'Green btn',
			color: 'positive'
		})
	],
	[
		Keyboard.textButton({
			label: 'Синяя',
			color: 'primary'
		}),
		Keyboard.textButton({
			label: 'Серая',
			color: 'secondary'
		})
	]]);
	msg.send({ message: 'Обычная клавиатура', keyboard: keyboard, random_id: getRandomId() })
})


console.log('Бот запущен!!');
vk.updates.start()//.catch(console.error);

