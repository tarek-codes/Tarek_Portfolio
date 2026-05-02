import { BENGALI_DIGIT_MAP, BENGALI_TERM_OVERRIDES } from "@/lib/constants";

export const LOCALE_COOKIE_NAME = "locale";

export const SUPPORTED_LOCALES = ["en", "bn"] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

export const isLocale = (value: string | undefined | null): value is Locale =>
  Boolean(value && SUPPORTED_LOCALES.includes(value as Locale));

export const resolveLocale = (value: string | undefined | null): Locale => {
  if (!value) return DEFAULT_LOCALE;

  const lowered = value.toLowerCase();
  if (lowered.startsWith("bn")) return "bn";
  if (lowered.startsWith("en")) return "en";

  return isLocale(lowered) ? lowered : DEFAULT_LOCALE;
};

export const localeButtonLabel = "EN / বাংলা";

type TranslationSchema = {
  metadata: {
    title: string;
    description: string;
    ogDescription: string;
  };
  nav: {
    home: string;
    about: string;
    experience: string;
    skills: string;
    projects: string;
    achievements: string;
    contact: string;
  };
  common: {
    toggleLanguage: string;
  };
  hero: {
    hello: string;
    roleLine: string;
    viewWork: string;
    resume: string;
    location: string;
  };
  about: {
    badge: string;
    title: string;
    subtitle: string;
  };
  experience: {
    badge: string;
    title: string;
    subtitle: string;
    work: string;
    teaching: string;
    education: string;
    organizer: string;
    volunteer: string;
    currentWork: string;
    timeline: string;
    organizingButton: string;
    show: string;
    hide: string;
    ariaOrganizingToggle: string;
  };
  skills: {
    badge: string;
    title: string;
    subtitle: string;
    languages: string;
    frameworks: string;
    tools: string;
    fundamentals: string;
  };
  projects: {
    badge: string;
    title: string;
    subtitle: string;
    featuredTab: string;
    allTab: string;
    featuredBadge: string;
    active: string;
    stable: string;
    prototype: string;
    research: string;
    code: string;
    live: string;
    viewAllRepos: string;
    liveRepo: string;
  };
  achievements: {
    badge: string;
    title: string;
    subtitle: string;
    competition: string;
    scholarship: string;
    academic: string;
    rating: string;
    certification: string;
    training: string;
    volunteer: string;
    featured: string;
    view: string;
    certificate: string;
    moreAchievements: string;
    closeCertificate: string;
    viewCertificateFor: string;
    certificateFor: string;
  };
  contact: {
    badge: string;
    title: string;
    subtitle: string;
    socialProfiles: string;
    sendMessageTitle: string;
    name: string;
    email: string;
    message: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    messagePlaceholder: string;
    sent: string;
    sendFailed: string;
    sending: string;
    sendMessageButton: string;
  };
  stats: {
    openStatsAria: string;
    closeStatsAria: string;
    heading: string;
    liveStats: string;
    loading: string;
    rating: string;
    maxRating: string;
    rank: string;
    maxRank: string;
    solved: string;
    ranking: string;
    profile: string;
    unrated: string;
  };
  chatbot: {
    open: string;
    title: string;
    subtitle: string;
    close: string;
    introTitle: string;
    introSubtitle: string;
    placeholder: string;
    sendMessageAria: string;
  };
  footer: {
    builtWith: string;
  };
};

export const translations: Record<Locale, TranslationSchema> = {
  en: {
    metadata: {
      title: "Tarek Alam Bhuiyan - ML | Data Science | Software Engineering",
      description:
        "Portfolio of Tarek Alam Bhuiyan, a Computer Science undergraduate at BRAC University with hands-on experience in Machine Learning, Data Science, NLP, and full-stack development.",
      ogDescription:
        "ML & Data Science | CSE Student at BRAC University | Full-Stack Developer",
    },
    nav: {
      home: "Home",
      about: "About",
      experience: "Experience",
      skills: "Skills",
      projects: "Projects",
      achievements: "Achievements",
      contact: "Contact",
    },
    common: {
      toggleLanguage: "Toggle language",
    },
    hero: {
      hello: "Hello, I'm",
      roleLine:
        "Trainee Technology Specialist @ Betopia Limited",
      viewWork: "View My Work",
      resume: "Resume",
      location: "Dhaka, Bangladesh",
    },
    about: {
      badge: "About Me",
      title: "Get to Know Me",
      subtitle: "A snapshot of who I am and what I do",
    },
    experience: {
      badge: "Experience",
      title: "Work & Education",
      subtitle: "A journey through learning, building, and teaching",
      work: "Work",
      teaching: "Teaching",
      education: "Education",
      organizer: "Organizer",
      volunteer: "Volunteer",
      currentWork: "Current Work",
      timeline: "Timeline",
      organizingButton: "Organizing & Volunteering",
      show: "Show",
      hide: "Hide",
      ariaOrganizingToggle: "organizing and volunteering activities",
    },
    skills: {
      badge: "Tech Stack",
      title: "Skills & Technologies",
      subtitle: "The stack I use to ship clean, reliable products",
      languages: "Languages",
      frameworks: "Frameworks",
      tools: "Tools & Databases",
      fundamentals: "Fundamentals",
    },
    projects: {
      badge: "Portfolio",
      title: "Featured Projects",
      subtitle: "Building innovative ideas through code",
      featuredTab: "Featured",
      allTab: "All Projects",
      featuredBadge: "Featured",
      active: "Active",
      stable: "Stable",
      prototype: "Prototype",
      research: "Research",
      code: "Code",
      live: "Live",
      viewAllRepos: "View All Repositories",
      liveRepo: "Live Repo",
    },
    achievements: {
      badge: "Milestones",
      title: "Achievements & Recognition",
      subtitle:
        "Milestones in competitive programming, academics, and community service",
      competition: "Competition",
      scholarship: "Scholarship",
      academic: "Academic",
      rating: "Rating",
      certification: "Certification",
      training: "Training",
      volunteer: "Volunteer",
      featured: "Featured",
      view: "View",
      certificate: "Certificate",
      moreAchievements: "More Achievements",
      closeCertificate: "Close certificate",
      viewCertificateFor: "View certificate for",
      certificateFor: "Certificate for",
    },
    contact: {
      badge: "Get in Touch",
      title: "Let's Work Together",
      subtitle:
        "Have a project in mind? Send me a message or find me on socials.",
      socialProfiles: "Social Profiles",
      sendMessageTitle: "Send a Message",
      name: "Name",
      email: "Email",
      message: "Message",
      namePlaceholder: "John Doe",
      emailPlaceholder: "john@example.com",
      messagePlaceholder: "Tell me about your project...",
      sent: "Message sent!",
      sendFailed: "Failed to send. Please try again.",
      sending: "Sending...",
      sendMessageButton: "Send Message",
    },
    stats: {
      openStatsAria: "View competitive programming stats",
      closeStatsAria: "Close stats",
      heading: "Competitive Programming",
      liveStats: "Live Stats",
      loading: "Loading stats...",
      rating: "Rating",
      maxRating: "Max Rating",
      rank: "Rank",
      maxRank: "Max Rank",
      solved: "Solved",
      ranking: "Ranking",
      profile: "Profile",
      unrated: "Unrated",
    },
    chatbot: {
      open: "Open AI assistant",
      title: "AI Assistant",
      subtitle: "Ask me about Tarek",
      close: "Close chat",
      introTitle: "Hi! I'm Tarek's AI assistant",
      introSubtitle:
        "Ask me about his skills, projects, experience, or anything else!",
      placeholder: "Ask me anything...",
      sendMessageAria: "Send message",
    },
    footer: {
      builtWith: "Built with ❤️ by Tarek",
    },
  },
  bn: {
    metadata: {
      title: "তারেক আলম ভুইয়া - ML | ডেটা সায়েন্স | সফটওয়্যার ইঞ্জিনিয়ারিং",
      description:
        "তারেক আলম ভুইয়ার পোর্টফোলিও। ব্র্যাক ইউনিভার্সিটির CSE শিক্ষার্থী এবং ML, Data Science, NLP ও ফুল-স্ট্যাক ডেভেলপার।",
      ogDescription:
        "ML ও Data Science | ব্র্যাক ইউনিভার্সিটি CSE শিক্ষার্থী | ফুল-স্ট্যাক ডেভেলপার",
    },
    nav: {
      home: "হোম",
      about: "পরিচিতি",
      experience: "এক্সপেরিয়েন্স",
      skills: "স্কিলস",
      projects: "প্রজেক্টস",
      achievements: "অর্জন",
      contact: "যোগাযোগ",
    },
    common: {
      toggleLanguage: "ভাষা পরিবর্তন করুন",
    },
    hero: {
      hello: "হ্যালো, আমি",
      roleLine:
        "ট্রেইনি টেকনোলজি স্পেশালিস্ট @ বিটোপিয়া লিমিটেড",
      viewWork: "আমার কাজ দেখুন",
      resume: "রেজুমে",
      location: "ঢাকা, বাংলাদেশ",
    },
    about: {
      badge: "আমার সম্পর্কে",
      title: "আমাকে জানুন",
      subtitle: "আমি কে এবং কী করি তার সংক্ষিপ্ত পরিচিতি",
    },
    experience: {
      badge: "এক্সপেরিয়েন্স",
      title: "কর্মজীবন ও শিক্ষা",
      subtitle: "লার্নিং, বিল্ডিং এবং টিচিংয়ের একটি পথচলা",
      work: "কর্মজীবন",
      teaching: "টিচিং",
      education: "শিক্ষা",
      organizer: "আয়োজক",
      volunteer: "স্বেচ্ছাসেবক",
      currentWork: "বর্তমান কাজ",
      timeline: "টাইমলাইন",
      organizingButton: "আয়োজন ও স্বেচ্ছাসেবক কার্যক্রম",
      show: "দেখান",
      hide: "লুকান",
      ariaOrganizingToggle: "আয়োজন ও স্বেচ্ছাসেবক কার্যক্রম",
    },
    skills: {
      badge: "টেক স্ট্যাক",
      title: "স্কিলস ও টেকনোলজিস",
      subtitle: "ক্লিন, রিলায়েবল প্রোডাক্ট শিপ করতে যে স্ট্যাক ব্যবহার করি",
      languages: "ভাষা",
      frameworks: "ফ্রেমওয়ার্ক",
      tools: "টুলস ও ডেটাবেস",
      fundamentals: "ফান্ডামেন্টালস",
    },
    projects: {
      badge: "পোর্টফোলিও",
      title: "নির্বাচিত প্রজেক্টস",
      subtitle: "কোডের মাধ্যমে ইনোভেটিভ আইডিয়া বিল্ডিং",
      featuredTab: "নির্বাচিত",
      allTab: "সব প্রজেক্ট",
      featuredBadge: "ফিচার্ড",
      active: "চলমান",
      stable: "স্থিতিশীল",
      prototype: "প্রোটোটাইপ",
      research: "গবেষণা",
      code: "কোড",
      live: "লাইভ",
      viewAllRepos: "সব রেপোজিটরি দেখুন",
      liveRepo: "লাইভ রিপো",
    },
    achievements: {
      badge: "মাইলস্টোন",
      title: "অর্জন ও স্বীকৃতি",
      subtitle:
        "প্রতিযোগিতা, একাডেমিক এবং কমিউনিটি কাজের গুরুত্বপূর্ণ মাইলস্টোন",
      competition: "প্রতিযোগিতা",
      scholarship: "বৃত্তি",
      academic: "একাডেমিক",
      rating: "রেটিং",
      certification: "সার্টিফিকেশন",
      training: "ট্রেনিং",
      volunteer: "স্বেচ্ছাসেবক",
      featured: "ফিচার্ড",
      view: "দেখুন",
      certificate: "সার্টিফিকেট",
      moreAchievements: "আরও অর্জন",
      closeCertificate: "সার্টিফিকেট বন্ধ করুন",
      viewCertificateFor: "সার্টিফিকেট দেখুন",
      certificateFor: "সার্টিফিকেট",
    },
    contact: {
      badge: "যোগাযোগ করুন",
      title: "চলুন একসাথে কাজ করি",
      subtitle:
        "কোনো প্রজেক্ট ভাবছেন? আমাকে মেসেজ দিন অথবা সোশালে যোগাযোগ করুন।",
      socialProfiles: "সোশাল প্রোফাইল",
      sendMessageTitle: "বার্তা পাঠান",
      name: "নাম",
      email: "ইমেইল",
      message: "বার্তা",
      namePlaceholder: "আপনার নাম",
      emailPlaceholder: "আপনার ইমেইল",
      messagePlaceholder: "আপনার প্রজেক্ট সম্পর্কে লিখুন...",
      sent: "বার্তা পাঠানো হয়েছে!",
      sendFailed: "বার্তা পাঠানো যায়নি। আবার চেষ্টা করুন।",
      sending: "পাঠানো হচ্ছে...",
      sendMessageButton: "বার্তা পাঠান",
    },
    stats: {
      openStatsAria: "কম্পিটিটিভ প্রোগ্রামিং পরিসংখ্যান দেখুন",
      closeStatsAria: "পরিসংখ্যান বন্ধ করুন",
      heading: "কম্পিটিটিভ প্রোগ্রামিং",
      liveStats: "লাইভ পরিসংখ্যান",
      loading: "পরিসংখ্যান লোড হচ্ছে...",
      rating: "রেটিং",
      maxRating: "সর্বোচ্চ রেটিং",
      rank: "র‍্যাংক",
      maxRank: "সর্বোচ্চ র‍্যাংক",
      solved: "সমাধান",
      ranking: "র‍্যাঙ্কিং",
      profile: "প্রোফাইল",
      unrated: "আনরেটেড",
    },
    chatbot: {
      open: "AI সহকারী খুলুন",
      title: "AI সহকারী",
      subtitle: "তারেক সম্পর্কে জিজ্ঞেস করুন",
      close: "চ্যাট বন্ধ করুন",
      introTitle: "হাই! আমি তারেকের AI সহকারী",
      introSubtitle:
        "তার দক্ষতা, প্রজেক্ট, অভিজ্ঞতা বা যেকোনো বিষয় জানতে প্রশ্ন করুন!",
      placeholder: "যেকোনো কিছু জিজ্ঞেস করুন...",
      sendMessageAria: "বার্তা পাঠান",
    },
    footer: {
      builtWith: "তারেক দ্বারা তৈরি ❤️",
    },
  },
};

export const getCopy = (locale: Locale) => translations[locale];

const dynamicBnMap: Record<string, string> = {
  Profile: "প্রোফাইল",
  Bio: "বায়ো",
  Academic: "একাডেমিক",
  Education: "শিক্ষা",
  Performance: "পারফরম্যান্স",
  "Competitive Programming": "কম্পিটিটিভ প্রোগ্রামিং",
  Availability: "প্রাপ্যতা",
  Location: "অবস্থান",
  Now: "বর্তমান",
  Currently: "বর্তমানে",
  Focus: "ফোকাস",
  Interests: "আগ্রহ",
  "A full-stack developer and a competitive programmer from Bangladesh, focused on turning complex ideas into clean, efficient products, from ICPC problem solving to practical web applications.":
    "বাংলাদেশের একজন ফুল-স্ট্যাক ডেভেলপার ও কম্পিটিটিভ প্রোগ্রামার। ICPC প্রবলেম সলভিং থেকে রিয়েল ওয়েব অ্যাপ্লিকেশন পর্যন্ত কমপ্লেক্স আইডিয়াকে ক্লিন, এফিশিয়েন্ট প্রোডাক্টে রূপ দিতে কাজ করি।",
  "ICPC Dhaka Regionalist 2024": "ICPC ঢাকা রিজিওনালিস্ট ২০২৪",
  "Pariticipated in multiple IUPCs": "একাধিক IUPC-তে অংশগ্রহণ",
  "Codeforces Specialist (1438)": "Codeforces Specialist (1438)",
  "CodeChef 3 Star (1635)": "CodeChef 3 Star (1635)",
  "Open to opportunities worldwide": "ওয়ার্ল্ডওয়াইড অপরচুনিটিজের জন্য অপেন",
  "Open to opportunities in Bangladesh": "বাংলাদেশে অপরচুনিটিজের জন্য অপেন",
  "Agent Assisted Development and Agents":
    "এজেন্ট অ্যাসিস্টেড ডেভেলপমেন্ট এবং এজেন্টস",
  "AI/ML and systems design": "এআই/এমএল এবং সিস্টেম ডিজাইন",
  "Open-source and developer tooling": "ওপেন-সোর্স ও ডেভেলপার টুলিং",
  "Teaching and problem solving": "টিচিং এবং প্রবলেম সলভিং",
  "Trainee Technology Specialist at Betopia Limited, selected among the top 40 candidates for the Betopia Tech Recruitment Program (BTRP), working on software, data, and AI-related solutions.":
    "বিটোপিয়া লিমিটেডের ট্রেইনি টেকনোলজি স্পেশালিস্ট, বেটোপিয়া টেক রিক্রুটমেন্ট প্রোগ্রামের (BTRP) শীর্ষ ৪০ জন প্রার্থীর মধ্যে নির্বাচিত, সফটওয়্যার, ডেটা এবং এআই-সম্পর্কিত সমাধান নিয়ে কাজ করছি।",
  "Trainee Technology Specialist – Software, Data & AI Solutions":
    "ট্রেইনি টেকনোলজি স্পেশালিস্ট – সফটওয়্যার, ডেটা এবং এআই সমাধান",
  "Selected among the top 40 candidates for the Betopia Tech Recruitment Program (BTRP)":
    "বিটোপিয়া টেক রিক্রুটমেন্ট প্রোগ্রামের (BTRP) শীর্ষ ৪০ জন প্রার্থীর মধ্যে নির্বাচিত",
  "Working on software, data, and AI-related solutions":
    "সফটওয়্যার, ডেটা এবং এআই-সম্পর্কিত সমাধান নিয়ে কাজ করছি।",
  "Computer Science undergraduate with hands-on experience in Machine Learning, Data Science, NLP, and full-stack development. Skilled in Python, JavaScript, and SQL, passionate about solving real-world problems using data-driven approaches.":
    "মেশিন লার্নিং, ডেটা সায়েন্স, এনএলপি এবং ফুল-স্ট্যাক ডেভেলপমেন্টে বাস্তব অভিজ্ঞতাসম্পন্ন কম্পিউটার সায়েন্স আন্ডারগ্রাজুয়েট। পাইথন, জাভাস্ক্রিপ্ট এবং এসকিউএল-এ দক্ষ, ডেটা-চালিত পদ্ধতির মাধ্যমে বাস্তব-জগতের সমস্যা সমাধানে আগ্রহী।",
  "BSc (Eng.) in Computer Science and Engineering":
    "কম্পিউটার সায়েন্স অ্যান্ড ইঞ্জিনিয়ারিংয়ে BSc (Eng.)",
  "CGPA: 3.81 / 4.00 (after 7 semesters)":
    "সিজিপিএ: ৩.৩৭",
  "Received 2 Vice Chancellor Awards and 4 Dean's Awards":
    "২টি ভাইস চ্যান্সেলর অ্যাওয়ার্ড এবং ৪টি ডিনস অ্যাওয়ার্ড অর্জন",
  "Focus areas: Software Engineering, Web Development, AI/ML, Data Structures & Algorithms":
    "ফোকাস এরিয়া: সফটওয়্যার ইঞ্জিনিয়ারিং, ওয়েব ডেভেলপমেন্ট, এআই/এমএল, ডেটা স্ট্রাকচার ও অ্যালগরিদম",
  "Trainee Software Engineer (Intern)":
    "ট্রেইনি সফটওয়্যার ইঞ্জিনিয়ার (ইন্টার্ন)",
  "Working on full-stack web development projects with an experienced team":
    "অভিজ্ঞ টিমের সাথে ফুল-স্ট্যাক ওয়েব ডেভেলপমেন্ট প্রজেক্টে কাজ করছি",
  "Learning industry-standard software engineering practices from experienced mentors":
    "অভিজ্ঞ মেন্টরদের কাছ থেকে ইন্ডাস্ট্রি-স্ট্যান্ডার্ড সফটওয়্যার ইঞ্জিনিয়ারিং প্র্যাকটিস শিখছি",
  "Collaborating with cross-functional teams on international client projects":
    "আন্তর্জাতিক ক্লায়েন্ট প্রজেক্টে ক্রস-ফাংশনাল টিমের সাথে কাজ করছি",
  "Competitive Programming Trainer & Mentor":
    "কম্পিটিটিভ প্রোগ্রামিং ট্রেইনার ও মেন্টর",
  "Training and mentoring students in competitive programming and problem-solving":
    "শিক্ষার্থীদের কম্পিটিটিভ প্রোগ্রামিং ও প্রবলেম সলভিংয়ে ট্রেনিং ও মেন্টরিং",
  "Conducting multiple weekly training and practice sessions":
    "প্রতি সপ্তাহে একাধিক ট্রেনিং ও প্র্যাকটিস সেশন পরিচালনা",
  "Helping students prepare for national and international programming contests":
    "জাতীয় ও আন্তর্জাতিক প্রোগ্রামিং প্রতিযোগিতার জন্য শিক্ষার্থীদের প্রস্তুত করা",
  "Building a strong AI and Data Science community":
    "একটি শক্তিশালী এআই এবং ডেটা সায়েন্স কমিউনিটি গড়ে তোলা",
  "Active competitive programming profile on LeetCode":
    "লিটকোডে (LeetCode) সক্রিয় কম্পিটিটিভ প্রোগ্রামিং প্রোফাইল",
  "Selected among the top 40 candidates for BTRP – a competitive industry recruitment program focused on software, data, and AI solutions":
    "BTRP-এর শীর্ষ ৪০ প্রার্থীর মধ্যে নির্বাচিত – সফটওয়্যার, ডেটা এবং এআই সমাধানের ওপর দৃষ্টি নিবদ্ধ করা একটি প্রতিযোগিতামূলক শিল্প নিয়োগ প্রোগ্রাম",
  "Mushroom edibility classification using ML on the UCI Mushroom Dataset (8,124 samples, 22 features). Includes EDA, feature engineering with label encoding, and training of multiple models evaluated by accuracy, F1-score, recall, and AUC.":
    "UCI মাশরুম ডেটাসেট (৮,১২৪টি নমুনা, ২২টি বৈশিষ্ট্য) ব্যবহার করে মাশরুমের ভক্ষণযোগ্যতা ক্লাসিফিকেশন। এতে EDA, লেবেল এনকোডিংয়ের মাধ্যমে ফিচার ইঞ্জিনিয়ারিং এবং নির্ভুলতা, F1-স্কোর, রিকল এবং AUC দ্বারা মূল্যায়িত একাধিক মডেলের প্রশিক্ষণ অন্তর্ভুক্ত।",
  "Comparative study of word representations (BoW, TF-IDF, GloVe, Skip-gram) with ML and neural models on ~340k QA pairs across 10 categories. Best result: BiLSTM + Skip-gram → 0.725 accuracy.":
    "১০টি ক্যাটাগরিতে প্রায় ৩৪০ হাজার QA জোড়ার ওপর ML এবং নিউরাল মডেলের মাধ্যমে শব্দ উপস্থাপনার (BoW, TF-IDF, GloVe, Skip-gram) তুলনামূলক অধ্যয়ন। সেরা ফলাফল: BiLSTM + Skip-gram → ০.৭২৫ নির্ভুলতা।",
  "Comprehensive pet adoption and management system with health tracking, REST APIs, JWT authentication, role-based dashboards, and real-time chat via Socket.IO. Built collaboratively in an agile 4-member team.":
    "হেলথ ট্র্যাকিং, REST API, JWT অথেন্টিকেশন, রোল-ভিত্তিক ড্যাশবোর্ড এবং Socket.IO-র মাধ্যমে রিয়েল-টাইম চ্যাটসহ একটি ব্যাপক পোষা প্রাণী দত্তক এবং ব্যবস্থাপনা সিস্টেম। একটি চটপটে ৪-সদস্যের দলে সহযোগিতামূলকভাবে তৈরি।",
  "Multi-model ML classifier with AUC evaluation":
    "AUC মূল্যায়নসহ মাল্টি-মডেল ML ক্লাসিফায়ার",
  "BiLSTM + Skip-gram achieving 0.725 accuracy":
    "BiLSTM + Skip-gram ০.৭২৫ নির্ভুলতা অর্জন করেছে",
  "Real-time pet adoption platform with role-based access":
    "রোল-ভিত্তিক অ্যাক্সেসসহ রিয়েল-টাইম পোষা প্রাণী দত্তক নেওয়ার প্ল্যাটফর্ম",
  "A Next.js 16 and React 19 powered personal blog featuring a hidden Convex CMS, Tiptap rich-text management, view tracking, and Framer Motion animations within a shadcn/ui light/dark interface.":
    "Next.js 16 এবং React 19 ভিত্তিক ব্যক্তিগত ব্লগ; এতে হিডেন Convex CMS, Tiptap rich-text management, view tracking এবং shadcn/ui light/dark ইন্টারফেসে Framer Motion অ্যানিমেশন রয়েছে।",
  "A monospaced programming font based on Iosevka, designed for optimal readability and coding experience.":
    "Iosevka ভিত্তিক একটি monospaced programming font, যা পড়তে সহজ এবং কোডিং অভিজ্ঞতা উন্নত করার জন্য তৈরি।",
  "PC-component e-commerce platform featuring a product catalog, CRUD operations, cart functionality, PC builder, and an admin panel.":
    "PC-component e-commerce প্ল্যাটফর্ম যেখানে product catalog, CRUD operations, cart functionality, PC builder এবং admin panel রয়েছে।",
  "Student-focused web application providing an AI chat assistant, file utilities, PDF summarization, and multiple developer tools.":
    "শিক্ষার্থী-কেন্দ্রিক ওয়েব অ্যাপ্লিকেশন; এতে AI chat assistant, file utilities, PDF summarization এবং একাধিক developer tools রয়েছে।",
  "Developer-focused VSCode theme that combines the aesthetics of the Catppuccin Mocha theme and the syntax highlighting of the One Dark Pro theme. 4,800+ downloads.":
    "ডেভেলপার-কেন্দ্রিক VSCode থিম, যেখানে Catppuccin Mocha-এর নান্দনিকতা এবং One Dark Pro-এর syntax highlighting একত্রিত হয়েছে। 4,800+ ডাউনলোড।",
  "GitHub repository of 2,000+ competitive programming solutions from Codeforces, LeetCode, and 25+ other online judges.":
    "Codeforces, LeetCode এবং ২৫+ online judge থেকে ২,০০০+ competitive programming solution নিয়ে GitHub repository।",
  "CNN-based machine learning model for recognizing handwritten digits using the MNIST dataset with high accuracy.":
    "MNIST dataset ব্যবহার করে handwritten digit চিনতে CNN-ভিত্তিক machine learning model।",
  "AI-powered TUI game implementing pathfinding algorithms and game theory concepts in a quantum-themed puzzle environment.":
    "AI-চালিত TUI game, যেখানে quantum-themed puzzle পরিবেশে pathfinding algorithms এবং game theory ধারণা ব্যবহৃত হয়েছে।",
  "Implementation of A* pathfinding algorithm with visualization for solving search problems efficiently.":
    "A* pathfinding algorithm-এর implementation এবং visualization, search problem দক্ষতার সাথে সমাধানের জন্য।",
  "Prolog-based expert system knowledgebase for Call of Duty weapons with inference engine for weapon recommendations.":
    "Call of Duty weapons-এর জন্য Prolog-based expert system knowledgebase, যেখানে recommendation inference engine রয়েছে।",
  "Modern editor with real-time syncing":
    "মডার্ন এডিটর উইথ রিয়েল-টাইম সিঙ্কিং",
  "Readability-first coding font": "পঠনযোগ্যতা-ভিত্তিক কোডিং ফন্ট",
  "Commerce workflow from catalog to checkout":
    "ক্যাটালগ থেকে চেকআউট পর্যন্ত কমার্স ওয়ার্কফ্লো",
  "All-in-one AI learning platform": "অল-ইন-ওয়ান AI লার্নিং প্ল্যাটফর্ম",
  "4800+ installs on Marketplace": "মার্কেটপ্লেসে 4800+ ইনস্টল",
  "Large indexed competitive programming archive":
    "বড় indexed competitive programming আর্কাইভ",
  "CNN benchmark on handwritten digits": "handwritten digits-এ CNN benchmark",
  "Algorithmic gameplay in a TUI setting": "TUI পরিবেশে algorithmic gameplay",
  "Interactive shortest-path visualization":
    "ইন্টারঅ্যাকটিভ shortest-path visualization",
  "Rule-based recommendation engine": "rule-based recommendation engine",
  "Competed in the prestigious ICPC Asia West Continent Dhaka Regional Contest":
    "প্রেস্টিজিয়াস ICPC Asia West Continent Dhaka Regional Contest-এ অংশগ্রহণ",
  "Participated in KUET BITFEST programming contest":
    "KUET BITFEST programming contest-এ অংশগ্রহণ",
  "Participated in BUBT Inter University Collaborative Programming Contest 2025":
    "BUBT Inter University Collaborative Programming Contest 2025-এ অংশগ্রহণ",
  "Participated in the first Inter University Collaborative Programming Contest at UAP":
    "UAP-এ প্রথম Inter University Collaborative Programming Contest-এ অংশগ্রহণ",
  "Received scholarship for 3 semesters (Spring 2023, Fall 2023, Spring 2024) for Competitive Programming excellence":
    "Competitive Programming উৎকর্ষের জন্য ৩ সেমিস্টার (Spring 2023, Fall 2023, Spring 2024) বৃত্তি অর্জন",
  "Received academic excellence awards for maintaining high CGPA across multiple semesters":
    "একাধিক সেমিস্টারে উচ্চ CGPA বজায় রাখার জন্য academic excellence award অর্জন",
  "Won first place in the Intra Department Programming Contest":
    "Intra Department Programming Contest-এ প্রথম স্থান অর্জন",
  "Achieved Specialist rank on Codeforces competitive programming platform":
    "Codeforces competitive programming platform-এ Specialist র‍্যাংক অর্জন",
  "Achieved 3-star rating on CodeChef competitive programming platform":
    "CodeChef competitive programming platform-এ 3-star রেটিং অর্জন",
  "Completed HackerRank Problem Solving certification at Basic level":
    "HackerRank Problem Solving (Basic) সার্টিফিকেশন সম্পন্ন",
  "Completed HackerRank Python certification at Basic level":
    "HackerRank Python (Basic) সার্টিফিকেশন সম্পন্ন",
  "Completed the Foundational C# certification program in collaboration with Microsoft":
    "Microsoft-এর সহযোগিতায় Foundational C# সার্টিফিকেশন প্রোগ্রাম সম্পন্ন",
  "Completed comprehensive machine learning training program":
    "সমন্বিত machine learning training program সম্পন্ন",
  "Participated in EEE TECH FEST 2.0 Intra University Programming Contest":
    "EEE TECH FEST 2.0 Intra University Programming Contest-এ অংশগ্রহণ",
  "Participated in EEE TECH FEST 2023 Intra University Programming Contest":
    "EEE TECH FEST 2023 Intra University Programming Contest-এ অংশগ্রহণ",
  "Secured 5th position in university math olympiad for two consecutive years":
    "টানা দুই বছর university math olympiad-এ ৫ম স্থান অর্জন",
  "Volunteered in organizing and coordinating the university's convocation ceremony":
    "বিশ্ববিদ্যালয়ের সমাবর্তন আয়োজন ও সমন্বয়ে স্বেচ্ছাসেবক হিসেবে কাজ",
  "Supported participants and technical arrangements for inclusive technology competition":
    "inclusive technology competition-এ অংশগ্রহণকারী সহায়তা ও technical arrangement-এ কাজ",
  "Coordinated prize distribution for World Mathematics Team Championship winners":
    "World Mathematics Team Championship বিজয়ীদের পুরস্কার বিতরণ সমন্বয়",
  "Organized Inter University programming contest bringing together students from multiple private universities":
    "একাধিক বেসরকারি বিশ্ববিদ্যালয়ের শিক্ষার্থীদের নিয়ে Inter University programming contest আয়োজন",
  "Organized third edition of math olympiad fostering problem-solving culture":
    "সমস্যা সমাধান সংস্কৃতি গড়ে তুলতে math olympiad-এর তৃতীয় আসর আয়োজন",
  "Organized second edition of university math olympiad with increased participation":
    "বর্ধিত অংশগ্রহণে university math olympiad-এর দ্বিতীয় আসর আয়োজন",
  "Organized inaugural math olympiad in memory of Professor Jamilur Reza Chowdhury":
    "Professor Jamilur Reza Chowdhury-র স্মরণে প্রথম math olympiad আয়োজন",
  "Assisted in organizing and coordinating the university's convocation ceremony":
    "বিশ্ববিদ্যালয়ের সমাবর্তন আয়োজন ও সমন্বয়ে সহায়তা",
  "National Initiative": "জাতীয় উদ্যোগ",
  "Web Development": "ওয়েব ডেভেলপমেন্ট",
  "Tools & Extensions": "টুলস ও এক্সটেনশনস",
  "Machine Learning": "মেশিন লার্নিং",
  "Game Development": "গেম ডেভেলপমেন্ট",
  Algorithms: "অ্যালগরিদমস",
  "AI & Logic": "এআই ও লজিক",
  "AI Fundamentals": "এআই ফান্ডামেন্টালস",
  "Intermediate SQL": "ইন্টারমিডিয়েট এসকিউএল",
  "93% in English (Mentors After SSC)": "ইংরেজিতে ৯৩% (মেন্টরস আফটার এসএসসি)",
  "Duke of Edinburgh's International Award - Bronze": "ডিউক অফ এডিনবার্গ’স ইন্টারন্যাশনাল অ্যাওয়ার্ড - ব্রোঞ্জ",
  DataCamp: "ডে্যাক্যাম্প",
  Mentors: "মেন্টরস",
  "The Duke of Edinburgh's Award Foundation": "দ্য ডিউক অফ এডিনবার্গ’স অ্যাওয়ার্ড ফাউন্ডেশন",
  "Certification in fundamental concepts of Artificial Intelligence": "আর্টিফিশিয়াল ইন্টেলিজেন্সের মৌলিক ধারণার ওপর সার্টিফিকেশন",
  "Certification in intermediate level SQL for data analysis": "ডেটা অ্যানালাইসিসের জন্য ইন্টারমিডিয়েট লেভেল এসকিউএল সার্টিফিকেশন",
  "Exceptional performance in the Mentors After SSC English program": "মেন্টরস আফটার এসএসসি ইংলিশ প্রোগ্রামে অসাধারণ পারফরম্যান্স",
  "Bronze level achievement in the international youth awards program": "আন্তর্জাতিক যুব পুরস্কার প্রোগ্রামে ব্রোঞ্জ স্তরের অর্জন",
};

const escapeRegex = (value: string) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const sortedTermOverrides = [...BENGALI_TERM_OVERRIDES].sort(
  (a, b) => b[0].length - a[0].length,
);

const applyTermOverrides = (value: string) => {
  return sortedTermOverrides.reduce((result, [source, target]) => {
    const escaped = escapeRegex(source);
    const useWordBoundary = /[A-Za-z]/.test(source);
    const pattern = useWordBoundary
      ? new RegExp(`\\b${escaped}\\b`, "gi")
      : new RegExp(escaped, "g");
    return result.replace(pattern, target);
  }, value);
};

const applyBengaliDigits = (value: string) => {
  return value.replace(/\d/g, (digit) => BENGALI_DIGIT_MAP[digit] ?? digit);
};

export const translateDynamicText = (locale: Locale, text: string): string => {
  if (locale !== "bn") return text;

  const mappedText = dynamicBnMap[text] ?? text;
  const withOverrides = applyTermOverrides(mappedText);

  return applyBengaliDigits(withOverrides);
};



