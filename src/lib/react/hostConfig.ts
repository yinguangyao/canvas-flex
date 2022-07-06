import * as Core from "../core";

/**
 * todo: 实现 React 自定义渲染器
 */
export default {
  // 支持节点修改
  // 有些静态渲染的场景，例如渲染为pdf文档，这时候可以关闭
  // 当关闭时，只需要实现appendInitiaChild
  supportsMutation: true,
  // 用于初始化(首次)时添加子节点
  appendInitialChild: (parent, child) => {
    parent.add(child);
  },
  createInstance(type, newProps, contaner) {
    return new Core[type](newProps);
  },
  ceeateTextInstance(text, contaner) {
    return text;
  },
  // 判断是否需要处理子节点。如果返回true则不创建，整个下级组件树都会被忽略。
  // 有一些场景是不需要创建文本节点的，而是由父节点内部消化。
  // 举个例子，在ReactDOM中，如果某个节点设置了dangerouslySetInnerHTML，那么它的children应该被忽略，
  // 这时候 shouldSetTextContent则应该返回true
  shouldSetTextContent(type, nextProps) {
    return false;
  }
};
