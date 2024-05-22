const API_KEY = "21n0lYDr7GT9fmE0W2_-G6LxIL0";
const API_URL = "https://ci-jshint.herokuapp.com/api";
const results = new bootstrap.Modal(document.getElementById("resultsModal"));

document.getElementById("status").addEventListener("click", e => getStatus(e));
document.getElementById("submit").addEventListener("click", e => postForm(e));

function processOptions(form) {
    let optArray = [];

    for (let entry of form.entries()) {
        if (entry[0] === "options") {
            optArray.push(entry[1]);
        }
    }
    form.delete("options");
    form.append("options", optArray.join());
    return form;
}

async function postForm(e) {
    const form = processOptions (new FormData(document.getElementById("checksform")));

    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Authorization": API_KEY,
        },
        body: form,
    });

    const data = await response.json();

    if (response.ok) {
        console.log(data);
    } else {
        displayException(data);
        throw new Error(data.error);
    }
}

function displayErrors(data) {
    let heading = `JSHint Results for ${data.file}`;
    if (data.total_errors === 0) {
        results = `<div class ="no_errors">No errors reported!</div>`;
    } else {
        results = `<div>Total <span class="error_count">${data.total_errors}</span>Errors</div>`;
        for (let error of data.error_list) {
            results += `<div>At line <span class="line">${error.line}</span>, `;
            results += `column <span class="column">${error.col}</span></div>`;
            results += `<div class="error">${error.error}</div>`;

            document.getElementById("resultsModalTitle").innerText = heading;
            document.getElementById("results-content").innerHTML = results;
            resultsModal.show;
        }
    }
}

async function getStatus(e) {
    const query_string = `${API_URL}?api_key=${API_KEY}`;

    const response = await fetch(query_string);

    const data = await response.json();

    if (response.ok) {
        console.log(data);
        displayStatus(data);
    } else {
        displayException(data);
        throw new Error(data.error);
    }
}

function displayStatus(data) {
    let results = `<div>Your key is valid until</div>`;
    results += `<div class="key-status">${data.expiry}</div>`;

    document.getElementById("resultsModalTitle").innerText = "API Key Status";
    document.getElementById("results-content").innerHTML = results;
    let resultsModal = document.getElementById("resultsModal");
    resultsModal.show;
}


function displayException(data) {
    let heading = `An excpetion occurred`;

    results = `<div> The API returned status code ${data.status_code}</div>`;
    results += `<div>Error number: <strong>${data.error_no}</strong></div>`;
    results += `<div>Error text: <strong>${data.error}</strong></div>`;

    document.getElementById('resultsModalTitle').innerText = heading;
    document.getElementById('results-content').innerHTML = results;

    resultsModal.show();
}