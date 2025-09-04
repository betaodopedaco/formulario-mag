const form = document.getElementById('emailForm');
const message = document.getElementById('message');
const scriptURL = 'https://script.google.com/macros/s/AKfycbxKS9UyjVyK85_whveNi1U3Z5FvjFDiMZXlTDdEzS4SQvSilXcw0ewKx5NxcnV43MX1/exec';

form.addEventListener('submit', async e => {
  e.preventDefault();
  const email = document.getElementById('email').value.trim();
  if (!email) return;

  try {
    await fetch(scriptURL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `email=${encodeURIComponent(email)}`
    });

    message.textContent = '✅ E-mail enviado com sucesso!';
    message.classList.add('show');
    setTimeout(() => message.classList.remove('show'), 3000);
    form.reset();
  } catch (err) {
    message.textContent = '❌ Falha ao enviar. Tente novamente!';
    message.classList.add('show');
    setTimeout(() => message.classList.remove('show'), 3000);
  }
});
