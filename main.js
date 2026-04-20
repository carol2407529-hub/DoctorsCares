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
        if($(window).scrollTop() > 30){
            $('header').addClass('header-active');
        } else {
            $('header').removeClass('header-active');

        }
    });
});

