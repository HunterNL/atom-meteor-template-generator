'use babel';

import { CompositeDisposable } from 'atom';

function createDomContent() {
  const div = document.createElement('div');
  div.classList.add('meteor-template-generator');

  const editor = document.createElement('atom-text-editor');
  editor.dataset.field = 'text';
  editor.setAttribute('mini', true);

  div.appendChild(editor);
  
  return div;
}

function getEditorFromDom(domContent) {
  return domContent.querySelector('[data-field=text]').model;
}


function createPanel(domContent, confirmCallback, cancelCallback) {
  const disposables = new CompositeDisposable();
  const panel = atom.workspace.addModalPanel({ item: domContent, visible: false });
  const editor = getEditorFromDom(domContent);
  
  function onConfirm() {
    panel.hide();
    confirmCallback(editor.getText());
  }
  
  function onCancel() {
    panel.hide();
    cancelCallback();
  }
  
  function show(defaultText) {
    editor.setText(defaultText);
    editor.selectAll();
    panel.show();
    //console.log(panel.item.firstChild,editor.element);
    
    //This works, other things dont, oh well
    panel.item.firstChild.focus();
  }
  
  
  disposables.add(atom.commands.add(domContent, 'core:confirm', onConfirm));
  disposables.add(atom.commands.add(domContent, 'core:cancel', onCancel));  
  
  return {
    show,
    destroy() { disposables.dispose(); panel.destroy(); },
  };
}

export function createModal(options) {
  const { succes, cancel } = options;
  
  const domContent = createDomContent();
  const panel = createPanel(domContent, succes, cancel);

  return {
    show: panel.show,
    destroy: panel.destroy,
  };
}
