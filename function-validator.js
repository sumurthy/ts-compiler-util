"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const ts = __importStar(require("typescript"));
/**
 * TRANSPILER -- BEGIN.
 */
const source1 = "let x: string  = 'string'";
// const sourceFile: ts.SourceFile = ts.createSourceFile(
//   'test.ts', 'const x  :  number = 42', ts.ScriptTarget.ES2015, true, ts.ScriptKind.TS
// );
let result1 = ts.transpileModule(source1, {
    compilerOptions: { module: ts.ModuleKind.CommonJS }
});
console.log(JSON.stringify(result1));
/**
 * TRANSPILER -- END.
 */
function visit(node) {
    if (ts.isVariableDeclaration(node)) {
        console.log(node.name.getText());
    }
    if (ts.isVariableStatement(node)) {
        node.declarationList;
    }
    if (ts.isParameter(node)) {
        console.log(node.name.getText());
    }
    if (ts.isFunctionDeclaration(node)) {
        console.log(node.name.getText());
        for (const param of node.parameters) {
            console.log(param.name.getText());
        }
    }
    node.forEachChild(visit);
}
function instrument(fileName, sourceCode) {
    const sourceFile = ts.createSourceFile(fileName, sourceCode, ts.ScriptTarget.Latest, true);
    visit(sourceFile);
}
const inputFile = process.argv[2];
instrument(inputFile, fs.readFileSync(inputFile, 'utf-8'));
/**
 * A simple transform function
 * Creating a compiler is simple enough, but you may want to just get the corresponding JavaScript
 * output given TypeScript sources. For this you can use ts.transpileModule to get a string => string
 * transformation in two lines.
 */
const source = "let x: string  = 'string'";
let result = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS }
});
console.log(JSON.stringify(result.outputText));
/* PRINT */
const printSourceFile = (sourceFile) => {
    const printer = ts.createPrinter({
        newLine: ts.NewLineKind.LineFeed,
    });
    return printer.printNode(ts.EmitHint.Unspecified, sourceFile, sourceFile);
};
/*
* TRANSFORMATION - START
*/
const transformer = (context) => (rootNode) => {
    function visit(node) {
        console.log("**Visiting** " + ts.SyntaxKind[node.kind]);
        if (ts.isParameter(node)) {
            console.log(node.name.getText());
        }
        return ts.visitEachChild(node, visit, context);
    }
    return ts.visitNode(rootNode, visit);
};
const sourceFile = ts.createSourceFile(inputFile, fs.readFileSync(inputFile, 'utf-8'), ts.ScriptTarget.Latest, true);
const result2 = ts.transform(sourceFile, [transformer]);
console.log(printSourceFile(result2.transformed[0]));
/*
* TRANSFORMATION - END
*/
/*


const source: string = `function logString(param: string): void {
  console.log(param);
}`;

const sourceFile: ts.SourceFile = ts.createSourceFile(
  'test.ts', source, ts.ScriptTarget.ES2015, true, ts.ScriptKind.TS
);

// Options may be passed to transform
const result: ts.TransformationResult<ts.SourceFile> = ts.transform(
  sourceFile, [ yourTransformer ]
);

const transformedSourceFile: ts.SourceFile = result.transformed[0];

// Options may be passed to createPrinter
const printer: ts.Printer = ts.createPrinter();

const generated: string = printer.printFile(transformedSourceFile);

result.dispose();


*/ 
