// on déclare un tableau product
let products = [];

// On déclare la fonction
getProduct();

// On cherche à recuperer l'id dans l'url de la page web
const params = new URL(document.location).searchParams;
const id = params.get('id');

const url = `http://localhost:3000/api/products/${id}`;

// ici on récup les données de l'article de l'url
const getArticles = () => {
  fetch(url)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      //console.log(data);
      const addTitle = (document.getElementById('title').innerHTML = data.name);
      const addPrice = (document.getElementById('price').innerHTML =
        data.price);
      const addDescription = (document.getElementById('description').innerHTML =
        data.description);

      const addImage = document.createElement('img');
      document.querySelector('.item__img').appendChild(addImage);
      addImage.setAttribute('src', `${data.imageUrl}`);
      addImage.setAttribute('id', `imgkanap`);
      const addColors = document.getElementById('colors');
      for (color in data.colors) {
        addColors.innerHTML += `<option value="${data.colors[color]}">${data.colors[color]}</option>`;
      }
    });
};

const addToCart = document.getElementById('addToCart');
addToCart.addEventListener('click', () => {
  let color = document.getElementById('colors').value;
  let number = document.getElementById('quantity').value;
  if (color == 'choix_nul') {
    alert('Veuillez choisir la couleur.');
  } else if (number < 1) {
    alert('Veuillez choisir le nombre de canapé souhaité.');
  } else if (number > 100) {
    alert('La capacité maximum de canapé est de 100.');
  } else {
    alert('Le produit à bien été ajouté au panier.');

     const addProduct = {
      quantity: document.getElementById('quantity').value,
      color: document.getElementById('colors').value,
      id: id,
      name: document.getElementById('title').innerHTML,
      imageUrl: document.getElementById('imgkanap').src,
  
      description: description.innerHTML,
      price: price.innerHTML,
  }

      console.log('Nouveau ticket :', addProduct);

      // push le nouveau produit dans l'array
      products.push(addProduct);

      console.log('Liste des tickets :', products);

      UpdateQuantity(addProduct);
      saveProducts(); 
      }
   
  


});

function UpdateQuantity(newProduct) {
  if (products.length <= 1) {
  } else
    for (let i = 0; i < products.length - 1; i++) {
      if (
        newProduct.id == products[i].id &&
        newProduct.color == products[i].color
      ) {

        let total =  parseInt(newProduct.quantity) + parseInt(products[i].quantity);
        console.log(total);
        if(total > 100){
          products[i].quantity = 100;
        }else{
          products[i].quantity = total;
        }
        
        

        products.pop(); // Supprimer la derniere valeur d'un tableau
        console.log(products);
      } else {
        console.log('pas ajouter');
      }
    }
}

function saveProducts() {
  const stringifiedTickets = JSON.stringify(products);
  localStorage.setItem('products', stringifiedTickets);
}

function getProduct() {
  const ticketsFromLocal = localStorage.getItem('products');
  const parsedTickets = JSON.parse(ticketsFromLocal);

  // Si le produit est vide on l'enregistre pas.
  if (parsedTickets) {
    // if parsedTickets !== null/undefined/false
    products = parsedTickets;
  } else {
    products = [];
  }
}



getArticles();
