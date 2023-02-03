import { SharedArray } from 'k6/data';

const state = new SharedArray("states", function() {
  return JSON.parse(open('../src/testData/testdata.json')).states;
});

export default class TestData{
    newUserData(){   
      const dateTime = Math.random();
      let data = {
        "grant_type":"password",
        "userName":"user"+dateTime,
        "firstName":"fname"+dateTime,
        "email": "user"+dateTime+"@ghd.sj",
        "password": "password"
      };
      return data 
    }

    newBillingAddress(){
      let randomAddress= Math.random().toString(36).substring(2,7);      
      let address = '{"addressLine1":"'+randomAddress+'","addressLine2":"'+randomAddress+'","city":"gdsgaj","state":"'+state[Math.floor(Math.random() * state.length)]+'","postalCode":"234567","country":"IN","phone":"123456789"}';
      return address
    }

    cartDetails(){
      return '{"productId":"'+ (Math.floor(Math.random() * 8)+1)+'","quantity":'+(Math.floor(Math.random() * 10)+1)+'}'
    }

    newCardDetails(){
      return '{"card":{"cardNumber":"4111 1111 1111 1111","expirationMonth":"10","expirationYear":"23","cvv":"123"}}';
    }

    orderDetails(addressId, paymentId){
      return '{"billingAddressId":"'+addressId+'","shippingAddressId":"'+addressId+'","paymentMethodId":"'+paymentId+'"}'
    }
}
