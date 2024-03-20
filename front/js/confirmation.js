const orderId = getOderId() ;
displayOrder(orderId);
removeAllCache();

function getOderId() {

        const queryString = window.location.search ;
        const UrlParams = new URLSearchParams(queryString);
        return  UrlParams.get("orderId");
}



function displayOrder(orderId) {
    
    const orderElement = document.getElementById('orderId');
    orderElement.textContent = orderId;
    
}

function removeAllCache() {

    const cache = window.localStorage ;

    cache.clear();
    
}