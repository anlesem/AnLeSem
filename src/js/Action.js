export default class Action {
	constructor(blocks, animation) {
		this.blocks = blocks;
		this.animation = animation;

		this.blockOpen = false;
	}

	startListened() {
		this.blocks.block.forEach(element => {
			element.tag.addEventListener('mouseover', (event) => this.addHover(event));
		});

		this.blocks.cls.addEventListener('click', () => this.removeHover());
		this.blocks.footer.addEventListener('click', () => this.removeHover());
	}

	addHover(event) {
		if (!this.blockOpen) {
			this.blockOpen = event.currentTarget.dataset.name;
			document.querySelector(`.${this.blockOpen}`).classList.add('hover');
			this.blocks.clsAll.classList.add('hover');
			this.animation.removeAnimation();
		}
	}

	removeHover() {
		// showTitleTag();																	// Включение бирок
		document.querySelector(`.${this.blockOpen}`).classList.remove('hover');
		this.blocks.clsAll.classList.remove('hover');
		this.animation.setAnimation();													// Включение анимации
		this.blockOpen = false;
	}
}