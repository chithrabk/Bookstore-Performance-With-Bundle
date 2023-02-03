import { group } from "k6";
import Product from "../helpers/product.request.js";
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
    let product = new Product();

    group('Product details page request',() => {
        product.productDetailsRequest();
    })

    group('Product Review request',() => {
        product.productReviewRequest();
    })
}