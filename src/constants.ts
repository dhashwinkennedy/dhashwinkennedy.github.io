import { Bot, Database, Layout, Server, Wrench, Workflow } from "lucide-react";
import React from "react";

// ── Asset imports ─────────────────────────────────────────────────────────────
import prj1Image from "./assets/prj1.png";
import prj1S1 from "./assets/screenshot/prj1S1.png";
import prj1S2 from "./assets/screenshot/prj1S2.png";
import prj1S3 from "./assets/screenshot/prj1S3.png";
import prj1S4 from "./assets/screenshot/prj1S4.png";
import prj1S5 from "./assets/screenshot/prj1S5.png";
import prj1S7 from "./assets/screenshot/prj1S7.png";
import prj1S8 from "./assets/screenshot/prj1S8.png";


import CresentLogo from "./assets/Cresent_logo.png"

import prj2Image from "./assets/prj2.png";
import prj2S1 from "./assets/screenshot/prj2S1.png";
import prj2S2 from "./assets/screenshot/prj2S2.png";
import prj2S3 from "./assets/screenshot/prj2S3.png";


import prj3Image from "./assets/prj3.png";
import prj3S1 from "./assets/screenshot/prj3S1.png";
import prj3S2 from "./assets/screenshot/prj3S2.png";

import prj4Image from "./assets/prj4.jpg";
import prj4S1 from "./assets/screenshot/prj4S1.png";
import prj4S2 from "./assets/screenshot/prj4S2.png";
import prj4S3 from "./assets/screenshot/prj4S3.png";


import prj5Image from "./assets/prj5.png";
import prj5S1 from "./assets/screenshot/prj5S1.png";
import prj5S2 from "./assets/screenshot/prj5S2.png";
import prj5S3 from "./assets/screenshot/prj5S3.png";



import FastAPICertImg from "./assets/udemy-FastAPI.jpg";
import ChatbotCertImg from "./assets/udemy-Chatbot.jpg";
import n8nCertImg from "./assets/udemy-n8n.jpg";
import MERNCertImg from "./assets/udemy-MERN.jpg";
import GuviPythonCertImg from "./assets/GUVI-Python.png";
import GuviJavaScriptCertImg from "./assets/GUVI-JavaScript.png";
import GuviHTMLCSSCertImg from "./assets/GUVI-HTMLCSS.png";

import HackeRankPythonBasicCertImg from "./assets/HACKERRANK-Python.png";

// ─── PROJECTS ────────────────────────────────────────────────────────────────
export interface ProjectSkill {
  name: string;
  iconUrl: string;
}

export interface Project {
  id: number;
  image: string;
  title: string;
  query: string;
  date: string;
  shortDesc: string;
  longDesc: string;
  github: string;
  live: string;
  telegram?: string;
  screenshots: string[];
  warning?: string;
  skills: ProjectSkill[];
}

export const projects: Project[] = [
 
    {
    id: 4,
    image: prj4Image,
    title: "Telegram Google Drive Uploader Bot",
    query: "telegram-google-drive-uploader-bot",
    date: "July 20, 2026",
    shortDesc:
    "Telegram Google Drive Bot is a full-stack automation project that lets users securely connect multiple Google Drive accounts and upload files directly from Telegram. It features OAuth 2.0 authentication, account management, custom destination folders, file renaming, and a FastAPI backend deployed to the cloud.",
    longDesc:
    "Built with **Python**, **FastAPI**, **MongoDB Atlas**, **Telegram Bot API**, and **Google Drive API**, this project enables users to securely upload files from Telegram directly to Google Drive. It supports multiple Google Drive accounts through **OAuth 2.0** authentication, allowing users to choose an account, rename files before upload, configure custom destination folders, and manage connected accounts—all from within Telegram. The backend implements automatic token refresh, HMAC-signed request validation, comprehensive logging, and robust error handling to ensure secure and reliable operations. The application is fully deployed using **Railway**, with both the FastAPI backend and Telegram bot hosted in the cloud for seamless access without any local setup.",
    github: "https://github.com/dhashwinkennedy/Google-Drive-Upload-Telegram-Bot",
    live: "https://t.me/Gdrive_testbot",
    telegram: "https://t.me/Gdrive_testbot",

    // Replace with your own imported screenshot assets or URLs
    screenshots: [prj4S1, prj4S2, prj4S3],
    warning:
    "Demo Notice: This project is hosted on Railway's free tier for demonstration purposes. File uploads are limited to 30 MB, and occasional slower responses or brief downtime may occur due to free-tier hosting limitations",
    skills: [
      {
        name: "Python",
        iconUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
      },
      {
        name:"FastAPI",
        iconUrl:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg"
      },
      {
        name:"Google Drive API",
        iconUrl:"https://api.iconify.design/logos:google-drive.svg"
      },
      {
        name:"MongoDB",
        iconUrl:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg"
      },
      {
        name:"Railway",
        iconUrl:"https://cdn.simpleicons.org/railway"
      },{
        name:"Telegram",
        iconUrl:"https://cdn.simpleicons.org/telegram"
      },{
        name:"Google OAUTH 2.0",
        iconUrl:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
      }
    ],
  },
   {
    id: 5,
    image: prj5Image,
    title: "Telegram Dropbox Uploader Bot",
    query: "telegram-Dropbox-uploader-bot",
    date: "July 23, 2026",
    shortDesc:
    "A production-ready Telegram to Dropbox automation bot built using n8n, JavaScript, Telegram Bot API, Dropbox API, PostgreSQL, and Railway. It enables users to securely connect multiple Dropbox accounts via OAuth 2.0, upload files directly from Telegram, manage linked accounts, and automate cloud file transfers through a scalable low-code workflow.",
    longDesc:
    "Telegram to Dropbox Upload Bot is a production-ready automation solution built using **n8n**, **JavaScript**, **Telegram Bot API**, **Dropbox API**, **PostgreSQL**, and **Railway**. It enables users to securely connect multiple Dropbox accounts using **OAuth 2.0**, manage linked accounts, and upload files directly from Telegram to their preferred Dropbox. The project features automatic access token refresh, interactive inline keyboards, persistent account management,, and a modular workflow design separating authentication and file upload logic. By combining low-code automation with custom JavaScript, this project demonstrates how scalable workflow automation and real-world API integrations can be implemented efficiently while maintaining flexibility, security, and a clean architecture suitable for production deployment.",
    github: "https://github.com/dhashwinkennedy/Google-Drive-Upload-Telegram-Bot",
    live: "https://t.me/Dropbox_uploader_testbot",
    telegram: "https://t.me/Dropbox_uploader_testbot",

    // Replace with your own imported screenshot assets or URLs
    screenshots: [prj5S1, prj5S2, prj5S3],
    warning:
    "Demo Notice: This project is hosted on Railway's free tier for demonstration purposes. File uploads are limited to 30 MB, and occasional slower responses or brief downtime may occur due to free-tier hosting limitations",
    skills: [
      {
        name: "n8n",
        iconUrl:
          "https://cdn.simpleicons.org/n8n",
      },
      {
        name:"PostgreSQL",
        iconUrl:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg"
      },
      {
        name:"Dropbox API",
        iconUrl:"https://api.iconify.design/logos:dropbox.svg"
      },
      {
        name:"Railway",
        iconUrl:"https://cdn.simpleicons.org/railway"
      },{
        name:"Telegram",
        iconUrl:"https://cdn.simpleicons.org/telegram"
      }
    ],
  },
  {
    id: 1,
    image: prj1Image,
    title: "Ecommerce Electronics Website",
    query: "ecommerce-electronics-website",
    date:"March 27, 2026",
    shortDesc:
      "A full-stack ecommerce platform built using the MERN stack, featuring product listing, cart, orders, user profiles, and wishlist functionality.",
    longDesc:
      "This project is a full-stack ecommerce application built using the MERN stack, integrating **MongoDB**, **Express.js**, **React**, and **Node.js**. It enables users to browse products, add items to a cart, manage wishlists, and place orders through a smooth and responsive interface. The application includes secure authentication, user profile management, and order tracking features. The backend is powered by RESTful APIs for efficient data handling, while MongoDB manages product, user, and order data. This project highlights end-to-end development, combining modern frontend design with robust backend functionality to deliver a scalable ecommerce experience.",
    github: "https://github.com/dhashwinkennedy/Ecommerce-Electronics-Website",
    live: "",
    // Replace with your own imported screenshot assets or URLs
    screenshots: [prj1S1, prj1S2, prj1S3, prj1S4, prj1S5, prj1S7, prj1S8],
    warning:
      "The current UI is optimized specifically for a 1900×870 viewport and is not yet fully responsive across all device breakpoints. Additionally, the integrated database currently contains a limited sample set of products for demonstration purposes.",
    skills: [
      {
        name: "HTML",
        iconUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
      },
      {
        name: "CSS",
        iconUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
      },
      {
        name: "JavaScript",
        iconUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
      },
      {
        name: "React",
        iconUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      },
      {
        name: "MongoDB",
        iconUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
      },
      {
        name: "Node.js",
        iconUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
      },
      { name: "Express.js", iconUrl: "" },
    ],
  },
   {
    id: 2,
    image: prj2Image,
    title: "Daily Price Monitoring & Data Extraction Engine for Amazon Search Results",
    query: "amazon-price-tracker",
    date: "April 30, 2026",
    shortDesc:
    "An automated Amazon search scraper built with Python, Selenium, and BS4. It extracts ASINs and real-time pricing data across multiple pages and stores it in a structured JSON format for historical tracking.",
    longDesc:
    "This Python project is an automated tool that scrapes Amazon search results to collect product ASINs and their current prices. Using **Selenium** and **BeautifulSoup**, it navigates through multiple pages of search results and saves the data into a structured **JSON** file. It is designed to help users track price changes over time and features an automatic driver setup for easy installation.",
    github: "https://github.com/dhashwinkennedy/Amazon-Search-Price-Tracker-An-Automated-Data-Extraction-with-Selenium-BS4",
    live: "",
    // Replace with your own imported screenshot assets or URLs
    screenshots: [prj2S1, prj2S2, prj2S3],
    warning:
    "This project is strictly for educational and learning purposes. It demonstrates web scraping and automation concepts using Selenium. It is not intended for commercial use. Users are responsible for complying with Amazon's Terms of Service and legal requirements.",
    skills: [
      {
        name: "Python",
        iconUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
      },
      {
        name:"Selenium WebDriver",
        iconUrl:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/selenium/selenium-original.svg"
      },
      {
        name:"Automation",
        iconUrl:""
      },
      {
        name:"BeautifulSoup4",
        iconUrl:""
      },{
        name:"webdriver-manager",
        iconUrl:""
      }
    ],
  },{
    id: 3,
    image: prj3Image,
    title: "AI-Powered Social Media Quote Publisher ",
    query: "ai-powered-social-media-quote-publisher",
    date: "June 06, 2026",
    shortDesc: 
    "Automate your social media with this Python pipeline. It uses Google Gemini to generate quotes, Pillow to design graphics, Cloudinary for hosting, and the Meta Graph API to auto-publish to Instagram & Facebook.",
    longDesc:
    "The AI-Powered Social Media Quote Publisher is a fully automated content engine that handles creation to distribution. First, the **Google Gemini API** dynamically generates motivational morning quotes. Next, the **Pillow** library programmatically overlays this text onto a pre-designed image template. The final graphic is uploaded to **Cloudinary** to secure a public CDN link. Finally, the **Meta Graph API** uses this link to cross-publish the post to Instagram and Facebook simultaneously.",
    github: "https://github.com/dhashwinkennedy/Amazon-Search-Price-Tracker-An-Automated-Data-Extraction-with-Selenium-BS4",
    live: "",
    // Replace with your own imported screenshot assets or URLs
    screenshots: [prj3S1, prj3S2],
    warning: "",
    skills: [
      {
        name: "Python",
        iconUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
      },
      {
        name:"Meta Graph API",
        iconUrl:"https://api.iconify.design/simple-icons:meta.svg?color=%230866FF"
      },
      {
        name:"Google Gemini API",
        iconUrl:"https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/google-gemini-icon.svg"
      },
      {
        name:"Pillow Image Processing",
        iconUrl:"https://raw.githubusercontent.com/python-pillow/pillow-logo/main/pillow-logo-248x250.png"
      },{
        name:"Cloudinary Hosting",
        iconUrl:"https://api.iconify.design/simple-icons:cloudinary.svg?color=%233448C5"
      },{
        name:"Automation",
        iconUrl:""
      },
    ],
  },
  
  // Add more projects here — just import the image at the top and set image: yourImport
];

// ─── SKILLS (Skills tab) ──────────────────────────────────────────────────────
export const skills = [
  {
    category: "AI & Chatbots",
    items: ["Google Gemini API", "OpenAI API", "Claude API" ,"Telegram Bots","Discord Bots","WhatsApp Business API"],
    icon: React.createElement(Bot, { size: 20 }),
  },
  {
    category: "Automation",
    items: ["n8n", "Selenium", "Python Automation","OAUTH 2.0","Cron Jobs","Webhooks"],
    icon: React.createElement(Workflow, { size: 20 }),
  },
  {
    category: "Backend",
    items: ["Python FastAPI", "Node.js", "Express.js","SQLAlchemy"],
    icon: React.createElement(Server, { size: 20 }),
  },
  {
    category: "Databases",
    items: ["MongoDB", "PostgreSQL"],
    icon: React.createElement(Database, { size: 20 }),
  },
  {
    category: "Tools",
    items: ["Git & GitHub", "Cloudinary API", "Docker"],
    icon: React.createElement(Wrench, { size: 20 }),
  },
  {
    category: "Frontend",
    items: ["React", "HTML5", "CSS3", "JavaScript"],
    icon: React.createElement(Layout, { size: 20 }),
  },
];

// ─── EDUCATION ────────────────────────────────────────────────────────────
export interface Education {
  logo: string;
  institute: string;
  field: string;
  duration: string;
}

export const education: Education[] = [
  {
    logo: CresentLogo,
    institute: "B. S. Abdur Rahman Cresent Institute of Science and Technology",
    field: "Bachlors of Technology,Computer Science Engineering",
    duration: "2026 — 2030",
  },
];

// ─── CERTIFICATES ─────────────────────────────────────────────────────────────
export const certificates = [
  {
    id: 1,
    image: FastAPICertImg,
    imageClass: "udemy",
    title: "FastAPI - The Complete Course 2026 (Beginner + Advanced)",
    date : "July 12, 2026",
    description:
      "Completed a comprehensive FastAPI course covering REST APIs, JWT authentication, SQLAlchemy, testing, and deployment.",
    issuer: "Udemy",
    verifyLink:
      "https://www.udemy.com/certificate/UC-ca8759c7-95ed-40cb-ab4a-bec8b748bb31/",
    skills: [
      {
        name: "Python",
        iconUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
      },
      {
        name: "FastAPI",
        iconUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
      },
      
      
    ],
    
  },  {
    id: 8,
    image: ChatbotCertImg,
    imageClass: "udemy",
    title: "Chatbot - The Development Guide 2026 (Beginner + Advanced)",
    date : "July 15, 2026",
    description:
      "Completed an in-depth chatbot development course covering AI chatbots, integrations, automation workflows, and real-world implementations.",
    issuer: "Udemy",
    verifyLink:
      "https://www.udemy.com/certificate/UC-9468820e-13a0-4e28-914a-a4b7d3776838/",
    skills: [
      {
        name: "Python",
        iconUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
      },
      {
        name: "FastAPI",
        iconUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
      },
      {
        name:"OpenAI API",
        iconUrl:"https://api.iconify.design/logos:openai-icon.svg"
      }
      
      
    ],
    
  },
  {
    id: 2,
    image: n8nCertImg,
    imageClass: "udemy",
    title: "Complete N8N and AI Automation Masterclass",
    date : "July 13, 2026",
    description:
      "Learned n8n automation, AI workflows, API integrations, webhooks, and no-code workflow orchestration",
    issuer: "Udemy",
    verifyLink:
      "https://www.udemy.com/certificate/UC-36798410-c3c9-4997-821c-50005b710f8e/",
    skills: [
      {
        name: "n8n",
        iconUrl:
          "https://cdn.simpleicons.org/n8n",
      },
      
    ],
    
  }
  ,{
    id: 3,
    image: MERNCertImg,
    imageClass: "udemy",
    title: "React, NodeJS, Express & MongoDB - The MERN Fullstack Guide",
    date : "September 13, 2025",
    description:
      "Completed a full-stack development course using the MERN stack, covering React, Node.js, Express, and MongoDB.",
    issuer: "Udemy",
    verifyLink:
      "https://www.udemy.com/certificate/UC-5382b3b3-b0c3-442e-b413-1e08e4a054dd/",
    skills: [
      {
        name: "HTML",
        iconUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
      },
      {
        name: "CSS",
        iconUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
      },
      {
        name: "JavaScript",
        iconUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
      },
      {
        name: "React",
        iconUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      },
      {
        name: "MongoDB",
        iconUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
      },
      {
        name: "Node.js",
        iconUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
      },
      { name: "Express.js", iconUrl: "" },
    ],
  },
  
  
  {
    id: 4,
    image: HackeRankPythonBasicCertImg,
    imageClass: "udemy",
    title: "HackerRank Python(Basic)",
    date: "November 08, 2025",
    description:
      "Certified in core Python proficiency, covering data structures, functional programming, and algorithmic problem-solving through rigorous HackerRank challenges.",
    issuer: "HackerRank",
    verifyLink: "https://www.hackerrank.com/certificates/7e06a78c2a91",
    skills: [
      {
        name: "Python",
        iconUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
      },
    ],
  },
  {
    id: 5,
    image: GuviPythonCertImg,
    imageClass: "guvi",
    title: "Python Certification of Completion",
    date : "May 18 2024",
    description:
      "Completed a certification course covering core Python programming concepts and applications.",
    issuer: "HCLGUVI",
    verifyLink: "https://www.guvi.in/share-certificate/907811kJ0BD65C3H2I",
    skills: [
      {
        name: "Python",
        iconUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
      },
    ],
  },
  {
    id: 6,
    image: GuviJavaScriptCertImg,
    imageClass: "guvi",
    title: "JavaScript Certification of Completion",
    date: "May 11, 2025",
    description:
      "Completed a certification course covering core JavaScript programming concepts and applications.",
    issuer: "HCLGUVI",
    verifyLink: "https://www.guvi.in/verify-certificate?id=567e5c4l380A5R9091",
    skills: [
      {
        name: "JavaScript",
        iconUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
      },
    ],
  },
  {
    id: 7,
    image: GuviHTMLCSSCertImg,
    imageClass: "guvi",
    title: "HTML & CSS Certification of Completion",
    date: "May 6, 2025",
    description:
      "Completed a comprehensive program covering semantic HTML5 and modern CSS3. Focused on responsive design, Flexbox, and CSS Grid to build accessible, mobile-first user interfaces.",
    issuer: "HCLGUVI",
    verifyLink: "https://www.guvi.in/share-certificate/4861c9lB7r6E42s3Lj",
    skills: [
      {
        name: "HTML",
        iconUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
      },
      {
        name: "CSS",
        iconUrl:
          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
      },
    ],
  },
  // Add more certificates here — import the image at the top and set image: yourImport
];

export const aboutMe = {
  tagline:
  `**I am a B.Tech Computer Science and Engineering student at B.S. Abdur Rahman Crescent Institute of Science and Technology, passionate about building practical software solutions and continuously expanding my knowledge in modern technologies.**`,
  description:
    `My primary interests lie in **Python Automation, AI Chatbot Development, Backend Development, and AI Workflow Automation**. I enjoy designing scalable automation systems, integrating third-party APIs, and developing real-world applications that solve practical problems. Alongside automation, I have experience building full-stack web applications with the **MERN stack** and Low Code Automations like **n8n**, developing REST APIs, and deploying cloud-based applications.

I am driven by a hands-on learning approach, where every project helps me strengthen my problem-solving skills and deepen my understanding of software engineering principles. I also have a strong interest in **Artificial Intelligence, Cybersecurity, Cloud Computing, and DevOps,** and I actively explore these domains to stay aligned with emerging technologies.

I am always eager to collaborate on meaningful projects, contribute to innovative solutions, and gain real-world experience while continuously growing as a software developer and automation engineer. My goal is to build reliable, scalable, and impactful software that delivers real value to users.`,
  coreFocus: [
    {
      name: "Automation",
      iconUrl:
        "https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/cog.svg",
    },
    {
      name: "AI Workflows",
      iconUrl:
        "https://api.iconify.design/lucide:brain-circuit.svg",
    },
    {
      name: "AI Chatbots",
      iconUrl:
        "https://api.iconify.design/lucide:bot.svg",
    },
  ],
  areasOfInterest: [
    {
      name: "DevOps",
      iconUrl: "",
    },
    {
      name: "Artificial Intelligence",
      iconUrl: "",
    },
    {
      name: "Cybersecurity",
      iconUrl: "",
    },
    {
      name: "Machine Learning",
      iconUrl: "",
    },
  ],
  closing:
    "I enjoy solving problems and ensure I complete what I start with dedication and consistency. I'm open to opportunities where I can learn, contribute, and grow as a developer.",
};
