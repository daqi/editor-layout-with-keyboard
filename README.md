# editor-layout-with-keyboard

实现移动端文档编辑器外壳 UI 布局、虚拟键盘上的工具条

## demo

https://daqi.cool/editor-layout-with-keyboard/

![qrcode](https://raw.githubusercontent.com/daqi/editor-layout-with-keyboard/master/doc/qrcode.png)

## 由来

1. 虚拟键盘上方工具条的需求
2. iOS 弹出虚拟键盘时不会改变 `window` 大小
3. iOS 很难动态获取键盘高度
4. iOS 虚拟键盘弹出时 `position: fixed` 的怪异表现

## 实现

- 使用 `visualViewport` 获取 iOS 的虚拟键盘弹出时窗口的高度，从而获取键盘高度
- 使用 `better-scroll` 阻止 window 滚动，防止 iOS 在弹出虚拟键盘时 `window` 出现滚动条，同时提供主体滚动的能力
- 提供阻止 `blur` 但触发 `click` 的组件
- 提供阻止 `mousemove` 的组件，防止 `window` 出现滚动条

## 感谢

- 金山文档表格给与的灵感
