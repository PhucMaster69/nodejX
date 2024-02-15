import { async } from "regenerator-runtime";
import db from "../models/index";

let createNewModbusTCPDevice = (data) => {
    return new Promise(async (resolve, reject) => {
        try{
            await db.DevicesModbusTCP.create({
                name: data.name,
                type: data.type,
                deviceIPAdd: data.deviceIPAdd,
                devicePort: data.devicePort,
                deviceId: data.deviceId,
                scanrate: data.scanrate,
                connectTimeout: data.connectTimeout,
            });
            resolve({
                errCode: 0,
                message: 'OK',
            })
        }catch(e){
            reject(e);
        }
    })
}
let getAllDevicesService = (devcsId) => {
    return new Promise(async (resolve, reject) => {
        try{
            let devcss = '';
            if(devcsId === 'ALL'){
                devcss = await db.DevicesModbusTCP.findAll({

                })
            }
            if(devcsId === 'ONLYNAME'){
                devcss = await db.DevicesModbusTCP.findAll({
                    attributes: ['name']
                })
            }
            if(devcsId && devcsId !=='ALL' && devcsId !== 'ONLYNAME'){
                devcss = await db.DevicesModbusTCP.findOne({
                    where: { id: devcsId}
                })
            }
            resolve(devcss)
            //console.log(devcss.length)
        }catch(e){
            reject(e);
        }
    })
}
let updateModbusTCPDeviceService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let device = await db.DevicesModbusTCP.findOne({
                where: {id: data.id},
                raw: false
            })
            if(device){
                device.name = data.name;
                device.type = data.type;
                device.deviceIPAdd = data.deviceIPAdd;
                device.devicePort = data.devicePort;
                device.deviceId = data.deviceId;
                device.scanrate = data.scanrate;
                device.connectTimeout = data.connectTimeout;
                await device.save();
                resolve({
                    errCode: 0,
                    message: 'OK'
                })
            }else{
                resolve({
                    errCode: 1,
                    message: 'Device not found!'
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}
let deleteDevice = (id) => {
    return new Promise(async (resolve, reject) => {
        let device = await db.DevicesModbusTCP.findOne({
            where: {
                id: id
            }
        })
        if(!device){
            resolve({
                errCode: 1,
                message: 'Device doesnt exist!'
            })
        }
        await db.DevicesModbusTCP.destroy({
            where: {
                id: id
            }
        })
        resolve({
            errCode: 0,
            message: 'Deleted device!'
        })
    })
}
module.exports = {
    createNewModbusTCPDevice: createNewModbusTCPDevice,
    getAllDevicesService: getAllDevicesService,
    updateModbusTCPDeviceService: updateModbusTCPDeviceService,
    deleteDevice: deleteDevice,
}