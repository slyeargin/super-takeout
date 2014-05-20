'use strict';

var users = global.nss.db.collection('users');
var Mongo = require('mongodb');
var bcrypt = require('bcrypt');
var _ = require('lodash');

class User{
  constructor(obj){
    this.email = obj.email;
    this.password = obj.password;
  }

  login(fn){
    users.findOne({email: this.email}, (err, u)=>{
      if(u){
        var isMatch = bcrypt.compareSync(this.password, u.password);
        if(isMatch){
          fn(u);
        } else {
          fn(null);
        }

      } else {
        this.password = bcrypt.hashSync(this.password, 8);
        users.save(this, (err, u)=>{
          fn(u);
        });
      }
    });
  }

  static findByUserId(userId, fn){
    userId = Mongo.ObjectID(userId);
    users.findOne({_id:userId}, (err, u)=>{
      u = _.create(User.prototype, u);
      fn(u);
    });
  }

}

module.exports = User;
