pipeline {
    agent any

    environment {
        NODE_VERSION = '18'
        DOCKER_IMAGE = 'scraper-service:latest'
        DOCKER_HUB_REPO = 'sweetmnstr/scraper-service'
        COMPOSE_PATH = '/home/sweetmnstr/ci-cd/thesis'
        COMPOSE_FILE = 'core-be-docker-compose.yml'
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
                sh '''
                docker build -t ${DOCKER_IMAGE} .
                '''
            }
        }

        stage('Login to Docker Hub') {
            steps {
                withCredentials([string(credentialsId: 'docker-hub-token', variable: 'DOCKER_TOKEN')]) {
                    sh 'echo $DOCKER_TOKEN | docker login -u your-dockerhub-username --password-stdin'
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                sh '''
                docker tag ${DOCKER_IMAGE} ${DOCKER_HUB_REPO}:latest
                docker push ${DOCKER_HUB_REPO}:latest
                '''
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                cd ${COMPOSE_PATH} &&
                docker-compose -f ${COMPOSE_FILE} pull &&
                docker-compose -f ${COMPOSE_FILE} down &&
                docker-compose -f ${COMPOSE_FILE} up -d
                '''
            }
        }
    }
}