let currentToken = null;
let isForward = true;

document.getElementById("nextBtn").addEventListener("click", () => {
    isForward = true;
    loadData();
});

document.getElementById("prevBtn").addEventListener("click", () => {
    isForward = false;
    loadData();
});

function loadData() {
    let url = `http://localhost:3000/data?`; // Base URL added here
    if (currentToken) {
       // const encodedToken = btoa(currentToken);
        const encodedToken = currentToken;
        const param = isForward ? `searchAfter=${encodedToken}` : `searchBefore=${encodedToken}`;
        url += param;
    }

    fetch(url)
        .then(response => response.json())
        .then(data => {
            populateTable(data);
            
            if (data.length > 0) {
                currentToken =  data[data.length - 1].paginationToken;
            }
        })
        .catch(error => console.error('Error:', error));
}

function populateTable(data) {
    const tableBody = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
    let totalCount = 0;
    tableBody.innerHTML = ''; // Clear existing data

    data.forEach((item, index) => {
        if (index === 0) { // Get total count from the first item
            totalCount = item.meta.count.total;
        }
        let row = tableBody.insertRow();
        Object.values(item).forEach((text, index) => {
            // Exclude the pagination token from being displayed
            if (index < Object.values(item).length - 1) {
                let cell = row.insertCell();
                let textNode = document.createTextNode(text);
                cell.appendChild(textNode);
            }
        });
    });
    document.getElementById('totalDocuments').textContent = `Total Documents: ${totalCount}`;
}

// Initial load
loadData();
