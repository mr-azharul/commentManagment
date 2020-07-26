"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const User = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        index: true,
    },
    email: {
        type: String,
        lowercase: true,
        unique: true,
        index: true,
    },
    password: String,
    role: {
        type: String,
        default: 'user',
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model('Commenter', User, 'commenter');
//# sourceMappingURL=commenter.js.map