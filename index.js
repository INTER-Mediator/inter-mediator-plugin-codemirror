/*
 * INTER-Mediator
 * Copyright (c) INTER-Mediator Directive Committee (http://inter-mediator.org)
 * This project started at the end of 2009 by Masayuki Nii msyk@msyk.net.
 *
 * INTER-Mediator is supplied under MIT License.
 * Please see the full license for details:
 * https://github.com/INTER-Mediator/INTER-Mediator/blob/master/dist-docs/License.txt
 */
IMParts_Catalog['codemirror'] = {
  instanciate: function (parentNode) {
    let newId = parentNode.getAttribute('id') + '-cm'
    let newNode = document.createElement('TEXTAREA')
    newNode.setAttribute('id', newId)
    newNode.setAttribute('class', '_im_codemirror')
    parentNode.appendChild(newNode)
    this.ids.push(newId)

    parentNode._im_getComponentId = (function () {
      let theId = newId
      return function () {
        return theId
      }
    })()

    parentNode._im_setValue = (function () {
      let theId = newId
      let self = IMParts_Catalog['codemirror']
      return function (str) {
        self.initialValues[theId] = str
      }
    })()
  },

  ids: [],
  initialValues: {},
  mode: 'htmlmixed',

  finish: function () {
    let targetId, targetNode, editor, i
    let self = IMParts_Catalog['codemirror']
    for (i = 0; i < self.ids.length; i++) {
      targetId = self.ids[i]
      targetNode = document.getElementById(targetId)
      if (targetNode) {
        editor = CodeMirror.fromTextArea(targetNode, {
          mode: self.mode,
          autoRefresh: true,
          lineNumbers: true,
          indentUnit: 4
        })
        editor.setValue(self.initialValues[targetId])
        editor.on('change', function () {
          let nodeId = targetId
          return function (instance, obj) {
            IMLibUI.valueChange(nodeId)
          }
        }())
        targetNode._im_getValue = function () {
          let insideEditor = editor
          return function () {
            return insideEditor.getValue()
          }
        }()
      }
    }
    this.ids = []
    this.initialValues = {}
  }
}
