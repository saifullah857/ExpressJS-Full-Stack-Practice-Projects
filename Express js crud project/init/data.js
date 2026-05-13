const sampleData = [
  {
    name: "Saad Ahmed",
    department: "Electrical Engineering",
    image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
    semester: 3,
    description: "An aspiring engineer interested in embedded systems and electronics.",
    collegeName: "FAST NUCES",
    location: "Islamabad, Pakistan",
    cgpa: 3.15
  },

  {
    name: "Ali Raza",
    department: "Computer Science",
    image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
    semester: 5,
    description: "Passionate about artificial intelligence and full-stack development.",
    collegeName: "Punjab University",
    location: "Lahore, Pakistan",
    cgpa: 3.45
  },

  {
    name: "Hina Khan",
    department: "Pharmacy",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
    semester: 7,
    description: "Focused on clinical pharmacy and patient counseling.",
    collegeName: "University of Lahore",
    location: "Lahore, Pakistan",
    cgpa: 3.82
  },

  {
    name: "Ayesha Bibi",
    department: "Business Administration",
    image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
    semester: 2,
    description: "Business student with strong interest in marketing and branding.",
    collegeName: "LUMS",
    location: "Lahore, Pakistan",
    cgpa: 3.90
  },

  {
    name: "Hamza Malik",
    department: "Mechanical Engineering",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
    semester: 6,
    description: "Enjoys robotics and mechanical design projects.",
    collegeName: "UET Lahore",
    location: "Lahore, Pakistan",
    cgpa: 3.28
  },

  {
    name: "Farah Javed",
    department: "Software Engineering",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    semester: 4,
    description: "Interested in UX/UI and front-end development.",
    collegeName: "Comsats University",
    location: "Islamabad, Pakistan",
    cgpa: 3.67
  },

  {
    name: "Bilal Hussain",
    department: "Civil Engineering",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
    semester: 8,
    description: "Loves structural design and construction management.",
    collegeName: "NED University",
    location: "Karachi, Pakistan",
    cgpa: 3.11
  },

  {
    name: "Nimra Shah",
    department: "Psychology",
    image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
    semester: 3,
    description: "Passionate about mental health counseling and research.",
    collegeName: "Kinnaird College",
    location: "Lahore, Pakistan",
    cgpa: 3.85
  },

  {
    name: "Umar Farooq",
    department: "Data Science",
    image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
    semester: 5,
    description: "Enjoys machine learning, deep learning, and analytics.",
    collegeName: "FAST NUCES",
    location: "Lahore, Pakistan",
    cgpa: 3.70
  },

  {
    name: "Shazia Noreen",
    department: "Biotechnology",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
    semester: 6,
    description: "Biotech student doing research in genetic engineering.",
    collegeName: "University of Karachi",
    location: "Karachi, Pakistan",
    cgpa: 3.52
  },

  {
    name: "Adeel Sharif",
    department: "Artificial Intelligence",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    semester: 4,
    description: "Loves neural networks and intelligent systems.",
    collegeName: "Air University",
    location: "Islamabad, Pakistan",
    cgpa: 3.60
  },

  {
    name: "Kiran Fatima",
    department: "English Literature",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
    semester: 2,
    description: "Interested in writing, poetry, and classical literature.",
    collegeName: "Forman Christian College",
    location: "Lahore, Pakistan",
    cgpa: 3.88
  },

  {
    name: "Rizwan Ali",
    department: "Cyber Security",
    image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
    semester: 7,
    description: "Passionate about ethical hacking and secure systems.",
    collegeName: "Superior University",
    location: "Lahore, Pakistan",
    cgpa: 3.49
  },

  {
    name: "Maham Tariq",
    department: "Sociology",
    image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
    semester: 3,
    description: "Studies social behavior and community development.",
    collegeName: "GCU Lahore",
    location: "Lahore, Pakistan",
    cgpa: 3.75
  },

  {
    name: "Azlan Haider",
    department: "Marketing",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    semester: 6,
    description: "Interested in digital marketing and brand strategies.",
    collegeName: "Iqra University",
    location: "Karachi, Pakistan",
    cgpa: 3.29
  },

  {
    name: "Zara Ansari",
    department: "Computer Science",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
    semester: 1,
    description: "First-semester student, passionate about coding.",
    collegeName: "FAST University",
    location: "Islamabad, Pakistan",
    cgpa: 3.92
  },

  {
    name: "Adnan Yousaf",
    department: "Information Technology",
    image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
    semester: 8,
    description: "Specializes in cloud computing and system administration.",
    collegeName: "Virtual University",
    location: "Lahore, Pakistan",
    cgpa: 3.33
  },

  {
    name: "Sania Gul",
    department: "Chemistry",
    image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
    semester: 5,
    description: "Loves organic chemistry and laboratory research.",
    collegeName: "Quaid-i-Azam University",
    location: "Islamabad",
    cgpa: 3.66
  },

  {
    name: "Imran Bashir",
    department: "Electrical Engineering",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
    semester: 2,
    description: "Beginner engineer learning circuit design.",
    collegeName: "UET Taxila",
    location: "Taxila, Pakistan",
    cgpa: 3.10
  },

  {
    name: "Maria Iqbal",
    department: "Fine Arts",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
    semester: 7,
    description: "Creative artist specializing in sketching and painting.",
    collegeName: "National College of Arts",
    location: "Lahore, Pakistan",
    cgpa: 3.80
  },

  {
    name: "Talha Rehman",
    department: "BS Mathematics",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    semester: 4,
    description: "Interested in statistics and mathematical problem solving.",
    collegeName: "GCU Lahore",
    location: "Lahore, Pakistan",
    cgpa: 3.58
  },

  {
    name: "Hira Salman",
    department: "Computer Engineering",
    image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
    semester: 6,
    description: "Works on microprocessors and hardware programming.",
    collegeName: "NUST",
    location: "Islamabad, Pakistan",
    cgpa: 3.72
  },

  {
    name: "Usman Javed",
    department: "Economics",
    image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
    semester: 3,
    description: "Economics student passionate about financial markets.",
    collegeName: "Lahore School of Economics",
    location: "Lahore, Pakistan",
    cgpa: 3.40
  }
];

module.exports={data:sampleData};