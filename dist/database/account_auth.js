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
exports.default = accountAuthentication;
const express_1 = __importDefault(require("express"));
const firebase_admin_1 = __importDefault(require("./firebase_admin"));
const firebase_admin_2 = require("./firebase_admin");
function accountAuthentication() {
    const app = (0, express_1.default)();
    app.post("/api/account/signIn", (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const { nameId, name, email, cpf_cnpj } = req.body;
            const user = yield firebase_admin_1.default.auth().getUserByEmail(email);
            const docRef = yield firebase_admin_2.db.collection('Account');
            if (cpf_cnpj == null) {
                docRef.add({
                    ["name-id"]: nameId,
                    ["name"]: name,
                    ["email"]: email,
                    ["cpf-cnpj"]: cpf_cnpj,
                    ["verified"]: true
                });
                res.status(201).json({ message: "account created with success: verified" });
            }
            else {
                docRef.add({
                    ["name-id"]: nameId,
                    ["name"]: name,
                    ["email"]: email,
                    ["cpf-cnpj"]: null,
                    ["verified"]: false
                });
                res.status(201).json({ message: "account created with success: not verified" });
            }
        }
        catch (error) {
            res.status(500).json({ message: `error in network to create user` });
        }
    }));
    app.get("/api/account/getAccountAttributes", () => {
    });
    app.patch("/api/account/setSoftAttributes", (req, res) => {
    });
}
