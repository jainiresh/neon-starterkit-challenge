const neonTech = require('../config/neonTechConfig');

async function listApiKeys() {
  try {
    const { data } = await neonTech.listApiKeys();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}

async function createApiKey() {
  try {
    const { data } = await neonTech.createApiKey();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}

async function revokeApiKey(keyId) {
  try {
    const { data } = await neonTech.revokeApiKey({ key_id: keyId });
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  listApiKeys,
  createApiKey,
  revokeApiKey,
};
