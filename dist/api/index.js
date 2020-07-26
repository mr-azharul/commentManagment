"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const commenter_1 = __importDefault(require("./routes/commenter"));
const blogger_1 = __importDefault(require("./routes/blogger"));
exports.default = () => {
    const app = express_1.Router();
    commenter_1.default(app);
    blogger_1.default(app);
    return app;
};
//# sourceMappingURL=index.js.map