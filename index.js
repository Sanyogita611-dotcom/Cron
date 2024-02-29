const express = require('express');
const app = express();
const cron = require('node-cron');
const sql = require('mssql');

var config = {
  "server": "SANYOGITA",
		"database": "CSVUpload",
		"user": "sa",
		"password": "Admin@123",
		"port": 1433,
		"connectionTimeout": 6000000,
        "requestTimeout": 6000000,
		"options": {
			"encrypt": false
		}
};


cron.schedule('*/10 * * * * *', () => {
  var t1=((Math.random()*100)+100).toFixed(0)
  var t2=((Math.random()*100)+100).toFixed(0)
  var t3=((Math.random()*100)+100).toFixed(0)
    console.log('Printing this line every minute in the terminal');

console.log('values t1='+t1+',t2='+t2+',t3='+t3)

var dbConn = new sql.ConnectionPool(config);
//5.
dbConn.connect()
.then(function () {
    //6.
    var request = new sql.Request(dbConn);
    //7.
    request.query("INSERT INTO [dbo].[cronjob]([DateTime],[T1],[T2],[T3]) VALUES ('2022-08-24 16:43:00.000' ,"+t1+","+t2+","+t3+")").then(function (recordSet) {
        console.log(recordSet);
        dbConn.close();
    }).catch(function (err) {
        //8.
        console.log(err);
        dbConn.close();
    });
}).catch(function (err) {
    //9.
    console.log(err);
});
});

