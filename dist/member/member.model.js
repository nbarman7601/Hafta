"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Member = exports.memberSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.memberSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    wish: {
        type: String,
    }
}, {
    timestamps: true
});
exports.memberSchema.statics.build = (attr) => {
    return new Member(attr);
};
const Member = mongoose_1.default.model('Members', exports.memberSchema);
exports.Member = Member;
