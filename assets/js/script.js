const API_KEY = "21n0lYDr7GT9fmE0W2_-G6LxIL0";
const API_URL = "https://ci-jshint.herokuapp.com/api";
const results = new bootstrap.Modal(document.getElementById('resultsModal'));

document.getElementById("status").addEventListener("click", e => getStatus(e));

async function getStatus(e) {
    const query_string = `${API_URL}?api_key=${API_KEY}`;

    const response = await fetch(query_string);

    const data = await response.json();

    if (response.ok) {
        console.log(data);
        displayStatus(data);
    } else {
        throw new Error(data.error);
    }
}

function displayStatus(data) {
    let results = `<div>Your key is valid until</div>`;
    results += `<div class="key-status">${data.expiry}</div>`;

    document.getElementById("resultsModalTitle").innerText = "API Key Status";
    document.getElementById("results-content").innerHTML = results;
    resultsModal.show();
}
