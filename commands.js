const { VK } = require('vk-io');

const { HearManager } = require('@vk-io/hear');

const vk = new VK({
    token: 'vk1.a.DxFkZPJCOowJlvHDltPUNkrdGR2LA-gMtiqpjJiODGGpBdGsOuYpsGprBEDVIxPQ5LesYQk46_A-mYQehA0jRFaGdYyUM733GyskR_ZRhPGOh_ag2ek8qxx4byIX0-SjQJxVahr4bXHd9z2yiZ9kDejTT4gLFyq0Qp54ay2QqayyjvcsFHV_pqLbGE7ajzzIpWieVhhrRf2yH2TuoUl7DA'
})
const bot = new HearManager();

vk.updates.on('message_new', bot.middleware);

bot.hear(/Привет/i, msg => {
    msg.send(`Привет, я работаю`);    
});

