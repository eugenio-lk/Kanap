let products = [];
getProduct();
//displayTotQtd();

let total = 0;
let quantite = 0;
  
const sectionCart = document.getElementsByClassName('cart'); 
const ticketsContainer = document.getElementById('cart__items');


products.forEach((product , index) => {
  
  console.log(product.id);
  console.log(product.price);

  
  
  const articleCartItem = document.createElement('article');
  articleCartItem.classList.add('cart__item');
  articleCartItem.setAttribute('data-id', `${product.id}`);
  articleCartItem.setAttribute('data-color', `${product.color}`);
  ticketsContainer.appendChild(articleCartItem);

  const divImg = document.createElement('div');
  divImg.classList.add('cart__item__img');
  articleCartItem.appendChild(divImg);

  const addImage = document.createElement('img');
  addImage.setAttribute('src', `${product.imageUrl}`);
  divImg.appendChild(addImage);

  const descripDiv = document.createElement('div');
  descripDiv.classList.add('cart__item__content');
  articleCartItem.appendChild(descripDiv);
  
  const contentDescrip = document.createElement('div');
  contentDescrip.classList.add('cart__item__content__description');
  descripDiv.appendChild(contentDescrip);

  const titleProduct = document.createElement('h2');
  titleProduct.innerHTML = product.name;
  contentDescrip.appendChild(titleProduct);

  const descrip = document.createElement('p');
  descrip.innerHTML = product.description;
  contentDescrip.appendChild(descrip);

  const price = document.createElement('p');
  price.innerHTML = product.price + ' €';
  contentDescrip.appendChild(price);

  const colorProduct = document.createElement('p');
  colorProduct.innerHTML = 'Couleur : ' + product.color;
  contentDescrip.appendChild(colorProduct);

  const contentSettings = document.createElement('div');
  contentSettings.classList.add('cart__item__content__settings');
  descripDiv.appendChild(contentSettings);

  const settingQuantity = document.createElement('div');
  settingQuantity.classList.add('cart__item__content__settings__quantity');
  contentSettings.appendChild(settingQuantity);

  const qte = document.createElement('p');
  qte.innerHTML = 'Qté :';
  settingQuantity.appendChild(qte);

  const input = document.createElement('input');
  input.min= "1";
  input.max="100";
  input.setAttribute('type', 'number','name', 'min','max', 'value');
  input.classList.add('itemQuantity');
  input.value = product.quantity;
  input.addEventListener("input", () => UpdatePriceAndQty(product.id , input.value , product) );
  settingQuantity.appendChild(input);

  const settingsDelete = document.createElement('div');
  settingsDelete.classList.add('cart__item__content__settings__delete');
  contentSettings.appendChild(settingsDelete);

  const deleteItem = document.createElement('p');
  deleteItem.classList.add('deleteItem');
  deleteItem.addEventListener('click', () => deleteItems(product , index));
  deleteItem.innerHTML = 'Supprimer';
  settingsDelete.appendChild(deleteItem);
});

const cartPrice = document.createElement('div');
cartPrice.classList.add('cart__price');
ticketsContainer.appendChild(cartPrice);

const totalCart = document.createElement('p');
cartPrice.classList.add('cart__toto');
totalCart.innerHTML = 'Total  ';
cartPrice.appendChild(totalCart);

const spanQtd = document.createElement("span")
spanQtd.setAttribute("id", "totalQuantity");
totalCart.appendChild(spanQtd);

const spanPrice = document.createElement("span")
spanPrice.setAttribute("id", "totalPrice");
totalCart.appendChild(spanPrice);

displayTotQtd();
displayTotPrice();


function displayTotQtd(){

      const totalQtd = document.querySelector("#totalQuantity");
      const totoQtd = products.reduce((total , product) => total + Number(product.quantity) , 0);
      totalQtd.innerHTML = ' (' + totoQtd + ' Articles )  ' ;
  }

function displayTotPrice(){ 

    const totalPrice = document.querySelector("#totalPrice");
    const totoPrice = products.reduce((total , product) => total + product.price * product.quantity , 0);
    totalPrice.innerHTML = ' : ' + totoPrice + ' € ' ;
    
}


function UpdatePriceAndQty(id , newValue , product){

  const productToUpdate = products.find((product) => product.id === id);
  productToUpdate.quantity = Number(newValue);

  displayTotPrice();
  displayTotQtd();
}


function DeleteFromCache(product) {

  const dataToSave = JSON.stringify(product);
  const key = `${product.id}-${product.color}`;
  console.log('le key suprimer' , key);
  localStorage.setItem(key ,dataToSave);


}

function saveProducts() {
  for (let i = 0; i < localStorage.length; i++) {
    if (
      products.id ==
      localStorage.getItem(
        localStorage.key(i).id &&
          products.color == localStorage.getItem(localStorage.key(i).color)
      )
    ) {
      console.log('le produit existe');
      let total = products.quantity;
      console.log(total);
    } else {
      console.log('le produit nexiste pas');
    }
  }
}


function deleteItems(product , index){

products.splice(index, 1);

console.log(index);

displayTotPrice();
displayTotQtd();
saveTickets();
DeleteArticleFromePage(product);

location.reload();
}

function DeleteArticleFromePage(product) {

  const articleToDelete = document.querySelector(
    `article[data-id="${product.id}"][data-color="${product.color}"]`
    );
  //console.log(' suppp cette  ', articleToDelete);
  articleToDelete.remove();

  
  
}

function saveTickets() {

	const stringifiedTickets = JSON.stringify(products);
	localStorage.setItem('products', stringifiedTickets);

}


function getProduct() {
  const ticketsFromLocal = localStorage.getItem('products');
  const parsedTickets = JSON.parse(ticketsFromLocal);

  if (parsedTickets) {
    products = parsedTickets;
  } else {
    products = [];
  }
}

let validation = document.getElementById('order');

let prenom = document.getElementById('firstName');
let nom = document.getElementById('lastName');
let adresse = document.getElementById('address')
let ville = document.getElementById('city');
let email = document.getElementById('email');

let firstNameErrorMsg = document.getElementById('firstNameErrorMsg');
let lastNameErrorMsg = document.getElementById('lastNameErrorMsg');
let addressErrorMsg =  document.getElementById('addressErrorMsg');
let cityErrorMsg = document.getElementById('cityErrorMsg');
let emailErrorMsg = document.getElementById('emailErrorMsg');


let prenomValidation = /^[a-z]+$/;
let mailValidation = /#^[a-z0-9.-]+@[a-z0-9.-]{2,}.[a-z]{2,4}$#/;





validation.addEventListener('click', (e) => SubmitForm(e));

  

  function SubmitForm(e){

    e.preventDefault();

     


                                                
            if(products.length == 0){

              alert('remplissez le panier svp');
              return 
            } 

            if(isFormInvalid() === true){
              return;
              
            } 
            if(isMailInvalid() === true){
              return;
              
            } 
            if(isFirstNameInvalid() === true){
              return;
              
            } 
            if(isLastNameNameInvalid() === true){
              return;
              
            } 
            if(isCityInvalid() === true){
              return;
              
            } 

            


            const body = makeRequestBody();
            fetch('http://127.0.0.1:3000/api/products/order', {

            method: "POST",
            body: JSON.stringify(body),
            headers: {

              'Content-Type': 'application/json'
            }
          


            }).then((res) => res.json())
            .then((data) => { 
              console.log(data)
              const orderId =  data.orderId;
              window.location.href = "confirmation.html" + "?orderId=" + orderId ;
              return console.log(data);
            })
            .catch((err) => console.log(err));
            
            
          





                                                                  





    }

    function isFormInvalid() {

      const form = document.querySelector('.cart__order__form');
      const inputs = form.querySelectorAll('input');
      console.log(inputs);

      for (let i = 0; i < inputs.length; i++) {
        if(!inputs[i].value){
              

          alert("veilliez remplire les champs svp" );
          return true ;


        }
        return false ;
      }
      
    }





    function isMailInvalid() {

      const email = document.querySelector('#email').value;
      const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;

      //console.log(regex.test(email));
        if(regex.test(email) === false){
              
          
          alert("veilliez remplire le champ email correctement svp" );
          return true ;


        }
        return false ;
      
      
    }

    function isFirstNameInvalid() {

      const firstname = document.querySelector('#firstName').value;
      const regex = /^[ a-zA-Z\-\']+$/;

        if(regex.test(firstname) === false){
              
          
          alert("veilliez remplire le champ prenom correctement svp");
          return true ;


        }
        return false ;
      
      
    }

    function isLastNameNameInvalid() {

      const lastname = document.querySelector('#lastName').value;
      const regex = /^[ a-zA-Z\-\']+$/;

        if(regex.test(lastname) === false){
              
          
          alert("veilliez remplire le champ nom correctement svp");
          return true ;


        }
        return false ;
      
      
    }

    function isCityInvalid() {

      const city = document.querySelector('#city').value;
      const regex = /^[ a-zA-Z\-\']+$/;

        if(regex.test(city) === false){
              
          
          alert("veilliez remplire le champ ville correctement svp");
          return true ;


        }
        return false ;
      
      
    }


    function makeRequestBody() {
      const form = document.querySelector('.cart__order__form');
      const firstName = form.elements.firstName.value ;
      const lastName = form.elements.lastName.value ;
      const address = form.elements.address.value ;
      const city = form.elements.city.value ;
      const email = form.elements.email.value ;


      const body = { 
       contact: {
         firstName: firstName,
         lastName: lastName,
         address: address,
         city: city,
         email: email
       },
       products: getIdsFromCache() 
      
      }
      return body;
    }

function getIdsFromCache() {

   const numberOfProduct = products.length;
   const ids = [] ;

   for (let i = 0; i < numberOfProduct; i++) {

       const key = products[i].id;
       ids.push(key);
        
   }
   return ids ;  
  
}





