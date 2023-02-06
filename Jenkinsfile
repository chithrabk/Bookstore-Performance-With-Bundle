pipeline {
    agent any
    stages {
        stage('Performance Testing') {
            steps {
                echo 'Installing k6'
                dos2unix 'sudo chmod +x setup_k6.sh'
                dos2unix 'sudo ./setup_k6.sh'
                echo 'Running K6 performance tests...'
                dos2unix 'k6 src/allTests/orderFlow.test.js '                
            }
        }
    }
}
