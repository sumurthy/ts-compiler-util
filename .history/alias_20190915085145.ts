import * as fs from 'fs';
import * as ts from 'typescript';

function visit(node: ts.Node) {
  if (ts.isFunctionDeclaration(node)) {
    console.log(node);
    for (const param of node.parameters) {
      console.log(param.name.getText());
    }
  }
  node.forEachChild(visit);
}

function instrument(fileName: string, sourceCode: string) {
  const sourceFile = ts.createSourceFile(fileName, sourceCode, ts.ScriptTarget.Latest, true);
  visit(sourceFile);
}

const inputFile = process.argv[2];
instrument(inputFile, fs.readFileSync(inputFile, 'utf-8'));