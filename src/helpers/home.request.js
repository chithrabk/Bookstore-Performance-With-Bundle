import { check } from 'k6';
import http from 'k6/http';
const config = JSON.parse(open('../config/properties.json'));
import Utils from "../utils/apiPaths.js";

export default class Home{
    constructor(){
        this.params = {
            headers: {
                accept: config.acceptValue,
              },
          };
    }
    
    homePageRequest(){
        let utils = new Utils();        
        let res = http.get(utils.getBaseUrl()+utils.getHomePagePath(),this.params)
        console.log(res.status);
        check(res, {
            'is homePageRequest status 200': () => res.status===200
        })
    }

    
    
}