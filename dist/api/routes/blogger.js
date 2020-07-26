"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const celebrate_1 = require("celebrate");
const blogger_1 = __importDefault(require("../../services/blogger"));
const express_1 = require("express");
const route = express_1.Router();
exports.default = (app) => {
    app.use('/blogger', route);
    route.post('/signup', celebrate_1.celebrate({
        body: celebrate_1.Joi.object({
            name: celebrate_1.Joi.string().required(),
            email: celebrate_1.Joi.string().email().required(),
            password: celebrate_1.Joi.string().required(),
        }),
    }), async (req, res, next) => {
        try {
            const BloggerServiceInstance = typedi_1.Container.get(blogger_1.default);
            const { user } = await BloggerServiceInstance.SignUp(req.body);
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
        try {
            const { email, password } = req.body;
            const BloggerServiceInstance = typedi_1.Container.get(blogger_1.default);
            const { user } = await BloggerServiceInstance.SignIn(email, password);
            return res.json({ user }).status(200);
        }
        catch (e) {
            return next(e);
        }
    });
};
//# sourceMappingURL=blogger.js.map