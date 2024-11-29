
const fs = require('fs');
const path = "./data/groups/";
const XLSX = require('xlsx');
let groups = [];


        //     let work = fs.readdir(path, (err, files) => {
        //         files.forEach(file => {
        //             for(let i = 0; i!=files.length; i++){
        //                 groups[i] = file;
        //             }
        //         });
        //         console.log(groups);
        //     });
        //     console.log(groups);

        //     for(group in groups){
        //         if(group != undefined){
        //             let workbook = XLSX.readFile('./data/groups/' + group + '/data.xlsx');
        //             console.log(workbook);
        //         }
        //     }


        //     const XLSX = require('xlsx');
        // let workbook = XLSX.readFile('./data/groups/' + groupsName+ '/data.xlsx');

/************************
 * SQL sort on day here *
 ************************/