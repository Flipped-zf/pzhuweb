function debounce(fn: Function, delay: number) {
	//节流
	let timer: any = null;
	return function () {
		const context = this;
		const args = arguments;
		clearTimeout(timer);
		timer = setTimeout(function () {
			fn.apply(context, args);
		}, delay);
	};
}

const debounceTwo = (fn: Function, wait = 50) => {
	let timer: any = null;
	return function (...args) {
		if (timer) {
			clearTimeout(timer);
		}
		timer = setTimeout(function () {
			fn.apply(this, arguments);
		}, wait);
	};
};

export { debounce, debounceTwo };
