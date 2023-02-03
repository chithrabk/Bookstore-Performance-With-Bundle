import { check } from 'k6';
import http from 'k6/http';
const config = JSON.parse(open('../config/properties.json')); 
import Utils from "../utils/apiPaths.js";

export default class Product{
    constructor(){
        this.params = {
            headers: {
                accept: config.acceptValue,
              },
          };
    }
    
    productDetailsRequest(){
        let utils = new Utils();        
        let res = http.get(utils.getBaseUrl()+utils.getProductDetailsPagePath(),this.params)
        console.log(res.status);
        check(res, {
            'is productDetailsRequest status 200': () => res.status===200
        })
    }   
    
    productReviewRequest(){
        let utils = new Utils(); 
        let productId=1;        
        let res = http.get(utils.getBaseUrl()+utils.getProductReviewPagePath(productId),this.params)
        console.log(res.status);
        check(res, {
            'is productReviewRequest status 200': () => res.status===200
        })
    }
}