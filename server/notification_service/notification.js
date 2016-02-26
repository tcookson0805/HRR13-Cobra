var Schedule = require('node-schedule');
var Email = require('./mailer.js');
var Trips = require('../trips/tripModel.js');
var moment = require('moment');


module.exports = {
  
  getTripsForReminder: function(req, res){
    var today = new Date()
    var reminderDate = moment(today).add(14, 'days').calendar();
    console.log(reminderDate)

    var results = []
    
    Trips.find({}, function(err, trips){
      if(err){
        return console.log(err)
      }

      // var today = new Date();
      // var todayDate = today.getDate()
      // var todayMonth = today.getMonth() + 1
      // var todayYear = today.getFullYear()
      
      
      // var todayProper = todayMonth + '/' + todayDate + '/' + todayYear
      // console.log('todayProper', todayProper)
      
      var result = []
      
      trips.forEach(function(trip){
        if(trip.startDate === reminderDate){
          results.push(trip)
        }
      })
      return results
    });
    
  }
}

