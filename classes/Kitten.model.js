module.exports = function(mongoose){

  // A Mongoose schema for kittens 
  var kittySchema = mongoose.Schema({
      name: String,
      age: Number
  });

  // Add a method to the schema
  kittySchema.methods.speak = function(){
    var greeting = this.name
      ? "Meow name is " + this.name
      : "I don't have a name";
    return greeting;
  };

  // Compile the schema to a model
  // it will result in a new collection in the database
  Kitten = mongoose.model('Kitten', kittySchema);

  return Kitten;

};