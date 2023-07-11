import { bot, vk } from "bot.js";

bot.hear(/test/i, msg => {
    msg.send(`test`);    
});

bot.hear(/Привет/i, msg => {
    msg.send(`Привет, я d blya работаю`);    
});

bot.hear(/w/i, msg => {
    msg.send(`Владос пидорас`);    
});