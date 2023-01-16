import { IButtonMenu, IDomEditor, SlateTransforms, DomEditor } from '@wangeditor/editor';

class MyButtonMenu implements IButtonMenu {
	// TS 语法
	// class MyButtonMenu {                       // JS 语法

	constructor() {
		this.title = '50%'; // 自定义菜单标题
		// this.iconSvg = '<svg>...</svg>' // 可选
		this.tag = 'button';
	}
	title: string;
	iconSvg?: string | undefined;
	hotkey?: string | undefined;
	alwaysEnable?: boolean | undefined;
	tag: string;
	width?: number | undefined;

	// 获取菜单执行时的 value ，用不到则返回空 字符串或 false
	getValue(editor: IDomEditor): string | boolean {
		// TS 语法
		// getValue(editor) {                              // JS 语法
		return ' hello ';
	}

	// 菜单是否需要激活（如选中加粗文本，“加粗”菜单会激活），用不到则返回 false
	isActive(editor: IDomEditor): boolean {
		// TS 语法
		// isActive(editor) {                    // JS 语法
		return false;
	}

	// 菜单是否需要禁用（如选中 H1 ，“引用”菜单被禁用），用不到则返回 false
	isDisabled(editor: IDomEditor): boolean {
		// TS 语法
		// isDisabled(editor) {                     // JS 语法
		return false;
	}

	// 点击菜单时触发的函数
	exec(editor: IDomEditor, value: string | boolean) {
		// TS 语法
		// exec(editor, value) {                              // JS 语法
		// http://www.pzhuweb.cn/data/00022501640618299159.mp4
		if (this.isDisabled(editor)) return;
		// delete editor.getFragment()[0].width;
		// delete editor.getFragment()[0].height;
		const node = editor.getFragment()[0];
		// const elevideo = editor.toDOMNode(node).querySelector('video') as HTMLVideoElement;
		// node.width = '50%';
		console.log(editor.getParentNode(node));
		SlateTransforms.setNodes(
			editor,
			{
				// @ts-ignore
				width: '700',
			},
			{
				match: (n) => DomEditor.checkNodeType(n, 'video'),
			}
		);
		SlateTransforms.setNodes(
			editor,
			{
				// @ts-ignore
				textAlign: 'center',
			},
			{
				mode: 'highest', // 针对最高层级的节点
			}
		);
	}
}
const video50 = {
	key: 'video50', // 定义 menu key ：要保证唯一、不重复（重要）
	factory() {
		return new MyButtonMenu(); // 把 `YourMenuClass` 替换为你菜单的 class
	},
};
export default video50;
