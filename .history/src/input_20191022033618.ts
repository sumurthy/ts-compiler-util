import ts from "typescript";

const sampleVariable = 10;

function visit(node: ts.Node, dummy1: string, dummy2: string) {
  if (ts.isFunctionDeclaration(node)) {
    console.log(node);
    for (const param of node.parameters) {
      console.log(param.name.getText());
    }
  }
  node.forEachChild(visit);
}
