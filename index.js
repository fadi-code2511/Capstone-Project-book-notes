import express from "express";
import db from "./db.js";
import { render } from "ejs";

const app=express();
const port=3000;


app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));

// main-page
app.get("/",async(req,res)=>{
    const result= await db.query("SELECT * FROM books")
    res.render("index.ejs" ,{ books:result.rows})
})

// add-new-book
app.post("/add",async(req,res)=>{
    const title=req.body.title;
    const author=req.body.author;
    const rating=req.body.rating;
    const notes=req.body.notes;
    const date_read=req.body.date;
    // console.log(date_read);
    await db.query("INSERT INTO books (title,author,rating,notes,date_read) VALUES ($1,$2,$3,$4,$5)",[title,author,rating,notes,date_read])
    res.redirect("/")
})

// delete-book
app.post("/delete",async(req,res)=>{
    const deleteBookId=req.body.deleteBookId;
    try {
        await db.query("DELETE FROM books WHERE id=($1)",[deleteBookId])
        
    } catch (error) {
        console.log(error)
    }
    res.redirect("/")

})



app.listen(port,()=>{
    console.log(`server is running on port: ${port}`)
})