'use babel';

import MeteorTemplateGeneratorView from './meteor-template-generator-view';

const MeteorTemplateGenerator = {
  meteorTemplateGeneratorView: null,

  activate() {
    this.meteorTemplateGeneratorView = new MeteorTemplateGeneratorView();
  },

  deactivate() {
    this.meteorTemplateGeneratorView.destroy();
  },
};

export default MeteorTemplateGenerator;
