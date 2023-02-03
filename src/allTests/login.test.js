import { group } from "k6";
import SignUp from "../helpers/signup.request.js";
import Login from "../helpers/login.request.js";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";
import constant_arrival_scenario  from "../utils/scenarios.js";
import {stats}  from "../utils/scenarios.js";
import { generateReport } from "../report/report.js";

export function handleSummary(data){
    return generateReport(data, htmlReport, textSummary);
}

export let options={
    scenarios: constant_arrival_scenario(),
    summaryTrendStats: stats()
}

export default function(){
    let signup = new SignUp();
    let login = new Login();

    group('SignUp with new user details',() => {
        signup.signUpRequest();
    })
    group('Login with registered user',() => {
        login.loginRequest(signup.getLoginData());
    })
}
