import db from "../models/index";
import { Op } from "sequelize";
const ModbusRTU = require('modbus-serial');
const client = new ModbusRTU();
//Modbus TCP
let mbsStatus
const connectClient = function() {
    
};
function delay(time) {
    return new Promise(function(resolve) { 
        setTimeout(resolve, time)
    });
  }
// setInterval(function() {
//     client.readHoldingRegisters(0, 1, function(err, data) {
//         console.log(data.data);
//     });
// }, 3000);

let retrieveData = (params) => {
    return new Promise(async(resolve, reject) => {
        let start = params.start;
        let num = params.num;
        // console.log(client.isOpen)
        try {
            if(client.isOpen){
                // await delay(5000);
                await client.readHoldingRegisters(start, num, function(err, data) {
                    // console.log(data);
                    resolve(data ? data.data : [])
                })
            }else{
                // await client.close();
                // await delay(5000);
                await client.setID(99);
                // client.setTimeout(3000);
                await client.connectTCP('127.0.0.1', { port: 503 });
                // await client.connectTcpRTUBuffered('127.0.0.1', { port: 503 });
                await client.readHoldingRegisters(start, num, function(err, data) {
                    // console.log(data);
                    resolve(data ? data.data : [])
                })
            }
            
        } catch (error) {
            console.log(error);
            resolve(null);
        }
    })
}

let getTagnameMapping = () => {
    return new Promise(async(resolve, reject) => {
        try {
            let data = await db.friendlyTagNameLookup.findAll({})
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
}

let getTagId = () => {
    return new Promise(async(resolve, reject) => {
        try {
            let data = await db.tagIdentifierLookup.findAll()
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
}

let getLoggedData = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            if(data.code === 'ALL'){
                let response = await db.Numerics.findAll({
                    where: {
                        Arbitration: {
                            [Op.gte]: data.lowlim,
                            [Op.lte]: data.highlim
                        }
                    },
                    attributes: { exclude: ['SeqID','VTS_Historian_TS']}
                })
                if(response){
                    resolve(response)
                }else{
                    resolve('Bad')
                }
            }else if(data.code === 'code'){
                if(!data.arr){
                    resolve('Bad')
                }else{
                    let res = []
                    for (let index = 0; index < data.arr.length; index++) {
                        let rescod = await db.Numerics.findAll({
                            where: {
                                Arbitration: {
                                    [Op.gte]: data.lowlim,
                                    [Op.lte]: data.highlim
                                },
                                TagID: data.arr[index]
                            },
                            attributes: { exclude: ['SeqID','VTS_Historian_TS']}
                        });
                        for(let i = 0; i < rescod.length; i++) {
                            res.push(rescod[i]);
                        }
                    }
                    resolve(res)
                }
            }
        } catch (error) {
            reject(error)
        }
    })
}
let getGraphData = (data) => {
    return new Promise(async(resolve, reject) => {
        try {
            if(data.code === 'ALL'){
                let response = await db.Numerics.findAll({
                    where: {
                        Arbitration: {
                            [Op.gte]: data.lowlim,
                            [Op.lte]: data.highlim
                        }
                    },
                    attributes: { exclude: ['SeqID','VTS_Historian_TS','Counter','Value_F3','Timestamp']}
                })
                if(response){
                    resolve(response)
                }else{
                    resolve('Bad')
                }
            }else if(data.code === 'code'){
                if(!data.arr){
                    resolve('Bad')
                }else{
                    let res = []
                    for (let index = 0; index < data.arr.length; index++) {
                        let rescod = await db.Numerics.findAll({
                            where: {
                                Arbitration: {
                                    [Op.gte]: data.lowlim,
                                    [Op.lte]: data.highlim
                                },
                                TagID: data.arr[index]
                            },
                            attributes: { exclude: ['SeqID','VTS_Historian_TS','Counter','Value_F3','Timestamp']}
                        });
                        for(let i = 0; i < rescod.length; i++) {
                            res.push(rescod[i]);
                        }
                    }
                    resolve(res)
                }
            }
        } catch (error) {
            reject(error)
        }
    })
}
module.exports = {
    getTagnameMapping: getTagnameMapping,
    getTagId: getTagId,
    getLoggedData: getLoggedData,
    getGraphData: getGraphData,
    retrieveData: retrieveData
}