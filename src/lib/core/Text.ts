import type Layer from "./Layer";
import Node from "./Node";
import type { ITextLayout, ITextStyle } from "./interface";

export default class Text extends Node {
  layer!: Layer;
  layout = {} as ITextLayout;
  type = "Text" as "Text";

  public constructor(protected style: ITextStyle) {
    super(style);
  }

  update(nextProps?: Partial<ITextStyle>) {
    this.style = { ...this.style, ...nextProps };
    this.layer?.batchDraw();
  }

  handleSetLayout() {
    this.setLayout();
  }

  // todo:
  remove() {}

  draw() {
    this.calcLayout();
    this.drawCanvas();
  }

  drawCanvas() {
    const ctx = this.layer.context;
    ctx.font = this.layout.font;
    ctx.fillStyle = this.layout.fillStyle;
    // yoga 计算的是相对父元素的定位，所以需要加上父元素的x、y
    ctx.fillText(
      this.style.text,
      this.layout.x + this.parent.layout.x,
      this.layout.y + this.style.fontSize! + this.parent.layout.y
    );
  }
}
