"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.static(path_1.default.join(__dirname, "./public")));
app.get('/:page', (req, res) => {
    const urlPage = req.params.page;
    if (urlPage != null) {
        res.sendFile(path_1.default.join(__dirname, `./public/${urlPage}.html`), (err) => {
            if (err) {
                res.status(404).send(`page not found`);
            }
        });
    }
    else {
        res.send(`Welcome to the port ${port}`);
    }
});
app.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, './public/index.html'));
});
app.listen(port, () => {
    console.log(`server running in the port ${port}`);
});
