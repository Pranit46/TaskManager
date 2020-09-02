const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoList',{ useNewUrlParser:true }).then(() =>{
    console.log("database connected successfully");
}).catch((e) =>{
    console.log("Failed to connect to database");
    console.log(e);
});

mongoose.set('useCreateIndex',true);
mongoose.set('useFindAndModify',false);

module.export = {
    mongoose
}