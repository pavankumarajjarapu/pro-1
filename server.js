const { lookupService } = require("dns/promises")
const mongoose=require("mongoose")
const { stringify } = require("querystring")
const express= require("express")
const cors =require("cors")
const { json } = require("body-parser")
const app= express()
app.use(cors())
app.listen(2389,()=>{
  console.log(`listening to port no:2389`)
});
app.get("/persondetails",async(req,res)=>{
    let personData=await  Person.find()
    res.json(personData)
})

let connecctToMDB=async()=>{
    try {
        await mongoose.connect("mongodb+srv://pavanajjarapu007:pavan@pro-ser-db.mzm47id.mongodb.net/personsDeatils?retryWrites=true&w=majority&appName=pro-ser-db")
        console.log(`connected to database`)
        //saveDataInDB()
       // getDataFromDB()
    } catch (error) {
        console.log(`not connected to database`)
        console.log(error)   
    }
}
connecctToMDB()
let personSchema=new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name is compulsory"],
        match: /^[a-zA-Z\s]+$/, // Allow only alphabets and spaces
        trim: true
      },
    age:{
        type: Number,
        min: [1, 'Too small'],
        max: [100,'Too large'],
        required: [true, 'age is compulsory']
      },
    email: {
    type: String,
    validate: {
      validator: function(v) {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,8}$/.test(v);
      },
      message: props => `${props.value} is not a valid mail!`
    },
    required: [true, 'User mail is required']
  }
        
    ,
    job:String,
    image:String,
    gender:{ type:String,
             required:[true,"gender is mandatory"],
             enum:["male","female"],
             lowercase:true,
    },

});
//converting to schema into class
let Person=new mongoose.model("person", personSchema)
let getDataFromDB= async()=>{
    let personsData =await Person.find();
    console.log(personsData)
}
let saveDataInDB=async()=>{
    try {
        let AliceSmith = new Person( {
            name: "Alice Smith",
            age: 20,
            gender:"Female",
            email: "alice.smith@example.com",
            job: "Software Engineer",
            image: "https://example.com/images/alice.jpg"
          },);
          //save the object to db
          //await AliceSmith.save()
          let  BobJohnson= new Person( {
            name: "Bob Johnson",
            age: 35,
            gender:"male",
            email: "bobjohnson@example.com",
            job: "Graphic Designer",
            image: "https://example.com/images/bob.jpg"
          },)
         // await BobJohnson.save()
          let CarolWilliams= new Person( {
            name: "Carol Williams",
            age: 32,
            gender:"male",
            email: "carolwilliams@example.com",
            job: "Product Manager",
            image: "https://example.com/images/carol.jpg"
          },)
          //await CarolWilliams.save()
          let Ivy =new Person( {
            name: "Ivy Taylor",
            age: 34,
            gender:"male",
            email: "ivytaylor@example.com",
            job: "HR Manager",
            image: "https://example.com/images/ivy.jpg"
          },)
         // Ivy.save()
         await Person.insertMany([Ivy, CarolWilliams,BobJohnson,AliceSmith])
          console.log(`saved successfully`)
        
    } catch ( error) {
        console.log(`unable to save`)
        console.log(error)
    }
   
  
    
}