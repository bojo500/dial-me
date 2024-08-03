pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "dial-me:${env.BUILD_ID}"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/bojo500/dial-me.git'
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    docker.build(DOCKER_IMAGE)
                }
            }
        }
        stage('Setup Env File') {
            steps {
                script {
                    def envFilePath = "${WORKSPACE}/.env"
                    if (!fileExists(envFilePath)) {
                        echo '.env file not found, creating an empty one'
                        sh 'touch .env' // or you might use another method to populate it
                    }
                }
            }
        }
        stage('Run Docker Compose') {
            steps {
                script {
                    sh 'docker-compose down'
                    sh "docker-compose --env-file ${WORKSPACE}/.env up -d --build"
                }
            }
        }
    }
    post {
        always {
            script {
                sh 'docker-compose down || true'
            }
        }
        success {
            echo "Build succeeded!"
        }
        failure {
            echo "Build failed!"
        }
    }
}
