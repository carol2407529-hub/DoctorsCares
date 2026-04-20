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
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load', function(){
         $('.fa-bars').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if($(window).scrollTop() > 30){
            $('header').addClass('header-active');
        } else {
            $('header').removeClass('header-active');

        }
    });
});

