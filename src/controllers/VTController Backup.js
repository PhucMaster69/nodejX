import VTService from '../services/VTService';
import moment from 'moment/moment';
const XLSX = require('xlsx')
const ExcelJS = require('exceljs')
const fs = require('fs')
const { ChartJSNodeCanvas } = require('chartjs-node-canvas');
import 'chartjs-adapter-moment';
const width = 1920;
const height = 1080;
const backgroundColour = 'white';
const chartJSNodeCanvas = new ChartJSNodeCanvas({width, height, backgroundColour})
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
let handleGetTagMapping = async (req, res) => {
    let data = await VTService.getTagnameMapping();
    if(data){   
        return res.status(200).json({
            errCode: 0,
            message: 'OK',
            data
        })
    }else{
        return res.status(200).json({
            errCode: 1,
            message: 'Connection lost.',
            data: []
        })
    }
}
let handleGetTagId= async (req, res) => {
    let data = await VTService.getTagId();
    if(data){   
        return res.status(200).json({
            errCode: 0,
            message: 'OK',
            data
        })
    }else{
        return res.status(200).json({
            errCode: 1,
            message: 'Connection lost.',
            data: []
        })
    }
}
let handleGetLoggedData = async (req, res) => {
    if(!req.body.code || !req.body.lowlim || !req.body.highlim){
        return res.status(200).json({
            errCode: 2,
            message: 'Missing parameter',
            data: req.body
        })
    }else{
        let data = await VTService.getLoggedData(req.body)
        if(data === 'Bad'){
            return res.status(200).json({
                errCode: 3,
                message: 'Unavailable',
                data: []
            })
        }else{
            return res.status(200).json({
                errCode: 0,
                message: 'OK',
                data
            })
        }
    }
}
let handleWriteReportAuto = async (stream) => {
    let cfg = {}
    try {
        cfg = JSON.parse(fs.readFileSync('src/assets/xlsx/config.txt','utf8'));
    } catch (e) {
        console.log(e);
    }
    let data = stream.dataPoint;
    let setting = stream.setting;
    let mold = stream.mold;
    let id = stream.id;
    let config = cfg.filter(function(el) {return el.mold == mold})
    let combined = []
    for (let n = 0; n < data.length; n++) {
        for (let m = 0; m < setting.length; m++) {
            if(setting[m].dataPointID === data[n].id){
                combined.push({
                    id: data[n].id,
                    type: setting[m].type,
                    name: data[n].name,
                    qID: data[n].qID,
                    ver: setting[m].ver,
                    loc: setting[m].loc,
                    hlim: setting[m].hlimAbs,
                    llim: setting[m].llimAbs,
                })
            }
        }    
    };
    let write = false;
    let hasFile = false
    let no = moment().format('dddd, MMMM Do YYYY, k mm ss')
    let wb = new ExcelJS.Workbook();
    await wb.xlsx.readFile(`src/assets/xlsx/${config[0].workbook}.xlsx`).then(() => {
        hasFile = true;
    }).catch(err => {
        console.log(err.message)
    })
    for (let z = 0; z < combined.length; z++) {
        if(combined[z].type === 'Latest value'){
            let transfer = {
                code: 'code',
                arr: [combined[z].qID],
                highlim: moment().format('X'),
                lowlim: moment().subtract(30, 'minutes').format('X')
            }
            hasFile && await VTService.getLoggedData(transfer).then((res) => {
                // console.log(res)
                let response = res.filter(function(el) {
                    return el.Value != null;
                })
                let n = response.length - 1;
                let val = response[n] ? response[n].Value.toFixed(3) : '';
                // console.log(res[n].Value, combined[z].loc);
                let ws = wb.getWorksheet(`${config[0].sheet}`);
                let cell = ws.getCell(combined[z].loc);
                cell.value = val
                if(z === combined.length - 1){
                    write = true;
                }
            })
        }else if(combined[z].type === 'Diff from time'){
            let lowlim = '';
            if(combined[z].ver === 'Start of day'){
            lowlim = moment().startOf('day').format('X');
            }else if(combined[z].ver === 'Start of week'){
                lowlim = moment().startOf('week').format('X');
            }else if(combined[z].ver === 'Start of month'){
                lowlim = moment().startOf('month').format('X');
            }
            let transfer = {
                code: 'code',
                arr: [combined[z].qID],
                highlim: moment().format('X'),
                lowlim: lowlim
            }
            hasFile && await VTService.getLoggedData(transfer).then((res) => {
                // console.log(res)
                let response = res.filter(function(el) {
                    return el.Value != null;
                })
                let n = response.length - 1;
                let highval = response[n] ? response[n].Value.toFixed(3) : '0';
                let lowval = response[0] ? response[0].Value.toFixed(3) : '0';
                let val = highval - lowval;
                // console.log(highval, lowval, moment().startOf('week').format('X'));
                let ws = wb.getWorksheet(`${config[0].sheet}`);
                let cell = ws.getCell(combined[z].loc);
                cell.value = val
                // XLSX.utils.sheet_add_aoa(ws, [
                //     [val],
                // ], {origin: `${combined[z].loc}`});
                if(z === combined.length - 1){
                    write = true;
                }
            })
        }
    }
    write && await wb.xlsx.writeFile(`src/assets/xlsx/Auto Report ${no}.xlsx`).then(() => {
       return 'OK';
    })
}
let handleWriteReport = async(req, res) => {
    if(!req.body.dataPoint || !req.body.setting){
        return res.status(200).json({
            errCode: 2,
            message: 'Missing parameter',
        })
    }else{
        let cfg = {}
        try {
            cfg = JSON.parse(fs.readFileSync('src/assets/xlsx/config.txt','utf8'));
        } catch (e) {
            console.log(e);
        }
        let data = req.body.dataPoint;
        let setting = req.body.setting;
        let mold = req.body.mold;
        let config = cfg.filter(function(el) {return el.mold == mold})
        let combined = []
        for (let n = 0; n < data.length; n++) {
            for (let m = 0; m < setting.length; m++) {
                if(setting[m].dataPointID === data[n].id){
                    combined.push({
                        id: data[n].id,
                        type: setting[m].type,
                        name: data[n].name,
                        qID: data[n].qID,
                        ver: setting[m].ver,
                        loc: setting[m].loc,
                        hlim: setting[m].hlimAbs,
                        llim: setting[m].llimAbs,
                    })
                }
            }    
        };
        let write = false;
        let hasFile = false
        let no = moment().format('dddd, MMMM Do YYYY, k mm ss')
        let wb = new ExcelJS.Workbook();
        await wb.xlsx.readFile(`src/assets/xlsx/${config[0].workbook}.xlsx`).then(() => {
            hasFile = true;
        }).catch(err => {
            console.log(err.message)
        })
        for (let z = 0; z < combined.length; z++) {
            if(combined[z].type === 'Latest value'){
                let transfer = {
                    code: 'code',
                    arr: [combined[z].qID],
                    highlim: moment().format('X'),
                    lowlim: moment().subtract(30, 'minutes').format('X')
                }
                hasFile && await VTService.getLoggedData(transfer).then((res) => {
                    // console.log(res)
                    let response = res.filter(function(el) {
                        return el.Value != null;
                    })
                    let n = response.length - 1;
                    let val = response[n] ? response[n].Value.toFixed(3) : '';
                    // console.log(res[n].Value, combined[z].loc);
                    let ws = wb.getWorksheet(`${config[0].sheet}`);
                    let cell = ws.getCell(combined[z].loc);
                    cell.value = val
                    if(z === combined.length - 1){
                        write = true;
                    }
                })
            }else if(combined[z].type === 'Diff from time'){
                let lowlim = '';
                if(combined[z].ver === 'Start of day'){
                    lowlim = moment().startOf('day').format('X');
                }else if(combined[z].ver === 'Start of week'){
                    lowlim = moment().startOf('week').format('X');
                }else if(combined[z].ver === 'Start of month'){
                    lowlim = moment().startOf('month').format('X');
                }
                let transfer = {
                    code: 'code',
                    arr: [combined[z].qID],
                    highlim: moment().format('X'),
                    lowlim: lowlim
                }
                hasFile && await VTService.getLoggedData(transfer).then((res) => {
                    // console.log(res)
                    let response = res.filter(function(el) {
                        return el.Value != null;
                    })
                    let n = response.length - 1;
                    let highval = response[n] ? response[n].Value.toFixed(3) : '0';
                    let lowval = response[0] ? response[0].Value.toFixed(3) : '0';
                    let val = highval - lowval;
                    // console.log(res);
                    let ws = wb.getWorksheet(`${config[0].sheet}`);
                    let cell = ws.getCell(combined[z].loc);
                    cell.value = val
                    // XLSX.utils.sheet_add_aoa(ws, [
                    //     [val],
                    // ], {origin: `${combined[z].loc}`});
                    if(z === combined.length - 1){
                        write = true;
                    }
                })
            }
        }
        write && await wb.xlsx.writeFile(`src/assets/xlsx/Generated Report ${no}.xlsx`).then(() => {
           require('child_process').exec('start "" "d:\\Sanofi\\nodeCore\\src\\assets\\xlsx"');
        })
        
        return res.status(200).json({
            errCode: 0,
            message: 'OK'
        });
    }
}
let handleWriteWatchlist = async(req, res) => {
    if(!req.body){
        return res.status(200).json({
            errCode: 2,
            message: 'Missing parameter',
        })
    }else{
        fs.writeFileSync('src/assets/xlsx/watchlist.txt', JSON.stringify(req.body), 'utf8',function (err) {
            if (err) {
                return res.status(200).json({
                    errCode: 3,
                    message: err,
                });
            }})
        return res.status(200).json({
            errCode: 0,
            message: 'OK'
        })
    }
}
let handleReadWatchlist = async(req, res) => {
    let data = {}
    try {
        data = JSON.parse(fs.readFileSync('src/assets/xlsx/watchlist.txt','utf8'));
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: 1,
            message: 'Not OK',
            data: {}
        })
    }
    return res.status(200).json({
        errCode: 0,
        message: 'OK',
        data
    })
}
let handleWriteGraphList = async(req, res) => {
    if(!req.body){
        return res.status(200).json({
            errCode: 2,
            message: 'Missing parameter',
        })
    }else{
        fs.writeFileSync('src/assets/xlsx/graph.txt', JSON.stringify(req.body), 'utf8',function (err) {
            if (err) {
                return res.status(200).json({
                    errCode: 3,
                    message: err,
                });
            }})
        return res.status(200).json({
            errCode: 0,
            message: 'OK'
        })
    }
}
let handleReadGraphList = async(req, res) => {
    let data = {}
    try {
        data = JSON.parse(fs.readFileSync('src/assets/xlsx/graph.txt','utf8'));
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: 1,
            message: 'Not OK',
            data: {}
        })
    }
    return res.status(200).json({
        errCode: 0,
        message: 'OK',
        data
    })
}
let handleReadMoldList = async(req, res) => {
    let data = {}
    try {
        data = JSON.parse(fs.readFileSync('src/assets/xlsx/config.txt','utf8'));
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: 1,
            message: 'Not OK',
            data: {}
        })
    }
    return res.status(200).json({
        errCode: 0,
        message: 'OK',
        data
    })
}
let handleUploadFormReport = async(req, res) => {
    let wb = XLSX.readFile('src/assets/xlsx/ReportBook.xlsx');
    let buf = XLSX.write(wb, {type:'base64', bookType:'xlsx'});
    res.attachment('ReportBook.xlsx');
    res.status(200).end(buf);
}
let handleRevChartData = async(req, res) => {
    if(!req.body.setting){
        return res.status(200).json({
            errCode: 2,
            message: 'Missing parameter',
            data: []
        })
    }else{
        let data;
        let setting = req.body.setting;
        let graType = setting.curRelGraType;
        let openType = setting.currentGraphStartType;
        let closeType = setting.currentGraphFinishType;
        let startAbs = setting.graphStartAbs;
        let closeAbs = setting.graphFinishAbs;
        let relTime = setting.relGraTime;
        let relTimeE = setting.relGraTimeE;
        let relDay = setting.relGraDay;
        let relDayE = setting.relGraDayE;
        let tag = setting.tag;
        let id = setting.id;
        let low = '';
        let high = '';
        if(closeType == 'Cur'){
            high = moment().format('X')
        }else if(closeType == 'Abs'){
            high = closeAbs;
        }else if(closeType == 'Rel'){
            if(graType == 'Daily'){
                let startD = moment().startOf('day').format('X');
                let arr = relTimeE.split(':');
                let hour = arr[0]*1*3600;
                let min = arr[1]*1*60;
                high = parseFloat(startD) + parseFloat(hour) + parseFloat(min);
            }else if(graType == 'Weekly'){
                let bonus = ''
                let startD = moment().startOf('week').format('X');
                if(relDayE == 'Neutral' || relDayE == 'Monday'){
                    bonus = 0;
                }else if(relDayE == 'Tuesday'){
                    bonus = 86400;
                }else if(relDayE == 'Wednesday'){
                    bonus = 86400*2;
                }else if(relDayE == 'Thursday'){
                    bonus = 86400*3;
                }else if(relDayE == 'Friday'){
                    bonus = 86400*4;
                }else if(relDayE == 'Saturday'){
                    bonus = 86400*5;
                }else{
                    bonus = 86400*6;
                }
                let arr = relTimeE.split(':');
                let hour = arr[0]*1*3600;
                let min = arr[1]*1*60;
                high = parseFloat(bonus) + parseFloat(startD) + parseFloat(hour) + parseFloat(min);
            }else if(graType == 'Monthly'){
                let bonus = '';
                let startD = moment().startOf('month').format('X');
                if(relDayE == 'Neutral'){
                    bonus = 0;
                }else if(relDayE == 'End of month'){
                    let d = moment().endOf('month').format('D');
                    bonus = d*86400;
                }else{
                    bonus = (relDayE - 1)*86400;
                }
                let arr = relTimeE.split(':');
                let hour = arr[0]*1*3600;
                let min = arr[1]*1*60;
                high = parseFloat(bonus) + parseFloat(startD) + parseFloat(hour) + parseFloat(min);
            }
        }
        if(openType == 'Abs'){
            low = startAbs;
        }else if(openType == 'Rel'){
            if(graType == 'Daily'){
                let startD = moment().startOf('day').format('X');
                let arr = relTime.split(':');
                let hour = arr[0]*1*3600;
                let min = arr[1]*1*60;
                low = parseFloat(startD) + parseFloat(hour) + parseFloat(min);
            }else if(graType == 'Weekly'){
                let bonus = ''
                let startD = moment().startOf('week').format('X');
                if(relDay == 'Neutral' || relDay == 'Monday'){
                    bonus = 86400;
                }else if(relDay == 'Tuesday'){
                    bonus = 86400*2;
                }else if(relDay == 'Wednesday'){
                    bonus = 86400*3;
                }else if(relDay == 'Thursday'){
                    bonus = 86400*4;
                }else if(relDay == 'Friday'){
                    bonus = 86400*5;
                }else if(relDay == 'Saturday'){
                    bonus = 86400*6;
                }else{
                    bonus = 86400*7;
                }
                let arr = relTime.split(':');
                let hour = arr[0]*1*3600;
                let min = arr[1]*1*60;
                low = parseFloat(bonus) + parseFloat(startD) + parseFloat(hour) + parseFloat(min);
            }else if(graType == 'Monthly'){
                let bonus = '';
                let startD = moment().startOf('month').format('X');
                if(relDay == 'Neutral'){
                    bonus = 0;
                }else if(relDay == 'End of month'){
                    let d = moment().endOf('month').format('D');
                    bonus = d*86400;
                }else{
                    bonus = (relDay - 1)*86400;
                }
                let arr = relTime.split(':');
                let hour = arr[0]*1*3600;
                let min = arr[1]*1*60;
                low = parseFloat(bonus) + parseFloat(startD) + parseFloat(hour) + parseFloat(min);
            }
        }
        if(high < low){
            if(graType == 'Daily'){
                low = low - 86400;
            }else if(graType == 'Weekly'){
                low = low - 86400*7;
            }else if(graType == 'Monthly'){
                low = moment(low*1000).subtract(1, 'months').format('X');
            }
        }
        let transfer = {
            code: 'code',
            arr: id,
            highlim: high,
            lowlim: low,
        }
        // console.log(closeAbs, closeType, setting)
        await VTService.getGraphData(transfer).then((response) => {
            data = response.filter(function(el) {
                return el.Value != null;
            });
            let dataSet = [];
            for (let t = 0; t < id.length; t++) {
                let sample = data.filter(function(el) {
                    return el.TagID == id[t]
                })
                dataSet.push(sample);
            }
            // console.log('h: ',high, 'l: ', low)
            return res.status(200).json({
                errCode: 0,
                message: 'OK',
                dataSet
            });
        })
        
    }
}
let handleConverAndStoreGraphGen = async(req, res) => {
    try {
        if(!req.body.setting){
            return res.status(200).json({
                errCode: 2,
                message: 'Missing parameter',
                data: []
            })
        }else{
            let data;
            let setting = req.body.setting;
            let graType = setting.curRelGraType;
            let openType = setting.currentGraphStartType;
            let closeType = setting.currentGraphFinishType;
            let startAbs = setting.graphStartAbs;
            let closeAbs = setting.graphFinishAbs;
            let relTime = setting.relGraTime;
            let relTimeE = setting.relGraTimeE;
            let relDay = setting.relGraDay;
            let relDayE = setting.relGraDayE;
            let tag = setting.tag;
            let id = setting.id;
            let colors = setting.colors;
            let low = '';
            let high = '';
            if(closeType == 'Cur'){
                high = moment().format('X')
            }else if(closeType == 'Abs'){
                high = closeAbs;
            }else if(closeType == 'Rel'){
                if(graType == 'Daily'){
                    let startD = moment().startOf('day').format('X');
                    let arr = relTimeE.split(':');
                    let hour = arr[0]*1*3600;
                    let min = arr[1]*1*60;
                    high = parseFloat(startD) + parseFloat(hour) + parseFloat(min);
                }else if(graType == 'Weekly'){
                    let bonus = ''
                    let startD = moment().startOf('week').format('X');
                    if(relDayE == 'Neutral' || relDayE == 'Monday'){
                        bonus = 0;
                    }else if(relDayE == 'Tuesday'){
                        bonus = 86400;
                    }else if(relDayE == 'Wednesday'){
                        bonus = 86400*2;
                    }else if(relDayE == 'Thursday'){
                        bonus = 86400*3;
                    }else if(relDayE == 'Friday'){
                        bonus = 86400*4;
                    }else if(relDayE == 'Saturday'){
                        bonus = 86400*5;
                    }else{
                        bonus = 86400*6;
                    }
                    let arr = relTimeE.split(':');
                    let hour = arr[0]*1*3600;
                    let min = arr[1]*1*60;
                    high = parseFloat(bonus) + parseFloat(startD) + parseFloat(hour) + parseFloat(min);
                }else if(graType == 'Monthly'){
                    let bonus = '';
                    let startD = moment().startOf('month').format('X');
                    if(relDayE == 'Neutral'){
                        bonus = 0;
                    }else if(relDayE == 'End of month'){
                        let d = moment().endOf('month').format('D');
                        bonus = d*86400;
                    }else{
                        bonus = (relDayE - 1)*86400;
                    }
                    let arr = relTimeE.split(':');
                    let hour = arr[0]*1*3600;
                    let min = arr[1]*1*60;
                    high = parseFloat(bonus) + parseFloat(startD) + parseFloat(hour) + parseFloat(min);
                }
            }
            if(openType == 'Abs'){
                low = startAbs;
            }else if(openType == 'Rel'){
                if(graType == 'Daily'){
                    let startD = moment().startOf('day').format('X');
                    let arr = relTime.split(':');
                    let hour = arr[0]*1*3600;
                    let min = arr[1]*1*60;
                    low = parseFloat(startD) + parseFloat(hour) + parseFloat(min);
                }else if(graType == 'Weekly'){
                    let bonus = ''
                    let startD = moment().startOf('week').format('X');
                    if(relDay == 'Neutral' || relDay == 'Monday'){
                        bonus = 86400;
                    }else if(relDay == 'Tuesday'){
                        bonus = 86400*2;
                    }else if(relDay == 'Wednesday'){
                        bonus = 86400*3;
                    }else if(relDay == 'Thursday'){
                        bonus = 86400*4;
                    }else if(relDay == 'Friday'){
                        bonus = 86400*5;
                    }else if(relDay == 'Saturday'){
                        bonus = 86400*6;
                    }else{
                        bonus = 86400*7;
                    }
                    let arr = relTime.split(':');
                    let hour = arr[0]*1*3600;
                    let min = arr[1]*1*60;
                    low = parseFloat(bonus) + parseFloat(startD) + parseFloat(hour) + parseFloat(min);
                }else if(graType == 'Monthly'){
                    let bonus = '';
                    let startD = moment().startOf('month').format('X');
                    if(relDay == 'Neutral'){
                        bonus = 0;
                    }else if(relDay == 'End of month'){
                        let d = moment().endOf('month').format('D');
                        bonus = d*86400;
                    }else{
                        bonus = (relDay - 1)*86400;
                    }
                    let arr = relTime.split(':');
                    let hour = arr[0]*1*3600;
                    let min = arr[1]*1*60;
                    low = parseFloat(bonus) + parseFloat(startD) + parseFloat(hour) + parseFloat(min);
                }
            }
            if(high < low){
                if(graType == 'Daily'){
                    low = low - 86400;
                }else if(graType == 'Weekly'){
                    low = low - 86400*7;
                }else if(graType == 'Monthly'){
                    low = moment(low*1000).subtract(1, 'months').format('X');
                }
            }
            let transfer = {
                code: 'code',
                arr: id,
                highlim: high,
                lowlim: low,
            }
            // console.log(closeAbs, closeType, setting)
            await VTService.getGraphData(transfer).then(async function(response) {
                data = response.filter(function(el) {
                    return el.Value != null;
                });
                let dataSet = [];
                for (let t = 0; t < id.length; t++) {
                    let sample = data.filter(function(el) {
                        return el.TagID == id[t]
                    })
                    dataSet.push(sample);
                }
                let graphDataSet = [];
                for (let t1 = 0; t1 < id.length; t1++) {
                    let pepple = [];
                    let papple = [];
                    for (let t2 = 0; t2 < dataSet[t1].length; t2++) {
                        let sample = {
                            x: parseInt(dataSet[t1][t2].Arbitration*1000),
                            y: dataSet[t1][t2].Value,
                        }
                        pepple.push(sample)
                    }
                    papple = pepple.filter(function(el) {
                        return el.x % 120000 == 0
                    });
                    // let a = getRandomColor();
                    let set = {
                        label: tag[t1],
                        fill: false,
                        data: papple,
                        borderColor: colors[t1],
                        backgroundColor: colors[t1],
                        parsing: {
                            xAxisKey: 'x',
                            yAxisKey: 'y',
                        },
                        pointRadius: 0.1,
                    }
                    graphDataSet.push(set);
                }
                let configuration = {
                    type: 'line',
                    data: {
                        datasets: graphDataSet
                    },
                    options: {
                        spanGaps: 1000*60*60,
                        responsive: true,
                        plugins: {
                            title: {
                                text: 'Graph Fetched',
                                display: true
                            }
                        },
                        scales: {
                            x: {
                                type: 'time',
                                // time: {
                                //     // Luxon format string
                                //     tooltipFormat: 'DD T',
                                //     unit: 'day',
                                //     displayFormats: {
                                //         day: 'DD MMM, HH[h]'
                                //     }
                                // },
                                title: {
                                    display: true,
                                    text: 'Date'
                                }
                            },
                            y: {
                                title: {
                                    display: true,
                                    text: 'Value'
                                }
                            }
                        },
                    }
                }
                
                // console.log('h: ',high, 'l: ', low)
                const image = await chartJSNodeCanvas.renderToBuffer(configuration);
                // await fs.writeFileSync(`src/assets/example${moment().format('X')}.png`, image, 'base64')
                //#region Experiment
                let hasFile = false;
                let wb = new ExcelJS.Workbook();
                await wb.xlsx.readFile(`src/assets/xlsx/BlankWB.xlsx`).then( async() => {
                    const imageData = wb.addImage({
                        buffer: image,
                        extension: 'png',
                    })
                    let ws = wb.getWorksheet('Sheet1');
                    ws.addImage(imageData, 'A1:J20');
                    hasFile = true;
                })
                hasFile && await wb.xlsx.writeFile('src/assets/xlsx/ImageExcel.xlsx')
                //#endregion
                return res.status(200).json({
                    errCode: 0,
                    message: 'OK',
                });
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: 1,
            message: 'Not OK',
        })
    }
}
let handleMapAndRevData = async(req, res) => {
    if(!req.body.names || !req.body.lowlim || !req.body.highlim){
        return res.status(200).json({
            errCode: 2,
            message: 'Missing parameter',
            data: []
        })
    }else{
        let rawId = await VTService.getTagId();
        let data = await rawId.data;
        let rawMap = await VTService.getTagnameMapping();
        let mapdata = await rawMap.data;
        let ids = []
        for (let i = 0; i < req.body.names.length; i++) {
                for (let k = 0;k < mapdata.length; k++){
                    if(mapdata[k].friendlyname == req.body.names[i]){
                        // uniqIds.push(mapdata[k].uniqueID)
                        for (let t = 0; t < data.length; t++){
                            if(data[t].tagname == mapdata[k].uniqueID){
                                ids.push(data[t].id)
                            }
                        }
                    }
                }}
            return res.status(200).json({
                errCode: 0,
                message: 'OK',
                data: ids,
            })
    }
}

module.exports = {
    handleGetTagMapping: handleGetTagMapping,
    handleGetTagId: handleGetTagId,
    handleGetLoggedData: handleGetLoggedData,
    handleMapAndRevData: handleMapAndRevData,
    handleUploadFormReport: handleUploadFormReport,
    handleWriteReport: handleWriteReport,
    handleWriteWatchlist: handleWriteWatchlist,
    handleReadWatchlist: handleReadWatchlist,
    handleWriteReportAuto: handleWriteReportAuto,
    handleRevChartData: handleRevChartData,
    handleReadMoldList: handleReadMoldList,
    handleWriteGraphList: handleWriteGraphList,
    handleReadGraphList: handleReadGraphList,
    handleConverAndStoreGraphGen: handleConverAndStoreGraphGen,
}