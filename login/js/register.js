document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registerForm');
    if (!form) return;

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        e.stopImmediatePropagation(); // <-- blokir handler lain

        const username = document.getElementById('username').value.trim();
        const email    = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        const submitBtn = document.querySelector('.gradient-button');
        if (submitBtn) submitBtn.disabled = true;

        try {
            const res = await fetch('https://herisusanta.my.id/javalogin/api/auth.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `action=register&username=${encodeURIComponent(username)}&email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
            });

            const data = await res.json();

            if (data.status === 'success') {
                window.location.href = 'index.html';
            } else {
                alert(data.message || 'Gagal registrasi');
                if (submitBtn) submitBtn.disabled = false;
            }
        } catch (err) {
            alert('Terjadi kesalahan koneksi.');
            if (submitBtn) submitBtn.disabled = false;
        }
    }, true); // <-- useCapture: true agar jalan duluan
});
