// REQUIREMENTS
var mongoose = require("mongoose");
var bcrypt = require("bcrypt-nodejs");
var quizSchema = require("./quiz.js").schema;
var resultSchema = require("./result.js").schema;


// SCHEMA
var userSchema = new mongoose.Schema({
  username: {type: String, required: true, lowercase: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
  iconUrl: {type: String, required: true, default: "http://i.imgur.com/tbOFv.png"},
  // quizzesWritten: [{type: String}]
  quizzesWritten: [quizSchema],
  results: [resultSchema] // should be able to use this to access the quizzes user has already taken
});


// METHODS
// generate hash from user password
userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// check if password is valid (matches hash)
userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};


// EXPORT
module.exports = mongoose.model("User", userSchema);



// SCRAP CODE
// // check if result already exists in user's results array
// userSchema.methods.checkResult = function(user, quizId) {
//   console.log("user methods, user: ", user);
//   console.log("user methods, quizId: ", quizId);
//   console.log(user.results.length);

//   for (var i = 0; i < user.results.length; i++) {
//     if (user.results[i].quizId === quizId) {
//       console.log("this result exists");
//       break;
//     }
//   };
// };

// userSchema.methods.pullResults = function(array) {
//   console.log("user array from user model: ", array)
// };