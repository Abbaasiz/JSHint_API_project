const API_KEY = "21n0lYDr7GT9fmE0W2_-G6LxIL0";
const API_URL = "https://ci-jshint.herokuapp.com/api";
const results = new bootstrap.Modal(document.getElementById('resultsModal'));

document.getElementById("status").addEventListener("click", e => getStatus(e));

async function getStatus(e) {
    const query_string = `${API_KEY}?api_key=${API_URL}`;

    const response = await fetch(query_string);

    const data = await response.json();

    if (response.ok) {
        console.log(data);
    }
}
