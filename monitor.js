var socket = io('http://192.168.1.100:3000');
socket.on('connect', function(){
	console.log('monitor connect');
});

socket.on('msg', function(data){
	console.log('controller event:', data);
	document.querySelector('iframe#main').setAttribute('src', 'commands/'+data+'/index.html');
});

socket.on('disconnect', function(){
	console.log('controller disconnect');
});
