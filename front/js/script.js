let url = `http://localhost:3000/api/products`;

fetch(url)
  .then((response) =>
    response.json().then((data) => {
      let affichage = '';
      for (let canape of data) {
        affichage += `<a href="./product.html?id=${canape._id}">
          <article>
              <img src="${canape.imageUrl}" alt ="${canape.altTxt}"/>
              <h3>${canape.name}</h3>
              <p>${canape.description}</p>
          </article>

        </a>`;
      }
      document.querySelector('#items').innerHTML = affichage;
    })
  )
  .catch((err) => console.log('Erreur : ' + err));
