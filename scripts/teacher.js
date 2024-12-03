const { processAllGroups } = require('../updateData');

require('dotenv').config();
const dotenv = require('dotenv');
dotenv.config();
const mysql = require('mysql2');

module.exports = {
    getTeacher: async function (teacherName, context) {
        await processAllGroups();

        const connection = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });

        const query = 'SELECT lesson_number, lesson, teacher, cabinet, day_of_week FROM schedule WHERE teacher LIKE ?';

        connection.query(query, [`%${teacherName}%`], (err, results) => {
            if (err) {
                console.error('Ошибка при запросе в базу данных:', err);
                context.send({ message: 'Ошибка при получении расписания преподавателя.' });
                connection.end();
                return;
            }

            if (results.length > 0) {
                let message = `Расписание для преподавателя ${teacherName}:\n`;

                function formatNumberWithEmoji(number) {
                    const numberEmojis = [
                        "1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣"
                    ];
                    const numberString = String(number);
                    let formattedNumber = "";
                    for (let i = 0; i < numberString.length; i++) {
                        let digit = Number(numberString[i]);
                        formattedNumber += numberEmojis[digit - 1];
                    }
                    return formattedNumber;
                }

                const daysOfWeek = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
                let groupedSchedule = {};

                results.forEach((row) => {
                    const day = row.day_of_week;
                    if (daysOfWeek.includes(day)) {
                        if (!groupedSchedule[day]) {
                            groupedSchedule[day] = [];
                        }
                        groupedSchedule[day].push(row);
                    } else {
                        console.warn(`Некорректное значение day_of_week: ${day} для занятия ${row.lesson}`);
                    }
                });

                for (const [day, lessons] of Object.entries(groupedSchedule)) {
                    message += `\n${day}:\n`;
                    lessons.forEach((lesson) => {
                        message += `${formatNumberWithEmoji(lesson.lesson_number)} ${lesson.lesson} 🎓${lesson.teacher} 🚪${lesson.cabinet}\n`;
                    });
                }

                context.send({ message: message });
            } else {
                context.send({ message: `Преподаватель ${teacherName} не найден в расписании.` });
            }

            connection.end();
        });
    }
};
