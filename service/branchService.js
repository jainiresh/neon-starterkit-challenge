const neonTech = require('../config/neonTechConfig');
const sql = require('../config/pgConfig');

async function createProjectBranch(payload) {
  try {
    const { data } = await neonTech.createProjectBranch(payload);
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}

async function listProjectBranches(projectId) {
  try {
    const { data } = await neonTech.listProjectBranches({
      project_id: projectId,
    });
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}

async function getProjectBranch(projectId, branchId) {
  try {
    const { data } = await neonTech.getProjectBranch({
      project_id: projectId,
      branch_id: branchId,
    });
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}

async function deleteProjectBranch(projectId, branchId) {
  try {
    const { data } = await neonTech.deleteProjectBranch({
      project_id: projectId,
      branch_id: branchId,
    });
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}

async function updateProjectBranch(projectId, branchId) {
  try {
    const { data } = await neonTech.updateProjectBranch({
      project_id: projectId,
      branch_id: branchId,
    });
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}

async function restoreProjectBranch(projectId, branchId) {
  try {
    const { data } = await neonTech.restoreProjectBranch({
      project_id: projectId,
      branch_id: branchId,
    });
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}

async function getProjectBranchSchema(projectId, branchId) {
  try {
    const { data } = await neonTech.getProjectBranchSchema({
      project_id: projectId,
      branch_id: branchId,
    });
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}

async function setPrimaryProjectBranch(projectId, branchId) {
  try {
    const { data } = await neonTech.setPrimaryProjectBranch({
      project_id: projectId,
      branch_id: branchId,
    });
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}

async function setDefaultProjectBranch(projectId, branchId) {
  try {
    const { data } = await neonTech.setDefaultProjectBranch({
      project_id: projectId,
      branch_id: branchId,
    });
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}

async function listProjectBranchEndpoints(projectId, branchId) {
  try {
    const { data } = await neonTech.listProjectBranchEndpoints({
      project_id: projectId,
      branch_id: branchId,
    });
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}

async function listProjectBranchDatabases(projectId, branchId) {
  try {
    const { data } = await neonTech.listProjectBranchDatabases({
      project_id: projectId,
      branch_id: branchId,
    });
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}

async function createProjectBranchDatabase(projectId, branchId) {
  try {
    const { data } = await neonTech.createProjectBranchDatabase({
      project_id: projectId,
      branch_id: branchId,
    });
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}

async function getProjectBranchDatabase(projectId, branchId, databaseName) {
  try {
    const { data } = await neonTech.getProjectBranchDatabase({
      project_id: projectId,
      branch_id: branchId,
      database_name: databaseName,
    });
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}

async function updateProjectBranchDatabase(projectId, branchId, databaseName) {
  try {
    const { data } = await neonTech.updateProjectBranchDatabase({
      project_id: projectId,
      branch_id: branchId,
      database_name: databaseName,
    });
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}

async function deleteProjectBranchDatabase(projectId, branchId, databaseName) {
  try {
    const { data } = await neonTech.deleteProjectBranchDatabase({
      project_id: projectId,
      branch_id: branchId,
      database_name: databaseName,
    });
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}

async function listProjectBranchRoles(projectId, branchId) {
  try {
    const { data } = await neonTech.listProjectBranchRoles({
      project_id: projectId,
      branch_id: branchId,
    });
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}

async function createProjectBranchRole(projectId, branchId) {
  try {
    const { data } = await neonTech.createProjectBranchRole({
      project_id: projectId,
      branch_id: branchId,
    });
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}

async function getProjectBranchRole(projectId, branchId, roleName) {
  try {
    const { data } = await neonTech.getProjectBranchRole({
      project_id: projectId,
      branch_id: branchId,
      role_name: roleName,
    });
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}

async function deleteProjectBranchRole(projectId, branchId, roleName) {
  try {
    const { data } = await neonTech.deleteProjectBranchRole({
      project_id: projectId,
      branch_id: branchId,
      role_name: roleName,
    });
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}

async function getProjectBranchRolePassword(projectId, branchId, roleName) {
  try {
    const { data } = await neonTech.getProjectBranchRolePassword({
      project_id: projectId,
      branch_id: branchId,
      role_name: roleName,
    });
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}

async function resetProjectBranchRolePassword(projectId, branchId, roleName) {
  try {
    const { data } = await neonTech.resetProjectBranchRolePassword({
      project_id: projectId,
      branch_id: branchId,
      role_name: roleName,
    });
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  createProjectBranch,
  listProjectBranches,
  getProjectBranch,
  deleteProjectBranch,
  updateProjectBranch,
  restoreProjectBranch,
  getProjectBranchSchema,
  setPrimaryProjectBranch,
  setDefaultProjectBranch,
  listProjectBranchEndpoints,
  listProjectBranchDatabases,
  createProjectBranchDatabase,
  getProjectBranchDatabase,
  updateProjectBranchDatabase,
  deleteProjectBranchDatabase,
  listProjectBranchRoles,
  createProjectBranchRole,
  getProjectBranchRole,
  deleteProjectBranchRole,
  getProjectBranchRolePassword,
  resetProjectBranchRolePassword,
};
