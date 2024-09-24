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
Object.defineProperty(exports, "__esModule", { value: true });
const purgeOldOrders = () => __awaiter(void 0, void 0, void 0, function* () {
    const oldDate = new Date(new Date().setDate(new Date().getDate() - 30));
    // uncomment below to run the script
    /*
    const fileIDs: string[] = await fetchOldFileIDs(oldDate.toISOString());

    // first we delete the old orders

    await deleteOldOrder(oldDate.toISOString());

    // and then we can delete the files associated

    await deleteOrderFile(fileIDs)


    */
});
purgeOldOrders();
