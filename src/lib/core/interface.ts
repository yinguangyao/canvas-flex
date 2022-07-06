import Yoga from "yoga-layout";

export interface ITextLayout {
  text: string;
  x: number;
  y: number;
  fillStyle: string;
  font: string;
}

export interface IViewLayout {
  x: number;
  y: number;
  width: number;
  height: number;
  // lineWidth: number;
  // strokeStyle: string;
  fillStyle: string;
}

export interface IStageProps {
  container: HTMLDivElement;
  width: number;
  height: number;
}

export interface ILayerProps {
  width: number;
  height: number;
}

export interface IBaseStyle {
  width?: number;
  height?: number;
  alignItems?: "flex-start" | "flex-end" | "center" | "baseline" | "stretch";
  flexDirection?: "row" | "row-reverse" | "column" | "column-reverse";
  justifyContent?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around";
  flex?: number;
  padding?: string;
  margin?: string;
  color?: string;
}

export enum FlexDirection {
  column = Yoga.FLEX_DIRECTION_COLUMN,
  row = Yoga.FLEX_DIRECTION_ROW,
  "column-reverse" = Yoga.FLEX_DIRECTION_COLUMN_REVERSE,
  "row-reverse" = Yoga.FLEX_DIRECTION_ROW_REVERSE
}

export enum FlexAlignItems {
  "flex-start" = Yoga.ALIGN_FLEX_START,
  center = Yoga.ALIGN_CENTER,
  "flex-end" = Yoga.ALIGN_FLEX_END,
  stretch = Yoga.ALIGN_STRETCH,
  baseline = Yoga.ALIGN_BASELINE
}

export enum FlexJustifyContent {
  "flex-start" = Yoga.JUSTIFY_FLEX_START,
  "flex-end" = Yoga.JUSTIFY_FLEX_END,
  center = Yoga.JUSTIFY_CENTER,
  "space-between" = Yoga.JUSTIFY_SPACE_BETWEEN,
  "space-around" = Yoga.JUSTIFY_SPACE_AROUND
}

export enum FlexDisplay {
  none = Yoga.DISPLAY_NONE,
  flex = Yoga.DISPLAY_FLEX
}

export interface ITextStyle extends IBaseStyle {
  fontSize?: number;
  fontFamily?: string;
  text: string;
}

export interface IViewStyle extends IBaseStyle {
  backgroundColor?: string;
  display?: "flex" | "none";
}

export interface IStageStyle extends IViewStyle {}

export interface ILayerStyle extends IViewStyle {}
