import { check } from "k6";
import http from "k6/http";
import Utils from "../utils/apiPaths.js";
const config = JSON.parse(open('../config/properties.json')); 

export default class Login{
    constructor(){
        this.params={
            headers: {
                accept: config.acceptValue,
                authorization: config.basicToken,
                'content-type': config.urlEncodedType,
            },
        };
        this.token = "";
    }

    loginRequest(body){
        // console.log(body)
        let utils = new Utils();
        let response = http.post(utils.getBaseUrl()+utils.getLoginPath(),body,this.params)
        this.token = response.json('access_token')
        // console.log(this.token)
        console.log(response.status)
        check(response,{
            'is status 200': () => response.status === 200,
        })
        return this.token
    }

    getToken() {
        return this.token;
    }
}