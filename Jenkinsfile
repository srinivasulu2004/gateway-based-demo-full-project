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
        stage('docker build and push') {
            steps {
                script{
                withDockerRegistry([credentialsId: 'dockerhub']) {
                    sh 'docker-compose build'
                    sh 'docker-compose push'
                    echo 'All images have built and pushed successfully'
                }
            }
        }
    }
        stage('deploy application') {
            steps {
                sh 'docker-compose -d'
            }
        }
    }
    post {
        success {
            mail to: "srinivasulubehara@gmail.com",
                 subject: "Regarding your ${APP_NAME} deployment status",
                 body: "Your application ${APP_NAME} has deployed successfully (PASS). SEE: ${BUILD_URL}"
        }
        failure {
            mail to: "srinivasulubehara@gmail.com",
                 subject: "Regarding your ${APP_NAME} deployment status",
                 body: "Your application ${APP_NAME} deployment failed (FAIL). SEE: ${BUILD_URL}"
        }
    }
}
