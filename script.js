'use strict';

(function($, global, undefined) {
  // _.templateSettings.interpolate = /\{\{(.+?)\}\}/g

  function _p(sParam) {
    var sPageURL = global.location.search.substring(1)
    var sURLVariables = sPageURL.split('&')
    for(var i = 0; i < sURLVariables.length; i++) {
      var sParameterName = sURLVariables[i].split('=')
      if (sParameterName[0] == sParam) {return decodeURIComponent(sParameterName[1])}
    }
  }

  var AppView = Backbone.View.extend({
    el: 'body',

    events: {
      'click .add-sheet': 'addSheet',
      'blur td': 'boxfit'
    },

    options: {
      boxfit: _p('boxfit') != null && _p('boxfit') !== 'false',
      columns: _p('columns') || 3,
      rows: _p('rows') || 7,
      stickerPadding: _p('stickerPadding') || '3mm'
    },

    getCount: function() {return this.options.columns * this.options.rows},

    getColumnWidth: function() {
      return (1 / this.options.columns * 100) + '%'
    },

    getRowHeight: function() {
      return (1 / this.options.rows * 100) + '%'
    },

    initialize: function() {
      this.sheetTemplate = _.template($('#sheet-template').html())

      var names = (_p('names') || '').split(',')
      var chunks = _.chunk(names, this.getCount())

      for(var i in chunks) {
        this.addSheet(chunks[i])
      }
    },

    addSheet: function(_names) {
      _names = names == null ? [] : names

      var names = []
      for(var i=0; i <= this.getCount() - 1; i++) {
        names.push(names[i] == null ? '' : names[i])
      }

      var $sheet = $(this.sheetTemplate({
        rows: _.chunk(names, this.options.columns),
        columnWidth: this.getColumnWidth(),
        rowHeight: this.getRowHeight(),
        stickerPadding: this.options.stickerPadding
      }))
      $('#sheets').append($sheet)

      if(this.options.boxfit) {
        $sheet.find('td').each(function() {
          if($(this).val().length) {
            $(this).boxfit()
          }
        })
      }
    },

    boxfit: function(event) {
      if(!this.options.boxfit) {return}
      var $el = $(event.currentTarget)
      if($el.text().length) {
        $el.boxfit()
      }
    }
  })

  $(document).ready(function() {
    global.app = new AppView()
  })
})(jQuery, window)
