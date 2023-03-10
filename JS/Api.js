//Obtener formulario 
const form = document.getElementById("form");

//Obtener barra de busqueda
const search = document.getElementById("search");

// Obtener el widget del usuario
const  userCard = document.getElementById("usercard"); 

//Escuchar el evento submit del form
form.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const username = search.value
    getUserData(username);
    search.value = ""
})

// Obtener la informacion del usuario en GitHub
async function getUserData(username) {
    const API = "https://api.github.com/users/"

    try {
        const userRequest = await fetch(API + username)

        if (!userRequest.ok) {
            throw new Error(userRequest.status)

        }

        const userData = await userRequest.json()

        if (userData.public_repos) {
            const reposRequest = await fetch(API + username + "/repos")
            const reposData = await reposRequest.json();
            userData.repos = reposData
        }
        showUserDate(userData);

    }

    catch (error) {
        showError(error.message);
    }


}

//funcion para componer e hidratar el HTML del Widget
function showUserDate(userData) {
    let userContent = `

   
   <img src="${userData.avatar_url}" alt="avatar">
   <h1>${userData.name}</h1>
   <p></p>

   <section class="data">
     <ul>
       <li>${userData.followers} seguidores</li>
       <li>${userData.following} seguindo</li>
       <li> ${userData.public_repos} repositorio</li>

     </ul>
   </section>


     

   `;

   if (userData.repos){
    userContent += `<section class="repos">`

    userData.repos.slice(0, 7).forEach(repo => {
        userContent += `<a href="${repo.html_url}" target=" _blank">${repo.name}</a>`
    });

    userContent += `</section>`;
   }
   
   userCard.innerHTML = userContent;
}

//Funcion para gestionar los errores
function showError(error) {
const errorContent = `<h1>Error ${error} 😔 Usuario no encontrado</h1>`
userCard.innerHTML = errorContent

}