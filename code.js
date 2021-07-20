const express = require("express");
const ytdl = require("ytdl-core");
const app = express();

app.use(express.json());
app.use(express.static("public"));


app.get("/",function(request,response){
	response.sendFile(__dirname + "public/index.html");
});

app.get("/videoInfo",async function(request,response){
	const videoURL = request.query.videoURL;
	const info = await ytdl.getInfo(videoURL);
	response.status(200).json(info);
});

app.get("/download",function(request,response){
	const videoURL = request.query.videoURL;
	const itag = request.query.itag;
	const format = request.query.format;
	response.header("Content-Disposition",'attachment;\ filename="video.'+format+'"');
	ytdl(videoURL,{
		filter: format => format.itag == itag
	}).pipe(response);
});

app.listen(5000);
