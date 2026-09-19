document.addEventListener("DOMContentLoaded", () => {
    const registrationForm = document.getElementById("registerForm");

    if (registrationForm) {
        registrationForm.addEventListener("submit", (event) => {
            // Detener el envío automático para realizar la validación del lado del cliente
            event.preventDefault();

            // 1. Obtención de inputs
            const fullname = document.getElementById("fullname").value.trim();
            const gender = document.getElementById("gender").value;
            const birthdate = document.getElementById("birthdate").value;
            const avatar = document.getElementById("avatar").files[0];
            const email = document.getElementById("email").value.trim();
            const password = document.getElementById("password").value;

            // 2. Validación de Campos Obligatorios Generales
            if (!fullname || !gender || !birthdate || !avatar || !email || !password) {
                alert("❌ Todos los campos marcados son obligatorios. Por favor, completa la información.");
                return;
            }

            // 3. Validación del formato de Correo Electrónico
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert("❌ Por favor, introduce un correo electrónico válido.");
                return;
            }

            // 4. Validación estricta de las reglas de la Contraseña (Exigido en Rúbrica)
            const errors = [];

            if (password.length < 8) {
                errors.push("Mínimo 8 caracteres de longitud.");
            }
            if (!/[A-Z]/.test(password)) {
                errors.push("Al menos una letra mayúscula.");
            }
            if (!/[0-9]/.test(password)) {
                errors.push("Al menos un número.");
            }
            // Carácter especial definido según anexo del PDF: (¡”#\$%&/=’?¡¿:;,.-_+*{][})
            const specialCharRegex = /[¡"#\$%&/='?¿:;,.\-_+*{}\[\]]/;
            if (!specialCharRegex.test(password)) {
                errors.push("Al menos un carácter especial (ej: #, \$, %, ?, -, _).");
            }

            // 5. Evaluación del resultado de la contraseña
            if (errors.length > 0) {
                let errorMessage = "❌ La contraseña no cumple con los requisitos de seguridad obligatorios:\n\n";
                errors.forEach(err => {
                    errorMessage += `• ${err}\n`;
                });
                alert(errorMessage);
                return;
            }

            // Si todas las validaciones en JS pasan con éxito
            alert("✅ ¡Validación del cliente exitosa! Procesando registro simulado...");
            registrationForm.reset();
            
            // Simular redirección al login tras registrarse
            window.location.href = "login.html";
        });
    }
});
