// neonDbUtils.js
const neonTech = require("../config/neonTechConfig");

// List all projects
const listProjects = async () => {
  try {
    const { data } = await neonTech.listProjects();
    return data;
  } catch (err) {
    console.error('Error listing projects:', err);
    throw err;  // Propagate the error
  }
};

// Create a new project
const createProject = async () => {
  try {
    const { data } = await neonTech.createProject();
    return data;
  } catch (err) {
    console.error('Error creating project:', err);
    throw err;  // Propagate the error
  }
};

// List shared projects with optional limit
const listSharedProjects = async (limit = '10') => {
  try {
    const { data } = await neonTech.listSharedProjects({ limit });
    return data;
  } catch (err) {
    console.error('Error listing shared projects:', err);
    throw err;  // Propagate the error
  }
};

// Get details of a specific project
const getProject = async (project_id) => {
  try {
    const { data } = await neonTech.getProject({ project_id });
    return data;
  } catch (err) {
    console.error('Error getting project:', err);
    throw err;  // Propagate the error
  }
};

// Update a specific project
const updateProject = async (project_id) => {
  try {
    const { data } = await neonTech.updateProject({ project_id });
    return data;
  } catch (err) {
    console.error('Error updating project:', err);
    throw err;  // Propagate the error
  }
};

// Delete a specific project
const deleteProject = async (project_id) => {
  try {
    const { data } = await neonTech.deleteProject({ project_id });
    return data;
  } catch (err) {
    console.error('Error deleting project:', err);
    throw err;  // Propagate the error
  }
};

// List permissions for a specific project
const listProjectPermissions = async (project_id) => {
  try {
    const { data } = await neonTech.listProjectPermissions({ project_id });
    return data;
  } catch (err) {
    console.error('Error listing project permissions:', err);
    throw err;  // Propagate the error
  }
};

// Grant permission to a specific project
const grantPermissionToProject = async (project_id) => {
  try {
    const { data } = await neonTech.grantPermissionToProject({ project_id });
    return data;
  } catch (err) {
    console.error('Error granting permission to project:', err);
    throw err;  // Propagate the error
  }
};

// Revoke permission from a specific project
const revokePermissionFromProject = async (project_id, permission_id) => {
  try {
    const { data } = await neonTech.revokePermissionFromProject({ project_id, permission_id });
    return data;
  } catch (err) {
    console.error('Error revoking permission from project:', err);
    throw err;  // Propagate the error
  }
};

// Get connection URI for a specific project
const getConnectionURI = async (project_id) => {
  try {
    const { data } = await neonTech.getConnectionURI({ project_id });
    return data;
  } catch (err) {
    console.error('Error getting connection URI:', err);
    throw err;  // Propagate the error
  }
};

// Export functions
module.exports = {
  listProjects,
  createProject,
  listSharedProjects,
  getProject,
  updateProject,
  deleteProject,
  listProjectPermissions,
  grantPermissionToProject,
  revokePermissionFromProject,
  getConnectionURI
};
