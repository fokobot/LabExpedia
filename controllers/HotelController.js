const Hotel = require("../models/Hotel");

exports.listAllHotels = (req, res) => {
  Hotel.find({}, (err, hotel) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json(hotel);
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
      criteria.rooms = {$gte : 0, $lte: 50};
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

exports.createNewHotel = (req, res) => {
  var datos = req.body;
  datos.location = {
    type: "Point",
    longitude: datos.longitude,
    latitude: datos.latitude
  }
  let newHotel = new Hotel(datos);
  newHotel.save((err, hotel) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(201).json(hotel);
  });
};

exports.readHotel = (req, res) => {
  Hotel.findById(req.params.hotelid, (err, hotel) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json(hotel);
  });
};

exports.updateHotel = (req, res) => {
  Hotel.findOneAndUpdate(
    { _id: req.params.hotelid },
    req.body,
    { new: true },
    (err, hotel) => {
      if (err) {
        res.status(500).send(err);
      }
      res.status(200).json(hotel);
    }
  );
};

exports.deleteHotel = (req, res) => {
  Hotel.remove({ _id: req.params.hotelid }, (err, hotel) => {
    if (err) {
      res.status(404).send(err);
    }
    res.status(200).json({ message: "Hotel successfully deleted" });
  });
};
