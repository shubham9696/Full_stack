var express=require("express");
var app=express()
var mongoose=require("mongoose");
var bodyParser=require("body-parser");
var methodOverride=require("method-override");
var expressSanitizer=require("express-sanitizer");

mongoose.connect("mongodb://localhost/restful_blog_app");

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(expressSanitizer());


var blog_schema=new mongoose.Schema({
	title: String,
	author: String,
	images: String,
	content: String,
	created:{type: Date, default: Date.now}
});

var blog=mongoose.model("blog",blog_schema);

app.get("/",function(req,res){
	res.redirect("/blogs")
});

app.get("/blogs",function(req,res){
	blog.find({},function(err,blogs){
		if(err){
		console.log(err);
		}
		else{
			res.render("index",{blogs:blogs});
		}
	});
});

app.get("/blogs/new",function(req,res){
	res.render("form");
});

app.post("/blogs",function(req,res){
	req.body.blog.content=req.sanitize(req.body.blog.content);
	blog.create(req.body.blog,function(err,newblog){
		if(err){
			res.render("form");
		}
		else{
			res.redirect("/blogs");
		}
	});
});

app.get("/blogs/:id",function(req,res){
	blog.findById(req.params.id,function(err,foundblog){
		if(err){
			res.redirect("/blogs");
		}
		else{
			res.render("show",{blog:foundblog});
		}
	});
});

app.get("/blogs/:id/edit",function(req,res){
	blog.findById(req.params.id,function(err,editblog){
		if(err){
			res.redirect("/blogs");
		}
		else{
			res.render("edit",{blog:editblog})
		}	
	});
});

app.put("/blogs/:id",function(req,res){
	req.body.blog.content=req.sanitize(req.body.blog.content);
	blog.findByIdAndUpdate(req.params.id,req.body.blog,function(err,updatedblog){
		if(err){
			res.redirect("/blogs");
		}
		else{
			res.redirect("/blogs/"+ req.params.id);
		}
	});
});

app.delete("/blogs/:id",function(req,res){
	blog.findByIdAndRemove(req.params.id,function(err,dblog){
		if(err){
			res.redirect("/blogs");
		}
		else{
			res.redirect("/blogs");
		}
	});
});

app.listen(4000,function(){
	console.log("Server Started");
})
	