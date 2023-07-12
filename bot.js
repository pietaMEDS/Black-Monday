const { VK, Keyboard } = require('vk-io');

const { HearManager } = require('@vk-io/hear');

const cmds = require('./commands.js');

const vk = new VK({
    token: 'vk1.a.DxFkZPJCOowJlvHDltPUNkrdGR2LA-gMtiqpjJiODGGpBdGsOuYpsGprBEDVIxPQ5LesYQk46_A-mYQehA0jRFaGdYyUM733GyskR_ZRhPGOh_ag2ek8qxx4byIX0-SjQJxVahr4bXHd9z2yiZ9kDejTT4gLFyq0Qp54ay2QqayyjvcsFHV_pqLbGE7ajzzIpWieVhhrRf2yH2TuoUl7DA'
})
const bot = new HearManager();

vk.updates.on('message_new', (context, next) => {
	const { messagePayload } = context;

	context.state.command = messagePayload && messagePayload.command
		? messagePayload.command
		: null;
    console.log('"' + context.text + '"' +' by ' + context.$groupId);
    console.log(context);
    cmds.textToArray(context);
	return next();
});

vk.updates.start().catch(console.error);

console.log('Бот запущен!!');