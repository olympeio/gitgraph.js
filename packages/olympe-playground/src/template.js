import { templateExtend, TemplateName } from "@gitgraph/core";

console.log(TemplateName.Metro);

export default templateExtend(TemplateName.Metro, {
  colors: ["#e72a4e", "#594a99", "#fcc00e", "#2cb3a0"],
  branch: {
    lineWidth: 2,
    spacing: 20,
    label: {
      display: true,
      color: "#ccc",
      font: "normal 10pt Roboto",
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
    message: {
      font: "normal 10pt Roboto",
      displayAuthor: false,
      displayBranch: false,
      displayHash: false,
      color: "#fff",
    },
  },
});
