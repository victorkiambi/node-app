const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/new_database', {useNewUrlParser:true, useUnifiedTopology:true},
    function (error) {
    if (error) throw error
    console.log("succesfully connected");
});

let userSchema = mongoose.Schema( {
    "userEmail" : String,
    "userPassword": String
});
module.exports = mongoose.model('userLogin',userSchema);
