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
// Serve arquivos estáticos do build Vite
app.use(express_1.default.static(path_1.default.join(__dirname, 'public', 'client', 'dist')));
// Serve imagens e CSS da pasta public
app.use('/assets/', express_1.default.static(path_1.default.join(__dirname, 'client', 'dist', 'assets')));
app.use('/images', express_1.default.static(path_1.default.join(__dirname, 'client', 'public', 'images')));
app.use('/style', express_1.default.static(path_1.default.join(__dirname, 'client', 'public', 'style')));
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
        app.get('/studio/:page', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const urlPage = req.params.page;
            switch (urlPage) {
                case "panel":
                    openHtmlFile(req, res, "portfolioPanel");
                    break;
                case "edit":
                    openHtmlFile(req, res, "editPortfolio");
                    break;
                case "my-projects":
                    //openHtmlFile(req,res,"myProjects");
                    res.send("thats my projects page");
                    break;
                default:
                    res.redirect("/studio/my-projects");
                    break;
            }
        }));
        app.get('/studio', (_req, res) => {
            res.redirect('/studio/my-projects');
        });
        app.get('/login', (req, res) => __awaiter(this, void 0, void 0, function* () {
            openHtmlFile(req, res, "login");
        }));
        app.get('/register', (req, res) => __awaiter(this, void 0, void 0, function* () {
            openHtmlFile(req, res, "signUp");
        }));
        app.get('/account/settings', (req, res) => __awaiter(this, void 0, void 0, function* () {
            res.send("em andamento");
        }));
        app.get('/portfolio', (req, res) => __awaiter(this, void 0, void 0, function* () {
            openHtmlFile(req, res, "portfolio");
        }));
        function openHtmlFile(req, res, file) {
            return __awaiter(this, void 0, void 0, function* () {
                const fullPath = path_1.default.resolve(__dirname, `./client/pages/${file}.html`);
                const url = req.originalUrl;
                let template = fs_1.default.readFileSync(fullPath, 'utf-8');
                template = yield vite.transformIndexHtml(url, template);
                res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
            });
        }
        (0, account_auth_1.default)();
        app.use(vite.middlewares);
        app.listen(port, () => {
            console.log(`server running in the port ${port}`);
        });
    });
}
createServer();
