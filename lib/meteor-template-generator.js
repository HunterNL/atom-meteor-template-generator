'use babel';

import { CompositeDisposable } from 'atom';
import { createModal } from './modal';
import { generateTemplate, getTreeViewPath } from './templateGenerator';

const disposables = new CompositeDisposable();

function createTemplateInCurrentPath(name) {
  generateTemplate(getTreeViewPath(), name);
}

function registerCommandHandler(callback) {
  const commandSubscription = atom.commands.add('atom-workspace', {
    'meteor-template-generator:generate-template': callback,
  });

  disposables.add(commandSubscription);
}

function onPluginActivate() {
  const modal = createModal({ succes: createTemplateInCurrentPath });
  
  registerCommandHandler(() => {
    modal.show("Enter template name");
  });
}

function onPluginDeactivate() {
  disposables.dispose();
}

export default {
  activate: onPluginActivate,
  deactivate: onPluginDeactivate,
};
