var express=require("express");
var request = require("request");
var app=express();

app.set("view engine","ejs");
// app.use(bodyparser.urlencoded{})

app.get("/result",function(req,res){
	var name=req.query.name;
	var url="http://www.omdbapi.com/?s=" +name + "&apikey=5aa2092e";
	request(url,function(error,response,body){
		if(!error && response.statusCode==200){
			var data=JSON.parse(body);
			res.render("results",{data:data});
		}
		else
			console.log(response.statusCode);
	});
});

app.get("/",function(req,res){
	res.render("search");
})
app.listen(3000,function(req,res){
	console.log("Server has started");
})