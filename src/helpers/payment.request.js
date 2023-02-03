import { check } from "k6";
import http from "k6/http";
import Utils from "../utils/apiPaths.js";
import TestData from "../testData/testData.js";
const config = JSON.parse(open('../config/properties.json')); 

export default class Payement{
    addPaymentMethodRequest(token){
        let params=  {
            headers: {
                "Accept": config.acceptValue,
                "Authorization": 'Bearer '+ token,
                'content-type': config.jsonType,
            },
          }
        let utils = new Utils();
        let testData = new TestData();
        let cardDetailsPayload = testData.newCardDetails();
        let response = http.post(utils.getBaseUrl()+utils.getPaymentMethodPath(),cardDetailsPayload,params)
       
        console.log(response.status)
        check(response,{
            'is status 201': () => response.status === 201,
        })
    }
    getPaymentMethodRequest(token){
        let params=  {
            headers: {
                "Accept": 'application/json, text/plain, */*',
                "Authorization": 'Bearer '+ token
            },
        }
        let utils = new Utils();        
        let response = http.get(utils.getBaseUrl()+utils.getPaymentMethodPath(),params)              
        var paymentMethodId = response.json()[0].paymentMethodId;
        console.log(paymentMethodId);
    
        console.log(response.status)
        check(response,{
            'is status 200': () => response.status === 200,
        })
        return paymentMethodId
    }

}