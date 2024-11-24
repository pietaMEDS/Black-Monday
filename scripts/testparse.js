let week_type;
let groupsName = "испвк-21-1";
const XLSX = require("xlsx");
const { parseChanges, formatChanges } = require("./changes");

const workbook = XLSX.readFile("../data/groups/" + groupsName + "/data.xlsx");
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
                  [lastRow[dayCell + 1], row[dayCell + 1], row[dayCell + 2]],
                ];
              } else if (lastRow[dayCell + 1] == undefined) {
                // 2 - Только второй
                day[Number(lastRow[dayCell])] = [
                  2,
                  [lastRow[dayCell + 3], row[dayCell + 3], row[dayCell + 4]],
                ];
              } else if (
                lastRow[dayCell + 1] != undefined &&
                lastRow[dayCell + 3] != undefined
              ) {
                //    3 - Первый и Второй
                day[Number(lastRow[dayCell])] = [
                  3,
                  [lastRow[dayCell + 1], row[dayCell + 1], row[dayCell + 2]],
                  [lastRow[dayCell + 3], row[dayCell + 3], row[dayCell + 4]],
                ];
              } else if (
                lastRow[dayCell + 1] != undefined &&
                row[dayCell + 4] != undefined
              ) {
                day[Number(lastRow[dayCell])] = [
                  4,
                  [lastRow[dayCell + 1], row[dayCell + 1], row[dayCell + 4]],
                ];
              } else {
                console.error(
                  "Невозможно явно обьявить случай расписания, Взят общий"
                );
                console.error(lastRow);
                console.error(row);
                console.error("Основа " + dayCell);
                (day[Number(lastRow[dayCell])] = 4),
                  [lastRow[dayCell + 1], row[dayCell + 1], row[dayCell + 4]];
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
                  [lastRow[dayCell + 1], row[dayCell + 1], row[dayCell + 2]],
                ];
              } else if (lastRow[dayCell + 1] == undefined) {
                // 2 - Только второй
                day[Number(lastRow[dayCell])] = [
                  2,
                  [lastRow[dayCell + 3], row[dayCell + 3], row[dayCell + 4]],
                ];
              } else if (
                lastRow[dayCell + 1] != undefined &&
                lastRow[dayCell + 3] != undefined
              ) {
                //    3 - Первый и Второй
                day[Number(lastRow[dayCell])] = [
                  3,
                  [lastRow[dayCell + 1], row[dayCell + 1], row[dayCell + 2]],
                  [lastRow[dayCell + 3], row[dayCell + 3], row[dayCell + 4]],
                ];
              } else if (
                lastRow[dayCell + 1] != undefined &&
                row[dayCell + 4] != undefined
              ) {
                day[Number(lastRow[dayCell])] = [
                  4,
                  [lastRow[dayCell + 1], row[dayCell + 1], row[dayCell + 4]],
                ];
              } else {
                console.error(
                  "Невозможно явно обьявить случай расписание, Взят общий"
                );
                console.error(lastRow);
                console.error(row);
                console.error("Основа " + dayCell);
                (day[Number(lastRow[dayCell])] = 4),
                  [lastRow[dayCell + 1], row[dayCell + 1], row[dayCell + 4]];
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
                  [lastRow[dayCell + 1], row[dayCell + 1], row[dayCell + 2]],
                ];
              } else if (lastRow[dayCell + 1] == undefined) {
                // 2 - Только второй
                day[Number(lastRow[dayCell])] = [
                  2,
                  [lastRow[dayCell + 3], row[dayCell + 3], row[dayCell + 4]],
                ];
              } else if (
                lastRow[dayCell + 1] != undefined &&
                lastRow[dayCell + 3] != undefined
              ) {
                //    3 - Первый и Второй
                day[Number(lastRow[dayCell])] = [
                  3,
                  [lastRow[dayCell + 1], row[dayCell + 1], row[dayCell + 2]],
                  [lastRow[dayCell + 3], row[dayCell + 3], row[dayCell + 4]],
                ];
              } else if (
                lastRow[dayCell + 1] != undefined &&
                row[dayCell + 4] != undefined
              ) {
                day[Number(lastRow[dayCell])] = [
                  4,
                  [lastRow[dayCell + 1], row[dayCell + 1], row[dayCell + 4]],
                ];
              } else {
                console.error(
                  "Невозможно явно обьявить случай расписание, Взят общий"
                );
                console.error(lastRow);
                console.error(row);
                console.error("Основа " + dayCell);
                (day[Number(lastRow[dayCell])] = 4),
                  [lastRow[dayCell + 1], row[dayCell + 1], row[dayCell + 4]];
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
                  [lastRow[dayCell + 1], row[dayCell + 1], row[dayCell + 2]],
                ];
              } else if (lastRow[dayCell + 1] == undefined) {
                // 2 - Только второй
                day[Number(lastRow[dayCell])] = [
                  2,
                  [lastRow[dayCell + 3], row[dayCell + 3], row[dayCell + 4]],
                ];
              } else if (
                lastRow[dayCell + 1] != undefined &&
                lastRow[dayCell + 3] != undefined
              ) {
                //    3 - Первый и Второй
                day[Number(lastRow[dayCell])] = [
                  3,
                  [lastRow[dayCell + 1], row[dayCell + 1], row[dayCell + 2]],
                  [lastRow[dayCell + 3], row[dayCell + 3], row[dayCell + 4]],
                ];
              } else if (
                lastRow[dayCell + 1] != undefined &&
                row[dayCell + 4] != undefined
              ) {
                day[Number(lastRow[dayCell])] = [
                  4,
                  [lastRow[dayCell + 1], row[dayCell + 1], row[dayCell + 4]],
                ];
              } else {
                console.error(
                  "Невозможно явно обьявить случай расписание, Взят общий"
                );
                console.error(lastRow);
                console.error(row);
                console.error("Основа " + dayCell);
                (day[Number(lastRow[dayCell])] = 4),
                  [lastRow[dayCell + 1], row[dayCell + 1], row[dayCell + 4]];
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
                  [lastRow[dayCell + 1], row[dayCell + 1], row[dayCell + 2]],
                ];
              } else if (lastRow[dayCell + 1] == undefined) {
                // 2 - Только второй
                day[Number(lastRow[dayCell])] = [
                  2,
                  [lastRow[dayCell + 3], row[dayCell + 3], row[dayCell + 4]],
                ];
              } else if (
                lastRow[dayCell + 1] != undefined &&
                lastRow[dayCell + 3] != undefined
              ) {
                //    3 - Первый и Второй
                day[Number(lastRow[dayCell])] = [
                  3,
                  [lastRow[dayCell + 1], row[dayCell + 1], row[dayCell + 2]],
                  [lastRow[dayCell + 3], row[dayCell + 3], row[dayCell + 4]],
                ];
              } else if (
                lastRow[dayCell + 1] != undefined &&
                row[dayCell + 4] != undefined
              ) {
                day[Number(lastRow[dayCell])] = [
                  4,
                  [lastRow[dayCell + 1], row[dayCell + 1], row[dayCell + 4]],
                ];
              } else {
                console.error(
                  "Невозможно явно обьявить случай расписание, Взят общий"
                );
                console.error(lastRow);
                console.error(row);
                console.error("Основа " + dayCell);
                (day[Number(lastRow[dayCell])] = 4),
                  [lastRow[dayCell + 1], row[dayCell + 1], row[dayCell + 4]];
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
                  [lastRow[dayCell + 1], row[dayCell + 1], row[dayCell + 2]],
                ];
              } else if (lastRow[dayCell + 1] == undefined) {
                // 2 - Только второй
                day[Number(lastRow[dayCell])] = [
                  2,
                  [lastRow[dayCell + 3], row[dayCell + 3], row[dayCell + 4]],
                ];
              } else if (
                lastRow[dayCell + 1] != undefined &&
                lastRow[dayCell + 3] != undefined
              ) {
                //    3 - Первый и Второй
                day[Number(lastRow[dayCell])] = [
                  3,
                  [lastRow[dayCell + 1], row[dayCell + 1], row[dayCell + 2]],
                  [lastRow[dayCell + 3], row[dayCell + 3], row[dayCell + 4]],
                ];
              } else if (
                lastRow[dayCell + 1] != undefined &&
                row[dayCell + 4] != undefined
              ) {
                day[Number(lastRow[dayCell])] = [
                  4,
                  [lastRow[dayCell + 1], row[dayCell + 1], row[dayCell + 4]],
                ];
              } else {
                console.error(
                  "Невозможно явно обьявить случай расписание, Взят общий"
                );
                console.error(lastRow);
                console.error(row);
                console.error("Основа " + dayCell);
                (day[Number(lastRow[dayCell])] = 4),
                  [lastRow[dayCell + 1], row[dayCell + 1], row[dayCell + 4]];
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
week_pars = [sunday, monday, tuesday, wednesday, thursday, friday, saturday];
let changesObj = parseChanges();

// console.log(week_pars[1][2]);

changesObj.forEach(group => {
    if (group.name.toLowerCase() == groupsName.toLowerCase()) {
        if (group.firstday.name.toLowerCase() == "понедельник") {
            group.firstday.change.forEach((el, elkey) => {
                // console.log(formatChanges(el))
                // console.log("Пара: "+(elkey+1));
                // week_pars[1][elkey+1] = formatChanges(el)

                let formatedChanges = formatChanges(el)
                if (formatedChanges!=undefined) {
                  if (formatedChanges[0]==week_pars[1][elkey+1][0]) {
                    if (formatedChanges[1][1]==undefined) {
                      week_pars[1][elkey+1][0] = 0
                      week_pars[1][elkey+1][1] = ["Пара отменена", "", ""]
                    }
                    week_pars[1][elkey+1][1] = formatedChanges[1]
                  }
                }
                // console.log("Merging:");
                // console.log(week_pars[1][elkey+1][1]);
                // console.log(formatChanges(el)[1]);
            })
            // console.log(week_pars[1]);
        }
    }
});
