'use strict';

var dishes = global.nss.db.collection('dishes');
var _ = require('lodash');
var Mongo = require('mongodb');

class Dish{
  static findAll(fn){
    dishes.find().toArray((e,d)=>fn(d));
  }

  static menu(fn){
    Dish.findAll(dishes=>{
      var menus = _(dishes).map(d=>d.menu).uniq().value();
      fn(menus);
    });
  }

  static dishes(menu, fn){
    dishes.find({menu:menu}).toArray((e,d)=>fn(d));
  }

  static findByDishId(dishId, fn){
    dishId = Mongo.ObjectID(dishId);
    dishes.findOne({_id:dishId}, (err, d)=>{
      fn(d);
    });
  }
}

module.exports = Dish;
