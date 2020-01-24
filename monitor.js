var socket = io('http://172.17.26.96:3000');
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
