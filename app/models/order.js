'use strict';

// var orders = global.nss.db.collection('orders');
// var _ = require('lodash');
// var traceur = require('traceur');
// var Dish = traceur.require(__dirname + '/../models/dish.js');
// var async = require('async');
var Mongo = require('mongodb');

class Order{
  constructor(dishes, userId){
    this.userId = Mongo.ObjectID(userId);
    this.date = new Date();
    this.totalcost = dishes.totalcost[0] * 1;
    this.totalcals = dishes.totalcalories[0] * 1;
  }
}

module.exports = Order;
