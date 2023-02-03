import { check } from "k6";
import http from "k6/http";
import Utils from "../utils/apiPaths.js";
import TestData from "../testData/testData.js";
const config = JSON.parse(open('../config/properties.json')); 

export default class Order{
    createOrderRequest(token, addressId, paymentId){
        let params=  {
            headers: {
                "Accept": config.acceptValue,
                "Authorization": 'Bearer '+ token,
                'content-type': config.jsonType,
            },
          }
        let utils = new Utils();
        let testData = new TestData();
        let orderDetailsPayload = testData.orderDetails(addressId, paymentId);
        let response = http.post(utils.getBaseUrl()+utils.getOrderPath(),orderDetailsPayload,params)
        // console.log(response.json())
        console.log(response.status)
        check(response,{
            'is status 200': () => response.status === 200,
        })
    }
}