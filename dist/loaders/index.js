"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("./express"));
const mongoose_1 = __importDefault(require("./mongoose"));
exports.default = async (expressApp) => {
    const mongoConnection = await mongoose_1.default();
    await express_1.default({ app: expressApp });
};
//# sourceMappingURL=index.js.map