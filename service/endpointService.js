const neonTech = require('../config/neonTechConfig');

async function createProjectEndpoint(projectId) {
  try {
    const { data } = await neonTech.createProjectEndpoint({
      project_id: projectId,
    });
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}

async function listProjectEndpoints(projectId) {
  try {
    const { data } = await neonTech.listProjectEndpoints({
      project_id: projectId,
    });
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}

async function getProjectEndpoint(projectId, endpointId) {
  try {
    const { data } = await neonTech.getProjectEndpoint({
      project_id: projectId,
      endpoint_id: endpointId,
    });
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}

async function deleteProjectEndpoint(projectId, endpointId) {
  try {
    const { data } = await neonTech.deleteProjectEndpoint({
      project_id: projectId,
      endpoint_id: endpointId,
    });
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}

async function updateProjectEndpoint(projectId, endpointId) {
  try {
    const { data } = await neonTech.updateProjectEndpoint({
      project_id: projectId,
      endpoint_id: endpointId,
    });
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}

async function startProjectEndpoint(projectId, endpointId) {
  try {
    const { data } = await neonTech.startProjectEndpoint({
      project_id: projectId,
      endpoint_id: endpointId,
    });
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}

async function suspendProjectEndpoint(projectId, endpointId) {
  try {
    const { data } = await neonTech.suspendProjectEndpoint({
      project_id: projectId,
      endpoint_id: endpointId,
    });
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}

async function restartProjectEndpoint(projectId, endpointId) {
  try {
    const { data } = await neonTech.restartProjectEndpoint({
      project_id: projectId,
      endpoint_id: endpointId,
    });
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  createProjectEndpoint,
  listProjectEndpoints,
  getProjectEndpoint,
  deleteProjectEndpoint,
  updateProjectEndpoint,
  startProjectEndpoint,
  suspendProjectEndpoint,
  restartProjectEndpoint,
};
