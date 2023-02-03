pipeline {
    agent any
    stages {
        stage('Performance Testing') {
            steps {
                echo 'Installing k6'
                if(isUnix()) {
                    sh 'sudo chmod +x setup_k6.sh'
                    sh 'sudo ./setup_k6.sh'
                }
                else {
                    bat 'sudo chmod +x setup_k6.sh'
                    bat 'sudo ./setup_k6.sh'
                }
                echo 'Running K6 performance tests...'
                if(isUnix()) sh 'k6 src/allTests/orderFlow.test.js '
                else bat 'k6 src/allTests/orderFlow.test.js '
            }
        }
    }
}
