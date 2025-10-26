pipeline {
  agent any

  environment {
    REGISTRY = "rohansaini1512"              //  Docker Hub username
    IMAGE_NAME = "finc"                      //  app name
    IMAGE_TAG = "${env.BUILD_NUMBER}"        //  build number as tag
    DOCKER_CRED = "dockerhub-cred"           //  Jenkins credential ID for Docker Hub
    KUBE_CRED = "kubeconfig"                 //  Jenkins credential ID for Kubernetes config
  }

  stages {
    stage('Checkout Code') {
      steps {
        checkout scm
      }
    }

    stage('Install Dependencies & Test') {
      steps {
        sh 'npm ci'
        sh 'npm test'
      }
    }

    stage('Build & Push Docker Image') {
      steps {
        script {
          docker.withRegistry("https://index.docker.io/v1/", "${DOCKER_CRED}") {
            def app = docker.build("${REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG}")
            app.push()
            app.push("latest")
          }
        }
      }
    }

    stage('Deploy to Kubernetes') {
      steps {
        withCredentials([file(credentialsId: "${KUBE_CRED}", variable: 'KUBECONFIG_FILE')]) {
          sh '''
            export KUBECONFIG=${KUBECONFIG_FILE}
            # If deployment exists, update image. Otherwise, apply all manifests.
            kubectl set image deployment/nodejs-app nodejs-app=${REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG} --record || kubectl apply -f k8s/
            kubectl rollout status deployment/nodejs-app --timeout=120s
          '''
        }
      }
    }
  }

  post {
    success {
      echo " Deployment successful: ${IMAGE_TAG}"
    }
    failure {
      echo " Build or Deployment failed!"
    }
  }
}
