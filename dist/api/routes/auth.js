"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const celebrate_1 = require("celebrate");
const auth_1 = __importDefault(require("../../services/auth"));
const express_1 = require("express");
const route = express_1.Router();
exports.default = (app) => {
    app.use('/auth', route);
    route.post('/signup', celebrate_1.celebrate({
        body: celebrate_1.Joi.object({
            name: celebrate_1.Joi.string().required(),
            email: celebrate_1.Joi.string().email().required(),
            password: celebrate_1.Joi.string().required(),
        }),
    }), async (req, res, next) => {
        // console.log('Calling Sign-Up endpoint with body: ', req.body);
        try {
            const authServiceInstance = typedi_1.Container.get(auth_1.default);
            const { user } = await authServiceInstance.SignUp(req.body);
            return res.status(201).json({ user });
        }
        catch (e) {
            return next(e);
        }
    });
    route.post('/signin', celebrate_1.celebrate({
        body: celebrate_1.Joi.object({
            email: celebrate_1.Joi.string().email().required(),
            password: celebrate_1.Joi.string().required(),
        }),
    }), async (req, res, next) => {
        // console.log('Calling Sign-In endpoint with body: ', req.body)
        try {
            const { email, password } = req.body;
            const authServiceInstance = typedi_1.Container.get(auth_1.default);
            const { user } = await authServiceInstance.SignIn(email, password);
            return res.json({ user }).status(200);
        }
        catch (e) {
            return next(e);
        }
    });
};
//# sourceMappingURL=auth.js.map