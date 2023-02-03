const config = JSON.parse(open('../config/properties.json')); 

export default class Utils {
    getBaseUrl() {
        return config.baseUrl;
    }

    getLoginPath(){
        return '/api/account/oauth/token';
    }

    getHomePagePath(){
        let page=Math.floor(Math.random() * 3),size=8 
        return '/api/catalog/products?page='+page+'&size='+size;
    }

    getProductDetailsPagePath(){
        return '/api/catalog/product/1';
    }

    getProductReviewPagePath(productId){
        return '/api/catalog/review?productId='+productId;
    }

    getSignUpPath(){
        return '/api/account/signup';
    }

    getCartItemPath(){
        return '/api/order/cart/cartItem';
    }

    getAddAddressPath(){
        return '/api/billing/address';
    }

    getAddressPath(){
        return '/api/billing/address';
    }

    getPaymentMethodPath(){
        return '/api/payment/paymentMethod';
    }

    getOrderPath(){
        return '/api/order/order';
    }
  }