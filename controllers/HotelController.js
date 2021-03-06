// TODO: Sanitize query "size" => ALways to lowercase
/**************************************
******* IMPORTING HOTEL SCHEMA ********
**************************************/
const Hotel   = require("../models/Hotel");
const ApiKey  = require("../models/ApiKey");

exports.listAllHotels = (req, res) => {
  Hotel.find({}, (err, hotels) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json(hotels);
  });
};

/* Allows the API to search for hotels based
on several criteria*/
exports.search = (req, res) => {
  var criteria = {};
  // If a name was set, will include in in the searching criteria.
  if (req.query.name){
    criteria.name = {'$regex' : req.query.name, $options : 'i' }
  }
  var query = Hotel.find(criteria);

  // So does for state, type and size
  if (req.query.state){
    query.where
    criteria.state = {'$regex' : req.query.state, $options : 'i' };
  }
  // checks hotel type
  if (req.query.type){
    criteria.type = {'$regex' : req.query.type, $options : 'i'};
  }
  // checks hotel size
  if (req.query.size){
    if(req.query.size == 'small'){
      criteria.rooms = {'$gte' : 0, '$lte': 50};
    } else if(req.query.size == 'medium') {
      criteria.rooms = {$gt : 50, $lte: 100};
    } else {
      criteria.rooms = {$gt: 100};
    }
  }
  // TODO Remove projection
  // Performs the search of the hotel based on the criteria defined.
  Hotel.find(criteria, {name: 1, rooms: 1, type: 1, state: 1 },
    (err, hotels) => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(200).json(hotels);
    });
};

exports.searchByRange = (req, res) => {
  if(!req.query.longitude || !req.query.latitude || !req.query.range){
    res.status(422).send({
      status: 0,
      message: "Longitude, latitude and range are required fields."});
  } else {
    Hotel.where('location').regex(/a/).exec((err, hotels) => {
        if(err){
          res.status(500).send(err);
        } else {
          res.json(hotels);
        }
      });
  }
}

exports.createNewHotel = (req, res) => {
  // Requires an x-api-key header to be sent in order to create the hotel
  if(!req.headers['x-api-key']){
    res.status(403).json({message: 'x-api-key header must be set.'})
  } else {
    // Checks if API Key is valid
    let apikey = req.headers['x-api-key'];
    ApiKey.count({apikey: apikey}, function (err, count){
      if(count > 0){
        // If the api key exists, the hotel is created.
        var datos = req.body;
        datos.location = {
          type: "Point",
          coordinates: [datos.longitude, datos.latitude]
        };
        let newHotel = new Hotel(datos);
        newHotel.save((err, hotel) => {
          if (err) {
            res.status(500).send(err);
          }
          res.status(201).json({id: hotel.id});
        });
      } else {
        res.status(401).json({message: 'Invalid API Key.'})
      }
    });
  }
};

exports.update = (req, res) => {
  if(!req.headers['x-api-key']){
    res.status(403).json({status: 0, message: 'x-api-key header must be set.'})
  } else {
    // Requires all fields
    if(!req.body.type || !req.body.rooms || !req.body.phone || !req.body.website || !req.body.email){
      res.status(422).json({status: 0, message: 'Hotel type, number of rooms, phone, website and email fields are required.'});
    } else {
      // Checks if API Key is valid
      let apikey = req.headers['x-api-key'];
      ApiKey.count({apikey: apikey}, function (err, count){
        if(count > 0){
          Hotel.findById(req.params.id, (err, hotel) => {
            if(err){
              res.status(500).send(err);
            }
            // no validation here is needed as fields were already required
            hotel.type = req.body.type;
            hotel.rooms = req.body.rooms;
            hotel.website = req.body.website;
            hotel.email = req.body.email;
            hotel.phone = req.body.phone;
            hotel.save((e) => {
              if(e){
                res.status(500).json({status: 0, message: "Error updating hotel information.", errors: e.errors})
              }
              res.status(200).json({status: 1, message: "Hotel successfully updated."});
            });
          });
        } else {
          res.status(401).json({status:  0, message: 'Invalid API Key.'})
        }
      });
    }
  }
};

exports.delete = (req, res) => {
  if(!req.headers['x-api-key']){
    res.status(403).json({message: 'x-api-key header must be set.'})
  } else {
    let apikey = req.headers['x-api-key'];
    ApiKey.count({apikey: apikey}, function (err, count){
      if(count > 0){
        Hotel.findById(req.params.id, (err, hotel) => {
          if (err) {
            res.status(500).json({status: 0, message: "Error searching for hotel ID", errors: err.erros});
          }
          hotel.remove((err) => {
            res.status(200).json({status: 1,  message: "Hotel successfully deleted." });
          })
        });
      } else  {
        res.status(401).json({status:  0, message: 'Invalid API Key.'})
      }
    });
  }
};
