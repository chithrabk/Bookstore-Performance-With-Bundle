import { check } from "k6";
import http from "k6/http";
import Utils from "../utils/apiPaths.js";
import TestData from "../testData/testData.js";
const config = JSON.parse(open('../config/properties.json')); 

export default class BillingAddress{
    addAddressRequest(token){
        let params=  {
            headers: {
                "Accept": config.acceptValue,
                "Authorization": 'Bearer '+ token,
                'content-type': config.jsonType,
            },
          }
        // console.log(token)
        let utils = new Utils();
        let testData = new TestData();
        let addressPayload = testData.newBillingAddress(); 
        // console.log(addressPayload)      
        let response = http.post(utils.getBaseUrl()+utils.getAddAddressPath(),addressPayload,params)
       
        console.log(response.status)
        check(response,{
            'is status 201': () => response.status === 201,
        })
    }
    getAddressRequest(token){
        let params=  {
            headers: {
                "Accept": 'application/json, text/plain, */*',
                "Authorization": 'Bearer '+ token
            },
        }
        let utils = new Utils();        
        let response = http.get(utils.getBaseUrl()+utils.getAddressPath(),params)              
        var addressId = response.json()[0].addressId;
        // console.log(addressId);
    
        console.log(response.status)
        check(response,{
            'is status 200': () => response.status === 200,
        })
        return addressId
    }

}