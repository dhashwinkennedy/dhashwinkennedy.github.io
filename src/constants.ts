import { Layout, Database, Cpu, Layers } from "lucide-react";
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

import MERNCertImg from "./assets/udemy-MERN.jpg";
import GuviPythonCertImg from "./assets/GUVI-Python.png";
import GuviJavaScriptCertImg from "./assets/GUVI-JavaScript.png";
import GuviHTMLCSSCertImg from "./assets/GUVI-HTMLCSS.png";

import HackeRankPythonBasicCertImg from "./assets/HACKERRANK-Python.png";

// ─── PROJECTS ────────────────────────────────────────────────────────────────
export const projects = [
  {
    id: 1,
    image: prj1Image,
    title: "Ecommerce Electronics Website",
    shortDesc:
      "A full-stack ecommerce platform built using the MERN stack, featuring product listing, cart, orders, user profiles, and wishlist functionality.",
    longDesc:
      "This project is a full-stack ecommerce application built using the MERN stack, integrating MongoDB, Express.js, React, and Node.js. It enables users to browse products, add items to a cart, manage wishlists, and place orders through a smooth and responsive interface. The application includes secure authentication, user profile management, and order tracking features. The backend is powered by RESTful APIs for efficient data handling, while MongoDB manages product, user, and order data. This project highlights end-to-end development, combining modern frontend design with robust backend functionality to deliver a scalable ecommerce experience.",
    github: "https://github.com/dhashwinkennedy/Ecommerce-Electronics-Website",
    live: "",
    // Replace with your own imported screenshot assets or URLs
    screenshots: [prj1S1, prj1S2, prj1S3, prj1S4, prj1S5, prj1S7, prj1S8],
    warning:
      "The current UI is optimized specifically for a 1920×1080 viewport and is not yet fully responsive across all device breakpoints. Additionally, the integrated database currently contains a limited sample set of products for demonstration purposes.",
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
  // Add more projects here — just import the image at the top and set image: yourImport
];

// ─── SKILLS (Skills tab) ──────────────────────────────────────────────────────
export const skills = [
  {
    category: "Frontend",
    items: ["React", "HTML5", "CSS3", "JavaScript"],
    icon: React.createElement(Layout, { size: 20 }),
  },
  {
    category: "Backend",
    items: ["Node.js", "Express.js"],
    icon: React.createElement(Database, { size: 20 }),
  },
  {
    category: "Database",
    items: ["MongoDB", "MySQL"],
    icon: React.createElement(Cpu, { size: 20 }),
  },
  {
    category: "Domain",
    items: ["MERN Stack"],
    icon: React.createElement(Layers, { size: 20 }),
  },
];

// ─── CERTIFICATES ─────────────────────────────────────────────────────────────
export const certificates = [
  {
    id: 1,
    image: MERNCertImg,
    imageClass: "udemy",
    title: "React, NodeJS, Express & MongoDB - The MERN Fullstack Guide",
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
    id: 2,
    image: HackeRankPythonBasicCertImg,
    imageClass: "udemy",
    title: "HackerRank Python(Basic)",
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
    id: 3,
    image: GuviPythonCertImg,
    imageClass: "guvi",
    title: "Python Certification of Completion",
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
    id: 4,
    image: GuviJavaScriptCertImg,
    imageClass: "guvi",
    title: "JavaScript Certification of Completion",
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
    id: 5,
    image: GuviHTMLCSSCertImg,
    imageClass: "guvi",
    title: "HTML & CSS Certification of Completion",
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
    "**Completed 12th grade and currently awaiting results, actively working on Python automation and full-stack web development projects.**",
  description:
    "I'm a young and passionate computer science enthusiast who started my journey after completing my 10th boards and have been continuously learning and building ever since. I have a strong focus on **Python automation** and **full-stack web development (MERN)**, and I enjoy creating real-world projects, solving problems, and exploring new technologies to improve my skills. In addition to development, I have a keen interest in **Cybersecurity**, **AI/ML**, and **DevOps**, and I'm always eager to explore and work on these domains, completing what I start with dedication. I'm open to opportunities where I can learn, contribute, and grow as a developer while gaining real-world experience.",
  coreFocus: [
    {
      name: "Python Automation",
      iconUrl:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    },
    {
      name: "Full-Stack Web Development (MERN)",
      iconUrl:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
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
