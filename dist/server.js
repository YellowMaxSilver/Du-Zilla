"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const vite_1 = require("vite");
const fs_1 = __importDefault(require("fs"));
const account_auth_1 = __importDefault(require("./database/account_auth"));
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.static(path_1.default.join(__dirname, "./public")));
// app.get('/',(req,res)=>{
//     res.sendFile(path.join(__dirname,'./public/index.html'));
// });
function createServer() {
    return __awaiter(this, void 0, void 0, function* () {
        const vite = yield (0, vite_1.createServer)({
            server: { middlewareMode: true },
            root: path_1.default.resolve(__dirname, './client'),
            appType: 'custom'
        });
        app.get('', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const url = req.originalUrl;
            try {
                const templatePath = path_1.default.resolve(__dirname, './client/pages/index.html');
                let template = fs_1.default.readFileSync(templatePath, 'utf-8');
                template = yield vite.transformIndexHtml(url, template);
                res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
            }
            catch (e) {
                res.send('not found');
            }
        }));
        app.get('/:page', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const urlPage = req.params.page;
            const url = req.originalUrl;
            if (urlPage != null) {
                try {
                    const templatePath = path_1.default.resolve(__dirname, `./client/pages/${urlPage}.html`);
                    let template = fs_1.default.readFileSync(templatePath, 'utf-8');
                    template = yield vite.transformIndexHtml(url, template);
                    res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
                }
                catch (e) {
                    res.send('not found');
                    console.error("error: ", e);
                }
            }
            else {
                res.send(`Welcome to the port ${port}`);
            }
        }));
        (0, account_auth_1.default)();
        app.use(vite.middlewares);
        app.listen(port, () => {
            console.log(`server running in the port ${port}`);
        });
    });
}
createServer();
