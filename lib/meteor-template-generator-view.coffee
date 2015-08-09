{View} = require 'atom-space-pen-views'
fs = require "fs-plus"

module.exports =
class MeteorTemplateGeneratorView extends View

  @content: ->
    @div class: 'meteor-template-generator', =>
      @tag "atom-text-editor",mini:true, outlet:"inputBox"
      @div class:'message',outlet:'message'
  # Returns an object that can be retrieved when package is activated



  initialize: ->
    @commandSubscription = atom.commands.add 'atom-workspace',
      'meteor-template-generator:generate-template': => @attach()

    #@inputBox.on 'blur', => @close()
    atom.commands.add @element,
      'core:confirm': => @confirm()
      'core:cancel': => @close()

  # Tear down any state and detach
  destroy: ->
    @panel?.destroy()
    @commandSubscription.dispose()

  attach: () ->
    @panel ?= atom.workspace.addModalPanel(item: this, visible:false)
    @panel.show()
    @message.text("Enter template name")
    @inputBox.focus()

  close: ->
    @panel.hide()

  confirm: ->
    @close()
    editor = @inputBox[0].getModel()
    text = editor.getText()
    @generatePackage text if text
    #console.log "t4", atom.workspace.getActiveTextEditor().getText()
  getPath: ->
    return atom.packages.getActivePackage('tree-view')?.mainModule?.treeView?.selectedPath

  getFileContentJs: (name) ->
    "Template.#{name}.onCreated(function(){\n\n});\n\n"+
    "Template.#{name}.onRendered(function(){\n\n});\n\n"+
    "Template.#{name}.events({\n\n});\n\n"+
    "Template.#{name}.helpers({\n\n});\n\n"

  getFileContentHTML: (name) ->
    "<template name=\"#{name}\">\n\n</template>"

  generatePackage: (name) ->
    console.log "Making package #{name}"
    path = @getPath()
    unless fs.isDirectorySync path
      console.error "Not a directory"
      return
    console.log "got path #{path}"

    fs.writeFileSync path+"/#{name}/#{name}.js",@getFileContentJs(name)
    fs.writeFileSync path+"/#{name}/#{name}.html",@getFileContentHTML(name)
    fs.writeFileSync path+"/#{name}/#{name}.css",""
