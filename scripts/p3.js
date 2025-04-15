document.getElementById("process-btn").addEventListener("click", function () {
    const text = document.getElementById("text-input").value;

    const letters = (text.match(/[a-zA-Z]/g) || []).length;
    const words = (text.match(/\b\w+\b/g) || []).length;
    const spaces = (text.match(/ /g) || []).length;
    const newlines = (text.match(/\n/g) || []).length;
    const specialSymbols = (text.match(/[^a-zA-Z0-9\s]/g) || []).length;

    const pronouns = ["i", "you", "he", "she", "it", "we", "they", "me", "him", "her", "us", "them"];
    const prepositions = ["in", "on", "at", "by", "with", "about", "against", "between", "into", "through", "during", "before", "after", "above", "below", "to", "from", "up", "down", "over", "under"];
    const articles = ["a", "an"];

    const tokenCounts = {
        pronouns: {},
        prepositions: {},
        articles: {}
    };

    const tokens = text.toLowerCase().match(/\b\w+\b/g) || [];

    tokens.forEach(token => {
        if (pronouns.includes(token)) {
            tokenCounts.pronouns[token] = (tokenCounts.pronouns[token] || 0) + 1;
        } else if (prepositions.includes(token)) {
            tokenCounts.prepositions[token] = (tokenCounts.prepositions[token] || 0) + 1;
        } else if (articles.includes(token)) {
            tokenCounts.articles[token] = (tokenCounts.articles[token] || 0) + 1;
        }
    });

    let pronounsHTML = '';
    for (const [k, v] of Object.entries(tokenCounts.pronouns)) {
        pronounsHTML += `<p>${k}: ${v}</p>`;
    }

    let prepositionsHTML = '';
    for (const [k, v] of Object.entries(tokenCounts.prepositions)) {
        prepositionsHTML += `<p>${k}: ${v}</p>`;
    }

    let articlesHTML = '';
    for (const [k, v] of Object.entries(tokenCounts.articles)) {
        articlesHTML += `<p>${k}: ${v}</p>`;
    }

    const outputDiv = document.getElementById("output");
    outputDiv.innerHTML = `
        <div>
            <h5>Basic Stats</h5>
            <p>Letters: ${letters}</p>
            <p>Words: ${words}</p>
            <p>Spaces: ${spaces}</p>
            <p>Newlines: ${newlines}</p>
            <p>Special Symbols: ${specialSymbols}</p>
        </div>

        <div>
            <h5>Pronouns Count</h5>
            ${pronounsHTML}
        </div>

        <div>
            <h5>Prepositions Count</h5>
            ${prepositionsHTML}
        </div>

        <div>
            <h5>Indefinite Articles Count</h5>
            ${articlesHTML}
        </div>
    `;
});
