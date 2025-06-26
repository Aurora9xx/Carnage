
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Filter functionality for accounts
    const filterButtons = document.querySelectorAll('.filter-btn');
    const accountCards = document.querySelectorAll('.account-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            accountCards.forEach(card => {
                if (filterValue === 'all') {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease-in';
                } else {
                    const cardRank = card.getAttribute('data-rank');
                    if (cardRank === filterValue) {
                        card.style.display = 'block';
                        card.style.animation = 'fadeIn 0.5s ease-in';
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        });
    });

    // Buy button functionality
    const buyButtons = document.querySelectorAll('.buy-btn');
    buyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const accountCard = this.closest('.account-card');
            const accountTitle = accountCard.querySelector('h3').textContent;
            const price = accountCard.querySelector('.price').textContent;
            
            // Create a simple modal or alert for demonstration
            const confirmation = confirm(`Are you sure you want to purchase ${accountTitle} for ${price}?`);
            
            if (confirmation) {
                // In a real application, you would integrate with a payment processor
                alert('Thank you for your purchase! Please check your email for account details.');
                
                // Animate the button
                this.style.background = '#28a745';
                this.textContent = 'Purchased!';
                this.disabled = true;
                
                // Reset after 3 seconds
                setTimeout(() => {
                    this.style.background = '';
                    this.textContent = 'Buy Now';
                    this.disabled = false;
                }, 3000);
            }
        });
    });

    // CTA button functionality
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            document.getElementById('accounts').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }

    // Contact form functionality
    const contactForm = document.querySelector('.contact-form');
    const submitBtn = document.querySelector('.submit-btn');
    
    if (submitBtn) {
        submitBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const nameInput = contactForm.querySelector('input[type="text"]');
            const emailInput = contactForm.querySelector('input[type="email"]');
            const messageTextarea = contactForm.querySelector('textarea');
            
            // Basic validation
            if (!nameInput.value || !emailInput.value || !messageTextarea.value) {
                alert('Please fill in all fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Simulate form submission
            this.textContent = 'Sending...';
            this.disabled = true;
            
            setTimeout(() => {
                alert('Thank you for your message! We will get back to you soon.');
                nameInput.value = '';
                emailInput.value = '';
                messageTextarea.value = '';
                this.textContent = 'Send Message';
                this.disabled = false;
            }, 2000);
        });
    }

    // Add scroll effect to navbar
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(15, 20, 25, 0.98)';
        } else {
            header.style.background = 'rgba(15, 20, 25, 0.95)';
        }
    });

    // Add animation class to cards when they come into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideInUp 0.6s ease-out';
            }
        });
    }, observerOptions);

    // Observe all account cards and feature cards
    document.querySelectorAll('.account-card, .feature-card').forEach(card => {
        observer.observe(card);
    });
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes slideInUp {
        from { opacity: 0; transform: translateY(50px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    .account-card, .feature-card {
        opacity: 0;
    }
`;
document.head.appendChild(style);
