const { createProjectBranch } = require('../service/branchService');

// branchNames = ['dev','prod'], project_id

const createFourStageEnvBranches = async ({ project_id, branchNames }) => {
  for (let branchName of branchNames) {
    try {
      await createProjectBranch(
        { branch: { name: branchName } },
        { project_id: project_id }
      );
    } catch (err) {
      console.log(`Error in creating project branch ${err}`);
    }
  }
};

module.exports = { createFourStageEnvBranches };
