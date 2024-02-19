document.getElementById('calculateButton').addEventListener('click', function() {
    // Collecting input values
    const purchasePrice = parseFloat(document.getElementById('purchasePrice').value);
    const closingCosts = parseFloat(document.getElementById('closingCosts').value);
    const downPaymentPercentage = parseFloat(document.getElementById('downPaymentPercentage').value) / 100;
    const loanInterestRate = parseFloat(document.getElementById('loanInterestRate').value) / 100;
    const loanTerm = parseInt(document.getElementById('loanTerm').value);
    const monthlyRent = parseFloat(document.getElementById('monthlyRent').value);
    const annualExpenses = parseFloat(document.getElementById('annualExpenses').value);
    const vacancyRate = parseFloat(document.getElementById('vacancyRate').value) / 100;

    // Loan calculations
    const loanAmount = purchasePrice * (1 - downPaymentPercentage);
    const monthlyInterestRate = loanInterestRate / 12;
    const totalLoanPayments = loanTerm * 12;

    // Monthly mortgage payment calculation using the formula for an amortizing loan
    const monthlyMortgagePayment = loanAmount * (monthlyInterestRate * Math.pow((1 + monthlyInterestRate), totalLoanPayments)) / (Math.pow((1 + monthlyInterestRate), totalLoanPayments) - 1);

    // Annual cash flow calculation
    const effectiveMonthlyRent = monthlyRent * (1 - vacancyRate);
    const annualIncome = effectiveMonthlyRent * 12;
    const annualMortgagePayments = monthlyMortgagePayment * 12;
    const annualCashFlow = annualIncome - annualExpenses - annualMortgagePayments;

    // Additional metrics
    const totalInvestment = (purchasePrice * downPaymentPercentage) + closingCosts;
    const cashOnCashReturn = (annualCashFlow / totalInvestment) * 100;
    const capRate = ((annualIncome - annualExpenses) / (purchasePrice + closingCosts)) * 100;

    // Displaying results
    document.getElementById('analysisResult').innerHTML = `
        <p>Annual Cash Flow: $${annualCashFlow.toFixed(2)}</p>
        <p>Monthly Mortgage Payment: $${monthlyMortgagePayment.toFixed(2)}</p>
        <p>Cash-on-Cash Return: ${cashOnCashReturn.toFixed(2)}%</p>
        <p>Cap Rate: ${capRate.toFixed(2)}%</p>
    `;
});

async function fuzzyAddressSearch(query) {
    const apiKey = 'fa24d25bf99044dabfc7db67d4a6afc2'; // Replace with your OpenCage Geocoding API key
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${query}&key=${apiKey}&limit=10`;
    const response = await fetch(url);
    const data = await response.json();
    return data.results.map(result => result.formatted);
}

function fuzzyMatch(query, address) {
    const similarity = stringSimilarity.compareTwoStrings(query.toLowerCase(), address.toLowerCase());
    return similarity >= 0.8; // Adjust the threshold as needed
}

function displayResults(query, addresses) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    addresses.forEach(address => {
        if (fuzzyMatch(query, address)) {
            const addressElement = document.createElement('div');
            addressElement.textContent = address;
            addressElement.classList.add('p-2', 'hover:bg-gray-100', 'cursor-pointer');
            addressElement.addEventListener('click', () => {
                document.getElementById('searchInput').value = address;
                resultsContainer.classList.add('invisible');
            });
            resultsContainer.appendChild(addressElement);
        }
    });

    if (addresses.length > 0) {
        resultsContainer.classList.remove('invisible');
    } else {
        resultsContainer.classList.add('invisible');
    }
}

function handleInputChange() {
    const query = document.getElementById('searchInput').value.trim();
    if (query.length === 0) {
        document.getElementById('results').classList.add('invisible');
        return;
    }

    fuzzyAddressSearch(query).then(addresses => {
        displayResults(query, addresses);
    });
}

// Load string-similarity library
const script = document.createElement('script');
script.src = 'https://cdnjs.cloudflare.com/ajax/libs/string-similarity/3.0.0/string-similarity.min.js';
script.async = true;
document.head.appendChild(script);