"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../models/user"));
const logger_1 = __importDefault(require("../loaders/logger"));
const typedi_1 = require("typedi");
let AuthService = class AuthService {
    constructor() { }
    async SignUp(userInputDTO) {
        try {
            const userRecord = await user_1.default.create(Object.assign(Object.assign({}, userInputDTO), { password: userInputDTO.password }));
            if (!userRecord) {
                throw new Error('User cannot be created');
            }
            // await this.mailer.SendWelcomeEmail(userRecord);
            const user = userRecord.toObject();
            Reflect.deleteProperty(user, 'password');
            Reflect.deleteProperty(user, 'salt');
            return { user };
        }
        catch (e) {
            logger_1.default.error(e);
            throw e;
        }
    }
    async SignIn(email, password) {
        const userRecord = await user_1.default.findOne({ email });
        if (!userRecord) {
            logger_1.default.error('User not registered');
            throw new Error('User not registered');
        }
        if (userRecord.password == password) {
            const user = userRecord.toObject();
            Reflect.deleteProperty(user, 'password');
            Reflect.deleteProperty(user, 'salt');
            return { user };
        }
        else {
            logger_1.default.error('Invalid Password');
            throw new Error('Invalid Password');
        }
    }
};
AuthService = __decorate([
    typedi_1.Service(),
    __metadata("design:paramtypes", [])
], AuthService);
exports.default = AuthService;
//# sourceMappingURL=auth.js.map