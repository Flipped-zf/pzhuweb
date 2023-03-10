module.exports = {
	root: true,
	env: {
		browser: true,
		node: true,
		es6: true,
	},
	parser: 'vue-eslint-parser',
	parserOptions: {
		parser: '@typescript-eslint/parser',
		ecmaVersion: 'latest',
		sourceType: 'module',
		jsxPragma: 'React',
		ecmaFeatures: {
			jsx: true,
		},
	},
	extends: [
		'plugin:vue/vue3-recommended',
		'plugin:@typescript-eslint/recommended',
		'eslint:recommended',
		'prettier',
		'plugin:prettier/recommended', // 一定要放在最后。因为 extends 中后引入的规则会覆盖前面的规则。
	],
	rules: {
		'@typescript-eslint/ban-ts-ignore': 'off',
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-var-requires': 'off',
		'@typescript-eslint/no-empty-function': 'off',
		'@typescript-eslint/no-use-before-define': 'off',
		'@typescript-eslint/ban-ts-comment': 'off',
		'@typescript-eslint/ban-types': 'off',
		'@typescript-eslint/no-non-null-assertion': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'vue/custom-event-name-casing': 'off',
		'vue/attributes-order': 'off',
		'vue/one-component-per-file': 'off',
		'vue/html-closing-bracket-newline': 'off',
		'vue/max-attributes-per-line': 'off',
		'vue/multiline-html-element-content-newline': 'off',
		'vue/singleline-html-element-content-newline': 'off',
		'vue/attribute-hyphenation': 'off',
		'vue/html-self-closing': 'off',
		'vue/no-multiple-template-root': 'off',
		'vue/require-default-prop': 'off',
		'vue/no-v-model-argument': 'off',
		'vue/no-arrow-functions-in-watch': 'off',
		'vue/no-template-key': 'off',
		'vue/no-v-html': 'off',
		'vue/comment-directive': 'off',
		'vue/no-parsing-error': 'off',
		'vue/no-deprecated-v-on-native-modifier': 'off',
		'vue/multi-word-component-names': 'off',
		'no-useless-escape': 'off',
		'no-sparse-arrays': 'off',
		'no-prototype-builtins': 'off',
		'no-constant-condition': 'off',
		'no-use-before-define': 'off',
		'no-restricted-globals': 'off',
		'no-restricted-syntax': 'off',
		'generator-star-spacing': 'off',
		'no-unreachable': 'off',
		'no-multiple-template-root': 'off',
		'no-unused-vars': 'error',
		'no-v-model-argument': 'off',
		'no-case-declarations': 'off',
		'no-console': 'off',
	},
	//  overrides: [ // 若要开启组件命名规则校验，建议选这种方式
	//    {
	//      files: ['src/views/index.vue', 'src/views/**/index.vue'], // 匹配 views 和任意多级路径中的 index.vue
	//      rules: {
	//        'vue/multi-word-component-names': 'off' // 给上面匹配的文件指定规则——关闭命名规则校验
	//      }
	//    }
	//  ]
};
