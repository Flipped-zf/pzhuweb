import { ref } from 'vue';

export default function userInteractionFun(emit) {
	const imageDialog = ref(false);
	const maskShow = ref(false);

	const chooseImage = function () {
		imageDialog.value = true;
	};
	const mouseenterHandler = function () {
		maskShow.value = true;
	};
	const mouseleaveHandler = function () {
		maskShow.value = false;
	};
	const clearImg = function () {
		emit('changeImgUrl', '');
	};

	return {
		imageDialog,
		maskShow,
		chooseImage,
		mouseenterHandler,
		mouseleaveHandler,
		clearImg,
	};
}
