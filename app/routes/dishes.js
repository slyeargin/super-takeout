'use strict';

var traceur = require('traceur');
var Dish = traceur.require(__dirname + '/../models/dish.js');

exports.menu = (req, res)=>{
  Dish.dishes(req.params.menu, dishes=>{
    res.render('dishes/menu', {dishes:dishes});
  });
};

exports.add = (req, res)=>{
  Dish.menu(menus=>{
    res.render('dishes/item', {menus: menus});
  });
};
