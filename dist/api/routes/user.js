"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const route = express_1.Router();
exports.default = (app) => {
    app.use('/users', route);
    route.get('/me', (req, res) => {
        return res.json({ user: "developer" }).status(200);
    });
};
//# sourceMappingURL=user.js.map