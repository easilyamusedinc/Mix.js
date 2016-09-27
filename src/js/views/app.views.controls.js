App.module('Views', function( Views, App, Backbone, Marionette, $, _ ) {

  'use strict';

  var Controls = Views.Controls = Marionette.ItemView.extend({
    template: '#tmpl-controls',

    el: '#controls',

    events: {
      'click .play'       : 'toggle',
      'touchstart .play'  : 'toggle',
      'click .start'      : 'start',
      'touchstart .start' : 'start',
      'click .rw'         : 'rewind',
      'touchstart .rw'    : 'rewind',
      'click .ff'         : 'fastForward',
      'touchstart .ff'    : 'fastForward'
    },

    modelEvents: {
      'change:playing': 'render'
    },

    initialize: function() {
      this.unhide();
      this.render();
    },

    serializeData: function() {
      var data = this.model.toJSON();
      data.playing = data.playing ? '' : 'paused';
      return data;
    },

    toggle: function( ev ) {
      if ( ev && 'ontouchstart' in window && ev.type === 'click' ) {
        return;
      }
      if ( this.model.get('playing') ) {
        this.model.pause();
      } else {
        this.model.play();
      }
    },

    start: function( ev ) {
      if ( ev && 'ontouchstart' in window && ev.type === 'click' ) {
        return;
      }
      this.model.play(0);
      if ( !this.model.get('playing') ) {
        this.model.pause();
      }
    },

    rewind: function( ev ) {
      var pos;
      if ( ev && 'ontouchstart' in window && ev.type === 'click' ) {
        return;
      }
      pos = this.model.get('position');
      if ( this.model.get('playing') ) {
        this.model.play(pos - 10);
        this.model.pause();
      }  else {
        this.model.set('position', pos - 10);
        this.model.pause();
      }
    },

    fastForward: function( ev ) {
      var pos;
      if ( ev && 'ontouchstart' in window && ev.type === 'click' ) {
        return;
      }
      pos = this.model.get('position');
      if ( this.model.get('playing') ) {
        this.model.play(pos + 10);
      }  else {
        this.model.set('position', pos + 10);
      }
    },

    unhide: function() {
      this.$el.show();
    }

  });

});
