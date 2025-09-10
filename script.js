// URL do Google Apps Script
const scriptURL = 'https://script.google.com/macros/s/AKfycbzkpO7KTgl2hpp_tca60blgoAJkFb_pUQlWD1SPXPRGrWxBnJX-qmCZHJ4f4_Obz6_-/exec';

// Form submission
const cadastroForm = document.getElementById('cadastroForm');

cadastroForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Coletar dados do formulário
    const formData = new FormData(this);
    
    // Mostrar loading no botão
    const submitBtn = document.getElementById('submitBtn');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span>Enviando...</span> <i class="fas fa-spinner fa-spin"></i>';
    submitBtn.disabled = true;
    
    // Enviar dados para o Google Apps Script
    fetch(scriptURL, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        const messageEl = document.getElementById('message');
        messageEl.style.display = 'block';
        
        if (data.status === 'success') {
            messageEl.textContent = data.message;
            messageEl.className = 'message success';
            document.getElementById('cadastroForm').reset();
            
            // Mostrar o botão de próxima página após sucesso
            document.getElementById('nextPageBtn').style.display = 'flex';
        } else {
            messageEl.textContent = 'Erro: ' + data.message;
            messageEl.className = 'message error';
        }
        
        // Restaurar botão
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
        
        // Ocultar mensagem após 5 segundos
        setTimeout(() => {
            messageEl.style.display = 'none';
        }, 5000);
    })
    .catch(error => {
        const messageEl = document.getElementById('message');
        messageEl.style.display = 'block';
        messageEl.textContent = 'Erro de conexão. Verifique a URL do script.';
        messageEl.className = 'message error';
        
        // Restaurar botão
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
        
        // Ocultar mensagem após 5 segundos
        setTimeout(() => {
            messageEl.style.display = 'none';
        }, 5000);
        
        console.error('Error:', error);
    });
});

// Formatação do telefone
document.getElementById('telefone').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    
    if (value.length > 6) {
        value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    } else if (value.length > 2) {
        value = value.replace(/(\d{2})(\d{0,5})/, '($1) $2');
    } else if (value.length > 0) {
        value = value.replace(/(\d{0,2})/, '($1');
    }
    
    e.target.value = value;
});

// Adicionar funcionalidade ao botão de próxima página
document.getElementById('nextPageBtn').addEventListener('click', function() {
    // Redirecionar para outra página (substitua com a URL desejada)
    window.location.href = 'https://paginas-mag-ltq8.vercel.app/#portfolio';
});

// Login link
const loginLink = document.getElementById('loginLink');

loginLink.addEventListener('click', function(e) {
    e.preventDefault();
    alert('Redirecionar para página de login');
});

// Dark mode toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const themeIcon = themeToggle.querySelector('i');

themeToggle.addEventListener('click', function() {
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
});
