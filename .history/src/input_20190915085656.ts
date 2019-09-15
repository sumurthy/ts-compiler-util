import ts from 'typescript';

function visit(node: ts.Node) {
    if (ts.isFunctionDeclaration(node)) {
      console.log(node);
      for (const param of node.parameters) {
        console.log(param.name.getText());
      }
    }
    node.forEachChild(visit);
  }