const doctors = [
    {
        name: "Dr. Hassan Mahmoud", title: "Professor", specialty: "Cardiology",
        gender: "Male", price: 600, location: "New Cairo", rate: 5,
        img: "https://randomuser.me/api/portraits/men/32.jpg",
        experience: "18 yrs exp", available: true
    },
    {
        name: "Dr. Layla Zaki", title: "Consultant", specialty: "Dermatology",
        gender: "Female", price: 450, location: "Maadi", rate: 4,
        img: "https://randomuser.me/api/portraits/women/44.jpg",
        experience: "12 yrs exp", available: true
    },
    {
        name: "Dr. Sherif Omar", title: "Specialist", specialty: "Orthopedics",
        gender: "Male", price: 300, location: "Nasr City", rate: 5,
        img: "https://randomuser.me/api/portraits/men/85.jpg",
        experience: "9 yrs exp", available: false
    },
        {
        name: "Dr. Nour El-Din", title: "Professor", specialty: "Neurology",
        gender: "Male", price: 850, location: "Zamalek", rate: 5,
        img: "https://randomuser.me/api/portraits/men/22.jpg",
        experience: "22 yrs exp", available: true
    },
    {
        name: "Dr. Sara Ahmed", title: "Consultant", specialty: "Pediatrics",
        gender: "Female", price: 400, location: "Heliopolis", rate: 5,
        img: "https://randomuser.me/api/portraits/women/26.jpg",
        experience: "14 yrs exp", available: true
    },
   {
        name: "Dr. Tarek Saleh", title: "Specialist", specialty: "Ophthalmology",
        gender: "Male", price: 350, location: "6th of October", rate: 4,
        img: "https://randomuser.me/api/portraits/men/67.jpg",
        experience: "7 yrs exp", available: true
    }
];
       $(document).ready(function () {

    // ─── Header scroll effect ───────────────────────────────
    $(window).on('scroll', function () {
        if ($(this).scrollTop() > 60) {
            $('#main-header').addClass('scrolled');
        } else {
            $('#main-header').removeClass('scrolled');
        }
    });
// ─── Render Doctor Cards ─────────────────────────────────
    function renderStars(rate) {
        return '★'.repeat(rate) + '☆'.repeat(5 - rate);
    }

    function displayDoctors(data) {
        $('#results-count').text(`Showing ${data.length} specialist${data.length !== 1 ? 's' : ''}`);
        if (!data.length) {
            $('#doctor-list').html(`
                <div style="grid-column:1/-1; text-align:center; padding:6rem 2rem;">
                    <i class="fas fa-user-md" style="font-size:5rem; color:#cbd5e1; margin-bottom:2rem; display:block;"></i>
                    <p style="font-size:1.8rem; color:#94a3b8; font-weight:500;">No doctors match your filters.</p>
                    <p style="font-size:1.5rem; color:#cbd5e1; margin-top:0.8rem;">Try adjusting or clearing the filters.</p>
                </div>
            `);
            return;
        }
        let cards = '';
        data.forEach(dr => {
            cards += `
            <div class="dr-card" data-name="${dr.name}" data-specialty="${dr.specialty}" data-price="${dr.price}">
                ${dr.available ? `<div class="dr-badge">Available</div>` : `<div class="dr-badge" style="background:#fef3c7;color:#92400e;">Busy</div>`}
                <div class="dr-top">
                    <div class="dr-avatar">
                        <img src="${dr.img}" alt="${dr.name}" loading="lazy">
                        ${dr.available ? `<span class="dr-online"></span>` : ''}
                    </div>
                    <div>
                        <h3 class="dr-name">${dr.name}</h3>
                        <p class="dr-specialty">${dr.specialty}</p>
                        <div class="dr-rating">
                            <span class="stars">${renderStars(dr.rate)}</span>
                            <span>${dr.rate}.0 (${Math.floor(Math.random() * 900 + 100)} reviews)</span>
                        </div>
                    </div>
                </div>
                <div class="dr-divider"></div>
                <div class="dr-details">
                    <p><i class="fas fa-certificate"></i> ${dr.title}</p>
                    <p><i class="fas fa-briefcase-medical"></i> ${dr.experience}</p>
                    <p><i class="fas fa-map-marker-alt"></i> ${dr.location}</p>
                    <p><i class="fas fa-${dr.gender === 'Male' ? 'mars' : 'venus'}"></i> ${dr.gender}</p>
                </div>
                <div class="dr-footer">
                    <div class="dr-price-wrap">
                        <div class="dr-price-label">Consultation</div>
                        <div class="dr-price">${dr.price} <span>EGP</span></div>
                    </div>
                    <button class="btn-book book-btn" 
                        data-name="${dr.name}" 
                        data-specialty="${dr.specialty}" 
                        data-price="${dr.price}"
                        data-img="${dr.img}"
                        ${!dr.available ? 'disabled style="opacity:0.5;cursor:not-allowed"' : ''}>
                        <i class="fas fa-calendar-check"></i> Book
                    </button>
                </div>
            </div>`;
        });
        $('#doctor-list').html(cards);

        // Animate cards in
        $('.dr-card').each(function (i) {
            $(this).css({ opacity: 0, transform: 'translateY(20px)' });
            setTimeout(() => {
                $(this).css({ opacity: 1, transform: 'translateY(0)', transition: 'all 0.4s ease' });
            }, i * 80);
        });
    }

    displayDoctors(doctors);
 // ─── Filtering Logic ─────────────────────────────────────
    function getFilters() {
        return {
            title: $('#filter-title').val(),
            gender: $('input[name="gender"]:checked').val(),
            price: parseInt($('#filter-price').val()),
            rating: parseInt($('.star-btn.active').data('rating')) || 0,
            search: $('#search-input').val().toLowerCase().trim()
        };
    }

    function applyFilters() {
        const f = getFilters();
        const filtered = doctors.filter(dr => {
            return (
                (f.title === 'all' || dr.title === f.title) &&
                (f.gender === 'all' || dr.gender === f.gender) &&
                (dr.price <= f.price) &&
                (dr.rate >= f.rating) &&
                (!f.search || dr.name.toLowerCase().includes(f.search) || dr.specialty.toLowerCase().includes(f.search))
            );
        });
        displayDoctors(filtered);
    }
