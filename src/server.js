import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebroutes from './route/web';
import connectDB from './config/connectDB';
import cors from 'cors';
import moment from "moment";
import { rejects } from "assert";
const fs = require('fs');
require('dotenv').config();
//input library here

//end
let app = express();
app.use(cors({ credentials: true, origin: true }));


app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit:'50mb',extended: true}));

viewEngine(app);
initWebroutes(app);
connectDB();


//input code here

// read event log
// const { exec } = require('child_process');
// exec('PowerShell.exe Get-EventLog -Newest 50 -LogName "Application"', (error, stdout, stderr) => {
//   if (error) {
//     console.error(`exec error: ${error}`);
//     return;
//   }
//   console.log(`stdout: ${stdout}`);
//   console.log(`stderr: ${stderr}`);
// });
// end
let port = process.env.PORT || 6969;
//port === undifined => port =6969

app.listen(port, () =>{
    //callback
    console.log("Backend is running on port: "+port)
})
