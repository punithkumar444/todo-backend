const mongoose =  require("mongoose");
mongoose.connect("mongodb+srv://punithkumar444:NAni.123@cluster0.a6mhwmx.mongodb.net/");
const todoschema = mongoose.Schema({
    title:String,
    description:String,
    completed:Boolean
});
const todo = mongoose.model('todos',todoschema);
module.exports={
    todo,
}