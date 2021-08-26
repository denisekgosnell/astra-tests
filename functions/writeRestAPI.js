const fetch = require('node-fetch')

exports.handler = async function (event) {
  const testNum = JSON.parse(event.body)

  const url = process.env.ASTRA_REST_ENDPOINT
  const query = `{
    test: ${JSON.stringify(testNum)},
    time: ${JSON.stringify(Date.now())}
  }`  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "x-cassandra-token": process.env.ASTRA_DB_APPLICATION_TOKEN
    },
    body: JSON.stringify({ query })
  })

  try {
    const responseBody = await response.json()
    return {
      statusCode: 200,
      body: JSON.stringify(responseBody)
    }
  } catch (e) {
    console.log(e)
    return {
      statusCode: 500,
      body: JSON.stringify(e)
    }
  }
}