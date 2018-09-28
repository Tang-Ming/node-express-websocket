var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();
var server = require("http").createServer(app);
var io = require('socket.io').listen(server);



app.set("port",process.env.PORT||3000);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

io.on('connection',function(socket){
	socket.emit("open");
	var client={
		socket:socket,
		name:false
	}
	socket.on("message",function(msg){
		console.log('接收到信息',msg);
		socket.emit("test",msg);
		socket.broadcast.emit("test",msg);

	});

	socket.on("disconnect",function(){
	})
})
app.get("/",function(req,res){
	res.sendfile('views/index.html')
})

server.listen(app.get("port"),function(){
	console.log("is listen"+app.get("port"));
})
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
