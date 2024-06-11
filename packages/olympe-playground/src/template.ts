import { templateExtend, TemplateName } from "@gitgraph/core";

export default templateExtend(TemplateName.Metro, {
  colors: ["#e72a4e", "#594a99", "#fcc00e", "#2cb3a0"],
  branch: {
    lineWidth: 2,
    spacing: 20,
    label: {
      display: true,
      color: "#ccc",
      font: "normal 12pt Roboto",
      bgColor: "#000",
      borderRadius: 5,
      strokeColor: "transparent",
    },
  },
  commit: {
    spacing: 30,
    dot: {
      size: 5,
    },
    ignoreTooltip: true,
    message: {
      font: "normal 12pt Roboto",
      displayAuthor: false,
      displayHash: false,
      color: "#ccc",
    },
  },
});
