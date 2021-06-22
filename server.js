const express = require("express");
const app = express();
const mongoose = require('mongoose')
const BlogData =require("./models/blogSchema");
const bodyparser = require("body-parser");

app.use(bodyparser.urlencoded({extended: true }));
app.use((req,res,next)=>{ console.log(req.url,req.method); next() } );

app.set('view engine', 'ejs')

//get
app.get('/new',(req,res)=>{
    res.render('new', { blog : new BlogData()})
})


//get
app.get("/",async (req,res)=>{
    const blog = await BlogData.find().sort({ CreatedAt : 'desc'})
    res.render('index',{blog : blog})
})
// go the delete page
app.get("/delete",async (req,res)=>{
    const blog = await BlogData.find().sort({ CreatedAt : 'desc'});
    res.render('delete',{blog : blog})
})


//post
app.post('/',async (req,res)=>{
    let blog = await new BlogData({
        title:req.body.title,
        description:req.body.description
    })
    try{
        await blog.save()
            res.redirect(`/`)
           }catch(err){
        console.log(err)
        res.render('new',{blog : blog })
    }
})
//delete
app.delete("/items/:id",async (req,res)=>{
    const blog = await BlogData.findByIdAndDelete({ _id:req.params.id })
    res.status(200).send("deleted the file")
})


// connect to database
mongoose.connect("mongodb://localhost:27017/BLOG", {useNewUrlParser: true, useUnifiedTopology: true , useCreateIndex: true, useFindAndModify: false} , (err)=>{
    if(err) {console.log("DB not connected")}
    console.log("DB connected...")
});

app.listen(5000,()=>{
    console.log("server running on 5000..")
})
