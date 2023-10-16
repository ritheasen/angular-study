const mongoose=require('mongoose');

// mongodb+srv://ritheasen:pvQIi51aVW3r2ldi@mydb.ubqcgmd.mongodb.net/
// mongodb://127.0.0.1:27017/KIT_WebApp
mongoose.connect('mongodb://127.0.0.1:27017/KIT_WebApp',{useNewUrlParser:true,useUnifiedTopology:true,})

.then(()=>console.log("Connection Successful"))
.catch((err)=>console.log(err));

//Defining User Schema
const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
})

const User = new mongoose.model("User", userSchema);

// User.createCollection().then(function(collection){
//     console.log("Collection is created!");
// })

// create a new document
// User.create({
//     name: "Klo",
//     age: 21
// },
// {
//     name: "Jake",
//     age: 23
// }).then(result=>{
//     console.log(result);
// })

// User.updateOne({name: "Klo"}, {age: 30}).then(result=>{
//     console.log(result);
// })

const updateDoc = async() => {
    const doc=await User.findById("65250b2ef69e1cbc54f2672d")
    const output = await doc.updateOne({name: "Yahoo"})
    console.log(output);
}
updateDoc();