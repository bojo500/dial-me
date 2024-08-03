pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "dial-me:${env.BUILD_ID}"
        ENV_FILE_PATH = '/path/to/your/.env'
        WORKSPACE_ENV_FILE = "${WORKSPACE}/.env"
    }

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
        stage('Build Application') {
            when {
                branch 'main'
            }
            steps {
                echo 'Building the application...'
                sh 'rm -rf ./node_modules ./package-lock.json ./dist'
                sh 'scp -o StrictHostKeyChecking=no -r ./* deploy@127.0.0.1:/var/www/mo.com/' // upload new content
                sh 'ssh -o StrictHostKeyChecking=no deploy@127.0.0.1 "cd /var/www/mo.com && rm -rf node_modules package-lock.json && npm install && npm run build"'
            }
        }
        stage('Copy .env') {
            steps {
                sh "cp ${ENV_FILE_PATH} ${WORKSPACE_ENV_FILE}"
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    def appImage = docker.build(DOCKER_IMAGE)
                }
            }
        }
        stage('Run Docker Compose') {
            steps {
                script {
                    sh 'docker-compose down'
                    sh "docker-compose --env-file ${WORKSPACE_ENV_FILE} up -d --build"
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
        success {
            discordSend description: "**Build:** [${currentBuild.id}](${env.BUILD_URL})\n**Status:** [${currentBuild.currentResult}](${env.BUILD_URL})", footer: 'Dial Me Jenkins', link: env.BUILD_URL, successful: true, title: "${env.JOB_NAME} #${currentBuild.id}", webhookURL: 'https://discord.com/api/webhooks/1269246128486879252/xRrmbK9383xkCZ56A1DA1qWZ8S7WICIzVEDRK1GtLcENuvQ1pP7zThHXa3TUmsXV1LiV'
        }
        failure {
            discordSend description: "**Build:** [${currentBuild.id}](${env.BUILD_URL})\n**Status:** [${currentBuild.currentResult}](${env.BUILD_URL})", footer: 'Dial Me Jenkins', link: env.BUILD_URL, successful: false, title: "${env.JOB_NAME} #${currentBuild.id}", webhookURL: 'https://discord.com/api/webhooks/1269246128486879252/xRrmbK9383xkCZ56A1DA1qWZ8S7WICIzVEDRK1GtLcENuvQ1pP7zThHXa3TUmsXV1LiV'

