/* global ajax */
/* jshint unused:false */

(function(){
  'use strict';

  $(document).ready(init);

  function init(){
    $('#order').on('change', '.menu', getMenu);
    $('#order').on('change', '.items', formChanged);
    $('#order').on('click', '.nuke', delMenu);
    $('#order').on('change', 'input', formChanged);
    $('#order').on('blur', 'input', formChanged);
    $('#add').click(addItem);
  }

  function formChanged(){
    var item = $(this).parent();
    updateCost(item);
  }

  function updateCost(item){
    updateSubTotal(item);
    updateTotal();
  }

  function updateSubTotal(item){
    var subtotalCost = 0;
    var subtotalCalories = 0;
    var qty = item.find('input').val() * 1;
    var cost = item.find('.items option:selected').attr('data-cost') * 1;
    var calories = item.find('.items option:selected').attr('data-calories') * 1;
    if(qty > 0 && !isNaN(cost)){
      subtotalCost = (qty * cost);
      subtotalCalories = (qty * calories);
    }

    item.data('subtotalCost', subtotalCost);
    item.data('subtotalCalories', subtotalCalories);
  }

  function updateTotal(){
    var subtotalCosts = $('.menu-item').map((i,d)=>$(d).data('subtotalCost')).toArray();
    var subtotalCals = $('.menu-item').map((i,d)=>$(d).data('subtotalCalories')).toArray();
    var totalCost = 0;
    var totalCalories = 0;

    if(subtotalCosts.length){
      totalCost = subtotalCosts.reduce((p,c)=>p+c);
    }
    if(subtotalCals.length){
      totalCalories = subtotalCals.reduce((p,c)=>p+c);
    }

    $('#total').text(totalCost.toFixed(2));
    $('#calories').text(totalCalories.toFixed(0));
    $('.totalcost').val(totalCost);
    $('.totalcalories').val(totalCalories);
  }

  function getMenu(){
    var menu = $(this).val();
    var next = $(this).next();
    ajax(`/dishes/${menu}`, 'get', null, h=>{
      next.empty().append(h);
      updateCost(next.parent());
    });
  }

  function addItem(){
    var item = $('#order').children(':last').clone();
    $('#order').append(item);
    $('.qty').last().val('');
    $('.items').last().empty().append(`<option>Select a Dish</option>`);
  }

  function delMenu(e){
    if ($('.menu-item').length > 1){
      $(this).parent().remove();
      updateTotal();
    }
    e.preventDefault();
  }
})();
