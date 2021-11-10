"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dbUri = `mongodb://localhost:27017/bids_db`;
mongoose_1.default
    .connect(dbUri)
    .then(() => {
    console.log('set up connection to db');
})
    .catch(() => {
    console.log('mongoose connection error');
});
//# sourceMappingURL=connect.js.map