pipeline {
    agent any

    environment {
        IMAGE_NAME = "ci-cd-demo"
        CONTAINER_NAME = "ci-cd-demo-app"
        APP_PORT = "3000"
    }

    stages {
        stage('Build & Test') {
            steps {
                sh '''
                    docker run --rm \
                      -v "$WORKSPACE":/app \
                      -w /app \
                      node:18-alpine \
                      sh -c "npm install && npm run build && npm run test"
                '''
            }
        }

        stage('Docker Build') {
            steps {
                sh '''
                    docker build -t ${IMAGE_NAME}:${BUILD_NUMBER} .
                    docker tag ${IMAGE_NAME}:${BUILD_NUMBER} ${IMAGE_NAME}:latest
                '''
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                    docker rm -f ${CONTAINER_NAME} || true
                    docker run -d --restart unless-stopped \
                      --name ${CONTAINER_NAME} \
                      -p ${APP_PORT}:${APP_PORT} \
                      ${IMAGE_NAME}:latest

                    docker ps --filter "name=${CONTAINER_NAME}"
                '''
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully'
        }
        failure {
            echo 'Pipeline failed'
        }
        always {
            sh 'docker ps -a || true'
        }
    }
}