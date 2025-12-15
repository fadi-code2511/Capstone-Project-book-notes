import express from "express";
import db from "./db.js";

const app=express();
const port=3000;


app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",async(req,res)=>{
    const result= await db.query("SELECT * FROM books")
    res.render("index.ejs" ,{ books:result.rows})
})




app.listen(port,()=>{
    console.log(`server is running on port: ${port}`)
})