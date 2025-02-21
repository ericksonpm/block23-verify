// Import validation rules (static JSON for GitHub Pages compatibility)
const validationRules = {
    codeCriteria: {
        2: { req: "180+ days during recognized conflict", ref: "5 USC 2108(2)" },
        5: { req: "10%+ disability or Purple Heart", ref: "5 CFR 211.302(a)(3)" },
        6: { req: "30-50% disability rating", ref: "5 CFR 211.302(a)(2)" }
    }
};

function validateCode() {
    // Existing validation logic augmented with:
    const resultMessage = `
        Validation based on: 
        ${validationRules.codeCriteria[calculatedCode].ref}
    `;
    
    // Add "Generate HR Letter" button for discrepancies
    if (userCode !== calculatedCode) {
        resultHTML += `<button onclick="generateHrRequest()"> 
            Generate HR Correction Request
        </button>`;
    }
}

function generateHrRequest() {
    // Generates pre-filled text for HR inquiries
    const template = `Per ${validationRules.codeCriteria[calculatedCode].ref}, 
        my Block 23 code should be ${calculatedCode} because: 
        [User adds specific reasons here]`;
}
