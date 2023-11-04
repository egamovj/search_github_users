const GITHUB_API_URL = 'https://api.github.com/users';
const loading = document.querySelector('.loading');
const notFoundMessage = document.querySelector('.notFoundMessage');
const searchInput = document.getElementById('searchInput');
const form = document.getElementById('form');
const userWrapper = document.getElementById('usersContainer');
const token = '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'
const data = fetch(GITHUB_API_URL, {
    method: 'GET',
    headers: {
        'Authorization': `token ${token}`,
        'X-GitHub-Api-Version': '2022-11-28'
    }
})
async function getData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

form.addEventListener('submit', async(event) => {
    event.preventDefault();
    const searchValue = searchInput.value.trim().toLowerCase();
    const users = await getData(`${GITHUB_API_URL}/${searchValue}`);

    renderUsers([users]);

    form.reset();
});

function renderUsers(usersData) {
    console.log(usersData);
    userWrapper.innerHTML = '';
    let found = false;
    usersData.forEach((user) => {
        const { login, avatar_url, id, type, html_url } = user;
        const fragment = new DocumentFragment();
        const userCard = document.createElement('div');
        userCard.classList.add('card');

        const image = document.createElement('img');
        image.src = avatar_url;
        userCard.appendChild(image);

        const idUser = document.createElement('h3');
        idUser.textContent = `User id: ${id}`;
        userCard.appendChild(idUser);

        const loginUser = document.createElement('h3');
        loginUser.textContent = `User login: ${login}`;
        userCard.appendChild(loginUser);

        const typeUser = document.createElement('h3');
        typeUser.textContent = `Type: ${type}`;
        userCard.appendChild(typeUser);

        const profileLink = document.createElement('a');
        profileLink.href = html_url;
        profileLink.textContent = 'View GitHub profile';
        userCard.appendChild(profileLink);

        fragment.appendChild(userCard);
        userWrapper.appendChild(fragment);
        found = true;


    });
    loading.style.display = 'none';
    if (!found) {
        notFoundMessage.style.display = 'block';
    } else {
        notFoundMessage.style.display = 'none';
    }
}

getData(GITHUB_API_URL).then((data) => renderUsers(data));