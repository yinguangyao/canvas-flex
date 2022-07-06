import Yoga from "yoga-layout";
import type Layer from "./Layer";
import type View from "./View";
import {
  IBaseStyle,
  IViewStyle,
  ITextStyle,
  IViewLayout,
  ITextLayout,
  FlexDirection,
  FlexAlignItems,
  FlexJustifyContent,
  FlexDisplay
} from "./interface";

const isUndefined = (v: unknown) => v === undefined;

export default class Node {
  public parent!: Layer | View;
  public node = Yoga.Node.create();
  protected type!: "View" | "Text";
  public layout = {} as ITextLayout | IViewLayout;
  protected offset = { x: 0, y: 0 };
  constructor(protected style: IBaseStyle) {}

  // 设置 yoga 布局
  setLayout() {
    const {
      display,
      width,
      height,
      padding,
      margin,
      flex,
      flexDirection,
      alignItems,
      justifyContent
    } = this.style as IViewStyle & ITextStyle;
    console.log("this.style", this.style);
    if (!isUndefined(display)) {
      this.node.setDisplay(+FlexDisplay[display!] as Yoga.YogaDisplay);
    }
    if (!isUndefined(width)) {
      this.node.setWidth(width!);
    }
    if (!isUndefined(height)) {
      this.node.setHeight(height!);
    }
    if (!isUndefined(padding)) {
      const paddings = this.getPaddings(padding!);
      this.node.setPadding(Yoga.EDGE_TOP, paddings[0]);
      this.node.setPadding(Yoga.EDGE_RIGHT, paddings[1]);
      this.node.setPadding(Yoga.EDGE_BOTTOM, paddings[2]);
      this.node.setPadding(Yoga.EDGE_LEFT, paddings[3]);
    }
    if (!isUndefined(margin)) {
      const margins = this.getPaddings(margin!);
      this.node.setMargin(Yoga.EDGE_TOP, margins[0]);
      this.node.setMargin(Yoga.EDGE_RIGHT, margins[1]);
      this.node.setMargin(Yoga.EDGE_BOTTOM, margins[2]);
      this.node.setMargin(Yoga.EDGE_LEFT, margins[3]);
    }
    if (!isUndefined(flex)) {
      this.node.setFlex(flex!);
    }
    if (!isUndefined(flexDirection)) {
      this.node.setFlexDirection(
        FlexDirection[flexDirection!] as Yoga.YogaFlexDirection
      );
    }
    if (!isUndefined(alignItems)) {
      this.node.setAlignItems(FlexAlignItems[alignItems!] as Yoga.YogaAlign);
    }
    if (!isUndefined(justifyContent)) {
      this.node.setJustifyContent(
        FlexJustifyContent[justifyContent!] as Yoga.YogaJustifyContent
      );
    }
  }

  // 获取布局信息
  calcLayout() {
    const {
      color = "white",
      backgroundColor = "white",
      fontSize = 12,
      fontFamily = "微软雅黑"
    } = this.style as IViewStyle & ITextStyle;
    const paddingLeft = this.node.getComputedPadding(Yoga.EDGE_LEFT);
    const paddingTop = this.node.getComputedPadding(Yoga.EDGE_TOP);
    const marginLeft = this.node.getComputedMargin(Yoga.EDGE_LEFT);
    const marginTop = this.node.getComputedMargin(Yoga.EDGE_TOP);
    const { left, top, width, height } = this.node.getComputedLayout();

    this.layout.x = paddingLeft + left + marginLeft;
    this.layout.y = paddingTop + top + marginTop;
    if (this.type === "Text") {
      this.layout.fillStyle = color;
      (this.layout as ITextLayout).font = `${fontSize}px "${fontFamily}"`;
    } else {
      this.layout.fillStyle = backgroundColor;
      (this.layout as IViewLayout).width = width;
      (this.layout as IViewLayout).height = height;
    }
    console.log("this.layout", this.layout);
  }

  getPaddings(padding: string): number[] {
    padding = padding.trim();
    const paddings = padding.split(",");
    if (paddings.length === 0) {
      return [0, 0, 0, 0];
    }
    const [paddingTop, paddingRight, paddingBottom] = paddings;
    if (paddings.length === 1) {
      return Array.from({ length: 4 }, () => +paddingTop);
    }
    if (paddings.length === 2) {
      return [+paddingTop, +paddingRight, +paddingTop, +paddingRight];
    }
    if (paddings.length === 3) {
      return [+paddingTop, +paddingRight, +paddingBottom, +paddingRight];
    }
    if (paddings.length === 4) {
      return paddings.map((padding) => +padding);
    }
    return [];
  }

  setOffset(x: number, y: number) {
    this.offset = { x, y };
  }
}
