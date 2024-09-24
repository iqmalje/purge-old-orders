"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
Object.defineProperty(exports, "__esModule", { value: true });
const purge_helper_1 = __importStar(require("./helper/purge.helper"));
const readline_1 = __importDefault(require("readline"));
const purgeOldOrders = () => __awaiter(void 0, void 0, void 0, function* () {
    // feel free to edit this variable's value to reflect the amount of day
    const numberOfDay = 200;
    const oldDate = new Date(new Date().setDate(new Date().getDate() - numberOfDay));
    console.log(`START DELETING ORDERS FROM ${oldDate.toISOString()} AND EARLIER`);
    const fileIDs = yield (0, purge_helper_1.default)(oldDate.toISOString());
    console.log(`A total of ${fileIDs.length} orders will be deleted from the Database`);
    console.log("Press any key to proceed.");
    yield waitForKeyPress();
    // first we delete the old orders
    yield (0, purge_helper_1.deleteOldOrder)(oldDate.toISOString());
    // and then we can delete the files associated
    yield (0, purge_helper_1.deleteOrderFile)(fileIDs);
});
function waitForKeyPress() {
    return new Promise((resolve) => {
        const rl = readline_1.default.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        rl.on('line', () => {
            rl.close();
            resolve();
        });
    });
}
purgeOldOrders();
