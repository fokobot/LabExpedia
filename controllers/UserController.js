const User = require("../models/User");

exports.all = (req, res) => {
  User.find({}, (err, user) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(200).json(user);
  });
};

exports.new = (req, res) => {
  let newUser = new User(req.body);
  newUser.save((err, user) => {
    if (err) {
      res.status(500).send(err);
    }
    res.status(201).json(user.id);
  });
};

exports.update = (req, res) => {
  if(!req.body.address || !req.body.password){
    res.status(422).json({status: 0, message: 'Address and password fields are required.'})
  }
  // Looks for user in database
  User.findOne({_id: req.params.id, address: req.body.address,
    password: req.body.password}, (err, user) => {
      if (err) {
        res.status(500).send({status: 0, message: "An error has happened.", error: err});
      } else {
        // Checks if user was found
        if(!user){
          res.status(422).json({status: 0, message: "User not found."});
        }
        // Modifying user's data
        user.name = req.body.name || user.name;
        user.lastname = req.body.lastname || user.lastname;
        user.address = req.body.address || user.address;
        // Saving user's data
        user.save((err) => {
          if(err){
            res.status(500).send(err);
          }
          res.status(200).json({status: 1, message: "User updated successfully."});
        });
      }
  });
};

exports.delete = (req, res) => {
  User.remove({ _id: req.params.id }, (err, user) => {
    if (err) {
      res.status(404).send(err);
    }
    res.status(200).json({ message: "User successfully deleted" });
  });
};
