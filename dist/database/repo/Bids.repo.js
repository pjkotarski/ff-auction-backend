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
const mongoose_1 = __importDefault(require("mongoose"));
const Bids_model_1 = require("../model/Bids.model");
class BidsRepo {
    static addBid(bidDao) {
        return __awaiter(this, void 0, void 0, function* () {
            if (bidDao._id === undefined) {
                bidDao._id = new mongoose_1.default.Types.ObjectId();
            }
            const bid = new Bids_model_1.BidModel(bidDao); // BidModel is not a constructor
            try {
                yield bid.save();
                return bid;
            }
            catch (error) {
                console.log('THERE WAS AN ERROR ON SAVE', error);
                return {
                    error: 'error'
                };
            }
        });
    }
}
exports.default = BidsRepo;
//# sourceMappingURL=Bids.repo.js.map