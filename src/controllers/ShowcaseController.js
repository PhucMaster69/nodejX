import { async } from 'regenerator-runtime';
import ShowcaseService from '../services/ShowcaseService';
let handleAddDeviceModbusTCP = async (req, res) => {
    let name = req.body.name;
    if(!name){
        return res.status(200).json({
            errCode: 1,
            message: 'Missing params!',
        })
    }
    let message = await ShowcaseService.createNewModbusTCPDevice(req.body)
    return res.status(200).json(message);
};
let handleUpdateDevice = async (req, res) => {
    let id = req.body.id;
    if(!id){
        return res.status(200).json({
            errCode: 1,
            message: 'Missing id!',
        })
    }
    let message = await ShowcaseService.updateModbusTCPDeviceService(req.body)
    return res.status(200).json(message);
}
let handleGetDevice = async (req, res) => {
    let name = req.query.name; //ALL hoac ONLYNAME hoac name
    if(!name){
        return res.status(200).json({
            errCode: 1,
            message: 'Missing name!',
            devcs: [],
        })
    }
    let devcs = await ShowcaseService.getAllDevicesService(name);
    return res.status(200).json({
        errCode: 0,
        message: 'OK',
        devcs
    })
}
let handleDeleteDevice = async (req, res) => {
    let id = req.query.id;
    if(!id){
        return res.status(200).json({
            errCode: 1,
            message: 'Missing id!',
        })
    }
    let message = await ShowcaseService.deleteDevice(id);
    return res.status(200).json({
        errCode: 0,
        message: 'OK'
    })
}
module.exports = {
    handleGetDevice: handleGetDevice,
    handleUpdateDevice: handleUpdateDevice,
    handleAddDeviceModbusTCP: handleAddDeviceModbusTCP,
    handleDeleteDevice: handleDeleteDevice
}