module.exports = {
  parseChanges: function () {
    XLSX = require("xlsx");
    workbook = XLSX.readFile("./data/changes/data.xlsx");
    sheetNames = workbook.SheetNames;
    worksheet = workbook.Sheets[sheetNames[0]];
    jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    let groupPattern = /[а-яА-Я]{0,}[-][0-9]{2,}[-][0-9]{1,}/;
    let doorPattern = /[А-Я]{1}[0-9]{3}/;

    const changesObj = [];

    jsonData.forEach((row, rowkey) => {
      row.forEach((cell, cellkey) => {
        if (groupPattern.test(cell)) {
          changesObj.push({
            name: cell,
            firstday: {
              name: jsonData[1][0],
              change: [
                jsonData[rowkey + 1][cellkey],
                jsonData[rowkey + 2][cellkey],
                jsonData[rowkey + 3][cellkey],
                jsonData[rowkey + 4][cellkey],
                jsonData[rowkey + 5][cellkey],
                jsonData[rowkey + 6][cellkey],
                jsonData[rowkey + 7][cellkey],
              ],
            },
            secondday: {
              name: jsonData[9][0],
              change: [
                jsonData[rowkey + 9][cellkey],
                jsonData[rowkey + 10][cellkey],
                jsonData[rowkey + 11][cellkey],
                jsonData[rowkey + 12][cellkey],
                jsonData[rowkey + 13][cellkey],
                jsonData[rowkey + 14][cellkey],
                jsonData[rowkey + 15][cellkey],
              ],
            },
            thirdday: {
              name: jsonData[17][0],
              change: [
                jsonData[rowkey + 17][cellkey],
                jsonData[rowkey + 18][cellkey],
                jsonData[rowkey + 19][cellkey],
                jsonData[rowkey + 20][cellkey],
                jsonData[rowkey + 21][cellkey],
                jsonData[rowkey + 22][cellkey],
                jsonData[rowkey + 23][cellkey],
              ],
            },
          });
        }
      });
    });

    return changesObj;
  },

  formatChanges: function(change){
    let doorPattern = /[А-Я]{1}[0-9]{3}/;
    let result = []
    result[1] = []

    console.log(change);

    if(change!=undefined){
      // console.log(change);
      // console.log(change.trim().split(`\r\n`));
      switch(change.trim().split(`\r\n`).length){
        case 1:
          result[0] = 4;
          result[1] = undefined;
          break;
        case 2:
          if(change.trim().split(`\r\n`)[0].trim().slice(2)=="1." || change.trim().split(`\r\n`)[0].trim().slice(2)=="2."){
            if(change.trim().split(`\r\n`)[0].trim().slice(2)=="1."){
              result[0] = 1;
              result[1][0] = change.trim().split(`\r\n`)[0].trim().slice(0, -4).trim();
              result[1][1] = change.trim().split(`\r\n`)[1];
              result[1][2] = change.trim().split(`\r\n`)[0].trim().slice(-4);
            }
            else{
              result[0] = 2;

              result[1][0] = change.trim().split(`\r\n`)[0].trim().slice(0, -4).trim();
              result[1][1] = change.trim().split(`\r\n`)[1];
              result[1][2] = change.trim().split(`\r\n`)[0].trim().slice(-4);
            }
          }
          else{
            result[0] = 4;
            if(doorPattern.test(change.trim().split(`\r\n`)[0].trim().slice(-4))){
              result[1][1] = change.trim().split(`\r\n`)[1];
              result[1][2] = change.trim().split(`\r\n`)[0].trim().slice(-4)
              result[1][0] = change.trim().split(`\r\n`)[0].slice(0, -4).trim();
            }
            else{
              result[1][1] = change.trim().split(`\r\n`)[1];
              result[1][0] = change.trim().split(`\r\n`)[0].trim();
              result[1][2] = undefined;
            }
          }
          break;
        case 3:
          let parsed = change.trim().split(`\r\n`);
          result[1] = [[], []];
          result[0] = 3;
          if(parsed[0].slice(-2)=="--"){
            result[1][0] = undefined;
            if(doorPattern.test(parsed[1].trim().slice(-4))){
              result[1][1][0] = parsed[1].trim().slice(0, -4).trim();
              result[1][1][2] = parsed[1].trim().slice(-4);
              result[1][1][1] = parsed[2].trim();
            }
            else{
              result[1][1][0] = parsed[1].trim();
              result[1][1][2] = undefined;
              result[1][1][1] = parsed[2].trim();
            }
          }
          else if(parsed[2].slice(-2)=="--"){
            result[1][1] = undefined;
            if(doorPattern.test(parsed[0].trim().slice(-4))){
              result[1][0][0] = parsed[0].trim().slice(0, -4).trim();
              result[1][0][2] = parsed[0].trim().slice(-4);
              result[1][0][1] = parsed[1].trim();
            }
            else{
              result[1][0][0] = parsed[1].trim();
              result[1][0][2] = undefined;
              result[1][0][1] = parsed[2].trim();
            }
          }
        break;
        case 4:
          if(doorPattern.test(parsed[0].trim().slice(-4))){
            result[1][0][0] = parsed[0].trim().slice(0, -4).trim();
            result[1][0][2] = parsed[0].trim().slice(-4);
            result[1][0][1] = parsed[1].trim();
          }
          else{
            result[1][0][0] = parsed[0].trim();
            result[1][0][2] = undefined;
            result[1][0][1] = parsed[1].trim();
          }

          if(doorPattern.test(parsed[2].trim().slice(-4))){
            result[1][1][0] = parsed[2].trim().slice(0, -4).trim();
            result[1][1][2] = parsed[2].trim().slice(-4);
            result[1][1][1] = parsed[3].trim();
          } else {
            result[1][1][0] = parsed[2].trim();
            result[1][1][2] = undefined;
            result[1][1][1] = parsed[3].trim();
          }
        break;
      }
      console.log(result);
        return result;
  }
}
}
