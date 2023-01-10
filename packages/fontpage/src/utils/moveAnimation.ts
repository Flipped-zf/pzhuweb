// import { gsap, Back, GSAPTimeline } from 'gsap';
import animationData from '@/assets/lottie/close.json';
import lottie from 'lottie-web';

import './move.css';
interface options {
	target: HTMLElement;
	[key: string]: any;
}

export class myAnimation {
	// tl: GSAPTimeline
	element: HTMLElement;
	active = false;
	cancel: HTMLElement;

	constructor(public option: options) {
		this.element = this.option.target;
		this.option.target.addEventListener('click', this.add.bind(this));
		this.init(option);
	}
	init(option: options) {
		const that = this;
		const cancel = document.createElement('span');
		const animation = lottie.loadAnimation({
			container: cancel, // 绑定dom节点
			renderer: 'svg', // 渲染方式:svg、canvas
			// loop: false, // 是否循环播放，默认：false
			autoplay: false, // 是否自动播放, 默认true
			animationData, // AE动画使用bodymovie导出为json数据
		});
		cancel.addEventListener('click', function (e) {
			e.stopPropagation();
			that.moveBack();
		});
		cancel.addEventListener('mouseenter', function (e) {
			animation.play();
		});
		cancel.addEventListener('mouseleave', function (e) {
			animation.stop();
		});
		// cancel.innerHTML = 'X'
		cancel.style.cssText = 'display: none';
		this.element.appendChild(cancel);
		this.cancel = cancel;
		this.element.style.cssText = 'cursor:pointer;box-shadow: 20px 20px 60px #c6c5c6, -20px -20px 60px #ffffff,0 0 2vh 2vh hsl(0, 0%, 96%);';
	}
	add() {
		// const item = document.querySelector('.team')
		// const yy = item?.getBoundingClientRect().top || 0
		// console.log(this.option)
		this.option.allMove.removeAll();
		this.cancel.style.cssText = 'display: block;width:25px;height:25px;padding-right: 10px';
		if (!this.active) {
			this.element.style.cssText = '';
			const position = this.getPosition2(this.option);
			this.element.style.cssText = `z-index:24;left: ${position.x}px;top: ${position.y}px;width: ${this.option.width}px;height: ${this.option.height}px;`;
			this.active = true;
		}
		// selfcontent.style.cssText = `transform: translate(${move.x}px,${move.y}px);width: ${option.width}px;height: ${option.height}px`
	}
	moveBack() {
		if (this.active) {
			this.cancel.style.cssText = 'display: none';
			this.element.style.cssText = '';
			this.element.style.cssText = 'cursor:pointer;box-shadow: 20px 20px 60px #c6c5c6, -20px -20px 60px #ffffff,0 0 2vh 2vh hsl(0, 0%, 96%);';
			this.active = false;
		}
	}
	getPosition(selfcontent: HTMLElement, option: options) {
		const mYx = window.innerWidth / 2 - selfcontent.offsetLeft - option.width / 2;
		const mYy = window.innerHeight / 2 - selfcontent.offsetTop - option.height / 2;
		return {
			x: mYx,
			y: mYy,
		};
	}
	getPosition2(option: options) {
		const mYx = window.innerWidth / 2 - option.width / 2;
		const mYy = window.innerHeight / 2 - option.height / 2;
		return {
			x: mYx,
			y: mYy,
		};
	}
	getOldPostion() {
		const mYx = window.innerWidth / 2 - this.option.oldleft - this.option.oldwidth / 2;
		const mYy = window.innerHeight / 2 - this.option.oldtop - this.option.oldheight / 2;
		console.log(mYx, mYy);
		return {
			x: mYx,
			y: -mYy,
		};
	}
	setOptions(width: number, height: number) {
		this.option.width = width;
		this.option.height = height;
	}
}

export default class moveAction {
	arrayMove: any[] = [];
	constructor(option: options) {
		const children = [].slice.call(option.target);
		// delete option.target
		for (const value of children) {
			this.arrayMove.push(
				new myAnimation(
					Object.assign(option, {
						target: value,
						allMove: this,
					})
				)
			);
		}
	}
	removeAll() {
		for (const myMove of this.arrayMove) {
			myMove.moveBack();
		}
	}
	setOptions(width: number, height: number) {
		for (const myMove of this.arrayMove) {
			myMove.setOptions(width, height);
		}
	}
}
