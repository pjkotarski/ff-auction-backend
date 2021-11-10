"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BidModel = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const DOCUMENT_NAME = 'Bids';
const COLLECTION_NAME = 'bids_db';
const schema = new mongoose_1.Schema({
    _id: {
        type: mongoose_1.default.Types.ObjectId,
        required: true
    },
    player_id: {
        type: mongoose_1.Schema.Types.String,
        required: true,
        trim: true,
        maxlength: 100,
    },
    amount: {
        type: mongoose_1.Schema.Types.Number,
        required: true
    },
    isLeader: {
        type: mongoose_1.Schema.Types.Boolean,
        required: true
    },
}, { timestamps: true });
const BidModel = (0, mongoose_1.model)(DOCUMENT_NAME, schema, COLLECTION_NAME);
exports.BidModel = BidModel;
//# sourceMappingURL=Bids.model.js.map