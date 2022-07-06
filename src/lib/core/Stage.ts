import type Layer from "./Layer";
import type { IStageProps } from "./interface";

export default class Stage {
  content: HTMLDivElement = document.createElement("div");
  children: Layer[] = [];

  constructor(private options: IStageProps) {
    this.init();
  }

  init() {
    this.content.classList.add("my-canvas-wrapper");
    this.content.style.width = `${this.options.width}px`;
    this.content.style.height = `${this.options.height}px`;
    this.options.container.appendChild(this.content);
  }

  add(layer: Layer) {
    this.children.push(layer);
    layer.parent = this;
    this.content.appendChild(layer.canvas);
  }
}
