// Contact Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('#Contact form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // منع إعادة تحميل الصفحة
            
            // جمع البيانات من النموذج
            const formData = {
                name: this.querySelector('input[type="text"]').value,
                phone: this.querySelector('input[type="tel"]').value,
                email: this.querySelector('input[type="email"]').value,
                message: this.querySelector('textarea').value
            };
            
            // التحقق من الحقول المطلوبة
            if (!formData.name || !formData.email || !formData.message) {
                showAlert('Please fill in all required fields!', 'error');
                return;
            }
            
            // التحقق من صحة البريد الإلكتروني
            if (!isValidEmail(formData.email)) {
                showAlert('Please enter a valid email address!', 'error');
                return;
            }
            
            // محاكاة إرسال البيانات (في الواقع هتبعتهم لسيرفر)
            simulateFormSubmission(formData);
        });
    }
    
    // دالة للتحقق من صحة البريد الإلكتروني
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // دالة لمحاكاة إرسال النموذج
    function simulateFormSubmission(data) {
        showAlert('Sending your message...', 'info');
        
        // محاكاة تأخير الشبكة
        setTimeout(() => {
            console.log('Form data:', data);
            
            // هنا في الواقع هتبعت البيانات لسيرفر
            // fetch('your-backend-url', {
            //     method: 'POST',
            //     headers: {'Content-Type': 'application/json'},
            //     body: JSON.stringify(data)
            // })
            
            showAlert('Message sent successfully! I\'ll get back to you soon.', 'success');
            contactForm.reset(); // إعادة تعيين النموذج
        }, 2000);
    }
    
    // دالة لعرض التنبيهات
    function showAlert(message, type) {
        // إزالة أي تنبيهات سابقة
        const oldAlert = document.querySelector('.alert');
        if (oldAlert) oldAlert.remove();
        
        // إنشاء عنصر التنبيه
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type}`;
        alertDiv.textContent = message;
        
        // تنسيق التنبيه
        alertDiv.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 15px 25px;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 1000;
            animation: slideIn 0.3s ease;
        `;
        
        // ألوان حسب النوع
        if (type === 'success') {
            alertDiv.style.backgroundColor = '#4CAF50';
        } else if (type === 'error') {
            alertDiv.style.backgroundColor = '#F44336';
        } else {
            alertDiv.style.backgroundColor = '#2196F3';
        }
        
        // إضافة للصفحة
        document.body.appendChild(alertDiv);
        
        // إزالة التنبيه بعد 5 ثواني
        setTimeout(() => {
            alertDiv.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => alertDiv.remove(), 300);
        }, 5000);
        
        // إضافة أنيميشن
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    // تحسين تجربة المستخدم: إضافة تأثير عند التركيز
    const formInputs = document.querySelectorAll('#Contact input, #Contact textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    });
});
// في script.js

darkModeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    const icon = this.querySelector('i');
    if (document.body.classList.contains('dark-mode')) {
        icon.className = 'fa-solid fa-sun';
        localStorage.setItem('theme', 'dark');
    } else {
        icon.className = 'fa-solid fa-moon';
        localStorage.setItem('theme', 'light');
    }
});

// تحميل الثيم المحفوظ
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    darkModeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
}

document.body.appendChild(darkModeToggle);