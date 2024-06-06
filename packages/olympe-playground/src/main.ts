import { createGitgraph, Mode } from "@gitgraph/js";
import template from "./template";

const graphContainer = document.querySelector("#graph");
const gitgraph = createGitgraph(graphContainer, { template });
const main = gitgraph.branch("main");
main.commit("Initial commit");
const develop = gitgraph.branch("develop");
develop.commit("Initial commit");
main.commit("Another commit");
develop.commit("hey feature");
main.merge(develop);
develop.merge(main);
const feature = gitgraph.branch("feature");
feature.commit("Start new feature");
feature.commit("Finish new feature");
develop.merge(feature);
const feature2 = gitgraph.branch("feature2");
feature2.commit("Start new feature 2");
feature2.commit("Finish new feature 2");
develop.merge(feature2);
main.commit("Hot fix");
develop.merge(main);
feature2.merge(develop);
feature.merge(develop);
feature2.commit("Adjust feature 2");
develop.merge(feature2);
feature.commit("Adjust feature");
feature.commit("Yet another change", {
  renderTooltip: (x) => console.log("x", x),
});
develop.merge(feature);
main.merge(develop);
