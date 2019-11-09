import * as fs from 'fs';
import * as ts from 'typescript';

/**
 * TRANSPILER -- BEGIN.
 */
const source1 = "let x: string  = 'string'";
const sourceFile: ts.SourceFile = ts.createSourceFile(
  'test.ts', 'const x  :  number = 42', ts.ScriptTarget.ES2015, true, ts.ScriptKind.TS
);

let result1 = ts.transpileModule(source1, {
  compilerOptions: { module: ts.ModuleKind.CommonJS }
});

console.log(JSON.stringify(result1));
/**
 * TRANSPILER -- END.
 */

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


/* PRINT */

const printSourceFile = (sourceFile: ts.SourceFile): string => {
  const printer = ts.createPrinter({
    newLine: ts.NewLineKind.LineFeed,
  });
  return printer.printNode(ts.EmitHint.Unspecified, sourceFile, sourceFile);
};


/*
* TRANSFORMATION - START
*/

const transformer = <T extends ts.Node>(context: ts.TransformationContext) =>
        (rootNode: T) => {
    function visit(node: ts.Node): ts.Node {
        console.log("**Visiting** " + ts.SyntaxKind[node.kind]);
        return ts.visitEachChild(node, visit, context);
    }
    return ts.visitNode(rootNode, visit);
};

const result2: ts.TransformationResult<ts.Node> = ts.transform(
  sourceFile, [ transformer ]
);

console.log(printSourceFile(result2.transformed[0] as ts.SourceFile));
/*
* TRANSFORMATION - END 
*/

