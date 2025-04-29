"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
app.get('/:page', (req, res) => {
    const urlPage = req.params.page;
    if (urlPage != null) {
        res.send(`Welcome to the port ${port}. page ${urlPage}`);
    }
    else {
        res.send(`Welcome to the port ${port}`);
    }
});
app.get('/', (req, res) => {
    res.send(`Welcome to the port ${port}`);
});
app.listen(port, () => {
    console.log(`server running in the port ${port}`);
});
