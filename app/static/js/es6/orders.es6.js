/* global ajax */
/* jshint unused:false */

(function(){
  'use strict';

  $(document).ready(init);

  function init(){
    $('#order').on('change', '.menu', getMenu);
    $('#add').click(addItem);
  }

  function getMenu(){
    var menu = $(this).val();
    var next = $(this).next();
    ajax(`/dishes/${menu}`, 'get', null, h=>{
      next.empty().append(h);
    });
  }

  function addItem(){
    ajax(`/dishes/add`, 'get', null, h=>{
      $('#order').append(h);
    });
  }

})();
