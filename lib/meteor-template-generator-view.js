'use babel';

import fs from 'fs-plus';

export default class MeteorTemplateGeneratorView {
  constructor() {
    const div = document.createElement("div");
    div.classList.add("meteor-template-generator");

    const editor = document.createElement("atom-text-editor");
    editor.setAttribute('mini', true);

    console.dir(editor);

    div.appendChild(editor);

    this.content = div;

    //Needs major cleanup
    atom.commands.add(div,"core:confirm",this.confirm.bind(this));
    atom.commands.add(div,"core:cancel",this.cancel.bind(this));

    this.editor = editor.model;
    this.attach();
  }
  //
  // static content() {
  //   return this.div({ class: 'meteor-template-generator' }, () => {
  //     this.tag('atom-text-editor', { mini: true, outlet: 'inputBox' });
  //     return this.div({ class: 'message', outlet: 'message' });
  //   },
  //   );
  // }
  // Returns an object that can be retrieved when package is activated

  initialize() {
    this.commandSubscription = atom.commands.add('atom-workspace', {
      'meteor-template-generator:generate-template': () => this.attach(),
    });

    // @inputBox.on 'blur', => @close()
    return atom.commands.add(this.element, {
      'core:confirm': () => this.confirm(),
      'core:cancel': () => this.close(),
    },
    );
  }

  // Tear down any state and detach
  destroy() {
    this.panel.destroy();
    return this.commandSubscription.dispose();
  }

  attach() {
    if (this.panel == null) { this.panel = atom.workspace.addModalPanel({ item: this.content, visible: false }); }
    console.log(this.panel);
    const editor = this.panel.item.firstChild.model;
    console.log(editor);
    this.panel.show();
    editor.setText('Enter template name');
    this.panel.item.firstChild.focus();
  }

  close() {
    return this.panel.hide();
  }

  cancel() {
    this.close();
  }

  confirm() {
    this.close();
    const editor = this.panel.item.firstChild.model;
    const text = editor.getText();
    if (text) { return this.generatePackage(text); }
  }

  getPath() {
    return (atom.packages.getActivePackage('tree-view').mainModule.treeView.selectedPath);
  }

  getFileContentJs(name) {
    return `Template.${name}.onCreated(function(){\n\n});\n\n
    Template.${name}.onRendered(function(){\n\n});\n\n
    Template.${name}.events({\n\n});\n\n
    Template.${name}.helpers({\n\n});\n`;
  }

  getFileContentHTML(name) {
    return `<template name=\"${name}\">\n\n</template>`;
  }

  generatePackage(name) {
    console.log(`Making package ${name}`);
    const path = this.getPath();
    if (!fs.isDirectorySync(path)) {
      console.error('Not a directory');
      return;
    }
    console.log(`got path ${path}`);

    fs.writeFileSync(`${path}/${name}/${name}.js`, this.getFileContentJs(name));
    fs.writeFileSync(`${path}/${name}/${name}.html`, this.getFileContentHTML(name));
    return fs.writeFileSync(`${path}/${name}/${name}.css`, '');
  }
}
