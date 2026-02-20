/* ================================
   CIRRUS FLIGHT ACADEMY AUBURN
   Main JavaScript
================================ */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavbar();
    initMobileMenu();
    initScrollReveal();
    initCAPSInteractive();
    initContactForm();
    initSmoothScroll();
});

/* ================================
   NAVBAR
================================ */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add scrolled class when past threshold
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });
}

/* ================================
   MOBILE MENU
================================ */
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
}

/* ================================
   SCROLL REVEAL
================================ */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.section-header, .about-content, .about-visual, .rating-card, .caps-text, .caps-visual, .pricing-card, .contact-info, .contact-form-wrapper');

    const revealOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal', 'active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        el.classList.add('reveal');
        revealObserver.observe(el);
    });

    // Stagger rating cards
    document.querySelectorAll('.rating-card').forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });

    // Stagger pricing cards
    document.querySelectorAll('.pricing-card').forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });
}

/* ================================
   CAPS ANIMATED DEPLOYMENT
================================ */
let capsAnimationRunning = false;
let capsAnimationTimeout = null;

function initCAPSInteractive() {
    // Initialize CAPS animation on scroll into view
    const capsSection = document.getElementById('caps');
    if (capsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Auto-start hint animation
                    pulsePlayButton();
                }
            });
        }, { threshold: 0.3 });

        observer.observe(capsSection);
    }
}

function pulsePlayButton() {
    const btn = document.getElementById('capsPlayBtn');
    if (btn && !capsAnimationRunning) {
        btn.classList.add('pulse-hint');
        setTimeout(() => btn.classList.remove('pulse-hint'), 2000);
    }
}

function playCAPSAnimation() {
    if (capsAnimationRunning) return;
    capsAnimationRunning = true;

    const playBtn = document.getElementById('capsPlayBtn');
    const resetBtn = document.getElementById('capsResetBtn');
    const aircraft = document.getElementById('cirrusAircraft');
    const parachute = document.getElementById('parachuteSystem');
    const rocketTrail = document.getElementById('rocketTrail');
    const ground = document.getElementById('groundGroup');
    const phaseText = document.getElementById('phaseText');
    const altitudeValue = document.getElementById('altitudeValue');
    const propeller = document.getElementById('propeller');
    const svg = document.getElementById('capsAnimatedSvg');
    const container = document.querySelector('.caps-animation-container');

    // Hide play button, show reset later
    playBtn.style.display = 'none';

    // Timeline steps
    const timelineSteps = document.querySelectorAll('.timeline-step');

    function setPhase(step, text) {
        timelineSteps.forEach((s, i) => {
            s.classList.remove('active');
            if (i < step) s.classList.add('completed');
        });
        if (timelineSteps[step]) {
            timelineSteps[step].classList.add('active');
        }
        if (phaseText) phaseText.textContent = text;
    }

    function setAltitude(alt) {
        if (altitudeValue) altitudeValue.textContent = alt;
    }

    // Phase 1: Normal Flight (0-2s)
    setPhase(0, 'NORMAL FLIGHT');
    setAltitude('5,500 ft');

    // Phase 2: Emergency (2-4s)
    capsAnimationTimeout = setTimeout(() => {
        setPhase(1, 'ENGINE FAILURE');
        setAltitude('5,200 ft');

        // Stop propeller
        if (propeller) {
            propeller.style.animation = 'none';
            propeller.style.opacity = '0.3';
        }

        // Aircraft starts to bank/descend slightly
        if (aircraft) {
            aircraft.style.transition = 'transform 2s ease';
            aircraft.style.transform = 'rotate(-5deg) translateY(20px)';
        }
    }, 2000);

    // Phase 3: Pull Handle (4-5s)
    setTimeout(() => {
        setPhase(2, 'CAPS ACTIVATED');
        setAltitude('4,800 ft');

        // Flash CAPS housing
        const capsHousing = document.getElementById('capsHousing');
        if (capsHousing) {
            capsHousing.style.fill = '#ff4444';
            capsHousing.style.transition = 'fill 0.2s';
        }
    }, 4000);

    // Phase 4: Rocket Fires (5-6s)
    setTimeout(() => {
        setPhase(3, 'ROCKET FIRES');
        setAltitude('4,500 ft');

        // Show rocket trail
        if (rocketTrail) {
            rocketTrail.style.opacity = '1';
            rocketTrail.classList.add('active');
        }

        // Level aircraft slightly
        if (aircraft) {
            aircraft.style.transform = 'rotate(-2deg) translateY(30px)';
        }
    }, 5000);

    // Phase 5: Canopy Deploys (6-8s)
    setTimeout(() => {
        setPhase(4, 'CANOPY DEPLOYING');
        setAltitude('4,000 ft');

        // Hide rocket trail
        if (rocketTrail) {
            rocketTrail.style.opacity = '0';
        }

        // Show and animate parachute
        if (parachute) {
            parachute.style.opacity = '1';
            parachute.classList.add('deployed');
        }

        // Level aircraft under chute
        if (aircraft) {
            aircraft.style.transition = 'transform 1.5s ease-out';
            aircraft.style.transform = 'rotate(0deg) translateY(50px)';
        }
    }, 6000);

    // Phase 6: Controlled Descent (8-14s)
    setTimeout(() => {
        setPhase(5, 'CONTROLLED DESCENT');
        container.classList.add('descending');

        // Animate descent
        let altitude = 3500;
        const descentInterval = setInterval(() => {
            altitude -= 200;
            if (altitude <= 0) {
                clearInterval(descentInterval);
                altitude = 0;
            }
            setAltitude(altitude.toLocaleString() + ' ft');
        }, 500);

        // Show ground approaching
        if (ground) {
            ground.classList.add('visible');
        }

        // Move entire scene down to simulate descent
        if (svg) {
            svg.style.transition = 'transform 6s ease-in';
            setTimeout(() => {
                // Final landing position
            }, 100);
        }
    }, 8000);

    // Phase 7: Safe Landing (14s+)
    setTimeout(() => {
        setPhase(5, 'SAFE LANDING');
        setAltitude('0 ft - LANDED');

        container.classList.remove('descending');

        // Stop all animations
        if (aircraft) {
            aircraft.style.animation = 'none';
            aircraft.style.transform = 'rotate(0deg) translateY(80px)';
        }

        if (parachute) {
            parachute.style.animation = 'none';
        }

        // Show reset button
        if (resetBtn) {
            resetBtn.style.display = 'flex';
        }

        capsAnimationRunning = false;

        // Show success message
        showCAPSSuccess();
    }, 14000);
}

function showCAPSSuccess() {
    const container = document.querySelector('.caps-animation-container');
    const overlay = document.createElement('div');
    overlay.className = 'caps-success-overlay';
    overlay.innerHTML = `
        <div class="caps-success-content">
            <div class="success-icon"><i class="fas fa-check-circle"></i></div>
            <h3>Safe Landing Achieved</h3>
            <p>CAPS successfully brought the aircraft and occupants safely to the ground.</p>
            <div class="success-stat">
                <span class="big">0</span>
                <span class="label">Fatalities when deployed above 1,000 ft</span>
            </div>
        </div>
    `;

    // Add styles inline
    overlay.style.cssText = `
        position: absolute;
        inset: 0;
        background: rgba(10, 22, 40, 0.95);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 100;
        animation: fadeIn 0.5s ease;
        border-radius: 18px;
    `;

    const content = overlay.querySelector('.caps-success-content');
    content.style.cssText = `
        text-align: center;
        padding: 40px;
    `;

    const icon = overlay.querySelector('.success-icon');
    icon.style.cssText = `
        width: 80px;
        height: 80px;
        margin: 0 auto 20px;
        background: linear-gradient(135deg, #4ade80, #22c55e);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 40px;
        color: white;
    `;

    const h3 = overlay.querySelector('h3');
    h3.style.cssText = `
        font-size: 28px;
        margin-bottom: 10px;
        color: #4ade80;
    `;

    const p = overlay.querySelector('p');
    p.style.cssText = `
        color: #9ca3af;
        margin-bottom: 30px;
    `;

    const stat = overlay.querySelector('.success-stat');
    stat.style.cssText = `
        background: rgba(201, 162, 39, 0.1);
        border: 2px solid #c9a227;
        border-radius: 15px;
        padding: 20px 40px;
        display: inline-block;
    `;

    const big = overlay.querySelector('.big');
    big.style.cssText = `
        display: block;
        font-size: 48px;
        font-weight: 700;
        color: #c9a227;
    `;

    const label = overlay.querySelector('.label');
    label.style.cssText = `
        font-size: 14px;
        color: #c9a227;
    `;

    container.style.position = 'relative';
    container.appendChild(overlay);

    // Remove after 4 seconds
    setTimeout(() => {
        overlay.style.animation = 'fadeOut 0.5s ease forwards';
        setTimeout(() => overlay.remove(), 500);
    }, 4000);
}

function resetCAPSAnimation() {
    capsAnimationRunning = false;

    // Clear any pending timeouts
    if (capsAnimationTimeout) {
        clearTimeout(capsAnimationTimeout);
    }

    const playBtn = document.getElementById('capsPlayBtn');
    const resetBtn = document.getElementById('capsResetBtn');
    const aircraft = document.getElementById('cirrusAircraft');
    const parachute = document.getElementById('parachuteSystem');
    const rocketTrail = document.getElementById('rocketTrail');
    const ground = document.getElementById('groundGroup');
    const phaseText = document.getElementById('phaseText');
    const altitudeValue = document.getElementById('altitudeValue');
    const propeller = document.getElementById('propeller');
    const container = document.querySelector('.caps-animation-container');
    const capsHousing = document.getElementById('capsHousing');

    // Reset buttons
    if (playBtn) playBtn.style.display = 'flex';
    if (resetBtn) resetBtn.style.display = 'none';

    // Reset aircraft
    if (aircraft) {
        aircraft.style.transition = 'none';
        aircraft.style.transform = 'none';
        aircraft.style.animation = 'aircraftFloat 3s ease-in-out infinite';
    }

    // Reset propeller
    if (propeller) {
        propeller.style.animation = 'propellerSpin 0.1s linear infinite';
        propeller.style.opacity = '1';
    }

    // Reset parachute
    if (parachute) {
        parachute.style.opacity = '0';
        parachute.classList.remove('deployed');
        parachute.style.animation = '';
    }

    // Reset rocket trail
    if (rocketTrail) {
        rocketTrail.style.opacity = '0';
        rocketTrail.classList.remove('active');
    }

    // Reset ground
    if (ground) {
        ground.classList.remove('visible');
    }

    // Reset CAPS housing
    if (capsHousing) {
        capsHousing.style.fill = '#c9a227';
    }

    // Reset container
    container.classList.remove('descending');

    // Reset phase and altitude
    if (phaseText) phaseText.textContent = 'NORMAL FLIGHT';
    if (altitudeValue) altitudeValue.textContent = '5,500 ft';

    // Reset timeline
    const timelineSteps = document.querySelectorAll('.timeline-step');
    timelineSteps.forEach((step, i) => {
        step.classList.remove('active', 'completed');
        if (i === 0) step.classList.add('active');
    });

    // Remove any success overlay
    const overlay = document.querySelector('.caps-success-overlay');
    if (overlay) overlay.remove();
}

/* ================================
   CONTACT FORM
================================ */
function initContactForm() {
    const form = document.getElementById('contactForm');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);

            // Here you would typically send the data to a server
            console.log('Form submitted:', data);

            // Show success message
            showNotification('Thank you! We\'ll be in touch within 24 hours.', 'success');

            // Reset form
            form.reset();
        });
    }
}

/* ================================
   NOTIFICATION SYSTEM
================================ */
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'var(--gold)' : 'var(--navy-light)'};
        color: ${type === 'success' ? 'var(--navy-dark)' : 'var(--white)'};
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 3000;
        animation: slideInRight 0.5s ease;
    `;

    document.body.appendChild(notification);

    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideInRight 0.3s ease reverse';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

/* ================================
   SMOOTH SCROLL
================================ */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));

            if (target) {
                const navbarHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ================================
   MODAL FUNCTIONS
================================ */
function openRatingModal(rating) {
    const modal = document.getElementById('modalOverlay');
    const content = document.getElementById('modalContent');

    // Load content based on rating
    content.innerHTML = getRatingContent(rating);

    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Initialize timeline animation
    setTimeout(() => {
        initTimelineAnimation();
    }, 100);
}

function closeRatingModal() {
    const modal = document.getElementById('modalOverlay');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Close modal on overlay click
document.getElementById('modalOverlay')?.addEventListener('click', (e) => {
    if (e.target.id === 'modalOverlay') {
        closeRatingModal();
    }
});

// Close modal on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeRatingModal();
    }
});

/* ================================
   TIMELINE ANIMATION
================================ */
function initTimelineAnimation() {
    const items = document.querySelectorAll('.timeline-step');

    items.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('visible');
        }, index * 200);
    });
}

/* ================================
   COUNTER ANIMATION
================================ */
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);

    const animate = () => {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(animate);
        } else {
            element.textContent = target;
        }
    };

    animate();
}

/* ================================
   PARALLAX EFFECT
================================ */
function initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;

        parallaxElements.forEach(el => {
            const speed = el.dataset.parallax || 0.5;
            const offset = scrolled * speed;
            el.style.transform = `translateY(${offset}px)`;
        });
    });
}

/* ================================
   LAZY LOADING
================================ */
function initLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
}
