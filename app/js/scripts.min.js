const imagesForSlider = [
	'img/slideit/1.jpg',
	'img/slideit/2.jpg',
	'img/slideit/3.jpg',
	'img/slideit/4.jpg',
	'img/slideit/5.jpg',
	'img/slideit/6.jpg',
	'img/slideit/7.jpg',
	'img/slideit/8.jpg',
	'img/slideit/9.jpg',
	'img/slideit/10.jpg',
	'img/slideit/11.jpg',
	'img/slideit/12.jpg',
	'img/slideit/13.jpg',
	'img/slideit/14.jpg',
];

function GetSlider(images) {
	this.build = () => {
		let mainContainer = document.querySelector('.slideit');
		let containerContent = `
		<div class="sl-carousel"></div>
		<div class="sl-carousel-nav">
			<button class="sl-prew-button">\<</button>
			<div class="sl-circles"></div>
			<button class="sl-next-button">\></button>
		</div>`;
		mainContainer.innerHTML = containerContent;

		let carouselSlide = document.querySelector('.sl-carousel');
		let circles = document.querySelector('.sl-circles');
		let renderInnerContent = '<div class="img-wrap"><img src="' + images[images.length - 1] + '"alt="" class="lastClone"></div>';
		let renderWrapperLinks = '';

		images.forEach((element, i) => {
			if (i <= 1) {
				renderInnerContent += '<div class="img-wrap"><img src="' + element + '" alt="" data-src=""></div>';
			} else if (i > (images.length - 3)) {
				renderInnerContent += '<div class="img-wrap"><img src="' + element + '" alt="" data-src=""></div>';
			} else {
				renderInnerContent += '<div class="img-wrap"><img src="img/slideit/loading.gif" width="960px" alt="" data-src="' + element + '"></div>';
			}
			renderWrapperLinks += '<div class="sl-circle" data-sequence-num="' + (i + 1) + '"></div>';
		});
		renderInnerContent += '<div class="img-wrap"><img src="' + images[0] + '" alt="" class="firstClone"></img></div>';

		carouselSlide.innerHTML = renderInnerContent;
		circles.innerHTML = renderWrapperLinks;

	}
	this.setupSlider = () => {
		const carouselSlide = document.querySelector('.sl-carousel');
		const carouselImages = document.querySelectorAll('.sl-carousel img');
		const nextButton = document.querySelector('.sl-next-button');
		const prewButton = document.querySelector('.sl-prew-button');
		const circlesWrapper = document.querySelector('.sl-circles');
		const circles = document.querySelectorAll('.sl-circle');
		[...circles][0].classList.add('active');


		let counter = 1;

		let size = 960;

		carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';

		function downloadNextImage() {
			if (counter < (carouselImages.length - 4) && counter > 1) {
				carouselImages[counter + 1].src = carouselImages[counter + 1].getAttribute('data-src');
			}

		};
		function downloadPrevImage() {
			if (counter <= (carouselImages.length - 3) && counter > 3) {
				carouselImages[counter - 1].src = carouselImages[counter - 1].getAttribute('data-src');
			}
		};
		function downloadCurrentImage() {
			if (counter <= (carouselImages.length - 3) && counter > 2) {
				carouselImages[counter].src = carouselImages[counter].getAttribute('data-src');
			}
		};


		function getSiblings(elem) {
			var siblings = [];
			var sibling = elem.parentNode.firstChild;
			for (; sibling; sibling = sibling.nextSibling) {
				if (sibling.nodeType !== 1 || sibling === elem) continue;
				siblings.push(sibling);
			}
			return siblings;
		};

		function switchCirclesByButtons() {
			if (counter <= (carouselImages.length - 2) && counter > 0) {
				let siblingCircles = getSiblings([...circles][(counter - 1)]);
				siblingCircles.forEach((element) => {
					element.classList.remove('active');
				});
				[...circles][(counter - 1)].classList.add('active');
			} else if (counter === (carouselImages.length - 1)) {
				let siblingCircles = getSiblings([...circles][0]);
				siblingCircles.forEach((element) => {
					element.classList.remove('active');
				});
				[...circles][0].classList.add('active');
			} else if (counter === 0) {
				;
				let siblingCircles = getSiblings([...circles][(circles.length - 1)]);
				siblingCircles.forEach((element) => {
					element.classList.remove('active');
				});
				[...circles][(circles.length - 1)].classList.add('active');
			}

		}


		nextButton.addEventListener('click', () => {
			if (counter >= carouselImages.length - 1) return;
			downloadNextImage();
			carouselSlide.style.transition = "transform 0.4s ease-in-out";
			counter++;
			switchCirclesByButtons();
			carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';

		})

		prewButton.addEventListener('click', () => {
			if (counter <= 0) return;
			carouselSlide.style.transition = "transform 0.4s ease-in-out";
			counter--;
			downloadPrevImage();
			switchCirclesByButtons();
			carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
		})

		carouselSlide.addEventListener('transitionend', () => {
			if (carouselImages[counter].className === 'lastClone') {
				carouselSlide.style.transition = "none";
				counter = carouselImages.length - 2;
				carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
			} else if (carouselImages[counter].className === 'firstClone') {
				carouselSlide.style.transition = "none";
				counter = carouselImages.length - counter;
				carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
			}
		})

		let circleLinks = (event) => {
			if (event.target.className === 'sl-circle') {
				carouselSlide.style.transition = "1s ease-in-out";
				counter = parseInt(event.target.getAttribute('data-sequence-num'), 10);
				carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
				downloadCurrentImage();
				if (!event.target.matches('.active')) {
					event.target.classList.add('active');
					let siblings = getSiblings(event.target);
					siblings.forEach((element) => {
						if (element.matches('.active')) {
							element.classList.remove('active');
						}
					})
				}
			}
		}
		circlesWrapper.addEventListener('click', circleLinks, false);
	}

	this.createSlider = () => {
		this.build();
		this.setupSlider();
	}
}


let slider = new GetSlider(imagesForSlider);
slider.createSlider();
