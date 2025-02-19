pipeline {
    agent any

    environment {
        NODEJS_VERSION = '18'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/volodymyr-stishkovskyi-bachelor-thesis/scraper-service.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    def nodejs = tool name: 'NodeJS', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
                    env.PATH = "${nodejs}/bin:${env.PATH}"
                }
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t scraper-service:latest .'
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                    cd /home/sweetmnstr/ci-cd &&
                    docker-compose down &&
                    docker-compose up -d
                '''
            }
        }
    }
}