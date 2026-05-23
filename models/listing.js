const mongoose=require("mongoose");
const schema=mongoose.Schema;
const listingSchema=new schema({
    title:String,
    description:String,
    price:Number,
    location:String,    
    image:{
        type:String,
        set:(v)=>{
            (v==="")?"defaultLink":v;
        }
    },
    country:String
})
const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;