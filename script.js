const gameGrid = document.getElementById('gameGrid');
const searchInput = document.getElementById('searchInput');
let gameList = [];

// Best API for 1000+ Games (GameDistribution)
const API_URL = 'https://catalog.api.gamedistribution.com/api/v2/site/collection/all/?format=json&limit=100';

async function getGames() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        gameList = data;
        renderGames(gameList);
    } catch (err) {
        gameGrid.innerHTML = `<p style="color:gold;">Error loading games. Please refresh!</p>`;
    }
}

function renderGames(games) {
    gameGrid.innerHTML = '';
    games.forEach(game => {
        const card = document.createElement('div');
        card.className = 'game-card';
        // Clicking will open the game in a professional way
        card.onclick = () => window.open(game.url, '_blank');
        
        card.innerHTML = `
            <img src="${game.asset[0]}" alt="${game.title}">
            <h3>${game.title}</h3>
        `;
        gameGrid.appendChild(card);
    });
}

function searchGames() {
    const term = searchInput.value.toLowerCase();
    const filtered = gameList.filter(game => 
        game.title.toLowerCase().includes(term)
    );
    renderGames(filtered);
}

// Initial Call
getGames();