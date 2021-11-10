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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
require("./database/connect");
const Bids_repo_1 = __importDefault(require("./database/repo/Bids.repo"));
dotenv_1.default.config();
const port = process.env.SERVER_PORT;
const app = (0, express_1.default)();
app.get('/', (req, res) => {
    res.send('HELLO WORLD');
});
app.get('/add-bid', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bidDao = {
        player_id: 'player id',
        amount: 90,
        isLeader: false
    };
    const result = yield Bids_repo_1.default.addBid(bidDao);
    res.json(JSON.stringify(result));
}));
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});
//# sourceMappingURL=app.js.map