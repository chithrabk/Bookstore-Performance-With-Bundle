import { group } from "k6";
import BillingAddress from "../helpers/billingAddress.request.js";
import Cart from "../helpers/cart.request.js";
import Login from "../helpers/login.request.js";
import Order from "../helpers/order.request.js";
import Payement from "../helpers/payment.request.js";
import SignUp from "../helpers/signup.request.js";
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
    let login = new Login();
    let signup = new SignUp();
    let cart = new Cart();
    let billing = new BillingAddress();
    let payment = new Payement();
    let order = new Order();
    let token, addressId, paymentId

    group('SignUp with new user details',() => {
        signup.signUpRequest();
    })
    group('Login with registered user',() => {
        token = login.loginRequest(signup.getLoginData());
        console.log(token)
    })
    group('Add to cart request',() => {
        cart.addToCartRequest(token);
    })

    group('Add address request',() => {
        billing.addAddressRequest(token);
    })

    group('Get Address request', () =>{
        addressId = billing.getAddressRequest(token)
    })

    group('Add payment method request',() => {
        payment.addPaymentMethodRequest(token);
    })

    group('Get payment method request', () => {
        paymentId = payment.getPaymentMethodRequest(token)
    })

    group('Create order request', () => {
        order.createOrderRequest(token,addressId,paymentId)
    })
    
}
