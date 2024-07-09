import { createGitgraph } from "@gitgraph/js";
import { Commit } from "@gitgraph/core";
import template from "./template";

const graphContainer = document.querySelector("#graph");

const scaleDot = (commit: Commit<SVGElement>) => {
  const branchName = commit.branches?.[0];
  const branchPaths = document.querySelectorAll(`#branches path`);
  branchPaths.forEach((path) => {
      const isHighlighted = path.getAttribute('id') === branchName;
      path.setAttribute('stroke-width', isHighlighted ? '3' : '2');
      path.setAttribute('style', isHighlighted ? 'opacity: 1' : 'opacity: 0.5');
  });
  const circle = document.querySelector(`[id="${commit.hash}"]`);
  circle?.setAttribute("r", "7");
  const message = circle?.parentElement?.parentElement?.querySelector('text');
  message?.setAttribute('fill', '#fff');
  const branch = circle?.parentElement?.parentElement?.querySelector('rect+text');
  branch?.setAttribute('fill', '#fff');
};

const unscaleDot = (commit: Commit<SVGElement>) => {
  const branchPaths = document.querySelectorAll(`#branches path`);
            branchPaths.forEach((path) => {
                path.setAttribute('stroke-width', '2');
                path.setAttribute('style','opacity: 1');
            });
  const circle = document.querySelector(`[id="${commit.hash}"]`);
  circle?.setAttribute("r", "5");
  const message = circle?.parentElement?.parentElement?.querySelector('text');
  message?.setAttribute('fill', '#ccc');
  const branch = circle?.parentElement?.parentElement?.querySelector('rect+text');
  branch?.setAttribute('fill', '#ccc');
};

const gitgraph = createGitgraph(graphContainer as HTMLElement, {
  template,
  branchLabelOnEveryCommit: false,
  onDotOver: scaleDot,
  onDotOut: unscaleDot,
  onMessageOver: scaleDot,
  onMessageOut: unscaleDot,
  branchNameMaxLength: 20,
  commitMessageMaxLength: 20,
});

const scenario = 'main';

if (scenario === 'main') {
  const main = gitgraph.branch("main");
  main.commit("Initial commit");
  const develop = gitgraph.branch("develop");

  const test = gitgraph.branch("test");
  test.commit("Initial commit");
  main.merge(test);

  develop.commit("Initial commit");
  main.commit({subject: "Another commit", hash: '1234567890'});
  develop.commit("hey feature");
  main.merge(develop);
  develop.merge(main);
  const feature = gitgraph.branch("feature");
  feature.commit("Start new feature");
  feature.commit("Finish new feature");
  develop.merge(feature);
  const feature2 = gitgraph.branch("feature2 with a very long name that should be truncated");
  feature2.commit("Start new feature 2");
  feature2.commit("Finish new feature 2 with a very long message that should be truncated");
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
  });
  develop.merge(feature);
  main.merge({branch: develop, commitOptions: {hash: 'merge-develop'}});
  const feature3 = gitgraph.branch({name: "feature3", from: '1234567890'});
  feature3.commit("Start new feature 3");
  feature3.commit({subject: "Continue new feature 3", hash: 'xyz1234567890'});
  feature3.commit({subject: "Test something", hash: 'test-something'});
  main.merge({branch: feature3, from: 'xyz1234567890'});
  feature3.delete();
} else if (scenario === 'merge') {
  const main = gitgraph.branch("main");
  main.commit({subject: "Main Initial Commit", hash: 'main-initial-commit'}); 
  const develop = gitgraph.branch("develop");
  develop.commit({subject: "Develop Initial Commit", hash: 'develop-initial-commit'});
  develop.commit({subject: "Develop Second Commit", hash: 'develop-second-commit'});
  main.merge({branch: develop, from: 'develop-initial-commit', commitOptions: {hash: 'merge-develop'}});
} else if (scenario === 'test') {
  const main = gitgraph.branch("main");
  main.commit({subject: "init", hash: 'ebe'});
  main.commit({subject: "f1", hash: '1b9'});
  const dev = gitgraph.branch({name: 'dev', from: '1b9'});
  dev.commit({subject: "f2", hash: '5b5'});
  dev.commit({subject: "f3", hash: '0b3'});
  dev.commit({subject: "head", hash: 'adf'});
  main.merge({branch: dev, from: '0b3', commitOptions: {hash: '245'}});
  main.commit({subject: "head", hash: 'f2f'});
}



