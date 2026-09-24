const searchInput = document.getElementById('searchInput');
const btnSearch = document.getElementById('btnSearch');
const btnClear = document.getElementById('btnClear');
const resultDiv = document.getElementById('result');

let travelData = [];

fetch('travel_recommendation_api.json')
.then(response => response.json())
.then(data => {
    travelData = data;
    console.log("Data loaded");
})
.catch(err => console.log(err));

function searchCondition() {
    const query = searchInput.value.toLowerCase().trim();
    resultDiv.innerHTML = '';
    if (!query) return;

    let results = [];

    if (query === 'beach' || query === 'beaches') {
        results = travelData.beaches;
    } else if (query === 'temple' || query === 'temples') {
        results = travelData.temples;
    } else if (query === 'country' || query === 'countries') {
        travelData.countries.forEach(country => {
            country.cities.forEach(city => results.push(city));
        });
    } else {
        // Search by name
        travelData.countries.forEach(c => {
            c.cities.forEach(city => {
                if (city.name.toLowerCase().includes(query)) results.push(city);
            });
        });
        travelData.temples.forEach(t => {
            if (t.name.toLowerCase().includes(query)) results.push(t);
        });
        travelData.beaches.forEach(b => {
            if (b.name.toLowerCase().includes(query)) results.push(b);
        });
    }

    results.forEach(item => {
        const card = document.createElement('div');
        card.className = 'result-card';
        card.innerHTML = `
            <img src="${item.imageUrl}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <button>Visit</button>
        `;
        resultDiv.appendChild(card);
    });
}

btnSearch.addEventListener('click', searchCondition);
btnClear.addEventListener('click', () => {
    searchInput.value = '';
    resultDiv.innerHTML = '';
});
searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') searchCondition();
});
