const neonTech = require('../config/neonTechConfig');

async function getProjectOperation(projectId, operationId) {
  try {
    const { data } = await neonTech.getProjectOperation({
      project_id: projectId,
      operation_id: operationId,
    });
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}

async function listProjectOperations(projectId) {
  try {
    const { data } = await neonTech.listProjectOperations({
      project_id: projectId,
    });
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  getProjectOperation,
  listProjectOperations,
};
