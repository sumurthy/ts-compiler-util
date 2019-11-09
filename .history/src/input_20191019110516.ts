import ts from "typescript";

const sampleVariable = 10;

function visit(node: ts.Node) {
  if (ts.isFunctionDeclaration(node)) {
    console.log(node);
    for (const param of node.parameters) {
      console.log(param.name.getText());
    }
  }
  node.forEachChild(visit);
}
