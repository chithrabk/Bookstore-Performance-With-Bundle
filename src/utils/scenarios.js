export default function constant_arrival_scenario(){
    let scenarios={
        constant_arrival_scenario: {
            executor: "constant-arrival-rate",
            rate: 2,
            duration: "20s",
            preAllocatedVUs: 2,
            maxVUs:2
        }
    }
    return scenarios
}

export function stats(){
    var arr = []
    arr.push("avg","min", "max", "p(95)", "p(99)");
    return arr
    
}