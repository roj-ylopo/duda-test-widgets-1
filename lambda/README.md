# Duda API Proxy Lambda Function

Secure serverless proxy for Duda API calls from your Monaco editor widget.

## 🚀 Quick Setup

### 1. Install Dependencies

```bash
cd lambda
npm install -g serverless
npm install
```

### 2. Configure Environment Variables

**First, get your Duda API credentials:**
1. Log into [partner.duda.co](https://partner.duda.co)
2. Go to **Settings** → **API Access**
3. Generate API credentials if you don't have them
4. Note your **API Username** and **API Password** (not your login credentials!)

Create `.env` file in the lambda directory:

```bash
DUDA_API_USERNAME=your_duda_api_username
DUDA_API_PASSWORD=your_duda_api_password
```

**IMPORTANT**: 
- Never commit the `.env` file to version control!
- These are API credentials, NOT your Duda login credentials
- Contact Duda support if you can't access API settings

### 3. Deploy to AWS

```bash
# For PowerShell (Windows)
$env:DUDA_API_USERNAME = "your_username"
$env:DUDA_API_PASSWORD = "your_password"
serverless deploy

# Deploy to production  
serverless deploy --stage prod

# For Bash/Linux/macOS
export DUDA_API_USERNAME=your_username
export DUDA_API_PASSWORD=your_password
serverless deploy
```

### 4. Update Your Widget

After deployment, update the `LAMBDA_BASE_URL` in your Monaco editor settings:

```javascript
const LAMBDA_BASE_URL = 'https://abc123.execute-api.us-east-1.amazonaws.com/dev';
```

## � **Manual Lambda Upload Steps (Alternative to Serverless):**

### **1. Prepare Your Code** 
Your `lambda-function.zip` is already created! ✅

### **2. Create Lambda Function in AWS Console**

1. **Go to AWS Console** → **Lambda** → **Create Function**

2. **Choose "Author from scratch"**:
   - **Function name**: `duda-api-proxy`
   - **Runtime**: `Node.js 20.x` (or latest available)
   - **Architecture**: `x86_64`
   - Click **Create function**

3. **Upload Your Code**:
   - In the **Code** section, click **Upload from** → **.zip file**
   - Upload your `lambda-function.zip`
   - Click **Save**

### **3. Set Environment Variables**

In your Lambda function:
1. Go to **Configuration** → **Environment variables**
2. Click **Edit** → **Add environment variable**
3. Add:
   - `DUDA_API_USERNAME` = `fd2f028a04`
   - `DUDA_API_PASSWORD` = `your_duda_password`
   - `DUDA_BASE_URL` = `https://api.duda.co/api`

### **4. Create API Gateway**

1. **Services** → **API Gateway** → **Create API**
2. Choose **HTTP API** → **Build**
3. **Add integration**:
   - **Integration type**: Lambda function
   - **Lambda function**: `duda-api-proxy`
   - **Method**: `ANY`
   - **Resource path**: `/api/sites/{siteName}/collections/{collectionName}`
4. **Deploy** → Get your API URL

### **5. Update Monaco Editor**

Replace `LAMBDA_BASE_URL` in your code-editor-settings.html:
```javascript
const LAMBDA_BASE_URL = 'https://your-api-id.execute-api.us-east-1.amazonaws.com';
```

### Get Collection Data
```bash
GET /api/sites/{siteName}/collections/{collectionName}
```

### Save Collection Data
```bash
POST /api/sites/{siteName}/collections/{collectionName}
Content-Type: application/json

{
  "name": "monaco-editor-code",
  "data": {
    "html": "<h1>Your Code</h1>",
    "lastUpdated": "2026-03-04T10:30:00Z"
  }
}
```

## 🔒 Security Features

- ✅ API credentials stored securely in Lambda environment variables
- ✅ CORS configured for browser requests
- ✅ No sensitive data exposed to client-side code
- ✅ Request validation and error handling
- ✅ Structured logging for debugging

## 🛠️ Local Testing

```bash
# Install serverless-offline for local testing
npm install --save-dev serverless-offline

# Set environment variables for testing
# PowerShell (Windows):
$env:DUDA_API_USERNAME = "your_username"
$env:DUDA_API_PASSWORD = "your_password"

# Bash/Linux/macOS:
# export DUDA_API_USERNAME=your_username
# export DUDA_API_PASSWORD=your_password

# Start local server
serverless offline

# Test endpoint (in a new terminal)
curl -X GET http://localhost:3001/api/sites/test-site/collections/code-blocks
```

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DUDA_API_USERNAME` | Your Duda API username | ✅ |
| `DUDA_API_PASSWORD` | Your Duda API password | ✅ |
| `DUDA_BASE_URL` | Duda API base URL | ❌ (defaults to https://api.duda.co/api) |

## 🚨 Production Checklist

- [ ] Replace `allowedOrigins: ['*']` with your actual domain
- [ ] Set up proper AWS IAM roles and permissions
- [ ] Enable CloudWatch logging
- [ ] Consider API rate limiting
- [ ] Set up monitoring and alerts
- [ ] Use AWS Secrets Manager for sensitive credentials

## 🔐 Enhanced Security: AWS Secrets Manager

For production environments, consider using AWS Secrets Manager instead of environment variables:

```bash
# Store credentials in AWS Secrets Manager
aws secretsmanager create-secret \
  --name "duda-api-credentials" \
  --description "Duda API credentials for Lambda" \
  --secret-string '{"username":"your_username","password":"your_password"}'

# Update serverless.yml to use Secrets Manager
# Add IAM permissions and modify Lambda to fetch secrets at runtime
```

**Benefits:**
- ✅ Automatic credential rotation
- ✅ Fine-grained access control  
- ✅ Audit trail of credential access
- ✅ Cross-service credential sharing
- ✅ Enhanced encryption options

## 📍 Credential Security Summary

| Method | Local Storage | Transit | AWS Storage | Security Level |
|--------|---------------|---------|-------------|----------------|
| `export` commands | Terminal memory only | HTTPS encrypted | Lambda env vars (encrypted) | ⭐⭐⭐⭐ Good |
| AWS Secrets Manager | None | HTTPS encrypted | Secrets Manager (encrypted + rotated) | ⭐⭐⭐⭐⭐ Excellent |