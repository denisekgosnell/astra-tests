exports.handler = async function (event) {
  const { createClient } = require("@astrajs/rest");
  const testNum = JSON.parse(event.body);
  // create an Astra client
  const astraClient = await createClient({
    astraDatabaseId: process.env.ASTRA_DB_ID,
    astraDatabaseRegion: process.env.ASTRA_DB_REGION,
    applicationToken: process.env.ASTRA_DB_APPLICATION_TOKEN,
  });

  const basePath = "/api/rest/v2/keyspaces/tablesGCP/resttest";

  try {
    // create a new user with a document id
    const isoDate = new Date().toISOString();
    const { data, status } = await astraClient.put(`${basePath}/${testNum}`, {
      time: isoDate,
    });
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (e) {
    console.log(e);
    return {
      statusCode: 500,
      body: JSON.stringify(e),
    };
  }
};
