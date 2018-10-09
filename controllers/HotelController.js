const Hotel = require("../models/Hotel");

exports.listAllHotels = (req, res) => {
  Hotel.find({}, (err, hotel) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json(hotel);
  });
};

exports.createNewHotel = (req, res) => {
  let newHotel = new Hotel(req.body);
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
