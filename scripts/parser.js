const { formatChanges, parseChanges } = require("./changes");
require('dotenv').config();
const dotenv = require('dotenv');
dotenv.config();
const mysql = require('mysql2');


module.exports = {
  parse: function (groupsName) {

    const connection = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    });

    let week_type;
    const XLSX = require("xlsx");
    const workbook = XLSX.readFile(
      "./data/groups/" + groupsName + "/data.xlsx"
    );
    const sheetNames = workbook.SheetNames;
    const worksheet = workbook.Sheets[sheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    var year = new Date().getFullYear();
    var month = new Date().getMonth();
    var today = new Date(year, month, 0).getTime();
    var now = new Date().getTime();
    var week = Math.ceil((now - today) / (1000 * 60 * 60 * 24 * 7));
    if (week % 2) {
      week_type = "нечётная";
    } else {
      week_type = "чётная";
    }

    //  Случаи
    //    1 - Только первый
    //    2 - Только второй
    //    3 - Первый и Второй
    //    4 - Общий

    let undertype;
    if (week_type == "нечётная") {
      week_type = "Нечетная неделя";
      undertype = "Четная неделя";
    } else {
      week_type = "Четная неделя";
      undertype = "Директор МпК";
    }
    function parse_Monday() {
      let day = [[]];
      let can = false;
      let dayFind = false;
      let dayCell = 0;
      let lastTheme = false;
      let lastRow = [];
      for (let row of jsonData) {
        outer: for (let cell in row) {
          if (row[cell] == week_type) {
            can = true;
          }
          if (row[cell] == "Четверг") {
            can = false;
          }
          if (can) {
            if (row[cell] == "Понедельник") {
              dayCell = Number(cell);
              dayFind = true;
            }
            if (dayFind) {
              if (row[dayCell] != undefined || lastTheme) {
                if (lastTheme) {
                  if (
                    lastRow[dayCell + 3] == undefined &&
                    row[dayCell + 4] == undefined
                  ) {
                    // 1 - Только первый
                    day[Number(lastRow[dayCell])] = [
                      1,
                      [
                        lastRow[dayCell + 1],
                        row[dayCell + 1],
                        row[dayCell + 2],
                      ],
                    ];
                  } else if (lastRow[dayCell + 1] == undefined) {
                    // 2 - Только второй
                    day[Number(lastRow[dayCell])] = [
                      2,
                      [
                        lastRow[dayCell + 3],
                        row[dayCell + 3],
                        row[dayCell + 4],
                      ],
                    ];
                  } else if (
                    lastRow[dayCell + 1] != undefined &&
                    lastRow[dayCell + 3] != undefined
                  ) {
                    //    3 - Первый и Второй
                    day[Number(lastRow[dayCell])] = [
                      3,
                      [
                        lastRow[dayCell + 1],
                        row[dayCell + 1],
                        row[dayCell + 2],
                      ],
                      [
                        lastRow[dayCell + 3],
                        row[dayCell + 3],
                        row[dayCell + 4],
                      ],
                    ];
                  } else if (
                    lastRow[dayCell + 1] != undefined &&
                    row[dayCell + 4] != undefined
                  ) {
                    day[Number(lastRow[dayCell])] = [
                      4,
                      [
                        lastRow[dayCell + 1],
                        row[dayCell + 1],
                        row[dayCell + 4],
                      ],
                    ];
                  } else {
                    console.error(
                      "Невозможно явно обьявить случай расписания, Взят общий"
                    );
                    console.error(lastRow);
                    console.error(row);
                    console.error("Основа " + dayCell);
                    (day[Number(lastRow[dayCell])] = 4),
                      [
                        lastRow[dayCell + 1],
                        row[dayCell + 1],
                        row[dayCell + 4],
                      ];
                  }
                  lastTheme = false;
                }
                if (Number(row[dayCell]) > 0) {
                  lastTheme = true;
                  lastRow = row;
                }
                break outer;
              }
            }
          }
        }
      }
      return day;
    }
    function parse_Tuesday() {
      let day = [[]];
      let can = false;
      let dayFind = false;
      let dayCell = 0;
      let lastTheme = false;
      let lastRow = [];
      for (let row of jsonData) {
        outer: for (let cell in row) {
          if (row[cell] == week_type) {
            can = true;
          }
          if (row[cell] == "Четверг") {
            can = false;
          }
          if (can) {
            if (row[cell] == "Вторник") {
              dayCell = Number(cell);
              dayFind = true;
            }
            if (dayFind) {
              if (row[dayCell] != undefined || lastTheme) {
                if (lastTheme) {
                  if (
                    lastRow[dayCell + 3] == undefined &&
                    row[dayCell + 4] == undefined
                  ) {
                    // 1 - Только первый
                    day[Number(lastRow[dayCell])] = [
                      1,
                      [
                        lastRow[dayCell + 1],
                        row[dayCell + 1],
                        row[dayCell + 2],
                      ],
                    ];
                  } else if (lastRow[dayCell + 1] == undefined) {
                    // 2 - Только второй
                    day[Number(lastRow[dayCell])] = [
                      2,
                      [
                        lastRow[dayCell + 3],
                        row[dayCell + 3],
                        row[dayCell + 4],
                      ],
                    ];
                  } else if (
                    lastRow[dayCell + 1] != undefined &&
                    lastRow[dayCell + 3] != undefined
                  ) {
                    //    3 - Первый и Второй
                    day[Number(lastRow[dayCell])] = [
                      3,
                      [
                        lastRow[dayCell + 1],
                        row[dayCell + 1],
                        row[dayCell + 2],
                      ],
                      [
                        lastRow[dayCell + 3],
                        row[dayCell + 3],
                        row[dayCell + 4],
                      ],
                    ];
                  } else if (
                    lastRow[dayCell + 1] != undefined &&
                    row[dayCell + 4] != undefined
                  ) {
                    day[Number(lastRow[dayCell])] = [
                      4,
                      [
                        lastRow[dayCell + 1],
                        row[dayCell + 1],
                        row[dayCell + 4],
                      ],
                    ];
                  } else {
                    console.error(
                      "Невозможно явно обьявить случай расписание, Взят общий"
                    );
                    console.error(lastRow);
                    console.error(row);
                    console.error("Основа " + dayCell);
                    (day[Number(lastRow[dayCell])] = 4),
                      [
                        lastRow[dayCell + 1],
                        row[dayCell + 1],
                        row[dayCell + 4],
                      ];
                  }
                  lastTheme = false;
                }
                if (Number(row[dayCell]) > 0) {
                  lastTheme = true;
                  lastRow = row;
                }
                break outer;
              }
            }
          }
        }
      }
      return day;
    }
    function parse_Wednesday() {
      let day = [[]];
      let can = false;
      let dayFind = false;
      let dayCell = 0;
      let lastTheme = false;
      let lastRow = [];
      for (let row of jsonData) {
        outer: for (let cell in row) {
          if (row[cell] == week_type) {
            can = true;
          }
          if (row[cell] == "Четверг") {
            can = false;
          }
          if (can) {
            if (row[cell] == "Среда") {
              dayCell = Number(cell);
              dayFind = true;
            }
            if (dayFind) {
              if (row[dayCell] != undefined || lastTheme) {
                if (lastTheme) {
                  if (
                    lastRow[dayCell + 3] == undefined &&
                    row[dayCell + 4] == undefined
                  ) {
                    // 1 - Только первый
                    day[Number(lastRow[dayCell])] = [
                      1,
                      [
                        lastRow[dayCell + 1],
                        row[dayCell + 1],
                        row[dayCell + 2],
                      ],
                    ];
                  } else if (lastRow[dayCell + 1] == undefined) {
                    // 2 - Только второй
                    day[Number(lastRow[dayCell])] = [
                      2,
                      [
                        lastRow[dayCell + 3],
                        row[dayCell + 3],
                        row[dayCell + 4],
                      ],
                    ];
                  } else if (
                    lastRow[dayCell + 1] != undefined &&
                    lastRow[dayCell + 3] != undefined
                  ) {
                    //    3 - Первый и Второй
                    day[Number(lastRow[dayCell])] = [
                      3,
                      [
                        lastRow[dayCell + 1],
                        row[dayCell + 1],
                        row[dayCell + 2],
                      ],
                      [
                        lastRow[dayCell + 3],
                        row[dayCell + 3],
                        row[dayCell + 4],
                      ],
                    ];
                  } else if (
                    lastRow[dayCell + 1] != undefined &&
                    row[dayCell + 4] != undefined
                  ) {
                    day[Number(lastRow[dayCell])] = [
                      4,
                      [
                        lastRow[dayCell + 1],
                        row[dayCell + 1],
                        row[dayCell + 4],
                      ],
                    ];
                  } else {
                    console.error(
                      "Невозможно явно обьявить случай расписание, Взят общий"
                    );
                    console.error(lastRow);
                    console.error(row);
                    console.error("Основа " + dayCell);
                    (day[Number(lastRow[dayCell])] = 4),
                      [
                        lastRow[dayCell + 1],
                        row[dayCell + 1],
                        row[dayCell + 4],
                      ];
                  }
                  lastTheme = false;
                }
                if (Number(row[dayCell]) > 0) {
                  lastTheme = true;
                  lastRow = row;
                }
                break outer;
              }
            }
          }
        }
      }
      return day;
    }

    function parse_Thursday() {
      let day = [[]];
      let can = false;
      let dayFind = false;
      let dayCell = 0;
      let lastTheme = false;
      let lastRow = [];
      for (let row of jsonData) {
        outer: for (let cell in row) {
          if (row[cell] == week_type) {
            can = true;
          }
          if (row[cell] == undertype) {
            can = false;
          }
          if (can) {
            if (row[cell] == "Четверг") {
              dayCell = Number(cell);
              dayFind = true;
            }
            if (dayFind) {
              if (row[dayCell] != undefined || lastTheme) {
                if (lastTheme) {
                  if (
                    lastRow[dayCell + 3] == undefined &&
                    row[dayCell + 4] == undefined
                  ) {
                    // 1 - Только первый
                    day[Number(lastRow[dayCell])] = [
                      1,
                      [
                        lastRow[dayCell + 1],
                        row[dayCell + 1],
                        row[dayCell + 2],
                      ],
                    ];
                  } else if (lastRow[dayCell + 1] == undefined) {
                    // 2 - Только второй
                    day[Number(lastRow[dayCell])] = [
                      2,
                      [
                        lastRow[dayCell + 3],
                        row[dayCell + 3],
                        row[dayCell + 4],
                      ],
                    ];
                  } else if (
                    lastRow[dayCell + 1] != undefined &&
                    lastRow[dayCell + 3] != undefined
                  ) {
                    //    3 - Первый и Второй
                    day[Number(lastRow[dayCell])] = [
                      3,
                      [
                        lastRow[dayCell + 1],
                        row[dayCell + 1],
                        row[dayCell + 2],
                      ],
                      [
                        lastRow[dayCell + 3],
                        row[dayCell + 3],
                        row[dayCell + 4],
                      ],
                    ];
                  } else if (
                    lastRow[dayCell + 1] != undefined &&
                    row[dayCell + 4] != undefined
                  ) {
                    day[Number(lastRow[dayCell])] = [
                      4,
                      [
                        lastRow[dayCell + 1],
                        row[dayCell + 1],
                        row[dayCell + 4],
                      ],
                    ];
                  } else {
                    console.error(
                      "Невозможно явно обьявить случай расписание, Взят общий"
                    );
                    console.error(lastRow);
                    console.error(row);
                    console.error("Основа " + dayCell);
                    (day[Number(lastRow[dayCell])] = 4),
                      [
                        lastRow[dayCell + 1],
                        row[dayCell + 1],
                        row[dayCell + 4],
                      ];
                  }
                  lastTheme = false;
                }
                if (Number(row[dayCell]) > 0) {
                  lastTheme = true;
                  lastRow = row;
                }
                break outer;
              }
            }
          }
        }
      }
      return day;
    }
    function parse_Friday() {
      let day = [[]];
      let can = false;
      let dayFind = false;
      let dayCell = 0;
      let lastTheme = false;
      let lastRow = [];
      for (let row of jsonData) {
        outer: for (let cell in row) {
          if (row[cell] == week_type) {
            can = true;
          }
          if (row[cell] == undertype) {
            can = false;
          }
          if (can) {
            if (row[cell] == "Пятница") {
              dayCell = Number(cell);
              dayFind = true;
            }
            if (dayFind) {
              if (row[dayCell] != undefined || lastTheme) {
                if (lastTheme) {
                  if (
                    lastRow[dayCell + 3] == undefined &&
                    row[dayCell + 4] == undefined
                  ) {
                    // 1 - Только первый
                    day[Number(lastRow[dayCell])] = [
                      1,
                      [
                        lastRow[dayCell + 1],
                        row[dayCell + 1],
                        row[dayCell + 2],
                      ],
                    ];
                  } else if (lastRow[dayCell + 1] == undefined) {
                    // 2 - Только второй
                    day[Number(lastRow[dayCell])] = [
                      2,
                      [
                        lastRow[dayCell + 3],
                        row[dayCell + 3],
                        row[dayCell + 4],
                      ],
                    ];
                  } else if (
                    lastRow[dayCell + 1] != undefined &&
                    lastRow[dayCell + 3] != undefined
                  ) {
                    //    3 - Первый и Второй
                    day[Number(lastRow[dayCell])] = [
                      3,
                      [
                        lastRow[dayCell + 1],
                        row[dayCell + 1],
                        row[dayCell + 2],
                      ],
                      [
                        lastRow[dayCell + 3],
                        row[dayCell + 3],
                        row[dayCell + 4],
                      ],
                    ];
                  } else if (
                    lastRow[dayCell + 1] != undefined &&
                    row[dayCell + 4] != undefined
                  ) {
                    day[Number(lastRow[dayCell])] = [
                      4,
                      [
                        lastRow[dayCell + 1],
                        row[dayCell + 1],
                        row[dayCell + 4],
                      ],
                    ];
                  } else {
                    console.error(
                      "Невозможно явно обьявить случай расписание, Взят общий"
                    );
                    console.error(lastRow);
                    console.error(row);
                    console.error("Основа " + dayCell);
                    (day[Number(lastRow[dayCell])] = 4),
                      [
                        lastRow[dayCell + 1],
                        row[dayCell + 1],
                        row[dayCell + 4],
                      ];
                  }
                  lastTheme = false;
                }
                if (Number(row[dayCell]) > 0) {
                  lastTheme = true;
                  lastRow = row;
                }
                break outer;
              }
            }
          }
        }
      }
      return day;
    }
    function parse_Saturday() {
      let day = [[]];
      let can = false;
      let dayFind = false;
      let dayCell = 0;
      let lastTheme = false;
      let lastRow = [];
      for (let row of jsonData) {
        outer: for (let cell in row) {
          if (row[cell] == week_type) {
            can = true;
          }
          if (row[cell] == undertype) {
            can = false;
          }
          if (can) {
            if (row[cell] == "Суббота") {
              dayCell = Number(cell);
              dayFind = true;
            }
            if (dayFind) {
              if (row[dayCell] != undefined || lastTheme) {
                if (lastTheme) {
                  if (
                    lastRow[dayCell + 3] == undefined &&
                    row[dayCell + 4] == undefined
                  ) {
                    // 1 - Только первый
                    day[Number(lastRow[dayCell])] = [
                      1,
                      [
                        lastRow[dayCell + 1],
                        row[dayCell + 1],
                        row[dayCell + 2],
                      ],
                    ];
                  } else if (lastRow[dayCell + 1] == undefined) {
                    // 2 - Только второй
                    day[Number(lastRow[dayCell])] = [
                      2,
                      [
                        lastRow[dayCell + 3],
                        row[dayCell + 3],
                        row[dayCell + 4],
                      ],
                    ];
                  } else if (
                    lastRow[dayCell + 1] != undefined &&
                    lastRow[dayCell + 3] != undefined
                  ) {
                    //    3 - Первый и Второй
                    day[Number(lastRow[dayCell])] = [
                      3,
                      [
                        lastRow[dayCell + 1],
                        row[dayCell + 1],
                        row[dayCell + 2],
                      ],
                      [
                        lastRow[dayCell + 3],
                        row[dayCell + 3],
                        row[dayCell + 4],
                      ],
                    ];
                  } else if (
                    lastRow[dayCell + 1] != undefined &&
                    row[dayCell + 4] != undefined
                  ) {
                    day[Number(lastRow[dayCell])] = [
                      4,
                      [
                        lastRow[dayCell + 1],
                        row[dayCell + 1],
                        row[dayCell + 4],
                      ],
                    ];
                  } else {
                    console.error(
                      "Невозможно явно обьявить случай расписание, Взят общий"
                    );
                    console.error(lastRow);
                    console.error(row);
                    console.error("Основа " + dayCell);
                    (day[Number(lastRow[dayCell])] = 4),
                      [
                        lastRow[dayCell + 1],
                        row[dayCell + 1],
                        row[dayCell + 4],
                      ];
                  }
                  lastTheme = false;
                }
                if (Number(row[dayCell]) > 0) {
                  lastTheme = true;
                  lastRow = row;
                }
                break outer;
              }
            }
          }
        }
      }
      return day;
    }

    let week_pars = [[]];
    let sunday = [[]];
    let monday = parse_Monday();
    let tuesday = parse_Tuesday();
    let wednesday = parse_Wednesday();
    let thursday = parse_Thursday();
    let friday = parse_Friday();
    let saturday = parse_Saturday();
    week_pars = [
      sunday,
      monday,
      tuesday,
      wednesday,
      thursday,
      friday,
      saturday,
    ];

    // Apply schedule changes
    const changesObj = parseChanges();
    changesObj.forEach(group => {
      if (group.name.toLowerCase() === groupsName.toLowerCase()) {
        if (group.firstday?.name?.toLowerCase() === "понедельник") {
          group.firstday.change.forEach((change, index) => {
            const formattedChange = formatChanges(change);
            if (formattedChange && week_pars[1][index + 1]) {  // Add check for week_pars
              const lessonNum = index + 1;
              // Add null check before accessing array index
              if (formattedChange[0] === week_pars[1][lessonNum]?.[0]) {
                if (formattedChange[1] === undefined) {
                  week_pars[1][lessonNum] = [formattedChange[0], ["Пара отменена", "", ""]];
                } else {
                  week_pars[1][lessonNum][1] = formattedChange[1];
                }
              }
            }
          });
        }
      }
    });
    today = new Date();
    let DayofWeek = today.getDay();
    for (let i = DayofWeek; i <= 3; i++) {
     const day = DaytoRus(i);
      const lessonInfo = week_pars[i];
    if (lessonInfo && lessonInfo.length > 0) {
      lessonInfo.forEach((info, index) => {
        if (info && info.length > 0) {
          const lessonNum = index;
          const [, [lesson, teacher, cabinet]] = info;

          const data = {
            group_name: groupsName,
            subgroup: 1,
            lesson_number: lessonNum,
            lesson: lesson,
            teacher: teacher,
            cabinet: cabinet,
            day_of_week: day,
          };
          connection.query(
              'INSERT INTO schedule (group_name, subgroup, lesson_number, lesson, teacher, cabinet, day_of_week) VALUES (?, ?, ?, ?, ?, ?, ?)',
              [data.group_name, data.subgroup, data.lesson_number, data.lesson, data.teacher, data.cabinet, data.day_of_week],
              (err) => {
                if (err) {
                  console.error('Ошибка при вставке данных:', err);
                }
              }
          );
        }
      })
    }
    }
    return week_pars;
    function DaytoRus(DayofWeek) {
      switch (DayofWeek) {
        case 0:
          return "";
          break;
        case 1:
          return "Понедельник";
          break;
        case 2:
          return "Вторник";
          break;
        case 3:
          return "Среда";
          break;
        case 4:
          return "Четверг";
          break;
        case 5:
          return "Пятница";
          break;
        case 6:
          return "Суббота";
          break;
      }
    }
  },


  output: function (msg, ungroup, week) {
    if (ungroup == "Первая") {
      ungroup = 1;
    } else if (ungroup == "Вторая") {
      ungroup = 2;
    }
    let today = new Date();
    DayofWeek = today.getDay();
    let message = "";
    if (DayofWeek <= 3) {
      for (DayofWeek; DayofWeek <= 3; DayofWeek++) {
        message += DaytoRus(DayofWeek) + "\n";
        // week[DayofWeek][Pars][Массив_ПАРЫ][ПАРА]
        for (let Pars = 1; Pars != 10; Pars++) {
          let temp = Acident(ungroup, week, DayofWeek, Pars) + "\n";
          if (temp != "undefined\n") {
            let formattedPars = formatNumberWithEmoji(Pars);
            message += formattedPars + " " + temp;
          }
        }
      }
    } else {
      for (DayofWeek; DayofWeek <= 6; DayofWeek++) {
        message += DaytoRus(DayofWeek) + "\n";
        //  week[DayofWeek][Pars][Массив_ПАРЫ][ПАРА]
        for (let Pars = 1; Pars != 10; Pars++) {
          let temp = Acident(ungroup, week, DayofWeek, Pars) + "\n";
          if (temp != "undefined\n") {
            let formattedPars = formatNumberWithEmoji(Pars);
            message += formattedPars + " " + temp;
          }
        }
      }
    }

    function DaytoRus(DayofWeek) {
      switch (DayofWeek) {
        case 0:
          return "";
          break;
        case 1:
          return "\nПонедельник";
          break;
        case 2:
          return "\nВторник";
          break;
        case 3:
          return "\nСреда";
          break;
        case 4:
          return "\nЧетверг";
          break;
        case 5:
          return "\nПятница";
          break;
        case 6:
          return "\nСуббота";
          break;
      }
    }

    function formatNumberWithEmoji(number) {
      const numberEmojis = [
        "1️⃣",
        "2️⃣",
        "3️⃣",
        "4️⃣",
        "5️⃣",
        "6️⃣",
        "7️⃣",
      ];
      const numberString = String(number);
      let formattedNumber = "";
      for (let i = 0; i < numberString.length; i++) {
        let digit = Number(numberString[i]);
        formattedNumber += numberEmojis[digit - 1];
      }
      return formattedNumber;
    }

    msg.send(message)
    function Acident(ungroup, week, DayofWeek, Pars) {
      if (week[DayofWeek][Pars] != undefined) {
        if (ungroup == 1) {
          switch (week[DayofWeek][Pars][0]) {
            case 1:
            case 3:
            case 4:
              // парс это номер пары , week [DayofWeek][Pars][1][0] название пары,  week[DayofWeek][Pars][1][1] кто ведёт пару, week[DayofWeek][Pars][1][2] кабинет
              return (
                " " +
                week[DayofWeek][Pars][1][0] +
                " " +
                "🎓" +
                week[DayofWeek][Pars][1][1] +
                " " +
                "🚪" +
                week[DayofWeek][Pars][1][2]
              );
              break;
            case 2:
              return undefined;
              break;
            case 0:
                `Пара отменена ❌`
          }
        } else if (ungroup == 2) {
          switch (week[DayofWeek][Pars][0]) {
            case 1:
              return undefined;
              break;
            case 2:
            case 4:
              return (
                " " +
                week[DayofWeek][Pars][1][0] +
                " " +
                "🎓" +
                week[DayofWeek][Pars][1][1] +
                " " +
                "🚪" +
                week[DayofWeek][Pars][1][2]
              );
              break;
            case 3:
              return (
                " " +
                week[DayofWeek][Pars][2][0] +
                " " +
                "🎓" +
                week[DayofWeek][Pars][2][1] +
                " " +
                "🚪" +
                week[DayofWeek][Pars][2][2]
              );
          }
        }
      }
    }
    // message = message.split(`\n`);
    // console.log(message);
    // msg.send(message)
  },
};
