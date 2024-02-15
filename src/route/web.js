import express from "express";
import ShowcaseController from '../controllers/ShowcaseController';
import VTController from '../controllers/VTController';

let router = express.Router();

let initWebRoutes = (app) => {
    //APIs for Showcase
    router.get('/api/get-all-devices', ShowcaseController.handleGetDevice);
    router.post('/api/add-device', ShowcaseController.handleAddDeviceModbusTCP);
    router.put('/api/update-modbustcp', ShowcaseController.handleUpdateDevice);
    router.delete('/api/delete-device', ShowcaseController.handleDeleteDevice);
    //APIs for VTSCADA
    router.post('/api/get-data', VTController.handleGetMBData);
    return app.use("/", router);
}

module.exports = initWebRoutes;