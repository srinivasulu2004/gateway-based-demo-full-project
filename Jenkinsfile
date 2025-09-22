pipeline {
    agent { label 'agent' }
    environment {
        APP_NAME = "my-demo-application"
    }
    stages {
        stage('checkout-code') {
            steps {
                git branch: 'master', url: 'https://github.com/srinivasulu2004/gateway-based-demo-full-project.git'
            }
        }
        stage('build code') {
            steps {
                echo 'code built successfully'
            }
        }
        stage('docker build image and push') {
            steps {
                withDockerRegistry([credentialsId: 'dockerhub']) {
                    sh 'docker-compose build'
                    echo 'all images have built successfully'
                }
            }
        }
        stage('deploy application') {
            steps {
                sh 'docker-compose up -d'
            }
        }
    }
    post {
        success {
            mail to: "srinivasulubehara@gmail.com",
                 subject: "Regarding your ${APP_NAME} deployment status",
                 body: "your application ${APP_NAME} has deployed successfully (PASS)"
        }
        failure {
            mail to: "srinivasulubehara@gmail.com",
                 subject: "Regarding your ${APP_NAME} deployment status",
                 body: "your application ${APP_NAME} deployment (FAIL)"
        }
    }
}
