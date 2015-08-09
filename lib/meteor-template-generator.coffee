MeteorTemplateGeneratorView = require './meteor-template-generator-view'
{CompositeDisposable} = require 'atom'

module.exports = MeteorTemplateGenerator =
  meteorTemplateGeneratorView: null

  activate: (state) ->
    @meteorTemplateGeneratorView = new MeteorTemplateGeneratorView()

  deactivate: ->
    @meteorTemplateGeneratorView.destroy()
