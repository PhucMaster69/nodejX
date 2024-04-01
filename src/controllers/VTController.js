import VTService from '../services/VTService';
import moment from 'moment/moment';
//import server from '../server2';
const ExcelJS = require('exceljs')
const fs = require('fs')
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
let handleGetMBData = async (req, res) => {
    let params = req.body;
    let data = await VTService.retrieveData(params)
    if(data){
        return res.status(200).json({
            errCode: 0,
            message: 'OK',
            data,
        })
    }else{
        return res.status(200).json({
            errCode: 1,
            message: 'Connection lost.',
            data: []
        })
    }
}
module.exports = {
    handleGetTagMapping: handleGetTagMapping,
    handleGetMBData: handleGetMBData,
}