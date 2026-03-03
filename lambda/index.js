const https = require('https');

// Store these in AWS Lambda environment variables for security
const DUDA_API_USERNAME = process.env.DUDA_API_USERNAME;
const DUDA_API_PASSWORD = process.env.DUDA_API_PASSWORD;
const DUDA_BASE_URL = process.env.DUDA_BASE_URL || 'https://api.duda.co/api';

// CORS headers for browser requests
const corsHeaders = {
  'Access-Control-Allow-Origin': 'https://roj-ylopo.github.io', // Your GitHub Pages domain
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Amz-Date, X-Api-Key, X-Amz-Security-Token',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Content-Type': 'application/json'
};

exports.handler = async (event) => {
  // Handle preflight CORS requests
  if (event.requestContext?.http?.method === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: ''
    };
  }

  try {
    // Support both API Gateway formats
    const path = event.rawPath || event.path || event.requestContext?.http?.path;
    const method = event.requestContext?.http?.method || event.httpMethod;
    const body = event.body ? JSON.parse(event.body) : null;

    console.log(`Processing ${method} request to ${path}`);
    console.log('Full event:', JSON.stringify(event, null, 2));

    if (!path || !method) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ 
          error: 'Missing path or method in event',
          receivedEvent: {
            path: path,
            method: method,
            eventKeys: Object.keys(event)
          }
        })
      };
    }

    // Route requests based on path (API Gateway format)
    if (path.includes('/collections/')) {
      return await handleCollectionsAPI(path, method, body);
    } else if (path.includes('/collections')) {
      // Handle listing collections (no specific collection name)
      return await handleCollectionsListAPI(path, method, body);
    }

    // Catch-all handler for debugging
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({ 
        message: 'Lambda function is working!',
        receivedPath: path,
        receivedMethod: method,
        timestamp: new Date().toISOString(),
        availableEndpoints: [
          'GET /api/sites/{siteName}/collections - List collections',
          'GET /api/sites/{siteName}/collections/{collectionName} - Get collection data',
          'POST /api/sites/{siteName}/collections/{collectionName} - Save collection data'
        ]
      })
    };

  } catch (error) {
    console.error('Lambda error:', error);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Internal server error', message: error.message })
    };
  }
};

async function handleCollectionsListAPI(path, method, body) {
  // Extract site_name from API Gateway path: /api/sites/{site_name}/collections
  const pathParts = path.split('/');
  const siteNameIndex = pathParts.findIndex(part => part === 'sites') + 1;
  
  if (siteNameIndex === 0) {
    return {
      statusCode: 400,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Invalid path format. Expected /api/sites/{site_name}/collections' })
    };
  }

  const siteName = pathParts[siteNameIndex];

  if (!siteName) {
    return {
      statusCode: 400,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Missing site_name in path' })
    };
  }

  // Convert to Duda API format: /sites/multiscreen/{site_name}/collection
  const dudaPath = `/sites/multiscreen/${siteName}/collection`;
  
  if (method === 'GET') {
    return await callDudaAPI('GET', dudaPath);
  }
  
  return {
    statusCode: 405,
    headers: corsHeaders,
    body: JSON.stringify({ error: 'Method not allowed for collections list' })
  };
}

async function handleCollectionsAPI(path, method, body) {
  // Extract site_name from API Gateway path: /api/sites/{site_name}/collections/{collection_name}
  const pathParts = path.split('/');
  const siteNameIndex = pathParts.findIndex(part => part === 'sites') + 1;
  const collectionNameIndex = pathParts.findIndex(part => part === 'collections') + 1;
  
  if (siteNameIndex === 0 || collectionNameIndex === 0) {
    return {
      statusCode: 400,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Invalid path format. Expected /api/sites/{site_name}/collections/{collection_name}' })
    };
  }

  const siteName = pathParts[siteNameIndex];
  const collectionName = pathParts[collectionNameIndex];

  if (!siteName || !collectionName) {
    return {
      statusCode: 400,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Missing site_name or collection_name in path' })
    };
  }

  // Convert to Duda API format: /sites/multiscreen/{site_name}/collection/{collection_name}
  const dudaPath = `/sites/multiscreen/${siteName}/collection/${collectionName}`;
  
  switch (method) {
    case 'GET':
      return await callDudaAPI('GET', dudaPath);
    
    case 'POST':
      if (!body) {
        return {
          statusCode: 400,
          headers: corsHeaders,   
          body: JSON.stringify({ error: 'Request body required for POST' })
        };
      }
      return await callDudaAPI('POST', dudaPath, body);
    
    case 'PUT':
      if (!body) {
        return {
          statusCode: 400,
          headers: corsHeaders,
          body: JSON.stringify({ error: 'Request body required for PUT' })
        };
      }
      return await callDudaAPI('PUT', dudaPath, body);
    
    case 'DELETE':
      return await callDudaAPI('DELETE', dudaPath);
    
    default:
      return {
        statusCode: 405,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Method not allowed' })
      };
  }
}

function callDudaAPI(method, path, data = null) {
  return new Promise((resolve, reject) => {
    const auth = Buffer.from(`${DUDA_API_USERNAME}:${DUDA_API_PASSWORD}`).toString('base64');
    
    const options = {
      hostname: 'api.duda.co',
      port: 443,
      path: `/api${path}`,
      method: method,
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json',
        'X-DUDA-ACCESS-TOKEN': DUDA_API_USERNAME // Some Duda endpoints might need this
      }
    };

    console.log(`Calling Duda API: ${method} ${options.path}`);

    const req = https.request(options, (res) => {
      let responseData = '';

      res.on('data', (chunk) => {
        responseData += chunk;
      });

      res.on('end', () => {
        console.log(`Duda API response status: ${res.statusCode}`);
        
        let parsedData;
        try {
          parsedData = responseData ? JSON.parse(responseData) : {};
        } catch (parseError) {
          parsedData = { rawResponse: responseData };
        }

        resolve({
          statusCode: res.statusCode,
          headers: corsHeaders,
          body: JSON.stringify(parsedData)
        });
      });
    });

    req.on('error', (error) => {
      console.error('HTTPS request error:', error);
      reject({
        statusCode: 500,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Failed to connect to Duda API', message: error.message })
      });
    });

    if (data && (method === 'POST' || method === 'PUT')) {
      req.write(JSON.stringify(data));
    }

    req.end();
  });
}