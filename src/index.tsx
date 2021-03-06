import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import App from './App';

const text = `React
用于构建用户界面的 JavaScript 库

声明式
React 使创建交互式 UI 变得轻而易举。为你应用的每一个状态设计简洁的视图，当数据改变时 React 能有效地更新并正确地渲染组件。

以声明式编写 UI，可以让你的代码更加可靠，且方便调试。

组件化
创建拥有各自状态的组件，再由这些组件构成更加复杂的 UI。

组件逻辑使用 JavaScript 编写而非模板，因此你可以轻松地在应用中传递数据，并使得状态与 DOM 分离。

一次学习，随处编写
无论你现在正在使用什么技术栈，你都可以随时引入 React 来开发新特性，而不需要重写现有代码。

React 还可以使用 Node 进行服务器渲染，或使用 React Native 开发原生移动应用。

简单组件
React 组件使用一个名为 render() 的方法，接收输入的数据并返回需要展示的内容。在示例中这种类似 XML 的写法被称为 JSX。被传入的数据可在组件中通过 this.props 在 render() 访问。

使用 React 的时候也可以不使用 JSX 语法。尝试使用 Babel REPL，了解 JSX 被编译成原生 JavaScript 代码的步骤。

有状态组件
除了使用外部数据（通过 this.props 访问）以外，组件还可以维护其内部的状态数据（通过 this.state 访问）。当组件的状态数据改变时，组件会再次调用 render() 方法重新渲染对应的标记。

应用
使用 props 和 state，我们可以创建一个简易的 Todo 应用。在示例中，我们使用 state 来保存现有的待办事项列表及用户的输入。尽管事件处理器看似被内联地渲染，但它们其实只会被事件委托进行收集和调用。

在组件中使用外部插件
React 允许你结合其他框架或库一起使用。示例中使用了一个名为 remarkable 的外部 Markdown 库。它可以实时转换 <textarea> 里的内容。`;

ReactDOM.render(
  <React.StrictMode>
    <App content={new Array(5).fill(text).join('\n')} />
  </React.StrictMode>,
  document.getElementById('root'),
);
