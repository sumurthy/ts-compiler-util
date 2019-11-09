import * as fs from 'fs';
import * as ts from 'typescript';

function visit(node: ts.Node) {

  if (ts.isVariableDeclaration(node)) {
    console.log(node.name!.getText());
  }
  if (ts.isVariableStatement(node)) {
    node.declarationList
  }  
  if (ts.isParameter(node)) {
    console.log(node.name.getText());
  }

  if (ts.isFunctionDeclaration(node)) {
    console.log(node.name!.getText());
    for (const param of node.parameters) {
      // console.log(param.name.getText());
    }
  }
  node.forEachChild(visit);
}
dnjdhsf

function instrument(fileName: string, sourceCode: string) {
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
