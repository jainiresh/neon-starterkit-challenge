// neonTechService.js
const neonTech = require('../config/neonTechConfig');

/**
 * Fetches consumption history per account.
 * @param {Object} params - Parameters for the API call.
 * @param {string} params.granularity - The granularity of the data (e.g., 'hourly').
 * @returns {Promise<object>} - A promise that resolves to the consumption history data.
 */
async function getConsumptionHistoryPerAccount(params) {
  try {
    const { data } = await neonTech.getConsumptionHistoryPerAccount(params);
    return data;
  } catch (err) {
    console.error('Error fetching consumption history per account:', err);
    throw err; // Re-throw the error to be handled by the caller
  }
}

/**
 * Fetches consumption history per project.
 * @param {Object} params - Parameters for the API call.
 * @param {string} params.limit - The limit on the number of results.
 * @param {string} params.granularity - The granularity of the data (e.g., 'hourly').
 * @returns {Promise<object>} - A promise that resolves to the consumption history data.
 */
async function getConsumptionHistoryPerProject(params) {
  try {
    const { data } = await neonTech.getConsumptionHistoryPerProject(params);
    return data;
  } catch (err) {
    console.error('Error fetching consumption history per project:', err);
    throw err; // Re-throw the error to be handled by the caller
  }
}

/**
 * Lists projects consumption.
 * @param {Object} params - Parameters for the API call.
 * @param {string} params.limit - The limit on the number of results.
 * @returns {Promise<object>} - A promise that resolves to the projects consumption data.
 */
async function listProjectsConsumption(params) {
  try {
    const { data } = await neonTech.listProjectsConsumption(params);
    return data;
  } catch (err) {
    console.error('Error listing projects consumption:', err);
    throw err; // Re-throw the error to be handled by the caller
  }
}

module.exports = {
  getConsumptionHistoryPerAccount,
  getConsumptionHistoryPerProject,
  listProjectsConsumption,
};
