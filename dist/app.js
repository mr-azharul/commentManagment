"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("./config"));
async function startServer() {
    const app = express_1.default();
    await require('./loaders').default(app);
    app.listen(config_1.default.port, () => {
        console.log(`Server Listening: ${config_1.default.port}`);
    });
}
startServer();
//# sourceMappingURL=app.js.map