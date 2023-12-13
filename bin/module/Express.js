"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Express = void 0;
const express_1 = __importDefault(require("express"));
// import path from 'path';
var app = (0, express_1.default)();
// app.use(express.static(path.join(__dirname, 'public')));
// console.log(app);
class Express {
    constructor() {
    }
    test() {
        console.log('Hello Express');
    }
}
exports.Express = Express;
