pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/bojo500/dial-me.git'
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    def appImage = docker.build("dial-me")
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
