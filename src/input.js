"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typescript_1 = __importDefault(require("typescript"));
const sampleVariable = 10;
function visit(node, dummy1, dummy2) {
    if (typescript_1.default.isFunctionDeclaration(node)) {
        console.log(node);
        for (const param of node.parameters) {
            console.log(param.name.getText());
        }
    }
    node.forEachChild(visit);
}
