const pictureSize = (imgSelector) => {
	const blocks = document.querySelectorAll(imgSelector);

	function showimg(block) {
		const img = block.querySelector('img');

		img.src = img.src.slice(0, -4) + '-1.png';
		block.querySelectorAll('p:not(.sizes-hit)').forEach(p => {
			p.style.display = 'none';
		});
	}

	function hideimg(block) {
		const img = block.querySelector('img');

		img.src = img.src.slice(0, -6) + '.png';
		block.querySelectorAll('p:not(.sizes-hit)').forEach(p => {
			p.style.display = 'block';
		});
	}

	blocks.forEach(block => {
		block.addEventListener('mouseover', () => {
			showimg(block);
		});

		block.addEventListener('mouseout', () => {
			hideimg(block);
		});
	});
};

export default pictureSize;