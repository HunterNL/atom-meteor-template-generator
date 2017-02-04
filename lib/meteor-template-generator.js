'use babel';

import MeteorTemplateGeneratorView from './meteor-template-generator-view';

const MeteorTemplateGenerator = {
  meteorTemplateGeneratorView: null,

  activate() {
    console.log("HI!");
    this.meteorTemplateGeneratorView = new MeteorTemplateGeneratorView();
    console.log(this.meteorTemplateGeneratorView);
  },

  deactivate() {
    this.meteorTemplateGeneratorView.destroy();
  },
};

export default MeteorTemplateGenerator;
