const validationRules = {
    1: { desc: "No veterans' preference", ref: "5 CFR 211.302(a)(1)" },
    2: { desc: "5-point preference (Campaign Service)", ref: "5 U.S.C. 2108(2)" },
    5: { desc: "10-point (Disability/Purple Heart)", ref: "5 CFR 211.302(a)(3)" },
    6: { desc: "30-50% Compensable Disability", ref: "5 CFR 211.302(a)(2)" },
    7: { desc: "Sole Survivor Preference", ref: "DoDI 1312.03" }
};

function validateCode() {
    const servicePeriod = document.getElementById('servicePeriod').value;
    const disability = parseInt(document.getElementById('disabilityPercent').value) || 0;
    const purpleHeart = document.getElementById('purpleHeart').checked;
    const userCode = parseInt(document.getElementById('userCode').value);

    let calculatedCode = 1;
    
    // Validation logic
    if (servicePeriod && (servicePeriod === 'gulf' || servicePeriod === 'post911')) {
        calculatedCode = 2;
    }
    
    if (disability >= 30) {
        calculatedCode = (disability >= 30 && disability < 50) ? 5 : 6;
        if (purpleHeart) calculatedCode = 5;
    }

    const resultDiv = document.getElementById('resultText');
    const resultBox = document.getElementById('result');
    
    // Clear previous results
    resultDiv.className = '';
    resultBox.className = 'result-box';

    if (userCode === calculatedCode) {
        resultDiv.innerHTML = `<span class="success-icon">✓</span> Valid Block23 credential`;
        resultDiv.classList.add('success');
        resultBox.classList.add('success-bg');
    } else {
        resultDiv.innerHTML = `
            <span class="error-icon">✗</span> Invalid verification code<br><br>
            <div class="error-details">
                <strong>Expected Code:</strong> ${calculatedCode} (${validationRules[calculatedCode].desc})<br>
                <strong>Legal Reference:</strong> ${validationRules[calculatedCode].ref}<br><br>
                <em>Recommended action:</em> Verify with 
                <a href="https://www.opm.gov/forms/pdf_fill/sf15.pdf" target="_blank">SF-15 Form</a> 
                and consult HR
            </div>`;
        resultDiv.classList.add('error');
        resultBox.classList.add('error-bg');
    }
}
