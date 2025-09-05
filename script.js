const submitBtn = document.getElementById('submitBtn');
const emailInput = document.getElementById('email');

submitBtn.addEventListener('click', function() {
    const email = emailInput.value;
    if (!email) {
        alert("Digite um e-mail válido!");
        return;
    }

    const scriptURL = 'https://script.google.com/macros/s/AKfycbxKS9UyjVyK85_whveNi1U3Z5FvjFDiMZXlTDdEzS4SQvSilXcw0ewKx5NxcnV43MX1/exec';
    const formData = new FormData();
    formData.append('email', email);

    fetch(scriptURL, { method: 'POST', body: formData })
        .then(response => {
            alert("E-mail enviado com sucesso!");
            emailInput.value = '';
        })
        .catch(error => {
            alert("Erro ao enviar e-mail.");
            console.error(error);
        });
});
