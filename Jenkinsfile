pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://your-repository-url.git'
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    def appImage = docker.build("your-app-image-name")
                }
            }
        }
        stage('Run Docker Compose') {
            steps {
                sh 'docker-compose down'
                sh 'docker-compose up -d --build'
            }
        }
    }
    post {
        always {
            script {
                sh 'docker-compose down'
            }
        }
    }
}
