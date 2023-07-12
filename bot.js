const { VK, Keyboard, getRandomId } = require('vk-io');

const { HearManager } = require('@vk-io/hear');

const cmds = require('./commands.js');

const vk = new VK({
    token: 'vk1.a.R02T_0UFLYce8ahpwPKlwHGBHQvfWCLzWL2wPxvOTL5NzBGGBkKmR_z4oLaOZ4io4T0_1Wxt_PfYYJXZ_LnKpZ0Fzt2JHktQbDqpXZM8PFsDlhK7Y8MDdqVzXSlmTU77FAs0zY9HXV86vSfy1gixQrBh0fYSUS0tXl-p4hRFYBcpTZTehtYMUrLRo1xQBBMiha4uAYu8CsEyAvOCSJsNoQ'
})
const bot = new HearManager();


vk.updates.on('message_new', bot.middleware, (context, next) => {
	const { messagePayload } = context;

	context.state.command = messagePayload && messagePayload.command
		? messagePayload.command
		: null;
    console.log('"' + context.text + '"' +' by ' + context.$groupId);
    console.log(context);
    cmds.textToArray(context);
	return next();
});

bot.hear(/callback/i, msg => {
	let keyboard = Keyboard
	.keyboard([[
		Keyboard.callbackButton({
			label: 'Красная кнопка',
			color: 'negative',
			payload: {
				id: msg.senderId,
				button: 'Красная'
			},
			callback_data: 'test'
		}),
		Keyboard.callbackButton({
			label: 'Зеленая кнопка',
			color: 'positive',
			payload: {
				id: msg.senderId,
				button: 'Зеленая'
			},
			callback_data: 'test'
		})
	],
	[
		Keyboard.callbackButton({
			label: 'Синяя',
			color: 'primary',
			payload: {
				id: msg.senderId,
				button: 'Синяя'
			},
			callback_data: 'test'
		}),
		Keyboard.callbackButton({
			label: 'Серая',
			color: 'secondary',
			payload: {
				id: msg.senderId,
				button: 'Серая'
			},
			callback_data: 'test'
		})
		
	]])
	msg.send({ message: 'Callback клавиатура', keyboard: keyboard, random_id: getRandomId() })
})

vk.updates.on('message_event', msg => {
	const button = msg.eventPayload.button;
	vk.api.messages.send({ message: `Была нажата ${button} кнопка`, peer_id: msg.peerId, random_id: getRandomId() })
	console.log(msg)
})

console.log('Бот запущен!!');
vk.updates.start().catch(console.error);

