import { Text, View, Stage, Layer } from "./lib/core";

const container = document.getElementById("app") as HTMLDivElement;

const stage = new Stage({
  container,
  width: 1000,
  height: 500
});

const layer = new Layer({
  width: 1000,
  height: 500
});

const root = new View({
  width: 800,
  height: 500,
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "yellow"
});

const child0 = new View({
  backgroundColor: "blue",
  width: 100,
  height: 100,
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center"
});

const child1 = new View({
  backgroundColor: "red",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  width: 100,
  height: 100
});

const child3 = new View({
  backgroundColor: "green",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  width: 50,
  height: 50
});

// todo: 文字宽高自动计算
const child0_text0 = new Text({
  fontSize: 20,
  width: 10,
  height: 20,
  color: "white",
  text: "1"
});

const child1_text0 = new Text({
  fontSize: 20,
  width: 15,
  height: 20,
  color: "black",
  text: "2"
});

const child3_text0 = new Text({
  fontSize: 20,
  width: 15,
  height: 20,
  color: "purple",
  text: "3"
});

stage.add(layer);

layer.add(root);
root.add(child0);
root.add(child1);
root.add(child3);
child0.add(child0_text0);
child1.add(child1_text0);
child3.add(child3_text0);

const buttons = document.createElement("div");
buttons.id = "buttons";
container.appendChild(buttons);

const generateHTML = (arr: string[], type: string) => {
  const container = document.createElement("div");
  container.style.marginTop = "20px";
  const html = arr
    .map((direction) => {
      return `<button data-value=${direction} data-type=${type}>${direction}</button>`;
    })
    .join("\n");
  container.innerHTML = `
    <div style="margin: 10px">${type}：</div>
    ${html}
  `;
  buttons.appendChild(container);
};

generateHTML(
  ["row", "column", "row-reverse", "column-reverse"],
  "flexDirection"
);

generateHTML(
  ["flex-start", "flex-end", "center", "space-between", "space-around"],
  "justifyContent"
);

generateHTML(
  ["flex-start", "flex-end", "center", "stretch", "baseline"],
  "alignItems"
);

buttons.addEventListener("click", function (e) {
  const target = e.target as HTMLDivElement;
  if (target.tagName.toLowerCase() === "button") {
    const { value, type } = target.dataset;
    root.update({
      [type!]: value
    });
  }
});
