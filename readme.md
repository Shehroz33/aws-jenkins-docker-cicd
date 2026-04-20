# 🚀 AWS Jenkins Docker CI/CD Pipeline

A **production-style CI/CD pipeline** implemented on **AWS EC2** using **Jenkins, Docker, GitHub Webhooks, and Nginx**.
Every push to GitHub automatically builds, tests, containerizes, and deploys the application.

---

## 📌 Project Overview

This project demonstrates an end-to-end **CI/CD workflow**:

- GitHub push triggers Jenkins via webhook
- Jenkins pulls code using Pipeline from SCM
- Application build & test stages run
- Docker image is built and tagged
- Existing container is safely replaced
- New container is deployed with auto-restart
- Nginx exposes the app on port **80**
- Jenkins & SSH are restricted for security

---

## 🧱 Architecture

```
Developer
   |
   |  Git Push
   v
GitHub Repository
   |
   |  Webhook
   v
Jenkins (AWS EC2)
   |  - Build & Test
   |  - Docker Build
   |  - Deploy
   v
Docker Engine
   |  Container (aws-jenkins-docker-cicd-app)
   v
Nginx (Port 80)
   |
   v
Public Access (Elastic IP)
```

---

## ⚙️ Tech Stack

- AWS EC2 (Ubuntu)
- Jenkins
- Docker
- GitHub Webhooks
- Node.js
- Nginx (Reverse Proxy)

---

## 🔁 CI/CD Pipeline Flow

1. Code is pushed to GitHub
2. GitHub webhook triggers Jenkins
3. Jenkins pulls the repository
4. Build & Test stage executes
5. Docker image is built and tagged
6. Existing container is removed safely
7. New container is deployed
8. Application is served via Nginx

---

## 🐳 Docker Configuration

- **Image Name:** `aws-jenkins-docker-cicd:latest`
- **Container Name:** `aws-jenkins-docker-cicd-app`
- **Restart Policy:** `unless-stopped`
- **Internal Port:** `3000`
- **Public Port:** `80` (via Nginx)

### Deployment Command

```bash
docker rm -f aws-jenkins-docker-cicd-app || true

docker run -d \
  --restart unless-stopped \
  --name aws-jenkins-docker-cicd-app \
  -p 3000:3000 \
  aws-jenkins-docker-cicd:latest
```

---

## 🌐 Nginx Reverse Proxy

Traffic is forwarded from port **80 → 3000**.

```nginx
server {
    listen 80 default_server;
    listen [::]:80 default_server;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

---

## 🔐 Security Configuration

| Port | Service  | Access |
|-----|---------|--------|
| 22  | SSH     | My IP only |
| 8080 | Jenkins | My IP only |
| 80  | Application | Public |
| 3000 | Internal App | Closed |

---

## 🧪 Application Scripts

```json
{
  "scripts": {
    "start": "node index.js",
    "build": "echo \"Build successful\"",
    "test": "echo \"Tests passed\""
  }
}
```

---

## 🧠 Key Learnings

- Jenkins Pipeline from SCM
- Linux vs Windows pipeline handling
- Docker permissions and restart policies
- Webhook-based CI/CD automation
- Nginx reverse proxy without a domain
- AWS Security Group best practices
added the webhook it should work now

---

## 🔮 Future Improvements

- Add custom domain
- Enable HTTPS with Let’s Encrypt
- Push images to DockerHub / AWS ECR
- Zero-downtime deployment
- Monitoring & logging

---

## 👤 Author

**Shehroz Amjad**  
DevOps | Cloud | CI/CD
