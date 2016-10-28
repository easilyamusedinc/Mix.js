App.module('Views', function( Views, App, Backbone, Marionette, $, _ ) {

  'use strict';

  var Tracks = Views.Tracks = Marionette.CollectionView.extend({
    itemView: Views.Track,

    el: '#mixer',

    initialize: function() {
      this.animTick();
      this.unhide();
    },

    animTick: function() {
      App.vent.trigger('anim-tick');
      window.requestAnimationFrame(this.animTick.bind(this));
    },

    unhide: function() {
      setTimeout(function(){
        var $channelLength = $('.channel').length,
          $fullAmount = 8;
        //window.console.log($channelLength);
        //window.console.log($fullAmount);
        if( $channelLength < $fullAmount ){
          var $amount = $fullAmount - $channelLength,
          $totalAmount = $amount + 2;
          //window.console.log($amount);
          //window.console.log($totalAmount);
          var $channel = $('.empty-columns .channel')[0].outerHTML;
          var $append = new Array($totalAmount).join( $channel );
          $('#mixer').append($append);
        }
      },250);
      setTimeout(function(){
        $('body').addClass('show-mixer');
        $('.empty-columns').remove();
        $('#controls').bind('click tap', '.btn-cntrl.play', function(){
          if($('.btn-cntrl.play').hasClass('paused')){
            $('body').removeClass('playing');
          } else {
            $('body').addClass('playing');
          }
        });
      },500);
      setTimeout(function(){
        $('body').addClass('power-on');
        $('.channel').on('click tap', '.icon', function(){
          $(this).parent().parent().toggleClass('muted-col');
          $(this).next().find('.btn.mute').trigger('click');
          return false;
        });

        var $masterFader = $('#master .fader'),
        $masterFaderLeft = $masterFader.offset().left - 30,
        $masterTrackFaderSlot = $('#master .track').find('.fader-slot');
        $masterTrackFaderSlot.css('width', $masterFaderLeft+'px');

        $('.channel').each(function(){
          var $this = $(this),
          $thisFader = $this.find('.fader'),
          $faderLeft = $thisFader.offset().left - 30;
          $this.find('.fader-slot').css('width', $faderLeft+'px');
        });
        $('.mixer-body').addClass('show');
      },1000);
    }

  });

});
