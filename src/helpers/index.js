import axios from "axios"
// Make request
// Returns a promise
async function makeRequest(url, method, body = null, customHeaders = {}) {
  const headers = {...customHeaders}
  const config = {
    method,
    url: 'https://www.thecocktaildb.com/api/json/v1/1/' + url,
    headers,
  }

  if (method.toLowerCase() === 'get') {
    config.params = body
  } else {
    config.data = body
  }

  const response = await axios(config)
  return response
}

// Get random drinks
function getRandomDrinks(drinks, count) {
  let tempDrinks = [...drinks]
  let result = [];

  for (let i = 0; i < count; i++) {
    if (tempDrinks.length === 0) break
    
    let randomIndex = Math.floor(Math.random() * tempDrinks.length)

    result.push(tempDrinks.splice(randomIndex, 1)[0])
  }

  return result
}

export { makeRequest, getRandomDrinks }