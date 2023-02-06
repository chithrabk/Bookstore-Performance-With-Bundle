pipeline {
    agent any
    stages {
        stage('Performance Testing') {
            steps {
                echo 'Installing k6'
                shell 'sudo chmod +x setup_k6.sh'
                shell 'sudo ./setup_k6.sh'
                echo 'Running K6 performance tests...'
                shell 'k6 run src/allTests/orderFlow.test.js '                
            }
        }
    }
}
