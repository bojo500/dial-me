pipeline {
    agent any

    stages {
        stage('Test Docker') {
            steps {
                sh 'docker --version'
                sh 'docker-compose --version'
            }
        }
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/bojo500/dial-me.git'
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    def appImage = docker.build("dial-me:${env.BUILD_ID}")
                }
            }
        }
        stage('Run Docker Compose') {
            steps {
                script {
                    sh 'docker-compose down'
                    sh 'docker-compose up -d --build'
                }
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
