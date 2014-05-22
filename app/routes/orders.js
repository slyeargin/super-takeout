'use strict';

var traceur = require('traceur');
var Dish = traceur.require(__dirname + '/../models/dish.js');
var User = traceur.require(__dirname + '/../models/user.js');
var Order = traceur.require(__dirname + '/../models/order.js');
var orders = global.nss.db.collection('orders');
// var _ = require('lodash');
var Mongo = require('mongodb');

exports.new = (req, res)=>{
  Dish.menu(menus=>{
    User.findByUserId(req.session.userId, user=>{
      res.render('orders/new', {user:user, menus: menus, title: 'Order Food'});
    });
  });
};

exports.create = (req, res)=>{

  var order = new Order(req.body, req.session.userId);
  var orderitems = [];
  // combines two arrays: req.body.qty & req.body.dish
  for (var i = 0; i < req.body.qty.length; i++){
    var object = {
      'dishId': Mongo.ObjectID(req.body.dish[i]),
      'qty': req.body.qty[i] * 1
    };
    orderitems.push(object);
  }
  order.menu = orderitems;

  orders.save(order, ()=>res.redirect('/orders'));
};
