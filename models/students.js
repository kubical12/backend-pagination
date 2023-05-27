const mongoose = require("mongoose");


// definig a schema for the students 

const studentSchema = new mongoose.Schema({
    rollNo: {type:Number , require:true},
    name:{type:String , require:true},
    marks:{type:String , require:true},
    result:{type:[String] , require:true}
})

module.exports = mongoose.model("Student" , studentSchema);