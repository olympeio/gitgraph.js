import { createGitgraph } from "@gitgraph/js";
import { Commit } from "@gitgraph/core";
import template from "./template";

const graphContainer = document.querySelector("#graph");
const gitgraph = createGitgraph(graphContainer as HTMLElement, {
  template,
  branchLabelOnEveryCommit: false,
  generateTooltipMessage: (commit) => {
    const branch = commit.branches?.[0];
    return (branch ? `${branch}: ` : "") + commit.subject;
  },
  onMessageOver: (commit) => {
    console.log('here');
    const circle = document.querySelector(`[id="${commit.hash}"]`);
    circle?.setAttribute("transform-origin", "5px 5px");
    circle?.setAttribute("transform", "scale(1.5)");
  },
  onMessageOut: (commit) => {
    const circle = document.querySelector(`[id="${commit.hash}"]`);
    circle?.removeAttribute("transform");
  },
});
const main = gitgraph.branch("main");
main.commit("Initial commit");
const develop = gitgraph.branch("develop");

const test = gitgraph.branch("test");
test.commit("Initial commit");
main.merge(test);

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
feature.commit({
  subject: "Yet another change",
  onMessageOver: (commit: Commit) => {
    const circle = document.querySelector(`[id="${commit.hash}"]`);
    circle?.setAttribute("transform-origin", "5px 5px");
    circle?.setAttribute("transform", "scale(1.5)");
  },
  onMessageOut: (commit: Commit) => {
    const circle = document.querySelector(`[id="${commit.hash}"]`);
    circle?.removeAttribute("transform");
  },
});
develop.merge(feature);
main.merge(develop);
