'use babel';

import path from 'path';
import fs from 'fs-plus';

export function getTreeViewPath() {
  return (atom.packages.getActivePackage('tree-view').mainModule.treeView.selectedPath);
}

function getFileContentJs(name) {
  return `Template.${name}.onCreated(function on${name}Created() {\n\n});\n
Template.${name}.onRendered(function on${name}Rendered() {\n\n});\n
Template.${name}.events({\n\n});\n
Template.${name}.helpers({\n\n});\n`;
}

function getFileContentHTML(name) {
  return `<template name=\"${name}\">\n\n</template>`;
}

function getFilePath(basepath, templateName, extension) {
  return path.join(basepath, templateName, `${templateName}.${extension}`);
}

export function generateTemplate(path, name) {
  if (!fs.isDirectorySync(path)) {
    console.error('Not a directory');
    return;
  }

  fs.writeFileSync(getFilePath(path, name, 'js'), getFileContentJs(name));
  fs.writeFileSync(getFilePath(path, name, 'html'), getFileContentHTML(name));
}
