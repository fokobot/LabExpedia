const mongoose = require("mongoose");

const dbURI =
  "mongodb://admin:Tent3.rag@cluster0-shard-00-00-43grj.mongodb.net:27017,cluster0-shard-00-01-43grj.mongodb.net:27017,cluster0-shard-00-02-43grj.mongodb.net:27017/expedia?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true";

const options = {
  reconnectTries: Number.MAX_VALUE,
  poolSize: 10,
  useNewUrlParser: true,
};
mongoose.set('useCreateIndex', true);
mongoose.connect(dbURI, options).then(
  () => {
    console.log("Database connection established!");
  },
  err => {
    console.log("Error connecting Database instance due to: ", err);
  }
);

// require any models

require("../models/Hotel");
require("../models/User");
require("../models/ApiKey");
