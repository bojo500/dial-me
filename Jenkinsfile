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
                    def appImage = docker.build("dial-me:${env.BUILD_ID}")
                }
            }
        }
        stage('Run Docker Compose') {
            steps {
                script {
                    sh 'sudo docker-compose down'
                    sh 'sudo docker-compose up -d --build'
                }
            }
        }
    }
    post {
        always {
            script {
                sh 'sudo docker-compose down'
            }
        }
    }
}
pipeline {
    agent any

    stages {
        stage('Test Docker') {
            steps {
                sh 'sudo docker --version'
                sh 'sudo docker-compose --version'
            }
        }
    }
}
