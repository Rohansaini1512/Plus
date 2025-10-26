# Finc - Node.js CI/CD Application

A simple Node.js application with complete CI/CD pipeline using Jenkins, Docker, and Kubernetes.

## 📋 Overview

This project demonstrates a modern DevOps workflow with:

> 📹 **Demo Video**: [Watch the project demonstration](https://www.loom.com/share/e7b51c82374b425db6c166cbf299a392)
- **Node.js Express** web application
- **Docker** containerization
- **Jenkins** CI/CD pipeline
- **Kubernetes** orchestration

## 🏗️ Project Structure

```
finc/
├── app.js                 # Main Node.js application
├── package.json           # Node.js dependencies and scripts
├── Dockerfile            # Docker container configuration
├── Jenkinsfile           # Jenkins CI/CD pipeline
├── K8s/                  # Kubernetes manifests
│   ├── deployment.yaml   # Kubernetes deployment configuration
│   └── service.yaml      # Kubernetes service configuration
└── README.md             # This file
```

## 🚀 Features

- **Express.js** web server with health endpoint
- **Docker** containerization for consistent deployments
- **Jenkins** automated CI/CD pipeline
- **Kubernetes** deployment with 2 replicas


## 🛠️ Prerequisites

- Node.js 18+
- Docker
- Jenkins
- Kubernetes cluster
- kubectl configured

## 📦 Installation & Setup

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd finc
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the application**
   ```bash
   npm start
   ```

4. **Access the application**
   - Main endpoint: http://localhost:3000

### Docker

1. **Build the Docker image**
   ```bash
   docker build -t finc .
   ```

2. **Run the container**
   ```bash
   docker run -p 3000:3000 finc
   ```

## 🔄 CI/CD Pipeline

The Jenkins pipeline (`Jenkinsfile`) includes:

1. **Checkout Code** - Pulls the latest code from repository
2. **Install Dependencies & Test** - Runs `npm ci` and `npm test`
3. **Build & Push Docker Image** - Builds and pushes to Docker Hub
4. **Deploy to Kubernetes** - Deploys to K8s cluster

### Jenkins Configuration

Required Jenkins credentials:
- `dockerhub-cred` - Docker Hub credentials
- `kubeconfig` - Kubernetes configuration file

### Environment Variables

- `REGISTRY`: Docker Hub username (rohansaini1512)
- `IMAGE_NAME`: Application name (finc)
- `IMAGE_TAG`: Build number as image tag

## ☸️ Kubernetes Deployment

### Deployment Configuration

- **Replicas**: 2 instances
- **Image**: `rohansaini1512/finc:latest`
- **Port**: 3000

### Service Configuration

- **Type**: LoadBalancer
- **Port**: 80 (external) → 3000 (container)
- **Selector**: `app: nodejs-app`

### Deploy to Kubernetes

```bash
# Apply all Kubernetes manifests
kubectl apply -f K8s/

# Check deployment status
kubectl get deployments
kubectl get services
kubectl get pods

# View logs
kubectl logs -l app=nodejs-app
```

## 🔍 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | Main application endpoint |

## 🐳 Docker Details

- **Base Image**: `node:18-alpine`
- **Working Directory**: `/usr/src/app`
- **Exposed Port**: 3000
- **Production Dependencies**: Only production packages installed


## 🔧 Development

### Available Scripts

- `npm start` - Start the application
- `npm test` - Run tests (currently skips)

### Environment Variables

- `PORT` - Application port (default: 3000)

## 📝 Notes

- The application is configured for production deployment
- The Jenkins pipeline automatically builds and deploys on code changes
- Docker image is pushed to Docker Hub with build number tags

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally with Docker
5. Submit a pull request



