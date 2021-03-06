/* eslint-disable no-undef */
async function client(endpoint, { method, body, ...customConf } = {}) {
  let headers = {};

  const config = {
    method,
    ...customConf,
    headers: {
      ...headers,
      ...customConf.headers,
    },
  };

  
  if (config.headers['Content-Type'] == 'application/json') {
    config.body = JSON.stringify(body);
  } else {
    config.body = body;
    config.headers = {};
  }
    
  let data;
  try {
    const response = await window.fetch(endpoint, config);
    data = await response.json();
    if (!response.ok) {
      console.log(data) 
      throw new Error(data.statusText);
    }

    return data;
  } catch (err) {
    return Promise.reject(err.message || data);
  }
}

client.get = (endpoint, customConf = {}) => {
  return client(endpoint, { method: 'GET', ...customConf });
};

client.post = (endpoint, body, customConf = {}) => {
  return client(endpoint, { method: 'POST', body, ...customConf });
};

client.put = (endpoint,  customConf = {}) => {
  return client(endpoint, { method: 'PUT', ...customConf });
};

client.delete = (endpoint, customConf = {}) => {
  return client(endpoint, { method: 'DELETE', ...customConf });
};

module.exports = { client };
