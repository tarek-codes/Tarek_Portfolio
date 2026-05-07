export const PERSONAL_INFO = {
  name: "Tarek Alam Bhuiyan",
  nameBn: "তারেক আলম ভুইয়া",
  username: "2ManyFaces",
  title: "Machine Learning | Data Science | Software Engineering",
  location: "Mohammadpur, Dhaka - 1207",
  email: "tarekalambhuiyan@gmail.com",
  phone: "+8801601070407",
  university: "BRAC University",
  degree: "Bachelor of Science (BSc.) in Computer Science and Engineering",
  cgpa: "3.37",
  graduation: "January 2026",
  profileImageUrl: "/profile-v2.jpg",
  codeforcesHandle: "",
  leetcodeHandle: "2ManyFaces",
  codechefHandle: "",
  githubUrl: "https://github.com/2ManyFaces",
  linkedinUrl: "https://www.linkedin.com/in/tarekalambhuiyan",
  twitterUrl: "",
  facebookUrl: "",
  instagramUrl: "",
  discordUrl: "",
  codeforcesUrl: "",
  leetcodeUrl: "https://leetcode.com/u/2ManyFaces/",
  codechefUrl: "",
};

export type AboutCardIconKey =
  | "code"
  | "education"
  | "competitive"
  | "location"
  | "current"
  | "interests";

export type AboutCardToneKey =
  | "blue"
  | "green"
  | "yellow"
  | "pink"
  | "mauve"
  | "red";

export type AboutCardLayoutKey = "default" | "feature";

export type AboutCardContent =
  | {
    kind: "paragraph";
    text: string;
  }
  | {
    kind: "list";
    items: string[];
  };

export interface AboutCard {
  id: string;
  eyebrow: string;
  label: string;
  icon: AboutCardIconKey;
  tone: AboutCardToneKey;
  layout: AboutCardLayoutKey;
  content: AboutCardContent;
}

export const ABOUT_CARDS: AboutCard[] = [
  {
    id: "bio",
    eyebrow: "Profile",
    label: "Bio",
    icon: "code",
    tone: "blue",
    layout: "feature",
    content: {
      kind: "paragraph",
      text: "Computer Science undergraduate with hands-on experience in Machine Learning, Data Science, Data Analytics, NLP, and full-stack development. Skilled in Python, JavaScript, and SQL, with experience developing ML pipelines and building scalable web applications.",
    },
  },
  {
    id: "education",
    eyebrow: "Academic",
    label: "Education",
    icon: "education",
    tone: "green",
    layout: "default",
    content: {
      kind: "list",
      items: [
        PERSONAL_INFO.degree,
        PERSONAL_INFO.university,
        "2022 – 2026",
      ],
    },
  },
  {
    id: "competitive",
    eyebrow: "Coding",
    label: "Problem Solving",
    icon: "competitive",
    tone: "yellow",
    layout: "default",
    content: {
      kind: "list",
      items: [
        "LeetCode: 2ManyFaces",
        "Active on GitHub",
        "ML pipelines & Deep learning",
      ],
    },
  },
  {
    id: "location",
    eyebrow: "Availability",
    label: "Location",
    icon: "location",
    tone: "pink",
    layout: "default",
    content: {
      kind: "list",
      items: [
        PERSONAL_INFO.location,
        "Open to opportunities worldwide",
        "Open to opportunities in Bangladesh",
      ],
    },
  },
  {
    id: "current",
    eyebrow: "Now",
    label: "Currently",
    icon: "current",
    tone: "mauve",
    layout: "feature",
    content: {
      kind: "paragraph",
      text: "Trainee Technology Specialist at Betopia Limited, selected among the top 40 candidates for the Betopia Tech Recruitment Program (BTRP), working on software, data, and AI-related solutions.",
    },
  },
  {
    id: "interests",
    eyebrow: "Focus",
    label: "Interests",
    icon: "interests",
    tone: "red",
    layout: "default",
    content: {
      kind: "list",
      items: [
        "Machine Learning & Deep Learning",
        "Natural Language Processing",
        "Data Science & Analytics",
        "Full-stack Web Development",
      ],
    },
  },
];

export const SKILLS = {
  languages: [
    { name: "Python", level: "Advanced", category: "Programming Language" },
    { name: "HTML", level: "Intermediate", category: "Programming Language" },
    { name: "CSS", level: "Intermediate", category: "Programming Language" },
    { name: "JavaScript", level: "Intermediate", category: "Programming Language" },
    { name: "TypeScript", level: "Intermediate", category: "Programming Language" },
    { name: "PHP", level: "Intermediate", category: "Programming Language" },
    { name: "C", level: "Intermediate", category: "Programming Language" },
    { name: "C++", level: "Intermediate", category: "Programming Language" },
    { name: "SQL", level: "Intermediate", category: "Programming Language" },
  ],
  frameworks: [
    { name: "Next.js", level: "Intermediate", category: "Framework" },
    { name: "Laravel", level: "Intermediate", category: "Framework" },
    { name: "Django", level: "Intermediate", category: "Framework" },
    { name: "Tensorflow", level: "Intermediate", category: "Framework" },
    { name: "Pytorch", level: "Intermediate", category: "Framework" },
  ],
  tools: [
    { name: "PostgreSQL", level: "Intermediate", category: "Database" },
    { name: "MySQL", level: "Intermediate", category: "Database" },
    { name: "MongoDB", level: "Intermediate", category: "Database" },
    { name: "Docker", level: "Intermediate", category: "Database" },
    { name: "Git", level: "Advanced", category: "Tool" },
    { name: "GitHub", level: "Advanced", category: "Tool" },
    { name: "Excel", level: "Intermediate", category: "Tool" },
    { name: "Figma", level: "Beginner", category: "Tool" },
  ],
  fundamentals: [
    { name: "OOP", level: "Advanced", category: "Fundamental" },
    { name: "DSA", level: "Intermediate", category: "Fundamental" },
    { name: "DBMS", level: "Intermediate", category: "Fundamental" },
    { name: "System Design", level: "Intermediate", category: "Fundamental" },
    { name: "OS", level: "Advanced", category: "Fundamental" },
    { name: "Networking", level: "Intermediate", category: "Fundamental" },

  ],
};

export interface SkillLogo {
  name: string;
  path?: string;
  darkPath?: string;
  lightPath?: string;
}

export type ProjectStatusKey = "active" | "stable" | "prototype" | "research";

export interface Project {
  title: string;
  description: string;
  techStack: string[];
  githubUrl: string;
  githubRepo: string;
  liveUrl: string | null;
  featured: boolean;
  wide?: boolean;
  image: string;
  category: string;
  extensionId?: string;
  status?: ProjectStatusKey;
  tags?: string[];
  highlight?: string;
}

export const SKILL_LOGOS: SkillLogo[] = [
  { name: "Python", path: "/tech-logos/python.svg" },
  { name: "HTML", path: "/tech-logos/html.svg" },
  { name: "CSS", path: "/tech-logos/css.svg" },
  { name: "JavaScript", path: "/tech-logos/javascript.svg" },
  { name: "TypeScript", path: "/tech-logos/typescript.svg" },
  { name: "PHP", path: "/tech-logos/php.svg" },
  { name: "C", path: "/tech-logos/c.svg" },
  { name: "C++", path: "/tech-logos/cpp.svg" },
  { name: "Next.js", path: "/tech-logos/nextjs.svg" },
  { name: "Laravel", path: "/tech-logos/laravel.svg" },
  { name: "Django", path: "/tech-logos/django.svg" },
  { name: "Tensorflow", path: "/tech-logos/tensorflow.svg" },
  { name: "Pytorch", path: "/tech-logos/pytorch.svg" },
  { name: "PostgreSQL", path: "/tech-logos/postgresql.svg" },
  {
    name: "MySQL",
    darkPath: "/tech-logos/mysql-d.svg",
    lightPath: "/tech-logos/mysql-l.svg",
  },
  { name: "MongoDB", path: "/tech-logos/mongodb.svg" },
  { name: "Docker", path: "/tech-logos/docker.svg" },
  { name: "Git", path: "/tech-logos/git.svg" },
  { name: "GitHub", path: "/tech-logos/github.svg" },
  { name: "Excel", path: "/tech-logos/excel.svg" },
  { name: "Figma", path: "/tech-logos/figma.svg" },
];

export const PROJECTS: Project[] = [
  {
    title: "MycoPredict",
    description:
      "Mushroom edibility classification using ML on the UCI Mushroom Dataset (8,124 samples, 22 features). Includes EDA, feature engineering with label encoding, and training of multiple models evaluated by accuracy, F1-score, recall, and AUC.",
    techStack: ["NumPy", "Pandas", "Matplotlib", "Seaborn", "Scikit-learn"],
    githubUrl: "https://github.com/2ManyFaces/MycoPredict-Mushroom-Edibility-Prediction-Using-ML",
    githubRepo: "2ManyFaces/MycoPredict-Mushroom-Edibility-Prediction-Using-ML",
    liveUrl: null,
    featured: true,
    wide: true,
    image: "/projects/mycopredict-v2.png",
    category: "Machine Learning",
    status: "stable",
    tags: ["Classification", "EDA", "Scikit-learn"],
    highlight: "Multi-model ML classifier with AUC evaluation",
  },
  {
    title: "Word2Sense",
    description:
      "Comparative study of word representations (BoW, TF-IDF, GloVe, Skip-gram) with ML and neural models on ~340k QA pairs across 10 categories. Best result: BiLSTM + Skip-gram → 0.725 accuracy.",
    techStack: ["NumPy", "Pandas", "Matplotlib", "TensorFlow", "Keras", "Scikit-learn"],
    githubUrl: "https://github.com/2ManyFaces/Word2Sense_Multi-Class-Text-Classification",
    githubRepo: "2ManyFaces/Word2Sense_Multi-Class-Text-Classification",
    liveUrl: null,
    featured: true,
    wide: true,
    image: "/projects/word2sense-v2.png",
    category: "Natural Language Processing",
    status: "research",
    tags: ["NLP", "BiLSTM", "Text Classification"],
    highlight: "BiLSTM + Skip-gram achieving 0.725 accuracy",
  },
  {
    title: "PetSphere",
    description:
      "Comprehensive pet adoption and management system with health tracking, REST APIs, JWT authentication, role-based dashboards, and real-time chat via Socket.IO. Built collaboratively in an agile 4-member team.",
    techStack: ["Node.js", "Express.js", "Tailwind CSS", "MongoDB"],
    githubUrl: "https://github.com/2ManyFaces/PetSphere_CSE471_Section06_Group07",
    githubRepo: "2ManyFaces/PetSphere_CSE471_Section06_Group07",
    liveUrl: null,
    featured: true,
    image: "/projects/petsphere-v2.jpg",
    category: "Web Development",
    status: "stable",
    tags: ["Full-stack", "Socket.IO", "JWT"],
    highlight: "Real-time pet adoption platform with role-based access",
  },
  {
    title: "VibeSpot",
    description:
      "A dynamic social hangout platform designed to connect people based on shared 'vibes' and local activities. Features real-time discovery, interactive maps, and event coordination, built with a focus on modern user experience and scalable architecture.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Node.js"],
    githubUrl: "https://github.com/betopia-btrp/VibeSpot-Hangout-Platform",
    githubRepo: "betopia-btrp/VibeSpot-Hangout-Platform",
    liveUrl: null,
    featured: true,
    image: "/projects/vibespot.png",
    category: "Web Development",
    status: "active",
    tags: ["Social", "Real-time", "Full-stack"],
    highlight: "Interactive social discovery & hangout platform",
  },
];


export type AchievementType =
  | "competition"
  | "scholarship"
  | "academic"
  | "rating"
  | "certification"
  | "training"
  | "volunteer";

export type AchievementViewType = "link" | "image";

export interface Achievement {
  title: string;
  organization: string;
  date: string;
  description: string;
  link: string | null;
  certificateImage: string | null;
  type: AchievementType;
  viewType: AchievementViewType;
  featured?: boolean;
}

export const ACHIEVEMENTS: Achievement[] = [

  {
    title: "AI Fundamentals",
    organization: "DataCamp",
    date: "2024",
    description: "Certification in fundamental concepts of Artificial Intelligence",
    link: null,
    certificateImage: null,
    type: "certification",
    viewType: "link",
  },
  {
    title: "Intermediate SQL",
    organization: "DataCamp",
    date: "2024",
    description: "Certification in intermediate level SQL for data analysis",
    link: null,
    certificateImage: null,
    type: "certification",
    viewType: "link",
  },
  {
    title: "93% in English (Mentors' After SSC Speaking Course)",
    organization: "Mentors",
    date: "2021",
    description: "Exceptional performance in the Mentors After SSC English program",
    link: null,
    certificateImage: null,
    type: "academic",
    viewType: "link",
  },
  {
    title: "Duke of Edinburgh's International Award - Bronze",
    organization: "The Duke of Edinburgh's Award Foundation",
    date: "2019",
    description: "Bronze level achievement in the international youth awards program",
    link: null,
    certificateImage: null,
    type: "scholarship",
    viewType: "link",
  },
];

export const EXPERIENCE = [
  {
    title: "BSc (Eng.) in Computer Science and Engineering",
    organization: "BRAC University",
    location: "Dhaka, Bangladesh",
    startDate: "2022",
    endDate: "2026",
    description: [
      "CGPA: 3.37",
      "Focus areas: Machine Learning, Data Science, NLP, Full-stack Development",
    ],
    type: "education",
  },
  {
    title: "Trainee Technology Specialist",
    organization: "Betopia Limted",
    location: "Dhaka, Bangladesh",
    startDate: "February 2026",
    endDate: "Present",
    description: [
      "Working on software development and technical solutions",
      "Selected for competitive industry recruitment program",
    ],
    type: "work",
  },

];

export const ORGANIZING_VOLUNTEERING: {
  title: string;
  date: string;
  organization: string;
  description: string;
  category: string;
}[] = [];

export const BENGALI_TERM_OVERRIDES: ReadonlyArray<readonly [string, string]> =
  [
    ["Agent Assisted Development", "এজেন্ট অ্যাসিস্টেড ডেভেলপমেন্ট"],
    ["Competitive Programming", "কম্পিটিটিভ প্রোগ্রামিং"],
    ["problem-solving", "প্রবলেম সলভিং"],
    ["problem solving", "প্রবলেম সলভিং"],
    ["Open-source", "ওপেন-সোর্স"],
    ["opportunities", "অপরচুনিটিজ"],
    ["opportunity", "অপরচুনিটি"],
    ["featured", "ফিচার্ড"],
    ["Featured", "ফিচার্ড"],
    ["technologies", "টেকনোলজিস"],
    ["Technologies", "টেকনোলজিস"],
    ["skills", "স্কিলস"],
    ["Skills", "স্কিলস"],
    ["teaching", "টিচিং"],
    ["Teaching", "টিচিং"],
    ["training", "ট্রেনিং"],
    ["Training", "ট্রেনিং"],
    ["modern", "মডার্ন"],
    ["Modern", "মডার্ন"],
    ["real", "রিয়েল"],
    ["Real", "রিয়েল"],
    ["clean", "ক্লিন"],
    ["Clean", "ক্লিন"],
    ["efficient", "এফিশিয়েন্ট"],
    ["Efficient", "এফিশিয়েন্ট"],
    ["reliable", "রিলায়েবল"],
    ["Reliable", "রিলায়েবল"],
    ["complex", "কমপ্লেক্স"],
    ["Complex", "কমপ্লেক্স"],
    ["idea", "আইডিয়া"],
    ["Idea", "আইডিয়া"],
    ["development", "ডেভেলপমেন্ট"],
    ["Development", "ডেভেলপমেন্ট"],
    ["assisted", "অ্যাসিস্টেড"],
    ["Assisted", "অ্যাসিস্টেড"],
    ["resume", "রেজুমে"],
    ["Resume", "রেজুমে"],
    ["competitive", "কম্পিটিটিভ"],
    ["Competitive", "কম্পিটিটিভ"],
    ["open", "অপেন"],
    ["Open", "অপেন"],
    ["hidden", "হিডেন"],
    ["Hidden", "হিডেন"],
    ["experience", "এক্সপেরিয়েন্স"],
    ["Experience", "এক্সপেরিয়েন্স"],
    ["AI/ML", "এআই/এমএল"],
    ["AI", "এআই"],
    ["CGPA", "সিজিপিএ"],
    ["cgpa", "সিজিপিএ"],
    ["7th", "৭ম"],
    ["Semester", "সেমিস্টার"],
    ["semester", "সেমিস্টার"],
    ["Dhaka", "ঢাকা"],
    ["Bangladesh", "বাংলাদেশ"],
    ["BRAC University", "ব্র্যাক ইউনিভার্সিটি"],
    [
      "World Mathematics Team Championship",
      "ওয়ার্ল্ড ম্যাথেমেটিক্স টিম চ্যাম্পিয়নশিপ",
    ],
    ["National Initiative", "জাতীয় ইনিশিয়েটিভ"],
    ["January", "জানুয়ারি"],
    ["February", "ফেব্রুয়ারি"],
    ["March", "মার্চ"],
    ["April", "এপ্রিল"],
    ["May", "মে"],
    ["June", "জুন"],
    ["July", "জুলাই"],
    ["August", "আগস্ট"],
    ["September", "সেপ্টেম্বর"],
    ["October", "অক্টোবর"],
    ["November", "নভেম্বর"],
    ["December", "ডিসেম্বর"],
    ["Present", "বর্তমান"],
    ["Expected", "প্রত্যাশিত"],
  ];

export const BENGALI_DIGIT_MAP: Readonly<Record<string, string>> = {
  "0": "০",
  "1": "১",
  "2": "২",
  "3": "৩",
  "4": "৪",
  "5": "৫",
  "6": "৬",
  "7": "৭",
  "8": "৮",
  "9": "৯",
};