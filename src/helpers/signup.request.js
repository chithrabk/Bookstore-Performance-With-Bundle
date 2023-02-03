
import http from "k6/http";
import { check } from "k6";
import Utils from "../utils/apiPaths.js";
import TestData from "../testData/testData.js";
const config = JSON.parse(open('../config/properties.json')); 

export default class SignUp{
    constructor(){
        this.params={
            headers: {
                'Accept': config.acceptValue,
                'Accept-Language': 'en-US,en;q=0.9,de-DE;q=0.8,de;q=0.7,ko;q=0.6,pt-BR;q=0.5,pt;q=0.4,fr-FR;q=0.3,fr;q=0.2,ja;q=0.1,zh-CN;q=0.1,zh;q=0.1,es;q=0.1',
                'Connection': 'keep-alive',
                'Content-Type': config.jsonType,
                'Origin': 'http://139.59.27.246:3000',
                'Referer': 'http://139.59.27.246:3000/',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36'
                
            },
        };
        this.email="";
        this.password="";
    }

    signUpRequest(){
        let testData = new TestData();
        let body= testData.newUserData();
        this.email= body.email;
        this.password = body.password;
        let utils = new Utils();
        let response = http.post(utils.getBaseUrl()+utils.getSignUpPath(),JSON.stringify(body),this.params)
        console.log(response.status)
        check(response,{
            'is signUpRequest status 201' : () => response.status === 201
        })
    }

    getLoginData(){
        let userName, password
        if (this.email==null) userName="chithra.b@gmail.com";
        if (this.password==null) password="chithra@10";
        let data = {
            grant_type:'password', 
            username:this.email,
            password:this.password
        }
        return data
    }
    
}