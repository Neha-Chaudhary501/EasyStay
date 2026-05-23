const mongoose=require("mongoose");
const initDB=require("./data.js");
const Listing=require("../models/listing.js");
const URL="mongodb://127.0.0.1:27017/wanderlust";
connectDB().catch((err)=>{
    console.log("Error connecting to DB:",err);
});
     async function connectDB(){
        await mongoose.connect(URL);
        console.log("Connected to DB");
        await Listing.deleteMany({});
        console.log("Cleared existing listings");
        await Listing.insertMany(initDB.data);
        console.log("Inserted initial data into the database");
        mongoose.connection.close();
     }
