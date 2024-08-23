// neonTechService.js
const neonTech = require('../config/neonTechConfig');

/**
 * Fetches the current user information.
 * @returns {Promise<object>} - A promise that resolves to the user information.
 */
async function getCurrentUserInfo() {
  try {
    const { data } = await neonTech.getCurrentUserInfo();
    return data;
  } catch (err) {
    console.error('Error fetching user info:', err);
    throw err; // Re-throw the error to be handled by the caller
  }
}

/**
 * Fetches the current user organizations.
 * @returns {Promise<object>} - A promise that resolves to the user organizations.
 */
async function getCurrentUserOrganizations() {
  try {
    const { data } = await neonTech.getCurrentUserOrganizations();
    return data;
  } catch (err) {
    console.error('Error fetching user organizations:', err);
    throw err; // Re-throw the error to be handled by the caller
  }
}

module.exports = {
  getCurrentUserInfo,
  getCurrentUserOrganizations,
};
