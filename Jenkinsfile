pipeline {
    agent any

    stages {
        stage('Test Docker') {
            steps {
                // Print Docker and Docker Compose versions
                sh 'docker --version'
                sh 'docker-compose --version'
            }
        }
        stage('Checkout') {
            steps {
                // Clone the repository
                git branch: 'main', url: 'https://github.com/bojo500/dial-me.git'
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    // Build Docker image with a tag using the build ID
                    def appImage = docker.build("dial-me:${env.BUILD_ID}")
                }
            }
        }
        stage('Run Docker Compose') {
            steps {
                script {
                    // Stop and remove existing containers, then start new ones
                    sh 'docker-compose down'
                    sh 'docker-compose up -d --build'
                }
            }
        }
    }
    post {
        always {
            script {
                // Ensure Docker Compose is brought down after the pipeline completes
                sh 'docker-compose down'
            }
        }
    }
}
