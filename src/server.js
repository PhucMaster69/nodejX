import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebroutes from './route/web';
import connectDB from './config/connectDB';
import cors from 'cors';
import moment from 'moment';
import HRService from './services/HRService'
import { async } from "regenerator-runtime";


require('dotenv').config();
const fs = require("fs");
// "start": "nodemon --exec babel-node src/server.js"

const arraydata1 = [
  //0 -->10
  {id: '1036', name: 'Machine01.001.rejecttissue'},
  {id: '1037', name: 'Machine01.001.rejectair-let'},
  {id: '1038', name: 'Machine01.001.outlet-coverreject'},
  {id: '1039', name: 'Machine01.001.inner-coverreject'},
  {id: '1040', name: 'Machine01.001.front-earreject'},
  {id: '1041', name: 'Machine01.001.back-earreject'},
  {id: '1042', name: 'Machine01.001.polybafflereject'},
  {id: '1043', name: 'Machine01.001.notgoodreject'},
  {id: '1044', name: 'Machine01.001.joininginsidepanelreject'},
  {id: '1045', name: 'Machine01.001.joiningoutsidepanelreject'},
  {id: '1046', name: 'Machine01.001.joiningsurgereject'},
  //11 -->30
  {id: '1048', name: 'Machine01.001.stopduetoSurgebreak'},
  {id: '1049', name: 'Machine01.001.stopduetoAir-ledBreak'},
  {id: '1050', name: 'Machine01.001.stopduetoOutletcoverBreak'},
  {id: '1051', name: 'Machine01.001.stopduetoInnercoverBreak'},
  {id: '1052', name: 'Machine01.001.stopduetoFrontearBreak'},
  {id: '1053', name: 'Machine01.001.stopduetoBackearBreak'},
  {id: '1054', name: 'Machine01.001.stopduetoPolybaffleBreak'},
  {id: '1055', name: 'Machine01.001.stopduetoInsidePanelBreak'},
  {id: '1056', name: 'Machine01.001.stopduetoOutsidePanelBreak'},
  {id: '1057', name: 'Machine01.001.OpstoporUnknAirled'},
  {id: '1058', name: 'Machine01.001.OpstoporUnknOuterCover'},
  {id: '1059', name: 'Machine01.001.OpstoporUnknInnerCover'},
  {id: '1060', name: 'Machine01.001.OpstoporUnknFrontEar'},
  {id: '1061', name: 'Machine01.001.OpstoporUnknBackEar'},
  {id: '1062', name: 'Machine01.001.OpstoporUnknPolyBaffle'},
  {id: '1063', name: 'Machine01.001.OpstoporUnknSurge'},
  {id: '1064', name: 'Machine01.001.OpstoporUnknInsidePanel'},
  {id: '1065', name: 'Machine01.001.OpstoporUnknOutsidePanel'},
  {id: '1066', name: 'Machine01.001.OpstoporUnknMainMachine'},
  {id: '1067', name: 'Machine01.001.OpstoporUnknMainPanel'},
  //31-->50
  {id: '10480', name: 'Machine01.001.stopduetoSurgebreak'},
  {id: '10490', name: 'Machine01.001.stopduetoAir-ledBreak'},
  {id: '10500', name: 'Machine01.001.stopduetoOutletcoverBreak'},
  {id: '10510', name: 'Machine01.001.stopduetoInnercoverBreak'},
  {id: '10520', name: 'Machine01.001.stopduetoFrontearBreak'},
  {id: '10530', name: 'Machine01.001.stopduetoBackearBreak'},
  {id: '10540', name: 'Machine01.001.stopduetoPolybaffleBreak'},
  {id: '10550', name: 'Machine01.001.stopduetoInsidePanelBreak'},
  {id: '10560', name: 'Machine01.001.stopduetoOutsidePanelBreak'},
  {id: '10570', name: 'Machine01.001.OpstoporUnknAirled'},
  {id: '10580', name: 'Machine01.001.OpstoporUnknOuterCover'},
  {id: '10590', name: 'Machine01.001.OpstoporUnknInnerCover'},
  {id: '10600', name: 'Machine01.001.OpstoporUnknFrontEar'},
  {id: '10610', name: 'Machine01.001.OpstoporUnknBackEar'},
  {id: '10620', name: 'Machine01.001.OpstoporUnknPolyBaffle'},
  {id: '10630', name: 'Machine01.001.OpstoporUnknSurge'},
  {id: '10640', name: 'Machine01.001.OpstoporUnknInsidePanel'},
  {id: '10650', name: 'Machine01.001.OpstoporUnknOutsidePanel'},
  {id: '10660', name: 'Machine01.001.OpstoporUnknMainMachine'},
  {id: '10670', name: 'Machine01.001.OpstoporUnknMainPanel'},
  //51
  {id: '1079', name: 'Machine01.001.TotalGood'},
  {id: '1080', name: 'Machine01.001.TotalWaste'},
  {id: '1081', name: 'Machine01.001.TotalCuts'},
  {id: '1082', name: 'Machine01.001.ShiftTime'},
  {id: '1083', name: 'Machine01.001.MachineRunningTime'},
  {id: '1084', name: 'Machine01.001.MachineStop'},
  {id: '1085', name: 'Machine01.001.MachineSpeed'},
  {id: '1086', name: 'Machine01.001.ActualSpeed'},
  {id: '1087', name: 'Machine01.001.SuOnHr'},
  {id: '1088', name: 'Machine01.001.AvgSpeed'},
  {id: '1089', name: 'Machine01.001.TargetSpeed'},
  {id: '1090', name: 'Machine01.001.Total'},
  {id: '1091', name: 'Machine01.001.Min'},
  {id: '1092', name: 'Machine01.001.Events'},
  {id: '1093', name: 'Machine01.001.StartUp'},
  {id: '1094', name: 'Machine01.001.Running'},
]
const arraydata2 = [
  //0 -->10
  {id: '2036', name: 'Machine02.001.rejecttissue'},
  {id: '2037', name: 'Machine02.001.rejectair-let'},
  {id: '2038', name: 'Machine02.001.outlet-coverreject'},
  {id: '2039', name: 'Machine02.001.inner-coverreject'},
  {id: '2040', name: 'Machine02.001.front-earreject'},
  {id: '2041', name: 'Machine02.001.back-earreject'},
  {id: '2042', name: 'Machine02.001.polybafflereject'},
  {id: '2043', name: 'Machine02.001.notgoodreject'},
  {id: '2044', name: 'Machine02.001.joininginsidepanelreject'},
  {id: '2045', name: 'Machine02.001.joiningoutsidepanelreject'},
  {id: '2046', name: 'Machine02.001.joiningsurgereject'},
  //11 -->30
  {id: '2048', name: 'Machine02.001.stopduetoSurgebreak'},
  {id: '2049', name: 'Machine02.001.stopduetoAir-ledBreak'},
  {id: '2050', name: 'Machine02.001.stopduetoOutletcoverBreak'},
  {id: '2051', name: 'Machine02.001.stopduetoInnercoverBreak'},
  {id: '2052', name: 'Machine02.001.stopduetoFrontearBreak'},
  {id: '2053', name: 'Machine02.001.stopduetoBackearBreak'},
  {id: '2054', name: 'Machine02.001.stopduetoPolybaffleBreak'},
  {id: '2055', name: 'Machine02.001.stopduetoInsidePanelBreak'},
  {id: '2056', name: 'Machine02.001.stopduetoOutsidePanelBreak'},
  {id: '2057', name: 'Machine02.001.OpstoporUnknAirled'},
  {id: '2058', name: 'Machine02.001.OpstoporUnknOuterCover'},
  {id: '2059', name: 'Machine02.001.OpstoporUnknInnerCover'},
  {id: '2060', name: 'Machine02.001.OpstoporUnknFrontEar'},
  {id: '2061', name: 'Machine02.001.OpstoporUnknBackEar'},
  {id: '2062', name: 'Machine02.001.OpstoporUnknPolyBaffle'},
  {id: '2063', name: 'Machine02.001.OpstoporUnknSurge'},
  {id: '2064', name: 'Machine02.001.OpstoporUnknInsidePanel'},
  {id: '2065', name: 'Machine02.001.OpstoporUnknOutsidePanel'},
  {id: '2066', name: 'Machine02.001.OpstoporUnknMainMachine'},
  {id: '2067', name: 'Machine02.001.OpstoporUnknMainPanel'},
  //31-->50
  {id: '20480', name: 'Machine02.001.stopduetoSurgebreak'},
  {id: '20490', name: 'Machine02.001.stopduetoAir-ledBreak'},
  {id: '20500', name: 'Machine02.001.stopduetoOutletcoverBreak'},
  {id: '20510', name: 'Machine02.001.stopduetoInnercoverBreak'},
  {id: '20520', name: 'Machine02.001.stopduetoFrontearBreak'},
  {id: '20530', name: 'Machine02.001.stopduetoBackearBreak'},
  {id: '20540', name: 'Machine02.001.stopduetoPolybaffleBreak'},
  {id: '20550', name: 'Machine02.001.stopduetoInsidePanelBreak'},
  {id: '20560', name: 'Machine02.001.stopduetoOutsidePanelBreak'},
  {id: '20570', name: 'Machine02.001.OpstoporUnknAirled'},
  {id: '20580', name: 'Machine02.001.OpstoporUnknOuterCover'},
  {id: '20590', name: 'Machine02.001.OpstoporUnknInnerCover'},
  {id: '20600', name: 'Machine02.001.OpstoporUnknFrontEar'},
  {id: '20610', name: 'Machine02.001.OpstoporUnknBackEar'},
  {id: '20620', name: 'Machine02.001.OpstoporUnknPolyBaffle'},
  {id: '20630', name: 'Machine02.001.OpstoporUnknSurge'},
  {id: '20640', name: 'Machine02.001.OpstoporUnknInsidePanel'},
  {id: '20650', name: 'Machine02.001.OpstoporUnknOutsidePanel'},
  {id: '20660', name: 'Machine02.001.OpstoporUnknMainMachine'},
  {id: '20670', name: 'Machine02.001.OpstoporUnknMainPanel'},
  //51
  {id: '2079', name: 'Machine02.001.TotalGood'},
  {id: '2080', name: 'Machine02.001.TotalWaste'},
  {id: '2081', name: 'Machine02.001.TotalCuts'},
  {id: '2082', name: 'Machine02.001.ShiftTime'},
  {id: '2083', name: 'Machine02.001.MachineRunningTime'},
  {id: '2084', name: 'Machine02.001.MachineStop'},
  {id: '2085', name: 'Machine02.001.MachineSpeed'},
  {id: '2086', name: 'Machine02.001.ActualSpeed'},
  {id: '2087', name: 'Machine02.001.SuOnHr'},
  {id: '2088', name: 'Machine02.001.AvgSpeed'},
  {id: '2089', name: 'Machine02.001.TargetSpeed'},
  {id: '2090', name: 'Machine02.001.Total'},
  {id: '2091', name: 'Machine02.001.Min'},
  {id: '2092', name: 'Machine02.001.Events'},
  {id: '2093', name: 'Machine02.001.StartUp'},
  {id: '2094', name: 'Machine02.001.Running'},
]
const arraydata3 = [
  //0 -->10
  {id: '3036', name: 'Machine03.001.rejecttissue'},
  {id: '3037', name: 'Machine03.001.rejectair-let'},
  {id: '3038', name: 'Machine03.001.outlet-coverreject'},
  {id: '3039', name: 'Machine03.001.inner-coverreject'},
  {id: '3040', name: 'Machine03.001.front-earreject'},
  {id: '3041', name: 'Machine03.001.back-earreject'},
  {id: '3042', name: 'Machine03.001.polybafflereject'},
  {id: '3043', name: 'Machine03.001.notgoodreject'},
  {id: '3044', name: 'Machine03.001.joininginsidepanelreject'},
  {id: '3045', name: 'Machine03.001.joiningoutsidepanelreject'},
  {id: '3046', name: 'Machine03.001.joiningsurgereject'},
  //11 -->30
  {id: '3048', name: 'Machine03.001.stopduetoSurgebreak'},
  {id: '3049', name: 'Machine03.001.stopduetoAir-ledBreak'},
  {id: '3050', name: 'Machine03.001.stopduetoOutletcoverBreak'},
  {id: '3051', name: 'Machine03.001.stopduetoInnercoverBreak'},
  {id: '3052', name: 'Machine03.001.stopduetoFrontearBreak'},
  {id: '3053', name: 'Machine03.001.stopduetoBackearBreak'},
  {id: '3054', name: 'Machine03.001.stopduetoPolybaffleBreak'},
  {id: '3055', name: 'Machine03.001.stopduetoInsidePanelBreak'},
  {id: '3056', name: 'Machine03.001.stopduetoOutsidePanelBreak'},
  {id: '3057', name: 'Machine03.001.OpstoporUnknAirled'},
  {id: '3058', name: 'Machine03.001.OpstoporUnknOuterCover'},
  {id: '3059', name: 'Machine03.001.OpstoporUnknInnerCover'},
  {id: '3060', name: 'Machine03.001.OpstoporUnknFrontEar'},
  {id: '3061', name: 'Machine03.001.OpstoporUnknBackEar'},
  {id: '3062', name: 'Machine03.001.OpstoporUnknPolyBaffle'},
  {id: '3063', name: 'Machine03.001.OpstoporUnknSurge'},
  {id: '3064', name: 'Machine03.001.OpstoporUnknInsidePanel'},
  {id: '3065', name: 'Machine03.001.OpstoporUnknOutsidePanel'},
  {id: '3066', name: 'Machine03.001.OpstoporUnknMainMachine'},
  {id: '3067', name: 'Machine03.001.OpstoporUnknMainPanel'},
  //31-->50
  {id: '30480', name: 'Machine03.001.stopduetoSurgebreak'},
  {id: '30490', name: 'Machine03.001.stopduetoAir-ledBreak'},
  {id: '30500', name: 'Machine03.001.stopduetoOutletcoverBreak'},
  {id: '30510', name: 'Machine03.001.stopduetoInnercoverBreak'},
  {id: '30520', name: 'Machine03.001.stopduetoFrontearBreak'},
  {id: '30530', name: 'Machine03.001.stopduetoBackearBreak'},
  {id: '30540', name: 'Machine03.001.stopduetoPolybaffleBreak'},
  {id: '30550', name: 'Machine03.001.stopduetoInsidePanelBreak'},
  {id: '30560', name: 'Machine03.001.stopduetoOutsidePanelBreak'},
  {id: '30570', name: 'Machine03.001.OpstoporUnknAirled'},
  {id: '30580', name: 'Machine03.001.OpstoporUnknOuterCover'},
  {id: '30590', name: 'Machine03.001.OpstoporUnknInnerCover'},
  {id: '30600', name: 'Machine03.001.OpstoporUnknFrontEar'},
  {id: '30610', name: 'Machine03.001.OpstoporUnknBackEar'},
  {id: '30620', name: 'Machine03.001.OpstoporUnknPolyBaffle'},
  {id: '30630', name: 'Machine03.001.OpstoporUnknSurge'},
  {id: '30640', name: 'Machine03.001.OpstoporUnknInsidePanel'},
  {id: '30650', name: 'Machine03.001.OpstoporUnknOutsidePanel'},
  {id: '30660', name: 'Machine03.001.OpstoporUnknMainMachine'},
  {id: '30670', name: 'Machine03.001.OpstoporUnknMainPanel'},
  //51
  {id: '3079', name: 'Machine03.001.TotalGood'},
  {id: '3080', name: 'Machine03.001.TotalWaste'},
  {id: '3081', name: 'Machine03.001.TotalCuts'},
  {id: '3082', name: 'Machine03.001.ShiftTime'},
  {id: '3083', name: 'Machine03.001.MachineRunningTime'},
  {id: '3084', name: 'Machine03.001.MachineStop'},
  {id: '3085', name: 'Machine03.001.MachineSpeed'},
  {id: '3086', name: 'Machine03.001.ActualSpeed'},
  {id: '3087', name: 'Machine03.001.SuOnHr'},
  {id: '3088', name: 'Machine03.001.AvgSpeed'},
  {id: '3089', name: 'Machine03.001.TargetSpeed'},
  {id: '3090', name: 'Machine03.001.Total'},
  {id: '3091', name: 'Machine03.001.Min'},
  {id: '3092', name: 'Machine03.001.Events'},
  {id: '3093', name: 'Machine03.001.StartUp'},
  {id: '3094', name: 'Machine03.001.Running'},
]
const arraydata4 = [
  //0 -->10
  {id: '4036', name: 'Machine04.001.rejecttissue'},
  {id: '4037', name: 'Machine04.001.rejectair-let'},
  {id: '4038', name: 'Machine04.001.outlet-coverreject'},
  {id: '4039', name: 'Machine04.001.inner-coverreject'},
  {id: '4040', name: 'Machine04.001.front-earreject'},
  {id: '4041', name: 'Machine04.001.back-earreject'},
  {id: '4042', name: 'Machine04.001.polybafflereject'},
  {id: '4043', name: 'Machine04.001.notgoodreject'},
  {id: '4044', name: 'Machine04.001.joininginsidepanelreject'},
  {id: '4045', name: 'Machine04.001.joiningoutsidepanelreject'},
  {id: '4046', name: 'Machine04.001.joiningsurgereject'},
  //11 -->30
  {id: '4048', name: 'Machine04.001.stopduetoSurgebreak'},
  {id: '4049', name: 'Machine04.001.stopduetoAir-ledBreak'},
  {id: '4050', name: 'Machine04.001.stopduetoOutletcoverBreak'},
  {id: '4051', name: 'Machine04.001.stopduetoInnercoverBreak'},
  {id: '4052', name: 'Machine04.001.stopduetoFrontearBreak'},
  {id: '4053', name: 'Machine04.001.stopduetoBackearBreak'},
  {id: '4054', name: 'Machine04.001.stopduetoPolybaffleBreak'},
  {id: '4055', name: 'Machine04.001.stopduetoInsidePanelBreak'},
  {id: '4056', name: 'Machine04.001.stopduetoOutsidePanelBreak'},
  {id: '4057', name: 'Machine04.001.OpstoporUnknAirled'},
  {id: '4058', name: 'Machine04.001.OpstoporUnknOuterCover'},
  {id: '4059', name: 'Machine04.001.OpstoporUnknInnerCover'},
  {id: '4060', name: 'Machine04.001.OpstoporUnknFrontEar'},
  {id: '4061', name: 'Machine04.001.OpstoporUnknBackEar'},
  {id: '4062', name: 'Machine04.001.OpstoporUnknPolyBaffle'},
  {id: '4063', name: 'Machine04.001.OpstoporUnknSurge'},
  {id: '4064', name: 'Machine04.001.OpstoporUnknInsidePanel'},
  {id: '4065', name: 'Machine04.001.OpstoporUnknOutsidePanel'},
  {id: '4066', name: 'Machine04.001.OpstoporUnknMainMachine'},
  {id: '4067', name: 'Machine04.001.OpstoporUnknMainPanel'},
  //31-->50
  {id: '40480', name: 'Machine04.001.stopduetoSurgebreak'},
  {id: '40490', name: 'Machine04.001.stopduetoAir-ledBreak'},
  {id: '40500', name: 'Machine04.001.stopduetoOutletcoverBreak'},
  {id: '40510', name: 'Machine04.001.stopduetoInnercoverBreak'},
  {id: '40520', name: 'Machine04.001.stopduetoFrontearBreak'},
  {id: '40530', name: 'Machine04.001.stopduetoBackearBreak'},
  {id: '40540', name: 'Machine04.001.stopduetoPolybaffleBreak'},
  {id: '40550', name: 'Machine04.001.stopduetoInsidePanelBreak'},
  {id: '40560', name: 'Machine04.001.stopduetoOutsidePanelBreak'},
  {id: '40570', name: 'Machine04.001.OpstoporUnknAirled'},
  {id: '40580', name: 'Machine04.001.OpstoporUnknOuterCover'},
  {id: '40590', name: 'Machine04.001.OpstoporUnknInnerCover'},
  {id: '40600', name: 'Machine04.001.OpstoporUnknFrontEar'},
  {id: '40610', name: 'Machine04.001.OpstoporUnknBackEar'},
  {id: '40620', name: 'Machine04.001.OpstoporUnknPolyBaffle'},
  {id: '40630', name: 'Machine04.001.OpstoporUnknSurge'},
  {id: '40640', name: 'Machine04.001.OpstoporUnknInsidePanel'},
  {id: '40650', name: 'Machine04.001.OpstoporUnknOutsidePanel'},
  {id: '40660', name: 'Machine04.001.OpstoporUnknMainMachine'},
  {id: '40670', name: 'Machine04.001.OpstoporUnknMainPanel'},
  //51
  {id: '4079', name: 'Machine04.001.TotalGood'},
  {id: '4080', name: 'Machine04.001.TotalWaste'},
  {id: '4081', name: 'Machine04.001.TotalCuts'},
  {id: '4082', name: 'Machine04.001.ShiftTime'},
  {id: '4083', name: 'Machine04.001.MachineRunningTime'},
  {id: '4084', name: 'Machine04.001.MachineStop'},
  {id: '4085', name: 'Machine04.001.MachineSpeed'},
  {id: '4086', name: 'Machine04.001.ActualSpeed'},
  {id: '4087', name: 'Machine04.001.SuOnHr'},
  {id: '4088', name: 'Machine04.001.AvgSpeed'},
  {id: '4089', name: 'Machine04.001.TargetSpeed'},
  {id: '4090', name: 'Machine04.001.Total'},
  {id: '4091', name: 'Machine04.001.Min'},
  {id: '4092', name: 'Machine04.001.Events'},
  {id: '4093', name: 'Machine04.001.StartUp'},
  {id: '4094', name: 'Machine04.001.Running'},
]
const arraydata5 = [
  //0 -->10
  {id: '5036', name: 'Machine05.001.rejecttissue'},
  {id: '5037', name: 'Machine05.001.rejectair-let'},
  {id: '5038', name: 'Machine05.001.outlet-coverreject'},
  {id: '5039', name: 'Machine05.001.inner-coverreject'},
  {id: '5040', name: 'Machine05.001.front-earreject'},
  {id: '5041', name: 'Machine05.001.back-earreject'},
  {id: '5042', name: 'Machine05.001.polybafflereject'},
  {id: '5043', name: 'Machine05.001.notgoodreject'},
  {id: '5044', name: 'Machine05.001.joininginsidepanelreject'},
  {id: '5045', name: 'Machine05.001.joiningoutsidepanelreject'},
  {id: '5046', name: 'Machine05.001.joiningsurgereject'},
  //11 -->30
  {id: '5048', name: 'Machine05.001.stopduetoSurgebreak'},
  {id: '5049', name: 'Machine05.001.stopduetoAir-ledBreak'},
  {id: '5050', name: 'Machine05.001.stopduetoOutletcoverBreak'},
  {id: '5051', name: 'Machine05.001.stopduetoInnercoverBreak'},
  {id: '5052', name: 'Machine05.001.stopduetoFrontearBreak'},
  {id: '5053', name: 'Machine05.001.stopduetoBackearBreak'},
  {id: '5054', name: 'Machine05.001.stopduetoPolybaffleBreak'},
  {id: '5055', name: 'Machine05.001.stopduetoInsidePanelBreak'},
  {id: '5056', name: 'Machine05.001.stopduetoOutsidePanelBreak'},
  {id: '5057', name: 'Machine05.001.OpstoporUnknAirled'},
  {id: '5058', name: 'Machine05.001.OpstoporUnknOuterCover'},
  {id: '5059', name: 'Machine05.001.OpstoporUnknInnerCover'},
  {id: '5060', name: 'Machine05.001.OpstoporUnknFrontEar'},
  {id: '5061', name: 'Machine05.001.OpstoporUnknBackEar'},
  {id: '5062', name: 'Machine05.001.OpstoporUnknPolyBaffle'},
  {id: '5063', name: 'Machine05.001.OpstoporUnknSurge'},
  {id: '5064', name: 'Machine05.001.OpstoporUnknInsidePanel'},
  {id: '5065', name: 'Machine05.001.OpstoporUnknOutsidePanel'},
  {id: '5066', name: 'Machine05.001.OpstoporUnknMainMachine'},
  {id: '5067', name: 'Machine05.001.OpstoporUnknMainPanel'},
  //31-->50
  {id: '50480', name: 'Machine05.001.stopduetoSurgebreak'},
  {id: '50490', name: 'Machine05.001.stopduetoAir-ledBreak'},
  {id: '50500', name: 'Machine05.001.stopduetoOutletcoverBreak'},
  {id: '50510', name: 'Machine05.001.stopduetoInnercoverBreak'},
  {id: '50520', name: 'Machine05.001.stopduetoFrontearBreak'},
  {id: '50530', name: 'Machine05.001.stopduetoBackearBreak'},
  {id: '50540', name: 'Machine05.001.stopduetoPolybaffleBreak'},
  {id: '50550', name: 'Machine05.001.stopduetoInsidePanelBreak'},
  {id: '50560', name: 'Machine05.001.stopduetoOutsidePanelBreak'},
  {id: '50570', name: 'Machine05.001.OpstoporUnknAirled'},
  {id: '50580', name: 'Machine05.001.OpstoporUnknOuterCover'},
  {id: '50590', name: 'Machine05.001.OpstoporUnknInnerCover'},
  {id: '50600', name: 'Machine05.001.OpstoporUnknFrontEar'},
  {id: '50610', name: 'Machine05.001.OpstoporUnknBackEar'},
  {id: '50620', name: 'Machine05.001.OpstoporUnknPolyBaffle'},
  {id: '50630', name: 'Machine05.001.OpstoporUnknSurge'},
  {id: '50640', name: 'Machine05.001.OpstoporUnknInsidePanel'},
  {id: '50650', name: 'Machine05.001.OpstoporUnknOutsidePanel'},
  {id: '50660', name: 'Machine05.001.OpstoporUnknMainMachine'},
  {id: '50670', name: 'Machine05.001.OpstoporUnknMainPanel'},
  //51
  {id: '5079', name: 'Machine05.001.TotalGood'},
  {id: '5080', name: 'Machine05.001.TotalWaste'},
  {id: '5081', name: 'Machine05.001.TotalCuts'},
  {id: '5082', name: 'Machine05.001.ShiftTime'},
  {id: '5083', name: 'Machine05.001.MachineRunningTime'},
  {id: '5084', name: 'Machine05.001.MachineStop'},
  {id: '5085', name: 'Machine05.001.MachineSpeed'},
  {id: '5086', name: 'Machine05.001.ActualSpeed'},
  {id: '5087', name: 'Machine05.001.SuOnHr'},
  {id: '5088', name: 'Machine05.001.AvgSpeed'},
  {id: '5089', name: 'Machine05.001.TargetSpeed'},
  {id: '5090', name: 'Machine05.001.Total'},
  {id: '5091', name: 'Machine05.001.Min'},
  {id: '5092', name: 'Machine05.001.Events'},
  {id: '5093', name: 'Machine05.001.StartUp'},
  {id: '5094', name: 'Machine05.001.Running'},
]
const arraydata6 = [
  //0 -->10
  {id: '6036', name: 'Machine06.001.rejecttissue'},
  {id: '6037', name: 'Machine06.001.rejectair-let'},
  {id: '6038', name: 'Machine06.001.outlet-coverreject'},
  {id: '6039', name: 'Machine06.001.inner-coverreject'},
  {id: '6040', name: 'Machine06.001.front-earreject'},
  {id: '6041', name: 'Machine06.001.back-earreject'},
  {id: '6042', name: 'Machine06.001.polybafflereject'},
  {id: '6043', name: 'Machine06.001.notgoodreject'},
  {id: '6044', name: 'Machine06.001.joininginsidepanelreject'},
  {id: '6045', name: 'Machine06.001.joiningoutsidepanelreject'},
  {id: '6046', name: 'Machine06.001.joiningsurgereject'},
  //11 -->30
  {id: '6048', name: 'Machine06.001.stopduetoSurgebreak'},
  {id: '6049', name: 'Machine06.001.stopduetoAir-ledBreak'},
  {id: '6050', name: 'Machine06.001.stopduetoOutletcoverBreak'},
  {id: '6051', name: 'Machine06.001.stopduetoInnercoverBreak'},
  {id: '6052', name: 'Machine06.001.stopduetoFrontearBreak'},
  {id: '6053', name: 'Machine06.001.stopduetoBackearBreak'},
  {id: '6054', name: 'Machine06.001.stopduetoPolybaffleBreak'},
  {id: '6055', name: 'Machine06.001.stopduetoInsidePanelBreak'},
  {id: '6056', name: 'Machine06.001.stopduetoOutsidePanelBreak'},
  {id: '6057', name: 'Machine06.001.OpstoporUnknAirled'},
  {id: '6058', name: 'Machine06.001.OpstoporUnknOuterCover'},
  {id: '6059', name: 'Machine06.001.OpstoporUnknInnerCover'},
  {id: '6060', name: 'Machine06.001.OpstoporUnknFrontEar'},
  {id: '6061', name: 'Machine06.001.OpstoporUnknBackEar'},
  {id: '6062', name: 'Machine06.001.OpstoporUnknPolyBaffle'},
  {id: '6063', name: 'Machine06.001.OpstoporUnknSurge'},
  {id: '6064', name: 'Machine06.001.OpstoporUnknInsidePanel'},
  {id: '6065', name: 'Machine06.001.OpstoporUnknOutsidePanel'},
  {id: '6066', name: 'Machine06.001.OpstoporUnknMainMachine'},
  {id: '6067', name: 'Machine06.001.OpstoporUnknMainPanel'},
  //31-->50
  {id: '60480', name: 'Machine06.001.stopduetoSurgebreak'},
  {id: '60490', name: 'Machine06.001.stopduetoAir-ledBreak'},
  {id: '60500', name: 'Machine06.001.stopduetoOutletcoverBreak'},
  {id: '60510', name: 'Machine06.001.stopduetoInnercoverBreak'},
  {id: '60520', name: 'Machine06.001.stopduetoFrontearBreak'},
  {id: '60530', name: 'Machine06.001.stopduetoBackearBreak'},
  {id: '60540', name: 'Machine06.001.stopduetoPolybaffleBreak'},
  {id: '60550', name: 'Machine06.001.stopduetoInsidePanelBreak'},
  {id: '60560', name: 'Machine06.001.stopduetoOutsidePanelBreak'},
  {id: '60570', name: 'Machine06.001.OpstoporUnknAirled'},
  {id: '60580', name: 'Machine06.001.OpstoporUnknOuterCover'},
  {id: '60590', name: 'Machine06.001.OpstoporUnknInnerCover'},
  {id: '60600', name: 'Machine06.001.OpstoporUnknFrontEar'},
  {id: '60610', name: 'Machine06.001.OpstoporUnknBackEar'},
  {id: '60620', name: 'Machine06.001.OpstoporUnknPolyBaffle'},
  {id: '60630', name: 'Machine06.001.OpstoporUnknSurge'},
  {id: '60640', name: 'Machine06.001.OpstoporUnknInsidePanel'},
  {id: '60650', name: 'Machine06.001.OpstoporUnknOutsidePanel'},
  {id: '60660', name: 'Machine06.001.OpstoporUnknMainMachine'},
  {id: '60670', name: 'Machine06.001.OpstoporUnknMainPanel'},
  //51
  {id: '6079', name: 'Machine06.001.TotalGood'},
  {id: '6080', name: 'Machine06.001.TotalWaste'},
  {id: '6081', name: 'Machine06.001.TotalCuts'},
  {id: '6082', name: 'Machine06.001.ShiftTime'},
  {id: '6083', name: 'Machine06.001.MachineRunningTime'},
  {id: '6084', name: 'Machine06.001.MachineStop'},
  {id: '6085', name: 'Machine06.001.MachineSpeed'},
  {id: '6086', name: 'Machine06.001.ActualSpeed'},
  {id: '6087', name: 'Machine06.001.SuOnHr'},
  {id: '6088', name: 'Machine06.001.AvgSpeed'},
  {id: '6089', name: 'Machine06.001.TargetSpeed'},
  {id: '6090', name: 'Machine06.001.Total'},
  {id: '6091', name: 'Machine06.001.Min'},
  {id: '6092', name: 'Machine06.001.Events'},
  {id: '6093', name: 'Machine06.001.StartUp'},
  {id: '6094', name: 'Machine06.001.Running'},
]
const arraydata7 = [
  //0 -->10
  {id: '7036', name: 'Machine07.001.rejecttissue'},
  {id: '7037', name: 'Machine07.001.rejectair-let'},
  {id: '7038', name: 'Machine07.001.outlet-coverreject'},
  {id: '7039', name: 'Machine07.001.inner-coverreject'},
  {id: '7040', name: 'Machine07.001.front-earreject'},
  {id: '7041', name: 'Machine07.001.back-earreject'},
  {id: '7042', name: 'Machine07.001.polybafflereject'},
  {id: '7043', name: 'Machine07.001.notgoodreject'},
  {id: '7044', name: 'Machine07.001.joininginsidepanelreject'},
  {id: '7045', name: 'Machine07.001.joiningoutsidepanelreject'},
  {id: '7046', name: 'Machine07.001.joiningsurgereject'},
  //11 -->30
  {id: '7048', name: 'Machine07.001.stopduetoSurgebreak'},
  {id: '7049', name: 'Machine07.001.stopduetoAir-ledBreak'},
  {id: '7050', name: 'Machine07.001.stopduetoOutletcoverBreak'},
  {id: '7051', name: 'Machine07.001.stopduetoInnercoverBreak'},
  {id: '7052', name: 'Machine07.001.stopduetoFrontearBreak'},
  {id: '7053', name: 'Machine07.001.stopduetoBackearBreak'},
  {id: '7054', name: 'Machine07.001.stopduetoPolybaffleBreak'},
  {id: '7055', name: 'Machine07.001.stopduetoInsidePanelBreak'},
  {id: '7056', name: 'Machine07.001.stopduetoOutsidePanelBreak'},
  {id: '7057', name: 'Machine07.001.OpstoporUnknAirled'},
  {id: '7058', name: 'Machine07.001.OpstoporUnknOuterCover'},
  {id: '7059', name: 'Machine07.001.OpstoporUnknInnerCover'},
  {id: '7060', name: 'Machine07.001.OpstoporUnknFrontEar'},
  {id: '7061', name: 'Machine07.001.OpstoporUnknBackEar'},
  {id: '7062', name: 'Machine07.001.OpstoporUnknPolyBaffle'},
  {id: '7063', name: 'Machine07.001.OpstoporUnknSurge'},
  {id: '7064', name: 'Machine07.001.OpstoporUnknInsidePanel'},
  {id: '7065', name: 'Machine07.001.OpstoporUnknOutsidePanel'},
  {id: '7066', name: 'Machine07.001.OpstoporUnknMainMachine'},
  {id: '7067', name: 'Machine07.001.OpstoporUnknMainPanel'},
  //31-->50
  {id: '70480', name: 'Machine07.001.stopduetoSurgebreak'},
  {id: '70490', name: 'Machine07.001.stopduetoAir-ledBreak'},
  {id: '70500', name: 'Machine07.001.stopduetoOutletcoverBreak'},
  {id: '70510', name: 'Machine07.001.stopduetoInnercoverBreak'},
  {id: '70520', name: 'Machine07.001.stopduetoFrontearBreak'},
  {id: '70530', name: 'Machine07.001.stopduetoBackearBreak'},
  {id: '70540', name: 'Machine07.001.stopduetoPolybaffleBreak'},
  {id: '70550', name: 'Machine07.001.stopduetoInsidePanelBreak'},
  {id: '70560', name: 'Machine07.001.stopduetoOutsidePanelBreak'},
  {id: '70570', name: 'Machine07.001.OpstoporUnknAirled'},
  {id: '70580', name: 'Machine07.001.OpstoporUnknOuterCover'},
  {id: '70590', name: 'Machine07.001.OpstoporUnknInnerCover'},
  {id: '70600', name: 'Machine07.001.OpstoporUnknFrontEar'},
  {id: '70610', name: 'Machine07.001.OpstoporUnknBackEar'},
  {id: '70620', name: 'Machine07.001.OpstoporUnknPolyBaffle'},
  {id: '70630', name: 'Machine07.001.OpstoporUnknSurge'},
  {id: '70640', name: 'Machine07.001.OpstoporUnknInsidePanel'},
  {id: '70650', name: 'Machine07.001.OpstoporUnknOutsidePanel'},
  {id: '70660', name: 'Machine07.001.OpstoporUnknMainMachine'},
  {id: '70670', name: 'Machine07.001.OpstoporUnknMainPanel'},
  //51
  {id: '7079', name: 'Machine07.001.TotalGood'},
  {id: '7080', name: 'Machine07.001.TotalWaste'},
  {id: '7081', name: 'Machine07.001.TotalCuts'},
  {id: '7082', name: 'Machine07.001.ShiftTime'},
  {id: '7083', name: 'Machine07.001.MachineRunningTime'},
  {id: '7084', name: 'Machine07.001.MachineStop'},
  {id: '7085', name: 'Machine07.001.MachineSpeed'},
  {id: '7086', name: 'Machine07.001.ActualSpeed'},
  {id: '7087', name: 'Machine07.001.SuOnHr'},
  {id: '7088', name: 'Machine07.001.AvgSpeed'},
  {id: '7089', name: 'Machine07.001.TargetSpeed'},
  {id: '7090', name: 'Machine07.001.Total'},
  {id: '7091', name: 'Machine07.001.Min'},
  {id: '7092', name: 'Machine07.001.Events'},
  {id: '7093', name: 'Machine07.001.StartUp'},
  {id: '7094', name: 'Machine07.001.Running'},
]
const arraydata8 = [
  //0 -->10
  {id: '8036', name: 'Machine08.001.rejecttissue'},
  {id: '8037', name: 'Machine08.001.rejectair-let'},
  {id: '8038', name: 'Machine08.001.outlet-coverreject'},
  {id: '8039', name: 'Machine08.001.inner-coverreject'},
  {id: '8040', name: 'Machine08.001.front-earreject'},
  {id: '8041', name: 'Machine08.001.back-earreject'},
  {id: '8042', name: 'Machine08.001.polybafflereject'},
  {id: '8043', name: 'Machine08.001.notgoodreject'},
  {id: '8044', name: 'Machine08.001.joininginsidepanelreject'},
  {id: '8045', name: 'Machine08.001.joiningoutsidepanelreject'},
  {id: '8046', name: 'Machine08.001.joiningsurgereject'},
  //11 -->30
  {id: '8048', name: 'Machine08.001.stopduetoSurgebreak'},
  {id: '8049', name: 'Machine08.001.stopduetoAir-ledBreak'},
  {id: '8050', name: 'Machine08.001.stopduetoOutletcoverBreak'},
  {id: '8051', name: 'Machine08.001.stopduetoInnercoverBreak'},
  {id: '8052', name: 'Machine08.001.stopduetoFrontearBreak'},
  {id: '8053', name: 'Machine08.001.stopduetoBackearBreak'},
  {id: '8054', name: 'Machine08.001.stopduetoPolybaffleBreak'},
  {id: '8055', name: 'Machine08.001.stopduetoInsidePanelBreak'},
  {id: '8056', name: 'Machine08.001.stopduetoOutsidePanelBreak'},
  {id: '8057', name: 'Machine08.001.OpstoporUnknAirled'},
  {id: '8058', name: 'Machine08.001.OpstoporUnknOuterCover'},
  {id: '8059', name: 'Machine08.001.OpstoporUnknInnerCover'},
  {id: '8060', name: 'Machine08.001.OpstoporUnknFrontEar'},
  {id: '8061', name: 'Machine08.001.OpstoporUnknBackEar'},
  {id: '8062', name: 'Machine08.001.OpstoporUnknPolyBaffle'},
  {id: '8063', name: 'Machine08.001.OpstoporUnknSurge'},
  {id: '8064', name: 'Machine08.001.OpstoporUnknInsidePanel'},
  {id: '8065', name: 'Machine08.001.OpstoporUnknOutsidePanel'},
  {id: '8066', name: 'Machine08.001.OpstoporUnknMainMachine'},
  {id: '8067', name: 'Machine08.001.OpstoporUnknMainPanel'},
  //31-->50
  {id: '80480', name: 'Machine08.001.stopduetoSurgebreak'},
  {id: '80490', name: 'Machine08.001.stopduetoAir-ledBreak'},
  {id: '80500', name: 'Machine08.001.stopduetoOutletcoverBreak'},
  {id: '80510', name: 'Machine08.001.stopduetoInnercoverBreak'},
  {id: '80520', name: 'Machine08.001.stopduetoFrontearBreak'},
  {id: '80530', name: 'Machine08.001.stopduetoBackearBreak'},
  {id: '80540', name: 'Machine08.001.stopduetoPolybaffleBreak'},
  {id: '80550', name: 'Machine08.001.stopduetoInsidePanelBreak'},
  {id: '80560', name: 'Machine08.001.stopduetoOutsidePanelBreak'},
  {id: '80570', name: 'Machine08.001.OpstoporUnknAirled'},
  {id: '80580', name: 'Machine08.001.OpstoporUnknOuterCover'},
  {id: '80590', name: 'Machine08.001.OpstoporUnknInnerCover'},
  {id: '80600', name: 'Machine08.001.OpstoporUnknFrontEar'},
  {id: '80610', name: 'Machine08.001.OpstoporUnknBackEar'},
  {id: '80620', name: 'Machine08.001.OpstoporUnknPolyBaffle'},
  {id: '80630', name: 'Machine08.001.OpstoporUnknSurge'},
  {id: '80640', name: 'Machine08.001.OpstoporUnknInsidePanel'},
  {id: '80650', name: 'Machine08.001.OpstoporUnknOutsidePanel'},
  {id: '80660', name: 'Machine08.001.OpstoporUnknMainMachine'},
  {id: '80670', name: 'Machine08.001.OpstoporUnknMainPanel'},
  //51
  {id: '8079', name: 'Machine08.001.TotalGood'},
  {id: '8080', name: 'Machine08.001.TotalWaste'},
  {id: '8081', name: 'Machine08.001.TotalCuts'},
  {id: '8082', name: 'Machine08.001.ShiftTime'},
  {id: '8083', name: 'Machine08.001.MachineRunningTime'},
  {id: '8084', name: 'Machine08.001.MachineStop'},
  {id: '8085', name: 'Machine08.001.MachineSpeed'},
  {id: '8086', name: 'Machine08.001.ActualSpeed'},
  {id: '8087', name: 'Machine08.001.SuOnHr'},
  {id: '8088', name: 'Machine08.001.AvgSpeed'},
  {id: '8089', name: 'Machine08.001.TargetSpeed'},
  {id: '8090', name: 'Machine08.001.Total'},
  {id: '8091', name: 'Machine08.001.Min'},
  {id: '8092', name: 'Machine08.001.Events'},
  {id: '8093', name: 'Machine08.001.StartUp'},
  {id: '8094', name: 'Machine08.001.Running'},
]
const arraydata9 = [
  //0 -->10
  {id: '9036', name: 'Machine09.001.rejecttissue'},
  {id: '9037', name: 'Machine09.001.rejectair-let'},
  {id: '9038', name: 'Machine09.001.outlet-coverreject'},
  {id: '9039', name: 'Machine09.001.inner-coverreject'},
  {id: '9040', name: 'Machine09.001.front-earreject'},
  {id: '9041', name: 'Machine09.001.back-earreject'},
  {id: '9042', name: 'Machine09.001.polybafflereject'},
  {id: '9043', name: 'Machine09.001.notgoodreject'},
  {id: '9044', name: 'Machine09.001.joininginsidepanelreject'},
  {id: '9045', name: 'Machine09.001.joiningoutsidepanelreject'},
  {id: '9046', name: 'Machine09.001.joiningsurgereject'},
  //11 -->30
  {id: '9048', name: 'Machine09.001.stopduetoSurgebreak'},
  {id: '9049', name: 'Machine09.001.stopduetoAir-ledBreak'},
  {id: '9050', name: 'Machine09.001.stopduetoOutletcoverBreak'},
  {id: '9051', name: 'Machine09.001.stopduetoInnercoverBreak'},
  {id: '9052', name: 'Machine09.001.stopduetoFrontearBreak'},
  {id: '9053', name: 'Machine09.001.stopduetoBackearBreak'},
  {id: '9054', name: 'Machine09.001.stopduetoPolybaffleBreak'},
  {id: '9055', name: 'Machine09.001.stopduetoInsidePanelBreak'},
  {id: '9056', name: 'Machine09.001.stopduetoOutsidePanelBreak'},
  {id: '9057', name: 'Machine09.001.OpstoporUnknAirled'},
  {id: '9058', name: 'Machine09.001.OpstoporUnknOuterCover'},
  {id: '9059', name: 'Machine09.001.OpstoporUnknInnerCover'},
  {id: '9060', name: 'Machine09.001.OpstoporUnknFrontEar'},
  {id: '9061', name: 'Machine09.001.OpstoporUnknBackEar'},
  {id: '9062', name: 'Machine09.001.OpstoporUnknPolyBaffle'},
  {id: '9063', name: 'Machine09.001.OpstoporUnknSurge'},
  {id: '9064', name: 'Machine09.001.OpstoporUnknInsidePanel'},
  {id: '9065', name: 'Machine09.001.OpstoporUnknOutsidePanel'},
  {id: '9066', name: 'Machine09.001.OpstoporUnknMainMachine'},
  {id: '9067', name: 'Machine09.001.OpstoporUnknMainPanel'},
  //31-->50
  {id: '90480', name: 'Machine09.001.stopduetoSurgebreak'},
  {id: '90490', name: 'Machine09.001.stopduetoAir-ledBreak'},
  {id: '90500', name: 'Machine09.001.stopduetoOutletcoverBreak'},
  {id: '90510', name: 'Machine09.001.stopduetoInnercoverBreak'},
  {id: '90520', name: 'Machine09.001.stopduetoFrontearBreak'},
  {id: '90530', name: 'Machine09.001.stopduetoBackearBreak'},
  {id: '90540', name: 'Machine09.001.stopduetoPolybaffleBreak'},
  {id: '90550', name: 'Machine09.001.stopduetoInsidePanelBreak'},
  {id: '90560', name: 'Machine09.001.stopduetoOutsidePanelBreak'},
  {id: '90570', name: 'Machine09.001.OpstoporUnknAirled'},
  {id: '90580', name: 'Machine09.001.OpstoporUnknOuterCover'},
  {id: '90590', name: 'Machine09.001.OpstoporUnknInnerCover'},
  {id: '90600', name: 'Machine09.001.OpstoporUnknFrontEar'},
  {id: '90610', name: 'Machine09.001.OpstoporUnknBackEar'},
  {id: '90620', name: 'Machine09.001.OpstoporUnknPolyBaffle'},
  {id: '90630', name: 'Machine09.001.OpstoporUnknSurge'},
  {id: '90640', name: 'Machine09.001.OpstoporUnknInsidePanel'},
  {id: '90650', name: 'Machine09.001.OpstoporUnknOutsidePanel'},
  {id: '90660', name: 'Machine09.001.OpstoporUnknMainMachine'},
  {id: '90670', name: 'Machine09.001.OpstoporUnknMainPanel'},
  //51
  {id: '9079', name: 'Machine09.001.TotalGood'},
  {id: '9080', name: 'Machine09.001.TotalWaste'},
  {id: '9081', name: 'Machine09.001.TotalCuts'},
  {id: '9082', name: 'Machine09.001.ShiftTime'},
  {id: '9083', name: 'Machine09.001.MachineRunningTime'},
  {id: '9084', name: 'Machine09.001.MachineStop'},
  {id: '9085', name: 'Machine09.001.MachineSpeed'},
  {id: '9086', name: 'Machine09.001.ActualSpeed'},
  {id: '9087', name: 'Machine09.001.SuOnHr'},
  {id: '9088', name: 'Machine09.001.AvgSpeed'},
  {id: '9089', name: 'Machine09.001.TargetSpeed'},
  {id: '9090', name: 'Machine09.001.Total'},
  {id: '9091', name: 'Machine09.001.Min'},
  {id: '9092', name: 'Machine09.001.Events'},
  {id: '9093', name: 'Machine09.001.StartUp'},
  {id: '9094', name: 'Machine09.001.Running'},
]
const arraydata10 = [
  //0 -->10
  {id: '10036', name: 'Machine10.001.rejecttissue'},
  {id: '10037', name: 'Machine10.001.rejectair-let'},
  {id: '10038', name: 'Machine10.001.outlet-coverreject'},
  {id: '10039', name: 'Machine10.001.inner-coverreject'},
  {id: '10040', name: 'Machine10.001.front-earreject'},
  {id: '10041', name: 'Machine10.001.back-earreject'},
  {id: '10042', name: 'Machine10.001.polybafflereject'},
  {id: '10043', name: 'Machine10.001.notgoodreject'},
  {id: '10044', name: 'Machine10.001.joininginsidepanelreject'},
  {id: '10045', name: 'Machine10.001.joiningoutsidepanelreject'},
  {id: '10046', name: 'Machine10.001.joiningsurgereject'},
  //11 -->30
  {id: '10048', name: 'Machine10.001.stopduetoSurgebreak'},
  {id: '10049', name: 'Machine10.001.stopduetoAir-ledBreak'},
  {id: '10050', name: 'Machine10.001.stopduetoOutletcoverBreak'},
  {id: '10051', name: 'Machine10.001.stopduetoInnercoverBreak'},
  {id: '10052', name: 'Machine10.001.stopduetoFrontearBreak'},
  {id: '10053', name: 'Machine10.001.stopduetoBackearBreak'},
  {id: '10054', name: 'Machine10.001.stopduetoPolybaffleBreak'},
  {id: '10055', name: 'Machine10.001.stopduetoInsidePanelBreak'},
  {id: '10056', name: 'Machine10.001.stopduetoOutsidePanelBreak'},
  {id: '10057', name: 'Machine10.001.OpstoporUnknAirled'},
  {id: '10058', name: 'Machine10.001.OpstoporUnknOuterCover'},
  {id: '10059', name: 'Machine10.001.OpstoporUnknInnerCover'},
  {id: '10060', name: 'Machine10.001.OpstoporUnknFrontEar'},
  {id: '10061', name: 'Machine10.001.OpstoporUnknBackEar'},
  {id: '10062', name: 'Machine10.001.OpstoporUnknPolyBaffle'},
  {id: '10063', name: 'Machine10.001.OpstoporUnknSurge'},
  {id: '10064', name: 'Machine10.001.OpstoporUnknInsidePanel'},
  {id: '10065', name: 'Machine10.001.OpstoporUnknOutsidePanel'},
  {id: '10066', name: 'Machine10.001.OpstoporUnknMainMachine'},
  {id: '10067', name: 'Machine10.001.OpstoporUnknMainPanel'},
  //31-->50
  {id: '100480', name: 'Machine10.001.stopduetoSurgebreak'},
  {id: '100490', name: 'Machine10.001.stopduetoAir-ledBreak'},
  {id: '100500', name: 'Machine10.001.stopduetoOutletcoverBreak'},
  {id: '100510', name: 'Machine10.001.stopduetoInnercoverBreak'},
  {id: '100520', name: 'Machine10.001.stopduetoFrontearBreak'},
  {id: '100530', name: 'Machine10.001.stopduetoBackearBreak'},
  {id: '100540', name: 'Machine10.001.stopduetoPolybaffleBreak'},
  {id: '100550', name: 'Machine10.001.stopduetoInsidePanelBreak'},
  {id: '100560', name: 'Machine10.001.stopduetoOutsidePanelBreak'},
  {id: '100570', name: 'Machine10.001.OpstoporUnknAirled'},
  {id: '100580', name: 'Machine10.001.OpstoporUnknOuterCover'},
  {id: '100590', name: 'Machine10.001.OpstoporUnknInnerCover'},
  {id: '100600', name: 'Machine10.001.OpstoporUnknFrontEar'},
  {id: '100610', name: 'Machine10.001.OpstoporUnknBackEar'},
  {id: '100620', name: 'Machine10.001.OpstoporUnknPolyBaffle'},
  {id: '100630', name: 'Machine10.001.OpstoporUnknSurge'},
  {id: '100640', name: 'Machine10.001.OpstoporUnknInsidePanel'},
  {id: '100650', name: 'Machine10.001.OpstoporUnknOutsidePanel'},
  {id: '100660', name: 'Machine10.001.OpstoporUnknMainMachine'},
  {id: '100670', name: 'Machine10.001.OpstoporUnknMainPanel'},
  //51
  {id: '10079', name: 'Machine10.001.TotalGood'},
  {id: '10080', name: 'Machine10.001.TotalWaste'},
  {id: '10081', name: 'Machine10.001.TotalCuts'},
  {id: '10082', name: 'Machine10.001.ShiftTime'},
  {id: '10083', name: 'Machine10.001.MachineRunningTime'},
  {id: '10084', name: 'Machine10.001.MachineStop'},
  {id: '10085', name: 'Machine10.001.MachineSpeed'},
  {id: '10086', name: 'Machine10.001.ActualSpeed'},
  {id: '10087', name: 'Machine10.001.SuOnHr'},
  {id: '10088', name: 'Machine10.001.AvgSpeed'},
  {id: '10089', name: 'Machine10.001.TargetSpeed'},
  {id: '10090', name: 'Machine10.001.Total'},
  {id: '10091', name: 'Machine10.001.Min'},
  {id: '10092', name: 'Machine10.001.Events'},
  {id: '10093', name: 'Machine10.001.StartUp'},
  {id: '10094', name: 'Machine10.001.Running'},
]
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
function getRandomRange(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is exclusive and the minimum is inclusive
}


// console.log(value);
// var workbook = XLSX.readFile('src/data/book1.xlsx');
// let worksheet = workbook.Sheets.Sheet1;
var timeStart = 1709247600;
// var timeStart = 1609480800;
//var now = Date.now()/1000;
var now = 1803855600;
//console.log(now);
var n = 0;
async function dataToSQL(){
  for (var run = timeStart; run < now; run = run + 28800){
    var value1 = [];
    for (let index = 0; index < arraydata1.length; index++) {
      if (index >= 0 && index <= 10){
        value1[index] = getRandomInt(3)
      }
      if (index > 10 && index <= 30){
        value1[index] = getRandomInt(2)
      }
      if (index > 30 && index <= 50){
        if (value1[index - 20] === '0'){
          value1[index] = 0;
        }
        else {value1[index] = getRandomRange(30, 50)}
      }
      if (index == 51){
        value1[index] = getRandomRange(1789,1980);
      }
      if (index == 52){
        let a = 0;
        for (let i = 0; i <= 30; i++) {
          a = a + value1[i];
        }
        value1[index] = a;
      }
      if (index == 53){
        value1[index] = value1[51] + value1[52];
      }
      if (index == 54){
        value1[index] = 28800; //1082
      }
      if (index == 55){
        let b = 0;
        for (let t = 31; t <= 50; t++) {
          b = b + value1[t];
        }
        value1[index] = value1[54] - b; //1083
      }
      if (index == 56){
        value1[index] = value1[54] - value1[55];
      }
      if (index == 57){
        value1[index] = getRandomRange(649, 651);
      }
      if (index == 58){
        value1[index] = Math.ceil(value1[57]*0.9);
      }
      if (index == 59){
        let c = value1[51]/1000;
        value1[index] = c/8;
      }
      if (index == 60){
        value1[index] = getRandomRange(620, 640);
      }
      if (index == 61){
        value1[index] = 650;
      }
      if (index == 62){
        value1[index] = value1[56];
      }
      if (index == 63){
        value1[index] = value1[62]/60;
      }
      if (index == 64){
        let totalIn = 0;
        for (let k = 0; k <= 30; k++){
          if (value1[k] != 0){
            totalIn++;
          }
        }
        value1[index] = totalIn;
      }
      if (index == 65){
        value1[index] = getRandomRange(3,7);
      }
    }
    for (let ID = 0; ID <= 65; ID++){
      let data = {}
      data.id = arraydata1[ID].id;
      data.name = arraydata1[ID].name;
      data.value = value1[ID];
      data.datetime = new Date(run*1000).toISOString();
      try {
        let message = await HRService.createNewLog(data) 
        console.clear();
        console.log(message);
      } catch (error) {
        console.log (error)
      }
    }
    var value2 = [];
    for (let index = 0; index < arraydata2.length; index++) {
      if (index >= 0 && index <= 10){
        value2[index] = getRandomInt(3)
      }
      if (index > 10 && index <= 30){
        value2[index] = getRandomInt(2)
      }
      if (index > 30 && index <= 50){
        if (value2[index - 20] === '0'){
          value2[index] = 0;
        }
        else {value2[index] = getRandomRange(30, 50)}
      }
      if (index == 51){
        value2[index] = getRandomRange(1789,1980);
      }
      if (index == 52){
        let a = 0;
        for (let i = 0; i <= 30; i++) {
          a = a + value2[i];
        }
        value2[index] = a;
      }
      if (index == 53){
        value2[index] = value2[51] + value2[52];
      }
      if (index == 54){
        value2[index] = 28800; //1082
      }
      if (index == 55){
        let b = 0;
        for (let t = 31; t <= 50; t++) {
          b = b + value2[t];
        }
        value2[index] = value2[54] - b; //1083
      }
      if (index == 56){
        value2[index] = value2[54] - value2[55];
      }
      if (index == 57){
        value2[index] = getRandomRange(649, 651);
      }
      if (index == 58){
        value2[index] = Math.ceil(value2[57]*0.9);
      }
      if (index == 59){
        let c = value2[51]/1000;
        value2[index] = c/8;
      }
      if (index == 60){
        value2[index] = getRandomRange(620, 640);
      }
      if (index == 61){
        value2[index] = 650;
      }
      if (index == 62){
        value2[index] = value2[56];
      }
      if (index == 63){
        value2[index] = value2[62]/60;
      }
      if (index == 64){
        let totalIn = 0;
        for (let k = 0; k <= 30; k++){
          if (value2[k] != 0){
            totalIn++;
          }
        }
        value2[index] = totalIn;
      }
      if (index == 65){
        value2[index] = getRandomRange(3,7);
      }
    }
    for (let ID = 0; ID <= 65; ID++){
      let data = {}
      data.id = arraydata2[ID].id;
      data.name = arraydata2[ID].name;
      data.value = value2[ID];
      data.datetime = new Date(run*1000).toISOString();
      try {
        let message = await HRService.createNewLog(data)
        console.clear();
        console.log(message);
      } catch (error) {
        console.log (error)
      }
    }
    var value3 = [];
    for (let index = 0; index < arraydata3.length; index++) {
      if (index >= 0 && index <= 10){
        value3[index] = getRandomInt(3)
      }
      if (index > 10 && index <= 30){
        value3[index] = getRandomInt(2)
      }
      if (index > 30 && index <= 50){
        if (value3[index - 20] === '0'){
          value3[index] = 0;
        }
        else {value3[index] = getRandomRange(30, 50)}
      }
      if (index == 51){
        value3[index] = getRandomRange(1789,1980);
      }
      if (index == 52){
        let a = 0;
        for (let i = 0; i <= 30; i++) {
          a = a + value3[i];
        }
        value3[index] = a;
      }
      if (index == 53){
        value3[index] = value3[51] + value3[52];
      }
      if (index == 54){
        value3[index] = 28800; //1082
      }
      if (index == 55){
        let b = 0;
        for (let t = 31; t <= 50; t++) {
          b = b + value3[t];
        }
        value3[index] = value3[54] - b; //1083
      }
      if (index == 56){
        value3[index] = value3[54] - value3[55];
      }
      if (index == 57){
        value3[index] = getRandomRange(649, 651);
      }
      if (index == 58){
        value3[index] = Math.ceil(value3[57]*0.9);
      }
      if (index == 59){
        let c = value3[51]/1000;
        value3[index] = c/8;
      }
      if (index == 60){
        value3[index] = getRandomRange(620, 640);
      }
      if (index == 61){
        value3[index] = 650;
      }
      if (index == 62){
        value3[index] = value3[56];
      }
      if (index == 63){
        value3[index] = value3[62]/60;
      }
      if (index == 64){
        let totalIn = 0;
        for (let k = 0; k <= 30; k++){
          if (value3[k] != 0){
            totalIn++;
          }
        }
        value3[index] = totalIn;
      }
      if (index == 65){
        value3[index] = getRandomRange(3,7);
      }
    }
    for (let ID = 0; ID <= 65; ID++){
      let data = {}
      data.id = arraydata3[ID].id;
      data.name = arraydata3[ID].name;
      data.value = value3[ID];
      data.datetime = new Date(run*1000).toISOString();
      try {
        let message = await HRService.createNewLog(data)
        console.clear();
        console.log(message);
      } catch (error) {
        console.log (error)
      }
    }
    var value4 = [];
    for (let index = 0; index < arraydata4.length; index++) {
      if (index >= 0 && index <= 10){
        value4[index] = getRandomInt(3)
      }
      if (index > 10 && index <= 30){
        value4[index] = getRandomInt(2)
      }
      if (index > 30 && index <= 50){
        if (value4[index - 20] === '0'){
          value4[index] = 0;
        }
        else {value4[index] = getRandomRange(30, 50)}
      }
      if (index == 51){
        value4[index] = getRandomRange(1789,1980);
      }
      if (index == 52){
        let a = 0;
        for (let i = 0; i <= 30; i++) {
          a = a + value4[i];
        }
        value4[index] = a;
      }
      if (index == 53){
        value4[index] = value4[51] + value4[52];
      }
      if (index == 54){
        value4[index] = 28800; //1082
      }
      if (index == 55){
        let b = 0;
        for (let t = 31; t <= 50; t++) {
          b = b + value4[t];
        }
        value4[index] = value4[54] - b; //1083
      }
      if (index == 56){
        value4[index] = value4[54] - value4[55];
      }
      if (index == 57){
        value4[index] = getRandomRange(649, 651);
      }
      if (index == 58){
        value4[index] = Math.ceil(value4[57]*0.9);
      }
      if (index == 59){
        let c = value4[51]/1000;
        value4[index] = c/8;
      }
      if (index == 60){
        value4[index] = getRandomRange(620, 640);
      }
      if (index == 61){
        value4[index] = 650;
      }
      if (index == 62){
        value4[index] = value4[56];
      }
      if (index == 63){
        value4[index] = value4[62]/60;
      }
      if (index == 64){
        let totalIn = 0;
        for (let k = 0; k <= 30; k++){
          if (value4[k] != 0){
            totalIn++;
          }
        }
        value4[index] = totalIn;
      }
      if (index == 65){
        value4[index] = getRandomRange(3,7);
      }
    }
    for (let ID = 0; ID <= 65; ID++){
      let data = {}
      data.id = arraydata4[ID].id;
      data.name = arraydata4[ID].name;
      data.value = value4[ID];
      data.datetime = new Date(run*1000).toISOString();
      try {
        let message = await HRService.createNewLog(data)
        console.clear();
        console.log(message);
      } catch (error) {
        console.log (error)
      }
    }
    var value5 = [];
    for (let index = 0; index < arraydata5.length; index++) {
      if (index >= 0 && index <= 10){
        value5[index] = getRandomInt(3)
      }
      if (index > 10 && index <= 30){
        value5[index] = getRandomInt(2)
      }
      if (index > 30 && index <= 50){
        if (value5[index - 20] === '0'){
          value5[index] = 0;
        }
        else {value5[index] = getRandomRange(30, 50)}
      }
      if (index == 51){
        value5[index] = getRandomRange(1789,1980);
      }
      if (index == 52){
        let a = 0;
        for (let i = 0; i <= 30; i++) {
          a = a + value5[i];
        }
        value5[index] = a;
      }
      if (index == 53){
        value5[index] = value5[51] + value5[52];
      }
      if (index == 54){
        value5[index] = 28800; //1082
      }
      if (index == 55){
        let b = 0;
        for (let t = 31; t <= 50; t++) {
          b = b + value5[t];
        }
        value5[index] = value5[54] - b; //1083
      }
      if (index == 56){
        value5[index] = value5[54] - value5[55];
      }
      if (index == 57){
        value5[index] = getRandomRange(649, 651);
      }
      if (index == 58){
        value5[index] = Math.ceil(value5[57]*0.9);
      }
      if (index == 59){
        let c = value5[51]/1000;
        value5[index] = c/8;
      }
      if (index == 60){
        value5[index] = getRandomRange(620, 640);
      }
      if (index == 61){
        value5[index] = 650;
      }
      if (index == 62){
        value5[index] = value5[56];
      }
      if (index == 63){
        value5[index] = value5[62]/60;
      }
      if (index == 64){
        let totalIn = 0;
        for (let k = 0; k <= 30; k++){
          if (value5[k] != 0){
            totalIn++;
          }
        }
        value5[index] = totalIn;
      }
      if (index == 65){
        value5[index] = getRandomRange(3,7);
      }
    }
    for (let ID = 0; ID <= 65; ID++){
      let data = {}
      data.id = arraydata5[ID].id;
      data.name = arraydata5[ID].name;
      data.value = value5[ID];
      data.datetime = new Date(run*1000).toISOString();
      try {
        let message = await HRService.createNewLog(data)
        console.clear();
        console.log(message);
      } catch (error) {
        console.log (error)
      }
    }
    var value6 = [];
    for (let index = 0; index < arraydata6.length; index++) {
      if (index >= 0 && index <= 10){
        value6[index] = getRandomInt(3)
      }
      if (index > 10 && index <= 30){
        value6[index] = getRandomInt(2)
      }
      if (index > 30 && index <= 50){
        if (value6[index - 20] === '0'){
          value6[index] = 0;
        }
        else {value6[index] = getRandomRange(30, 50)}
      }
      if (index == 51){
        value6[index] = getRandomRange(1789,1980);
      }
      if (index == 52){
        let a = 0;
        for (let i = 0; i <= 30; i++) {
          a = a + value6[i];
        }
        value6[index] = a;
      }
      if (index == 53){
        value6[index] = value6[51] + value6[52];
      }
      if (index == 54){
        value6[index] = 28800; //1082
      }
      if (index == 55){
        let b = 0;
        for (let t = 31; t <= 50; t++) {
          b = b + value6[t];
        }
        value6[index] = value6[54] - b; //1083
      }
      if (index == 56){
        value6[index] = value6[54] - value6[55];
      }
      if (index == 57){
        value6[index] = getRandomRange(649, 651);
      }
      if (index == 58){
        value6[index] = Math.ceil(value6[57]*0.9);
      }
      if (index == 59){
        let c = value6[51]/1000;
        value6[index] = c/8;
      }
      if (index == 60){
        value6[index] = getRandomRange(620, 640);
      }
      if (index == 61){
        value6[index] = 650;
      }
      if (index == 62){
        value6[index] = value6[56];
      }
      if (index == 63){
        value6[index] = value6[62]/60;
      }
      if (index == 64){
        let totalIn = 0;
        for (let k = 0; k <= 30; k++){
          if (value6[k] != 0){
            totalIn++;
          }
        }
        value6[index] = totalIn;
      }
      if (index == 65){
        value6[index] = getRandomRange(3,7);
      }
    }
    for (let ID = 0; ID <= 65; ID++){
      let data = {}
      data.id = arraydata6[ID].id;
      data.name = arraydata6[ID].name;
      data.value = value6[ID];
      data.datetime = new Date(run*1000).toISOString();
      try {
        let message = await HRService.createNewLog(data)
        console.clear();
        console.log(message);
      } catch (error) {
        console.log (error)
      }
    }
    var value7 = [];
    for (let index = 0; index < arraydata7.length; index++) {
      if (index >= 0 && index <= 10){
        value7[index] = getRandomInt(3)
      }
      if (index > 10 && index <= 30){
        value7[index] = getRandomInt(2)
      }
      if (index > 30 && index <= 50){
        if (value7[index - 20] === '0'){
          value7[index] = 0;
        }
        else {value7[index] = getRandomRange(30, 50)}
      }
      if (index == 51){
        value7[index] = getRandomRange(1789,1980);
      }
      if (index == 52){
        let a = 0;
        for (let i = 0; i <= 30; i++) {
          a = a + value7[i];
        }
        value7[index] = a;
      }
      if (index == 53){
        value7[index] = value7[51] + value7[52];
      }
      if (index == 54){
        value7[index] = 28800; //1082
      }
      if (index == 55){
        let b = 0;
        for (let t = 31; t <= 50; t++) {
          b = b + value7[t];
        }
        value7[index] = value7[54] - b; //1083
      }
      if (index == 56){
        value7[index] = value7[54] - value7[55];
      }
      if (index == 57){
        value7[index] = getRandomRange(649, 651);
      }
      if (index == 58){
        value7[index] = Math.ceil(value7[57]*0.9);
      }
      if (index == 59){
        let c = value7[51]/1000;
        value7[index] = c/8;
      }
      if (index == 60){
        value7[index] = getRandomRange(620, 640);
      }
      if (index == 61){
        value7[index] = 650;
      }
      if (index == 62){
        value7[index] = value7[56];
      }
      if (index == 63){
        value7[index] = value7[62]/60;
      }
      if (index == 64){
        let totalIn = 0;
        for (let k = 0; k <= 30; k++){
          if (value7[k] != 0){
            totalIn++;
          }
        }
        value7[index] = totalIn;
      }
      if (index == 65){
        value7[index] = getRandomRange(3,7);
      }
    }
    for (let ID = 0; ID <= 65; ID++){
      let data = {}
      data.id = arraydata7[ID].id;
      data.name = arraydata7[ID].name;
      data.value = value7[ID];
      data.datetime = new Date(run*1000).toISOString();
      try {
        let message = await HRService.createNewLog(data)
        console.clear();
        console.log(message);
      } catch (error) {
        console.log (error)
      }
    }
    var value8 = [];
    for (let index = 0; index < arraydata8.length; index++) {
      if (index >= 0 && index <= 10){
        value8[index] = getRandomInt(3)
      }
      if (index > 10 && index <= 30){
        value8[index] = getRandomInt(2)
      }
      if (index > 30 && index <= 50){
        if (value8[index - 20] === '0'){
          value8[index] = 0;
        }
        else {value8[index] = getRandomRange(30, 50)}
      }
      if (index == 51){
        value8[index] = getRandomRange(1789,1980);
      }
      if (index == 52){
        let a = 0;
        for (let i = 0; i <= 30; i++) {
          a = a + value8[i];
        }
        value8[index] = a;
      }
      if (index == 53){
        value8[index] = value8[51] + value8[52];
      }
      if (index == 54){
        value8[index] = 28800; //1082
      }
      if (index == 55){
        let b = 0;
        for (let t = 31; t <= 50; t++) {
          b = b + value8[t];
        }
        value8[index] = value8[54] - b; //1083
      }
      if (index == 56){
        value8[index] = value8[54] - value8[55];
      }
      if (index == 57){
        value8[index] = getRandomRange(649, 651);
      }
      if (index == 58){
        value8[index] = Math.ceil(value8[57]*0.9);
      }
      if (index == 59){
        let c = value8[51]/1000;
        value8[index] = c/8;
      }
      if (index == 60){
        value8[index] = getRandomRange(620, 640);
      }
      if (index == 61){
        value8[index] = 650;
      }
      if (index == 62){
        value8[index] = value8[56];
      }
      if (index == 63){
        value8[index] = value8[62]/60;
      }
      if (index == 64){
        let totalIn = 0;
        for (let k = 0; k <= 30; k++){
          if (value8[k] != 0){
            totalIn++;
          }
        }
        value8[index] = totalIn;
      }
      if (index == 65){
        value8[index] = getRandomRange(3,7);
      }
    }
    for (let ID = 0; ID <= 65; ID++){
      let data = {}
      data.id = arraydata8[ID].id;
      data.name = arraydata8[ID].name;
      data.value = value8[ID];
      data.datetime = new Date(run*1000).toISOString();
      try {
        let message = await HRService.createNewLog(data)
        console.clear();
        console.log(message);
      } catch (error) {
        console.log (error)
      }
    }
    var value9 = [];
    for (let index = 0; index < arraydata9.length; index++) {
      if (index >= 0 && index <= 10){
        value9[index] = getRandomInt(3)
      }
      if (index > 10 && index <= 30){
        value9[index] = getRandomInt(2)
      }
      if (index > 30 && index <= 50){
        if (value9[index - 20] === '0'){
          value9[index] = 0;
        }
        else {value9[index] = getRandomRange(30, 50)}
      }
      if (index == 51){
        value9[index] = getRandomRange(1789,1980);
      }
      if (index == 52){
        let a = 0;
        for (let i = 0; i <= 30; i++) {
          a = a + value9[i];
        }
        value9[index] = a;
      }
      if (index == 53){
        value9[index] = value9[51] + value9[52];
      }
      if (index == 54){
        value9[index] = 28800; //1082
      }
      if (index == 55){
        let b = 0;
        for (let t = 31; t <= 50; t++) {
          b = b + value9[t];
        }
        value9[index] = value9[54] - b; //1083
      }
      if (index == 56){
        value9[index] = value9[54] - value9[55];
      }
      if (index == 57){
        value9[index] = getRandomRange(649, 651);
      }
      if (index == 58){
        value9[index] = Math.ceil(value9[57]*0.9);
      }
      if (index == 59){
        let c = value9[51]/1000;
        value9[index] = c/8;
      }
      if (index == 60){
        value9[index] = getRandomRange(620, 640);
      }
      if (index == 61){
        value9[index] = 650;
      }
      if (index == 62){
        value9[index] = value9[56];
      }
      if (index == 63){
        value9[index] = value9[62]/60;
      }
      if (index == 64){
        let totalIn = 0;
        for (let k = 0; k <= 30; k++){
          if (value9[k] != 0){
            totalIn++;
          }
        }
        value9[index] = totalIn;
      }
      if (index == 65){
        value9[index] = getRandomRange(3,7);
      }
    }
    for (let ID = 0; ID <= 65; ID++){
      let data = {}
      data.id = arraydata9[ID].id;
      data.name = arraydata9[ID].name;
      data.value = value9[ID];
      data.datetime = new Date(run*1000).toISOString();
      try {
        let message = await HRService.createNewLog(data)
        console.clear();
        console.log(message);
      } catch (error) {
        console.log (error)
      }
    }
    var value10 = [];
    for (let index = 0; index < arraydata10.length; index++) {
      if (index >= 0 && index <= 10){
        value10[index] = getRandomInt(3)
      }
      if (index > 10 && index <= 30){
        value10[index] = getRandomInt(2)
      }
      if (index > 30 && index <= 50){
        if (value10[index - 20] === '0'){
          value10[index] = 0;
        }
        else {value10[index] = getRandomRange(30, 50)}
      }
      if (index == 51){
        value10[index] = getRandomRange(1789,1980);
      }
      if (index == 52){
        let a = 0;
        for (let i = 0; i <= 30; i++) {
          a = a + value10[i];
        }
        value10[index] = a;
      }
      if (index == 53){
        value10[index] = value10[51] + value10[52];
      }
      if (index == 54){
        value10[index] = 28800; //1082
      }
      if (index == 55){
        let b = 0;
        for (let t = 31; t <= 50; t++) {
          b = b + value10[t];
        }
        value10[index] = value10[54] - b; //1083
      }
      if (index == 56){
        value10[index] = value10[54] - value10[55];
      }
      if (index == 57){
        value10[index] = getRandomRange(649, 651);
      }
      if (index == 58){
        value10[index] = Math.ceil(value10[57]*0.9);
      }
      if (index == 59){
        let c = value10[51]/1000;
        value10[index] = c/8;
      }
      if (index == 60){
        value10[index] = getRandomRange(620, 640);
      }
      if (index == 61){
        value10[index] = 650;
      }
      if (index == 62){
        value10[index] = value10[56];
      }
      if (index == 63){
        value10[index] = value10[62]/60;
      }
      if (index == 64){
        let totalIn = 0;
        for (let k = 0; k <= 30; k++){
          if (value10[k] != 0){
            totalIn++;
          }
        }
        value10[index] = totalIn;
      }
      if (index == 65){
        value10[index] = getRandomRange(3,7);
      }
    }
    for (let ID = 0; ID <= 65; ID++){
      let data = {}
      data.id = arraydata10[ID].id;
      data.name = arraydata10[ID].name;
      data.value = value10[ID];
      data.datetime = new Date(run*1000).toISOString();
      try {
        let message = await HRService.createNewLog(data)
        console.clear();
        console.log(message);
      } catch (error) {
        console.log (error)
      }
    }
  }
}
// //#region 
// XLSX.utils.sheet_add_aoa(worksheet, [
//   [n-1,arrayData[ID].id, value[ID], moment(run*1000).format()],
// ], { origin: `A${n}` });
// XLSX.writeFile(workbook, 'src/data/book1.xlsx');192.168
//#endregion

// console.log(worksheet);
async function test(){
  let data = {}
  data.id = '9999';
  data.value = '9999'
  data.name = 'hello'
  data.datetimeX = new Date(Date.now());
  data.datetime = data.datetimeX.toISOString();
  console.log(data.datetime)
  try {
    let message = await HRService.createNewLog(data)
    console.log(message)
  } catch (error) {
    console.log (error)
  }
}

let app = express();
app.use(cors({ credentials: true, origin: true }));

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit:'50mb',extended: true}));

viewEngine(app);
initWebroutes(app);
connectDB();
dataToSQL();

// test();
// var ga = setInterval(() => {
//   const delay = Date.now() - timeoutScheduled;
//   console.clear();
//   console.log(`${delay}ms have passed since I was scheduled`);
//   conn.readAllItems(valuesReady);
// }, 10000);
// let data = {}
// data.id = '9999';
// data.value = '9999'
// data.name = 'hello'
// data.datetimeX = new Date(timeStart*1000).toISOString();
// // data.datetime = data.datetimeX.toISOString();
// console.log(data.datetimeX);

let port = process.env.PORT || 6969;
app.listen(port, () =>{
    //callback
    console.log("Backend is running on port 9909: "+port)
})