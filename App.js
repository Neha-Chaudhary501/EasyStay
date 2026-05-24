const express=require("express");
const app=express();
const ejs=require("ejs");
const mongoose=require("mongoose");
const fs=require("fs");
const URL_DB="mongodb://127.0.0.1:27017/wanderlust";
const Listing=require("./models/listing");
const path=require("path");
const methodOverride=require("method-override");
const engine=require("ejs-mate");
app.use(express.static(path.join(__dirname,"public")));
app.use(methodOverride("_method"));
app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");
app.engine('ejs',engine);
app.set("views",path.join(__dirname,"views"));  
connectDB().then(()=>{
    console.log("Connected to DB");
}).catch((err)=>{
    console.log("Error connecting to DB:",err);
})
async function connectDB(){
      await mongoose.connect(URL_DB);
}
app.get("/",(req,res)=>{
   res.send("Hello World");
})



app.get("/listings", async (req,res)=>{
    let data=await Listing.find({});
           res.render("index.ejs",{data});    
           console.log(data.length);  
     })
            
     


app.get("/listing/update/:id", async (req,res)=>{
    let id=req.params.id;
    let listing=await Listing.findById(id);
    console.log(listing);
    res.render("update.ejs",{listing,id});
})




app.put("/listing/update/:id", async (req,res)=>{
    let id=req.params.id;
await Listing.findByIdAndUpdate(id,{...req.body.listing})
res.redirect("/listings");
})

      app.get("/listing/new",(req,res)=>{

        res.render("new.ejs");
     })
    

     app.post("/listing/new", async (req, res) => {
    let newListing = new Listing(req.body.listing); 

    console.log(req.body.listing);
    await newListing.save();
    res.redirect("/listings"); 
});     

           

     app.get("/listing/delete/:id", async (req,res)=>{
        let id=req.params.id;
        let listing= await Listing.findById(id);
         console.log("goes to delete page");
         res.render("delete.ejs",{listing,id});
         
     })
      
     
    app.delete("/listing/delete/:id", async (req,res)=>{

    console.log("DELETE ROUTE HIT");

    let id = req.params.id;

    await Listing.findByIdAndDelete(id);

    res.redirect("/listings");
});
     
           
    //  app.delete("/listing/delete/:id", async (req,res)=>{
    //      let id = req.params.id;
    //      await Listing.findByIdAndDelete(id);
    //       res.redirect("/listings");
    //  });      
     
     

     app.get("/user/:id",async (req,res)=>{
        let id=req.params.id;
          let user = await Listing.findById(id);
        res.render("userData.ejs",{user});
     })                                        

    

// app.get("/testListings",async (req,res)=>{
//     let sampleListings=new Listning({
//         title:"Sample Listing",
//         description:"This is a sample listing for testing purposes.",
//         price:100,  
//         location:"Sample Location",
//         country:"Sample Country"    
//     })
//     await sampleListings.save();
//     console.log("sample was saved to the database");
//     res.send("successfully added sample listings to the database");
  
// })
app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})