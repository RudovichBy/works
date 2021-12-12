	//========================Scroll Indicator========================
	const scrollingicator = () => {
		window.onscroll = function () {
			myFunction()
		};

		function myFunction() {
			let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
			let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
			let scrolled = (winScroll / height) * 100;
			document.getElementById("myBar").style.width = scrolled + "%";
		}
	}
	export default scrollingicator;


	// Код html & CSS

{/* <div class="progress-container">
	<div class="progress-bar" id="myBar"></div>
</div>
	
.progress - container {
	width: 100%;
	height: 3px;
}


.progress-bar {
	height: 3px;
	background: linear-gradient(to right, #2052c9, #21a5dd);
	width: 0%;
} */}