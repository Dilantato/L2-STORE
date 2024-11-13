// Espera a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Selecciona el botón de menú móvil y la navegación
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const nav = document.querySelector('nav');

    // Añade un event listener al botón de menú
    if (mobileMenuButton && nav) {
        mobileMenuButton.addEventListener('click', function() {
            // Alterna la clase 'active' en la navegación
            nav.classList.toggle('active');
        });
    }
});

//Footer acordeón móvil 
// Función principal para inicializar el acordeón
function initializeAccordion() {
    const footerSections = document.querySelectorAll('.footer-section:not(:last-child) h3');
    
    if (!footerSections.length) {
        // Si no se encuentran las secciones, intentar nuevamente
        setTimeout(initializeAccordion, 100);
        return;
    }

    // Configuración inicial según el tamaño de la ventana
    const isMobile = window.innerWidth <= 768;
    footerSections.forEach(section => {
        const content = section.parentElement.querySelector('.footer-section-content');
        if (content) {
            content.style.display = isMobile ? 'none' : 'block';
        }
        
        // Eliminar listener existente si hay alguno
        section.removeEventListener('click', handleClick);
        // Añadir nuevo listener
        section.addEventListener('click', handleClick);
    });
}

// Función para manejar el clic
function handleClick(event) {
    if (window.innerWidth <= 768) {
        const section = event.target.parentElement;
        const content = section.querySelector('.footer-section-content');
        const wasActive = section.classList.contains('active');

        // Cerrar todas las secciones activas
        document.querySelectorAll('.footer-section.active').forEach(activeSection => {
            if (activeSection !== section) {
                activeSection.classList.remove('active');
                const activeContent = activeSection.querySelector('.footer-section-content');
                if (activeContent) {
                    activeContent.style.display = 'none';
                }
            }
        });

        // Alternar la sección actual
        section.classList.toggle('active');
        if (content) {
            content.style.display = wasActive ? 'none' : 'block';
        }
    }
}

// Manejar el redimensionamiento de la ventana
function handleResize() {
    const footerSections = document.querySelectorAll('.footer-section:not(:last-child)');
    const isMobile = window.innerWidth <= 768;

    footerSections.forEach(section => {
        const content = section.querySelector('.footer-section-content');
        if (content) {
            if (!isMobile) {
                content.style.display = 'block';
                section.classList.remove('active');
            } else if (!section.classList.contains('active')) {
                content.style.display = 'none';
            }
        }
    });
}

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', function() {
    initializeAccordion();
    window.addEventListener('resize', handleResize);
    checkAuth(); // Verificar autenticación al cargar
});

// Inicialización adicional para mayor seguridad
window.addEventListener('load', initializeAccordion);

// Manejador para el formulario de login
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();
            if (response.ok) {
                // Guardar el token en localStorage
                localStorage.setItem('token', data.token);
                localStorage.setItem('userEmail', data.user.email);

                // Ocultar el ícono de usuario si existe
                const userIcon = document.querySelector('.header-icons .fa-user')?.parentElement;
                if (userIcon) {
                    userIcon.style.display = 'none';
                }

                // Mostrar mensaje de éxito
                alert('Login exitoso!');
                // Redireccionar a la página principal o dashboard
                window.location.href = '/frontend/public/dashboard.html';
            } else {
                // Mostrar mensaje de error
                alert(data.error || 'Error en el login');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al conectar con el servidor');
        }
    });
}

// Función para verificar si el usuario está autenticado
function checkAuth() {
    const token = localStorage.getItem('token');
    
    // Obtener referencias a los iconos
    const loginIcon = document.querySelector('.header-icons .login-icon');
    const profileIcon = document.querySelector('.header-icons .profile-icon');
    
    if (token) {
        // Usuario autenticado
        if (loginIcon) loginIcon.style.display = 'none';
        if (profileIcon) {
            profileIcon.style.display = 'flex';
            // Opcional: Mostrar el email del usuario
            const userEmail = localStorage.getItem('userEmail');
            if (userEmail) {
                profileIcon.title = userEmail;
            }
        }
                // Si el usuario está autenticado y trata de acceder a login.html, redirigir a dashboard
                if (window.location.pathname.includes('login.html')) {
                    window.location.href = '/frontend/public/dashboard.html';
                    return;
                }
    } else {
        // Usuario no autenticado
        if (loginIcon) loginIcon.style.display = 'inline-block';
        if (profileIcon) profileIcon.style.display = 'none';
    }

    // Redireccionamiento para páginas protegidas
    if (!token && !window.location.pathname.includes('login.html') && 
    !window.location.pathname.includes('index.html') && 
    !window.location.pathname.includes('woman.html') && 
    !window.location.pathname.includes('man.html') && 
    !window.location.pathname.includes('accesory.html') && 
    !window.location.pathname.includes('register.html') && 
    !window.location.pathname.endsWith('/')) {
    window.location.href = '/frontend/public/login.html';
    }
}

// Actualizar la función de login
if (response.ok) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('userEmail', data.user.email);

    // Actualizar visibilidad de iconos
    const loginIcon = document.querySelector('.header-icons .login-icon');
    const profileIcon = document.querySelector('.header-icons .profile-icon');
    
    if (loginIcon) loginIcon.style.display = 'none';
    if (profileIcon) profileIcon.style.display = 'flex';

    window.location.href = '/frontend/public/dashboard.html';
}

// Actualizar la función de logout
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');

    // Actualizar visibilidad de iconos
    const loginIcon = document.querySelector('.header-icons .login-icon');
    const profileIcon = document.querySelector('.header-icons .profile-icon');
    
    if (loginIcon) loginIcon.style.display = 'inline-block';
    if (profileIcon) profileIcon.style.display = 'none';

    window.location.href = '/frontend/public/login.html';
}



// Manejador para el formulario de registro
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        const userData = {
            fullName: document.getElementById('fullName').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value,
            whatsapp: document.getElementById('whatsapp').value,
            birthDate: document.getElementById('birthDate').value
        };

        try {
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            const data = await response.json();

            if (response.ok) {
                alert('Registro exitoso! Por favor inicia sesión.');
                window.location.href = '/frontend/public/login.html';
            } else {
                alert(data.error || 'Error en el registro');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al conectar con el servidor');
        }
    });
}