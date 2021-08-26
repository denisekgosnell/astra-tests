const { createClient } = require("@astrajs/rest");

// create an Astra client
const astraClient = await createClient({
  astraDatabaseId: process.env.ASTRA_DB_ID,
  astraDatabaseRegion: process.env.ASTRA_DB_REGION,
  applicationToken: process.env.ASTRA_DB_APPLICATION_TOKEN,
});

const basePath = "/api/rest/v2/keyspaces/tablesGCP/resttest";

try {
  // create a new user with a document id
  const { data, status } = await astraClient.put(`${basePath}/1`, {
    time: JSON.stringify(Date.now()),
  });
  return {
    statusCode: 200,
    body: JSON.stringify(responseBody),
  };
} catch (e) {
  console.log(e);
  return {
    statusCode: 500,
    body: JSON.stringify(e),
  };
}
