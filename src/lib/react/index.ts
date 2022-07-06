import Reconciler from "react-reconciler";
import hostConfig from "./hostConfig";

const Render = Reconciler(hostConfig as any);

export default {
  render: (reactElement: any, rootElement: any, callback: any) => {
    // 创建容器
    if (!rootElement._rootContainer) {
      rootElement._rootContainer = Render.createContainer(
        rootElement,
        0,
        false,
        null
      );
    }
    // 更新容器
    return Render.updateContainer(
      reactElement,
      rootElement._rootContainer,
      null,
      callback
    );
  }
};
