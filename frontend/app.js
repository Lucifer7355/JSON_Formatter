// Fetch the API URL from an environment variable
const API_URL = process.env.API_URL; // Use environment variable injected by Webpack

// Prettify JSON
document.getElementById("prettify-button").addEventListener("click", async function () {
    const jsonInput = document.getElementById("json-input").value;

    try {
        const response = await fetch(`${API_URL}/prettify`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: jsonInput
        });

        const result = await response.json();
        if (response.ok) {
            document.getElementById("pretty-json-output").textContent = result.prettifiedJSON;
        } else {
            document.getElementById("pretty-json-output").textContent = result.error;
        }
    } catch (error) {
        document.getElementById("pretty-json-output").textContent = "Not a valid JSON.";
    }
});

// Minify JSON
document.getElementById("minify-button").addEventListener("click", async function () {
    const jsonInput = document.getElementById("json-input").value;

    try {
        const response = await fetch(`${API_URL}/minify`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: jsonInput
        });

        const result = await response.json();
        if (response.ok) {
            document.getElementById("pretty-json-output").textContent = result.minifiedJSON;
        } else {
            document.getElementById("pretty-json-output").textContent = result.error;
        }
    } catch (error) {
        document.getElementById("pretty-json-output").textContent = "Not a valid JSON.";
    }
});

// Validate JSON
document.getElementById("validate-button").addEventListener("click", async function () {
    const jsonInput = document.getElementById("json-input").value;

    try {
        const response = await fetch(`${API_URL}/validate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: jsonInput
        });

        const result = await response.json();
        if (response.ok) {
            document.getElementById("pretty-json-output").textContent = result.message;
        } else {
            document.getElementById("pretty-json-output").textContent = result.error;
        }
    } catch (error) {
        document.getElementById("pretty-json-output").textContent = "Not a valid JSON.";
    }
});

// Convert JSON to CSV
document.getElementById("json-to-csv-button").addEventListener("click", async function () {
    const jsonInput = document.getElementById("json-input").value;

    try {
        const response = await fetch(`${API_URL}/json-to-csv`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: jsonInput
        });

        const result = await response.json();
        if (response.ok) {
            document.getElementById("pretty-json-output").textContent = result.csv;
        } else {
            document.getElementById("pretty-json-output").textContent = result.error;
        }
    } catch (error) {
        document.getElementById("pretty-json-output").textContent = "Error occurred.";
    }
});

// Convert CSV to JSON
document.getElementById("csv-to-json-button").addEventListener("click", async function () {
    const csvInput = document.getElementById("json-input").value;

    try {
        const response = await fetch(`${API_URL}/csv-to-json`, {
            method: 'POST',
            headers: {
                'Content-Type': 'text/csv'
            },
            body: csvInput
        });

        const result = await response.json();
        if (response.ok) {
            document.getElementById("pretty-json-output").textContent = JSON.stringify(result.json, null, 4);
        } else {
            document.getElementById("pretty-json-output").textContent = result.error;
        }
    } catch (error) {
        document.getElementById("pretty-json-output").textContent = "Error occurred.";
    }
});

// Convert XML to JSON
document.getElementById("xml-to-json-button").addEventListener("click", async function () {
    const xmlInput = document.getElementById("json-input").value.trim(); // Trim to avoid accidental white space

    try {
        const response = await fetch(`${API_URL}/xml-to-json`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/xml'
            },
            body: xmlInput // Send the raw XML string as the body
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        document.getElementById("pretty-json-output").textContent = JSON.stringify(result.json, null, 4);
    } catch (error) {
        console.error('Error:', error);
        document.getElementById("pretty-json-output").textContent = "Error occurred while converting XML.";
    }
});
