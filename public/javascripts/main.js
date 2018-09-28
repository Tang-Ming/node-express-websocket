function send() {  
	    var msg = $("#message").val();  
	    var key = $("#token").val();  
	    var name = $("#name").val();  
	    var str = {"name": name ,"msg":  msg  ,"key": key  };  
	    console.log("发送", str);  
	    socket.emit('message',str);
	    $("#message").val("");  
	    $("#name").val('');  
	    return false;
	}; 
	var i=0;
	var socket = io.connect("http://localhost:3000");
$(function(){
	
	socket.on("open",function(){
		// $("#status").text(prompt("请输入名字"));
		// var msg={}
		socket.send("欢迎");
	})
	socket.on("test",function(msg){
		// console.log("test",typeof msg);
		// var msg=JSON.parse(msg)
		if(msg.name){
			$("#show").append('<span style="color:red">'+msg.name + '</span></br>'+msg.msg+'</br>' );	
		}
		
	})
})
