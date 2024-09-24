"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.supabase = exports.deleteOldOrder = exports.deleteOrderFile = void 0;
const supabase_js_1 = require("@supabase/supabase-js");
require("dotenv/config");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({
    path: "../.env"
});
const supabase = (0, supabase_js_1.createClient)((_a = process.env.SUPABASE_URL) !== null && _a !== void 0 ? _a : 'null', (_b = process.env.SUPABASE_SECRET_KEY) !== null && _b !== void 0 ? _b : 'null');
exports.supabase = supabase;
const fetchOldFileIDs = (oldDate) => __awaiter(void 0, void 0, void 0, function* () {
    const ordersData = (yield supabase.from('orders').select('fileid').lte('date', oldDate).order('date', {
        ascending: false
    })).data;
    const fileids = ordersData.map((element) => element.fileid);
    return fileids;
});
const deleteOrderFile = (fileids) => __awaiter(void 0, void 0, void 0, function* () {
    // example URL : https://hxebdlcxtauthsyfyprv.supabase.co/storage/v1/object/public/files/36ab7ea8-b120-44c6-a1a7-06f5509a9ce6/print.pdf
    // followed by the HTTP protocol, and then the file id is inserted after the files/
    const filepathsPDF = fileids.map((obj) => `${obj}/print.pdf`);
    const filepathsIMG = fileids.map((obj) => `${obj}/coverimage.png`);
    const allFilePaths = [...filepathsPDF, ...filepathsIMG];
    console.log("Initiating to delete the file(s), this may take a while, DO NOT STOP THIS EXECUTION");
    const { data, error } = yield supabase.storage.from('files').remove(allFilePaths);
    if (error !== null) {
        console.log(`AN ERROR OCCURED - ${error.message}`);
    }
});
exports.deleteOrderFile = deleteOrderFile;
const deleteOldOrder = (oldDate) => __awaiter(void 0, void 0, void 0, function* () {
    yield supabase.from('orders').delete().lte('date', oldDate);
});
exports.deleteOldOrder = deleteOldOrder;
exports.default = fetchOldFileIDs;
