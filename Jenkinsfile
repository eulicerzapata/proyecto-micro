pipeline {
    agent any

    stages {
        stage('Clonar el Repositorio'){
            steps {
                git branch: 'main', credentialsId: 'git-jenkins', url: 'https://github.com/eulicerzapata/proyecto-micro.git'
            }
        }
        stage('Construir imagen con Docker'){
            steps {
                script {
                    withCredentials([
                        string(credentialsId: 'MONGO_URI', variable: 'MONGO_URI')
                    ]) {
                        docker.build('proyectos-backend-micro:v1', '--build-arg MONGO_URI=${MONGO_URI} .')
                    }
                }
            }
        }
        stage('Desplegar contenedores Docker'){
            steps {
                script {
                    withCredentials([
                            string(credentialsId: 'MONGO_URI', variable: 'MONGO_URI')
                    ]) {
                        sh """
                            sed 's|\\${MONGO_URI}|${MONGO_URI}|g' docker-compose.yml > docker-compose-update.yml
                            docker-compose -f docker-compose-update.yml up -d
                        """
                    }
                }
            }
        }
    }

    post {
        always {
            emailext (
                subject: "Estado del build: ${currentBuild.currentResult}",
                body: "Se ha completado el build. Puede detallar en: ${env.BUILD_URL}",
                to: "eulicer.zapata@est.iudigital.edu.co","anyerson.velasquez@est.iudigital.edu.co",
                from: "pruebasConjenkins@iudigital.edu.co"
            )
        }
    }
}