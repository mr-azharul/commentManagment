"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const envFound = dotenv_1.default.config();
if (envFound.error) {
    throw new Error("⚠️ Couldn't find .env file ⚠️");
}
exports.default = {
    port: process.env.PORT || 3000,
    databaseURL: process.env.MONGODB_URI || "",
    jwtSecret: process.env.JWT_SECRET || "",
    logs: {
        level: process.env.LOG_LEVEL || 'silly',
    },
    api: {
        prefix: '/api',
    }
};
//# sourceMappingURL=index.js.map