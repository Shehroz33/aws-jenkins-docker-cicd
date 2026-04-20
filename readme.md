# 🚀 AWS Jenkins Docker CI/CD Pipeline

A production-style **CI/CD pipeline** deployed on **AWS EC2** using **Jenkins, Docker, GitHub Webhooks, Node.js, and Nginx**.

Every push to GitHub automatically triggers Jenkins, runs build and test stages, builds a Docker image, redeploys the application container, and serves the app through Nginx.

---

## 📌 Project Overview

This project demonstrates a complete end-to-end CI/CD workflow:

- Developer pushes code to GitHub
- GitHub webhook notifies Jenkins
- Jenkins pulls the latest code from GitHub
- Build and test stages are executed inside Docker
- Docker image is built and tagged
- Existing container is removed safely
- New container is deployed automatically
- Nginx exposes the application on port **80**

---

## 🧱 Architecture

```text
Developer
   |
   | Git Push
   v
GitHub Repository
   |
   | Webhook
   v
Jenkins on AWS EC2
   |  - Pull Source Code
   |  - Build & Test
   |  - Docker Build
   |  - Deploy
   v
Docker Engine
   |  Container: ci-cd-demo-app
   v
Nginx Reverse Proxy
   |
   v
Public Access on Port 80
```

---

## ⚙️ Tech Stack

- **AWS EC2 (Ubuntu)**
- **Jenkins**
- **Docker**
- **GitHub Webhooks**
- **Node.js**
- **Express.js**
- **Jest + Supertest**
- **Nginx**

---

## 🔁 CI/CD Pipeline Flow

1. Code is pushed to GitHub
2. GitHub webhook triggers Jenkins
3. Jenkins pulls the latest code from the repository
4. Build and test stage runs inside a Dockerized Node.js environment
5. Docker image is built and tagged
6. Existing container is stopped and removed
7. A new container is started
8. Nginx serves the application on port **80**

---

## 🐳 Docker Configuration

- **Image Name:** `ci-cd-demo:latest`
- **Container Name:** `ci-cd-demo-app`
- **Restart Policy:** `unless-stopped`
- **Application Port:** `3000`
- **Public Port:** `80` via Nginx

### Deployment Command

```bash
docker rm -f ci-cd-demo-app || true

docker run -d \
  --restart unless-stopped \
  --name ci-cd-demo-app \
  -p 3000:3000 \
  ci-cd-demo:latest
```

---

## 🧪 Build and Test Stage

The Jenkins pipeline uses Docker to run build and test commands, so Node.js does not need to be installed directly on the EC2 host.

```bash
docker run --rm \
  -v "$WORKSPACE":/app \
  -w /app \
  node:18-alpine \
  sh -c "npm install && npm run build && npm run test"
```

---

## 🌐 Nginx Reverse Proxy

Nginx forwards traffic from port **80** to the Node.js application running on port **3000**.

```nginx
server {
    listen 80;
    server_name _;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;

        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

---

## 🔐 Security Configuration

| Port | Service | Access |
|------|---------|--------|
| 22 | SSH | My IP only |
| 8080 | Jenkins | Open for webhook testing / restrict later |
| 80 | Application | Public |
| 3000 | Node App | Internal use only |

---

## 📂 Project Structure

```text
.
├── app.js
├── server.js
├── Dockerfile
├── Jenkinsfile
├── package.json
├── tests
│   └── app.test.js
└── README.md
```

---

## 🧪 Application Features

- `/` returns application info
- `/health` returns health check status
- automated tests verify both endpoints

Example responses:

### `/`
```json
{
  "message": "Hello from Jenkins + Docker CI/CD!",
  "project": "aws-jenkins-docker-cicd",
  "status": "running"
}
```

### `/health`
```json
{
  "status": "healthy"
}
```

---

## 🧠 Key Learnings

- Jenkins Pipeline from SCM
- GitHub webhook integration with Jenkins
- Dockerized build and test workflow
- Automated container deployment on EC2
- Nginx reverse proxy configuration
- Security group management on AWS
- Writing basic API tests with Jest and Supertest

---

## 🔮 Future Improvements

- Push Docker images to **Docker Hub** or **AWS ECR**
- Add a custom domain
- Enable HTTPS using **Let’s Encrypt**
- Add monitoring with **Prometheus and Grafana**
- Implement zero-downtime deployment
- Secure Jenkins with a better production setup

---

## 👤 Author

**Shehroz Amjad**  
DevOps | Cloud | CI/CD

LinkedIn: www.linkedin.com/in/shehrozamjad  
GitHub: https://github.com/Shehroz33/
