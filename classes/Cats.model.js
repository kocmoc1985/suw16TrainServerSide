module.exports = function(mongoose){

  // Mongoose Schema 
  var shema = mongoose.Schema({
      name: String,
      age: Number
  });
  
  shema.set('autoIndex', true);
  //================================<STATIC METHODS>============================
  
  /**
   * Model.create("Shaddy",9,function(err,cat){
   *   res.json(cat);
   * });
   * @tested
   * @returns {undefined}
   */
  shema.statics.create = function(name,age,cb) {
      var cat = new this({
        name: name, 
        age: age
    });
    //
    cat.save(function(err,cat){
        cb(err,cat);
    });
  };
  
  /**
   * Deletes all from this Collection/Model
   *  Kitten.deleteAll(function(err, resp){
   *     console.log("response: " + resp);
   *  });
   * @tested
   * @param {type} cb
   * @returns {nr of deleted objects}
   */
  shema.statics.deleteAll = function(cb) {
    return this.remove({}, cb);
  };
  
  shema.statics.findAll = function(cb) {
    this.find({},function(err, response){
        cb(err,response);
    });
  };
  
  /**
   * Model.findByName("Nugget",function(err,response){
   *   console.log(response);
   * });
   * @param {type} value
   * @param {type} cb
   * @tested
   * @returns {undefined}
   */
  shema.statics.findByName = function(value,cb) {
    this.find({name:value},function(err, response){
        cb(err,response);
    });
  };
  
  /**
   * Find by X = A && Y = B
   * Model.findAnd("Kitkat","Nugget",function(err,response){
   *   console.log(response);
   * });
   * @tested
   * @returns {callback}
   */
  shema.statics.findAnd = function(param1,param2,cb) {
    this.find({name:{$in:[param1,param2]}},function(err, response){
        cb(err,response);
    });
  };
  
  shema.statics.findOr = function(param1,param2,cb) {
    this.find({$or:[{name:param1},{name:param2}]},function(err, response){
        cb(err,response);
    });
  };
  
 //================================</STATIC METHODS>============================
 //
 //
 //================================<CLASS METHODS>==============================

  shema.methods.getIdObj = function(){
        return this._id;
  };

  shema.methods.getId = function(){
        return this._id.toString();
  };
    
  shema.methods.toString = function(){
        return "name: " + this.name + "  age: " + this.age + "  id: " + this._id.toString();
  };
 
/**
 * var cat = new Kitten({ name: 'Murka',age: 15});
 * cat.findSimilarName(function (err, dogs){
 *    console.log(dogs);
 * });
 * @tested
 * @param {type} cb
 * @returns {nm$_Kitten.model.module.exports.shema.methods@call;model@call;find}
 */  
 shema.methods.findSimilarName = function(cb) {
    return this.model('Kitten').find({ name: this.name }, cb);
 };
 
  //================================<CLASS METHODS>==============================
 
 

  // Compile the schema to a model
  // it will result in a new collection in the database
  //============================================================================
  Model = mongoose.model('Kitten', shema);
  //============================================================================
  
  return Model;
  
  //============================================================================
  //CREATE NEW INSTANCE AND SAVE
  var cat = new Kitten({ name: "Schady",age: 9});
  
  cat.save(function (err, cat) {
        console.log("saving: " +  cat.speak()); 
        if (err) return console.error(err);
  });
  
  //OR JUST
  cat.save();
  //============================================================================
  
  
};