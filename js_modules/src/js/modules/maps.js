	// оптимезация карты
	let yndexMap = () => {

		// создаём элемент <div>, который будем перемещать вместе с указателем мыши пользователя
		const mapTitle = document.createElement('div');
		mapTitle.className = 'mapTitle';
		// вписываем нужный нам текст внутрь элемента
		mapTitle.textContent = 'Нажмите для активации карты';
		// добавляем элемент с подсказкой последним элементов внутрь нашего <div> с id wrapMap
		wrapMap.appendChild(mapTitle);
		// по клику на карту
		wrapMap.onclick = function () {
			// удаляем элемент с интерактивной подсказкой
			mapTitle.parentElement.removeChild(mapTitle);
			wrapMap.innerHTML = `<iframe
			src="https://yandex.ru/map-widget/v1/?um=constructor%3Ae950ffe5a535ea38ffecb82f23636086f4499561e24d5d0275f5c1b56b6f8bfe&amp;source=constructor"
			style="width:100%; height: 100%; border: none;" loading="lazy"></iframe>`
		}
		// по движению мыши в области карты
		wrapMap.onmousemove = function (event) {
			// показываем подсказку
			mapTitle.style.display = 'block';
			// двигаем подсказку по области карты вместе с мышкой пользователя
			if (event.offsetY > 10) mapTitle.style.top = event.offsetY + 20 + 'px';
			if (event.offsetX > 10) mapTitle.style.left = event.offsetX + 20 + 'px';
		}
		// при уходе указателя мыши с области карты
		wrapMap.onmouseleave = function () {
			// прячем подсказку
			mapTitle.style.display = 'none';
		}
	}
	yndexMap();
