import express from "express";
import db from "./db.js";

const app=express();
const port=3000;


app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",async(req,res)=>{
    try {
        const result= await db.query("SELECT * FROM books")
        res.render("index.ejs" ,{ books:result.rows})
        
    } catch (error) {
        console.log(error)
    }
    
    
})

app.post("/add",async(req,res)=>{
    const title=req.body.title
    const author=req.body.author
    const rating=req.body.rating
    const notes=req.body.notes
    const date_read=req.body.date
    // console.log(date_read)
    try {
        await db.query("INSERT INTO books (title,author,rating,notes,date_read) VALUES ($1,$2,$3,$4,$5)",[title,author,rating,notes,date_read])
        res.redirect("/")
        
    } catch (error) {
        console.log(error)
    }
   
})

app.post("/delete",async(req,res)=>{
    const deleteBookId=req.body.deleteBookId;
    try {
        await db.query("DELETE FROM books WHERE id=($1)",[deleteBookId])
        
    } catch (error) {
        console.log(error)
    }
    res.redirect("/")

})

app.post("/update",async(req,res)=>{
    const updatedTitle=req.body.updatedTitle;
    const updatedAuthor=req.body.updatedAuthor;
    const updatedRating=req.body.updatedRating;
    const updatedDate=req.body.updatedDate;
    const updatedNotes=req.body.updatedNotes;
    const id=req.body.bookId
    try {
        await db.query("UPDATE books SET title=($1),author=($2),rating=($3), notes=($4),date_read=($5) where id=($6)",
            [updatedTitle,updatedAuthor,updatedRating,updatedNotes,updatedDate,id])
        res.redirect("/")
    } catch (error) {
        console.log(error)
    }
})



app.listen(port,()=>{
    console.log(`server is running on port: ${port}`)
})