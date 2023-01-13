export function validatorNum(rule, value, callback) {
	const treg = /^[0-9]\d*$|^0$/;
	if (value && treg.test(value) === true && value.length === 12) {
		callback();
	} else {
		callback(new Error('请输入12位学号'));
	}
}

export function validatorPassword(rule, value, callback) {
	value || (value = '');
	const patt = /(?=.*\d)(?=.*[a-zA-Z])^.{6,20}$/;
	if (patt.test(value)) {
		callback();
	} else {
		callback(new Error('密码需要在6-20位之间并包含字母和数字'));
	}
}
// 个人简介验证
export function validatorDescription(rule, value, callback) {
	if (!value || value.length < 20) {
		callback();
	} else {
		callback('个人简介控制在20字以内');
	}
}

// 联系方式验证
export function validatorPhone(rule, value, callback) {
	const treg = /^[1-9]\d*$|^0$/;
	if (value && treg.test(value) === true) {
		callback();
	} else {
		callback('请输入11位的手机号');
	}
}
