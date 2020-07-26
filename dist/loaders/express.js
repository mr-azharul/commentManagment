"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
const api_1 = __importDefault(require("../api"));
const config_1 = __importDefault(require("../config"));
exports.default = async ({ app }) => {
    app.enable('trust proxy');
    app.use(cors_1.default());
    app.options('*', cors_1.default());
    app.use(morgan_1.default('dev'));
    app.use(body_parser_1.default.json({ limit: '50mb' }));
    app.use(body_parser_1.default.urlencoded({ limit: '50mb', extended: true }));
    app.use((req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
        next();
    });
    app.use('/status', (req, res) => {
        res.status(200).end();
    });
    app.use(config_1.default.api.prefix, api_1.default());
    return app;
};
//# sourceMappingURL=express.js.map