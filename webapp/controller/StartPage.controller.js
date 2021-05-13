sap.ui.define(['ui2/choosingtech/controller/BaseController', 'sap/m/WizardStep'], function(BaseController, WizardStep) {
  'use strict';

  return BaseController.extend('ui2.choosingtech.controller.StartPage', {
    onInit: function() {
      BaseController.prototype.init.apply(this, arguments);
    },

    factorySteps: function(sId, oContext) {
      const oObject = oContext.getObject();
      const sStepId = this.createId(this.createStepId(oObject.count));
      let oWizardStep = new WizardStep(sStepId, { title: oObject.text });
      if (oObject.count === 1) {
        // overview
        oWizardStep.addContent(sap.ui.xmlfragment(this.getView().getId(), 'ui2.choosingtech.fragments.intro', this));
        oWizardStep.setNextStep(this.createId(this.createStepId(oObject.yes)));
      } else if (oObject.count > 13) {
        // result
        oWizardStep.addContent(sap.ui.xmlfragment(this.getView().getId(), 'ui2.choosingtech.fragments.result', this));
      } else {
        // questions
        oWizardStep.addContent(sap.ui.xmlfragment(this.getView().getId(), 'ui2.choosingtech.fragments.question', this));
      }
      return oWizardStep;
    },

    createStepId: function(iCount) {
      return `Step_${iCount}`;
    },

    nextStep: function(oObject, sProperty) {
      let oWizardStep = this.byId(this.createStepId(oObject.count));
      oWizardStep.setNextStep(this.createId(this.createStepId(oObject[sProperty])));
      this.byId('idWizard').nextStep();
    },

    onYesNextStep: function(oEvent) {
      this.nextStep(
        oEvent
          .getSource()
          .getBindingContext()
          .getObject(),
        'yes'
      );
    },

    onNoNextStep: function(oEvent) {
      this.nextStep(
        oEvent
          .getSource()
          .getBindingContext()
          .getObject(),
        'no'
      );
    },
  });
});
