function calculateInvestment() {
    // Capture inputs
    const purchasePrice = parseFloat(document.getElementById('purchasePrice').value) || 0;
    const repairCosts = parseFloat(document.getElementById('repairCosts').value) || 0;
    // Continue capturing additional inputs...

    // Basic Validation
    if (purchasePrice <= 0) {
        alert("Please enter a valid purchase price.");
        return;
    }
    // Additional validation as necessary...

    // Example Calculations
    const totalInvestment = purchasePrice + repairCosts; // Add other costs as captured
    const monthlyRent = parseFloat(document.getElementById('monthlyRent').value) || 0;
    const annualRent = monthlyRent * 12;
    const operatingExpenses = parseFloat(document.getElementById('operatingExpenses').value) || 0; // Assume this captures annual expenses for simplicity
    const netOperatingIncome = annualRent - operatingExpenses;
    const capRate = (netOperatingIncome / totalInvestment) * 100;

    // ROI, Cash Flow, and other metrics calculations...

    // Display results
    document.getElementById('results').innerHTML = `
        <h2 class="text-xl font-semibold">Investment Summary</h2>
        <p>Total Investment: $${totalInvestment.toFixed(2)}</p>
        <p>Net Operating Income: $${netOperatingIncome.toFixed(2)}</p>
        <p>Cap Rate: ${capRate.toFixed(2)}%</p>
        <!-- Display additional metrics here -->
    `;
}

// Consider adding functions for more sophisticated analyses like refinancing impact
