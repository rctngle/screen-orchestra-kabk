const ip = '172.17.26.96';
let animationOptions = [];
let animationInterval;
let animationIdx = 0;
const cycleTime = 5000;

document.querySelector('#ip').innerHTML = ip;

var socket = io('http://' + ip + ':3000');
socket.on('connect', function(){
	console.log('controller connect');
});

socket.on('event', function(data){
	console.log('controller event');
});

socket.on('disconnect', function(){
	console.log('controller disconnect');
});

document.querySelectorAll('a').forEach((link) => {
	link.addEventListener('click', (e) => {
		e.preventDefault();
		socket.emit('msg', link.getAttribute('href'));
	});
});

function setActive(listItem) {
	document.querySelectorAll('.active').forEach((el) => {
		el.classList.remove('active');
	});
	listItem.classList.add('active');
}

function cycle(doCycle) {
	if (animationInterval) {
		clearInterval(animationInterval);
	}	

	if (doCycle) {

		
		const animation = animationOptions[animationIdx];
		let timeout = 10000;
		if (animation.item.toLowerCase().indexOf('video') >= 0) {
			timeout = 20000;
		}

		setAnimation(animation.list, animation.item, animation.listItem);
		animationIdx++;
		if (animationIdx >= animationOptions.length) {
			animationIdx = 0;
		}

		animationInterval = setTimeout(() => {
			cycle(true);
		}, timeout);
	}
}

function setAnimation(list, item, listItem) {
	setActive(listItem);
	socket.emit('msg', list+'/'+item);
}

fetch('http://' + ip + ':3000/commands').then(response => response.json()).then(data => {

	for (let list in data) {
		data[list].forEach((item) => {
			if (item.indexOf('.') !== 0) {
				const listItem = document.createElement('li');

				if (item === 'slide') {
					listItem.innerHTML = `<button type="button">${item}</button> <input type="range" />`;
				} else if (item === 'say') {
					listItem.innerHTML = `<button type="button">${item}</button> <input type="text" />`;
				} else {
					listItem.innerHTML = `<button type="button">${item}</button>`;
				}


				animationOptions.push({
					list: list,
					item: item,
					listItem: listItem,
				});

				document.querySelector('#'+list).appendChild(listItem);

				listItem.querySelector('button').addEventListener('click', () => {
					setAnimation(list, item, listItem);
				});

				if (listItem.querySelector('input[type=range]')) {
					listItem.querySelector('input[type=range]').addEventListener('input', (e) => {
						socket.emit('slider', parseInt(e.target.value));	
					});
				}

				if (listItem.querySelector('input[type=text]')) {
					listItem.querySelector('input[type=text]').addEventListener('input', (e) => {
						socket.emit('text', e.target.value);	
					});
				}
			}
		});
	}

	cycle(true);

	const cycleToggle = document.querySelector('#cycle');
	cycleToggle.addEventListener('change', (e) => {
		cycle(cycleToggle.checked);
	})

});
