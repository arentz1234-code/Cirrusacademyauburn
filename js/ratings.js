/* ================================
   RATING PROGRAM CONTENT
   Cirrus Flight Academy Auburn
================================ */

function getRatingContent(rating) {
    const ratings = {
        private: {
            title: 'Private Pilot Certificate',
            subtitle: 'Your Gateway to the Skies',
            icon: 'fa-plane-departure',
            description: 'The Private Pilot Certificate is your first major milestone in aviation. This comprehensive program takes you from your very first flight to earning the privilege of acting as pilot in command of an aircraft.',
            duration: '4-6 months',
            hours: '40+ flight hours',
            requirements: [
                'Be at least 17 years old',
                'Be able to read, speak, and understand English',
                'Hold at least a 3rd class medical certificate',
                'Pass the FAA written knowledge exam',
                'Pass the practical (checkride) exam'
            ],
            steps: [
                {
                    phase: 'Phase 1',
                    title: 'Ground School',
                    description: 'Master the fundamentals of aerodynamics, weather, navigation, regulations, and aircraft systems.',
                    icon: 'fa-book',
                    details: ['Aerodynamics & Principles of Flight', 'Aviation Weather', 'Navigation & Charts', 'FAA Regulations', 'Aircraft Systems']
                },
                {
                    phase: 'Phase 2',
                    title: 'Pre-Solo Training',
                    description: 'Learn basic maneuvers, takeoffs, landings, and emergency procedures in the Cirrus SR20.',
                    icon: 'fa-plane',
                    details: ['Basic Flight Maneuvers', 'Takeoffs & Landings', 'Traffic Patterns', 'Emergency Procedures', 'CAPS Training']
                },
                {
                    phase: 'Phase 3',
                    title: 'First Solo',
                    description: 'Your unforgettable moment—flying the aircraft alone for the first time around the traffic pattern.',
                    icon: 'fa-user',
                    details: ['Solo Flight in Traffic Pattern', 'Building Confidence', 'Decision Making Skills', 'Traditional Shirt-Tail Ceremony']
                },
                {
                    phase: 'Phase 4',
                    title: 'Cross-Country',
                    description: 'Navigate beyond your home airport, planning and executing flights to distant destinations.',
                    icon: 'fa-route',
                    details: ['Flight Planning', 'Cross-Country Navigation', 'Fuel Management', 'Weather Decision Making', 'Solo Cross-Country Flights']
                },
                {
                    phase: 'Phase 5',
                    title: 'Checkride Prep',
                    description: 'Final polishing of skills and comprehensive preparation for your practical exam.',
                    icon: 'fa-clipboard-check',
                    details: ['Maneuver Review', 'Oral Exam Preparation', 'Mock Checkrides', 'Final Stage Check', 'Checkride Confidence Building']
                },
                {
                    phase: 'Phase 6',
                    title: 'Checkride',
                    description: 'Demonstrate your skills to an FAA examiner and earn your Private Pilot Certificate!',
                    icon: 'fa-trophy',
                    details: ['Oral Examination', 'Practical Flight Test', 'Certificate Issuance', 'Welcome to the Pilot Community!']
                }
            ],
            investment: '$12,000 - $16,000'
        },

        instrument: {
            title: 'Instrument Rating',
            subtitle: 'Master the Art of Precision Flight',
            icon: 'fa-cloud-sun',
            description: 'The Instrument Rating transforms you from a fair-weather pilot into an all-weather aviator. Learn to fly solely by reference to instruments, navigate through clouds, and utilize the full capabilities of the Cirrus SR20\'s advanced Garmin G1000 avionics.',
            duration: '3-5 months',
            hours: '40+ instrument hours',
            requirements: [
                'Hold a Private Pilot Certificate',
                '50 hours of cross-country PIC time',
                'Be able to read, speak, and understand English',
                'Pass the FAA Instrument written exam',
                'Pass the practical (checkride) exam'
            ],
            steps: [
                {
                    phase: 'Phase 1',
                    title: 'Instrument Ground',
                    description: 'Deep dive into IFR procedures, regulations, weather theory, and approach plate interpretation.',
                    icon: 'fa-book',
                    details: ['IFR Regulations (Part 91)', 'Weather Theory & Interpretation', 'Approach Plate Reading', 'IFR Flight Planning', 'ATC Communication']
                },
                {
                    phase: 'Phase 2',
                    title: 'Basic Attitude',
                    description: 'Master flying by reference to instruments using the full-panel and partial-panel techniques.',
                    icon: 'fa-tachometer-alt',
                    details: ['Full Panel Flying', 'Partial Panel Techniques', 'Unusual Attitude Recovery', 'Instrument Scan Development', 'G1000 Proficiency']
                },
                {
                    phase: 'Phase 3',
                    title: 'Navigation',
                    description: 'Navigate using VORs, GPS, and the Garmin G1000 integrated flight deck.',
                    icon: 'fa-compass',
                    details: ['VOR Navigation', 'GPS Navigation', 'Holding Patterns', 'DME Arcs', 'Airways & Routing']
                },
                {
                    phase: 'Phase 4',
                    title: 'Approaches',
                    description: 'Execute precision and non-precision approaches including ILS, VOR, RNAV/GPS, and more.',
                    icon: 'fa-plane-arrival',
                    details: ['ILS Approaches', 'VOR Approaches', 'RNAV/GPS Approaches', 'Localizer Approaches', 'Circling Approaches', 'Missed Approach Procedures']
                },
                {
                    phase: 'Phase 5',
                    title: 'IFR Cross-Country',
                    description: 'File IFR flight plans and execute instrument cross-country flights in actual conditions.',
                    icon: 'fa-route',
                    details: ['IFR Flight Planning', 'Filing & Clearances', 'Enroute Procedures', 'Real IMC Experience', 'Weather Avoidance']
                },
                {
                    phase: 'Phase 6',
                    title: 'Checkride',
                    description: 'Demonstrate instrument proficiency to an FAA examiner and add the rating to your certificate.',
                    icon: 'fa-trophy',
                    details: ['Comprehensive Oral Exam', 'Instrument Practical Test', 'Approach Demonstrations', 'IFR Rating Added!']
                }
            ],
            investment: '$14,000 - $18,000'
        },

        commercial: {
            title: 'Commercial Pilot Certificate',
            subtitle: 'Turn Your Passion Into a Profession',
            icon: 'fa-user-tie',
            description: 'The Commercial Pilot Certificate allows you to be compensated for your flying. This advanced program refines your skills to professional standards and opens doors to career opportunities in aviation.',
            duration: '6-12 months',
            hours: '250 total hours required',
            requirements: [
                'Be at least 18 years old',
                'Hold a Private Pilot Certificate',
                'Hold an Instrument Rating (for ASEL)',
                '250 hours total flight time',
                'Pass the FAA Commercial written exam',
                'Pass the practical (checkride) exam'
            ],
            steps: [
                {
                    phase: 'Phase 1',
                    title: 'Commercial Ground',
                    description: 'Advanced aerodynamics, commercial regulations, and professional pilot operations.',
                    icon: 'fa-book',
                    details: ['Advanced Aerodynamics', 'Commercial Operations (Part 91 & 135)', 'Weight & Balance', 'Performance Charts', 'Advanced Weather']
                },
                {
                    phase: 'Phase 2',
                    title: 'Time Building',
                    description: 'Build the required 250 hours with structured cross-country flights and skill development.',
                    icon: 'fa-clock',
                    details: ['Solo Cross-Country Flights', 'Long Cross-Country (300nm)', 'Night Flight Building', 'PIC Time Accumulation', 'Diverse Airport Experience']
                },
                {
                    phase: 'Phase 3',
                    title: 'Commercial Maneuvers',
                    description: 'Master advanced maneuvers performed to commercial pilot standards.',
                    icon: 'fa-plane',
                    details: ['Chandelles', 'Lazy Eights', 'Steep Spirals', 'Eights on Pylons', 'Power-Off 180° Accuracy Landings']
                },
                {
                    phase: 'Phase 4',
                    title: 'Complex/TAA',
                    description: 'The Cirrus SR20 qualifies as a Technically Advanced Aircraft (TAA) for commercial training.',
                    icon: 'fa-cogs',
                    details: ['TAA Requirements Met', 'Advanced Systems Management', 'Autopilot Utilization', 'Glass Cockpit Proficiency']
                },
                {
                    phase: 'Phase 5',
                    title: 'Stage Checks',
                    description: 'Comprehensive evaluation of all commercial maneuvers and procedures.',
                    icon: 'fa-clipboard-check',
                    details: ['Maneuver Proficiency Check', 'Oral Exam Preparation', 'Mock Checkrides', 'Final Stage Check']
                },
                {
                    phase: 'Phase 6',
                    title: 'Checkride',
                    description: 'Earn your Commercial Pilot Certificate and begin your professional aviation career.',
                    icon: 'fa-trophy',
                    details: ['Comprehensive Oral Exam', 'Commercial Practical Test', 'Maneuver Demonstrations', 'Welcome to Professional Aviation!']
                }
            ],
            investment: '$25,000 - $35,000'
        }
    };

    const data = ratings[rating];
    if (!data) return '<p>Rating not found.</p>';

    return `
        <div class="modal-rating">
            <div class="modal-header-section">
                <div class="modal-icon">
                    <i class="fas ${data.icon}"></i>
                </div>
                <div class="modal-header-text">
                    <h2>${data.title}</h2>
                    <p class="modal-subtitle">${data.subtitle}</p>
                </div>
            </div>

            <div class="modal-overview">
                <p>${data.description}</p>
                <div class="modal-stats">
                    <div class="modal-stat">
                        <i class="fas fa-clock"></i>
                        <span>${data.duration}</span>
                    </div>
                    <div class="modal-stat">
                        <i class="fas fa-plane"></i>
                        <span>${data.hours}</span>
                    </div>
                    <div class="modal-stat">
                        <i class="fas fa-dollar-sign"></i>
                        <span>${data.investment}</span>
                    </div>
                </div>
            </div>

            <div class="modal-section">
                <h3><i class="fas fa-list-check"></i> Requirements</h3>
                <ul class="requirements-list">
                    ${data.requirements.map(req => `<li><i class="fas fa-check"></i> ${req}</li>`).join('')}
                </ul>
            </div>

            <div class="modal-section">
                <h3><i class="fas fa-road"></i> Your Training Journey</h3>
                <div class="timeline">
                    ${data.steps.map((step, index) => `
                        <div class="timeline-step" data-step="${index + 1}">
                            <div class="timeline-marker">
                                <div class="timeline-icon">
                                    <i class="fas ${step.icon}"></i>
                                </div>
                                ${index < data.steps.length - 1 ? '<div class="timeline-line"></div>' : ''}
                            </div>
                            <div class="timeline-content">
                                <span class="timeline-phase">${step.phase}</span>
                                <h4>${step.title}</h4>
                                <p>${step.description}</p>
                                <div class="timeline-details">
                                    ${step.details.map(detail => `<span class="detail-tag">${detail}</span>`).join('')}
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <div class="modal-cta">
                <a href="#contact" class="btn btn-primary" onclick="closeRatingModal()">
                    <span>Start This Program</span>
                    <i class="fas fa-arrow-right"></i>
                </a>
                <a href="calendar.html" class="btn btn-secondary">
                    <span>View Availability</span>
                    <i class="fas fa-calendar-alt"></i>
                </a>
            </div>
        </div>

        <style>
            .modal-rating {
                color: var(--white);
            }

            .modal-header-section {
                display: flex;
                align-items: center;
                gap: 25px;
                margin-bottom: 30px;
            }

            .modal-icon {
                width: 80px;
                height: 80px;
                background: rgba(201, 162, 39, 0.15);
                border: 2px solid var(--gold);
                border-radius: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 32px;
                color: var(--gold);
                flex-shrink: 0;
            }

            .modal-header-text h2 {
                font-size: 32px;
                margin-bottom: 8px;
            }

            .modal-subtitle {
                color: var(--gold);
                font-size: 16px;
                font-weight: 500;
            }

            .modal-overview {
                background: rgba(10, 22, 40, 0.5);
                border-radius: 15px;
                padding: 25px;
                margin-bottom: 30px;
            }

            .modal-overview p {
                font-size: 16px;
                line-height: 1.7;
                color: var(--gray-light);
                margin-bottom: 20px;
            }

            .modal-stats {
                display: flex;
                gap: 30px;
                flex-wrap: wrap;
            }

            .modal-stat {
                display: flex;
                align-items: center;
                gap: 10px;
                color: var(--gold);
                font-weight: 600;
            }

            .modal-stat i {
                font-size: 18px;
            }

            .modal-section {
                margin-bottom: 35px;
            }

            .modal-section h3 {
                display: flex;
                align-items: center;
                gap: 12px;
                font-family: var(--font-primary);
                font-size: 18px;
                font-weight: 600;
                color: var(--gold);
                margin-bottom: 20px;
            }

            .requirements-list {
                list-style: none;
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 12px;
            }

            .requirements-list li {
                display: flex;
                align-items: center;
                gap: 12px;
                padding: 12px 15px;
                background: rgba(10, 22, 40, 0.3);
                border-radius: 8px;
                font-size: 14px;
            }

            .requirements-list i {
                color: var(--gold);
                font-size: 12px;
            }

            .timeline {
                position: relative;
            }

            .timeline-step {
                display: flex;
                gap: 25px;
                margin-bottom: 30px;
                opacity: 0;
                transform: translateX(-20px);
                transition: all 0.5s ease;
            }

            .timeline-step.visible {
                opacity: 1;
                transform: translateX(0);
            }

            .timeline-step:last-child {
                margin-bottom: 0;
            }

            .timeline-marker {
                display: flex;
                flex-direction: column;
                align-items: center;
                flex-shrink: 0;
            }

            .timeline-icon {
                width: 50px;
                height: 50px;
                background: var(--gold);
                border-radius: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: var(--navy-dark);
                font-size: 20px;
                position: relative;
                z-index: 1;
            }

            .timeline-line {
                width: 2px;
                flex: 1;
                min-height: 30px;
                background: linear-gradient(180deg, var(--gold) 0%, rgba(201, 162, 39, 0.2) 100%);
                margin-top: 10px;
            }

            .timeline-content {
                flex: 1;
                padding-bottom: 20px;
            }

            .timeline-phase {
                display: inline-block;
                font-size: 11px;
                font-weight: 600;
                letter-spacing: 2px;
                color: var(--gold);
                text-transform: uppercase;
                margin-bottom: 8px;
            }

            .timeline-content h4 {
                font-family: var(--font-primary);
                font-size: 18px;
                font-weight: 600;
                margin-bottom: 10px;
            }

            .timeline-content p {
                font-size: 14px;
                color: var(--gray);
                line-height: 1.6;
                margin-bottom: 15px;
            }

            .timeline-details {
                display: flex;
                flex-wrap: wrap;
                gap: 8px;
            }

            .detail-tag {
                display: inline-block;
                padding: 5px 12px;
                background: rgba(201, 162, 39, 0.1);
                border: 1px solid rgba(201, 162, 39, 0.3);
                border-radius: 20px;
                font-size: 12px;
                color: var(--gold);
            }

            .modal-cta {
                display: flex;
                gap: 15px;
                padding-top: 20px;
                border-top: 1px solid rgba(255, 255, 255, 0.1);
                flex-wrap: wrap;
            }

            @media (max-width: 768px) {
                .modal-header-section {
                    flex-direction: column;
                    text-align: center;
                }

                .modal-stats {
                    justify-content: center;
                }

                .timeline-step {
                    gap: 15px;
                }

                .timeline-icon {
                    width: 40px;
                    height: 40px;
                    font-size: 16px;
                }

                .modal-cta {
                    flex-direction: column;
                }

                .modal-cta .btn {
                    width: 100%;
                    justify-content: center;
                }
            }
        </style>
    `;
}
