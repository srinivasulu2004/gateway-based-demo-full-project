pipeline {
    agent { label 'agent' }
    environment {
        APP_NAME = "my-demo-application"
        ARTIFACT_ZIP = ""  // Will set dynamically after artifact is zipped
    }
    stages {
        stage('checkout-code') {
            steps {
                git branch: 'master', url: 'https://github.com/srinivasulu2004/gateway-based-demo-full-project.git'
            }
        }
        stage('build artifact') {
            steps {
                // Install dependencies
                sh 'npm install'
                
                // Build production artifact
                sh 'npm run build'
                
                // Create ZIP file from build folder
                sh 'zip -r ${APP_NAME}.zip build/'
                
                // Set environment variable for ZIP
                script {
                    env.ARTIFACT_ZIP = "${APP_NAME}.zip"
                }
                
                // Archive the artifact in Jenkins
                archiveArtifacts artifacts: "${ARTIFACT_ZIP}", fingerprint: true
                
                echo "Artifact ${ARTIFACT_ZIP} built and archived successfully"
            }
        }
        stage('docker build and push') {
            steps {
                withDockerRegistry([credentialsId: 'dockerhub']) {
                    sh 'docker-compose build'
                    sh 'docker-compose push'
                    echo 'All images have built and pushed successfully'
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
                 body: "Your application ${APP_NAME} has deployed successfully (PASS). Artifact: ${ARTIFACT_ZIP}"
        }
        failure {
            mail to: "srinivasulubehara@gmail.com",
                 subject: "Regarding your ${APP_NAME} deployment status",
                 body: "Your application ${APP_NAME} deployment failed (FAIL). Artifact: ${ARTIFACT_ZIP}"
        }
    }
}
