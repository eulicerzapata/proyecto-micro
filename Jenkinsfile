pipeline {
    agent any

    stage{
        stage('clonar el repo'){ 
            steps{
                git branch: 'main', credentialsId:'git-jenkis',url:'https://github.com/eulicerzapata/proyecto-micro.git'
            }
        }
        stage('construir imagen de Docker'){
            
            steps{
                withCredentials([
                    string(credentialsId: 'MONGO_URI', variable:'MONGO_URI' )
                ]){
                docker.build('proyectos-backend-micro:v1','--build-arg MONGO_URI=${MONGO_URI } .')
                }
            }
        }
        stage('desplegar contenedores'){
            steps{
                script{
                     withCredentials([
                    string(credentialsId: 'MONGO_URI', variable:'MONGO_URI' )
                ]){
                sh """
                    sed 's|\\${MONGO_URI}${MONGO_URI}|g' docker-compose.yml > docker-compose-ubdate.yml
                    docker-compose -f docker-compose-update.yml up -d
                    """
                }
                    
                }
            }
        }
    }

}