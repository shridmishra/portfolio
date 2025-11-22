const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

// Resume Data
const data = {
  name: "Shrid Mishra",
  title: "Full-Stack Developer | Design Engineer",
  contact: {
    email: "shridmishra@gmail.com", // Placeholder
    website: "https://shrid.in",
    linkedin: "linkedin.com/in/shridmishra", // Placeholder
    github: "github.com/shridmishra",
    location: "India"
  },
  summary: "Passionate Full-Stack Developer with expertise in Next.js, TypeScript, and Solana blockchain development. Proven track record of building scalable web applications and decentralized solutions. Dedicated to crafting intuitive user experiences and clean, maintainable code.",
  skills: {
    languages: ["TypeScript", "JavaScript", "Rust", "Solidity", "HTML/CSS"],
    frameworks: ["Next.js", "React", "Node.js", "Express", "Tailwind CSS"],
    tools: ["Git", "Docker", "Kubernetes", "PostgreSQL", "MongoDB", "Prisma"],
    blockchain: ["Solana", "Anchor", "Ethereum", "Web3.js"]
  },
  experience: [
    {
      company: "Beiyo",
      role: "Backend Developer",
      duration: "2024 - 2025",
      location: "Remote",
      description: [
        "Architected and maintained scalable backend services using Node.js and PostgreSQL.",
        "Optimized database queries, reducing response times by 30%.",
        "Collaborated with frontend teams to integrate RESTful APIs."
      ]
    },
    {
      company: "Freelance",
      role: "Full-Stack Developer",
      duration: "2023 - Present",
      location: "Remote",
      description: [
        "Delivered custom web solutions for diverse clients using Next.js and React.",
        "Implemented secure payment gateways and authentication systems.",
        "Managed full project lifecycle from requirement gathering to deployment."
      ]
    }
  ],
  projects: [
    {
      title: "MediChain",
      tech: "Next.js, Solana, Anchor",
      link: "https://medichain.shrid.in",
      description: "A decentralized platform for secure health data management on the Solana blockchain, ensuring patient privacy and data integrity."
    },
    {
      title: "Practice JS",
      tech: "Next.js, TypeScript",
      link: "https://practicejs.shrid.in",
      description: "Interactive JavaScript learning platform featuring real-time quizzes and coding challenges to enhance developer skills."
    },
    {
      title: "AnimeFlix",
      tech: "NeoBrutalism, YouTube API",
      link: "https://animeflix.shrid.in",
      description: "Streaming platform with a unique Neo-Brutalism design, utilizing the YouTube API for content delivery."
    },
    {
      title: "Grocery Store",
      tech: "React, Stripe, MongoDB",
      link: "https://grocery.shrid.in",
      description: "Full-featured e-commerce application with shopping cart functionality and secure Stripe payment integration."
    },
    {
      title: "Solana Contract",
      tech: "Rust, Anchor",
      link: "https://github.com/shridmishra/solana-contracts",
      description: "Developed smart contracts for SPL token staking, implementing secure and efficient on-chain logic."
    }
  ],
  education: [
    {
      institution: "SGSITS Indore",
      degree: "Bachelor of Technology",
      year: "2025 (Expected)" 
    }
  ]
};

// Create a document
const doc = new PDFDocument({ 
  margin: 50, 
  size: 'A4',
  bufferPages: true
});

// Pipe its output
const outputPath = path.join(__dirname, '../public/resume.pdf');
const stream = fs.createWriteStream(outputPath);
doc.pipe(stream);

// Colors
const primaryColor = '#333333';
const secondaryColor = '#666666';
const accentColor = '#000000';

// Helper functions
function drawLine(y) {
  doc.strokeColor('#E0E0E0')
     .lineWidth(1)
     .moveTo(50, y)
     .lineTo(545, y)
     .stroke();
}

function addSectionTitle(title) {
  doc.moveDown(1.5);
  doc.font('Helvetica-Bold').fontSize(12).fillColor(accentColor).text(title.toUpperCase(), { letterSpacing: 1 });
  const y = doc.y + 3;
  drawLine(y);
  doc.moveDown(0.8);
}

// Header
doc.font('Helvetica-Bold').fontSize(24).fillColor(primaryColor).text(data.name, { align: 'center' });
doc.moveDown(0.3);
doc.font('Helvetica').fontSize(11).fillColor(secondaryColor).text(data.title, { align: 'center' });
doc.moveDown(0.5);

// Contact Info
const contactText = [
  data.contact.email,
  data.contact.website.replace('https://', ''),
  data.contact.linkedin,
  data.contact.github,
  data.contact.location
].filter(Boolean).join('  •  ');

doc.font('Helvetica').fontSize(9).fillColor(primaryColor).text(contactText, { align: 'center' });

// Summary
addSectionTitle('Professional Summary');
doc.font('Helvetica').fontSize(10).fillColor(primaryColor).text(data.summary, { align: 'justify', lineGap: 2 });

// Skills
addSectionTitle('Technical Skills');
const skillY = doc.y;

// Left Column Skills
doc.font('Helvetica-Bold').fontSize(10).text('Languages:', 50, skillY);
doc.font('Helvetica').text(data.skills.languages.join(', '), 120, skillY);
doc.moveDown(0.5);
doc.font('Helvetica-Bold').text('Frameworks:', 50);
doc.font('Helvetica').text(data.skills.frameworks.join(', '), 120);

// Right Column Skills (adjusted Y)
doc.font('Helvetica-Bold').text('Tools:', 300, skillY);
doc.font('Helvetica').text(data.skills.tools.join(', '), 350, skillY);
doc.moveDown(0.5);
doc.font('Helvetica-Bold').text('Blockchain:', 300);
doc.font('Helvetica').text(data.skills.blockchain.join(', '), 370);

doc.moveDown(2); // Reset position

// Experience
addSectionTitle('Experience');
data.experience.forEach(exp => {
  const startY = doc.y;
  
  // Company & Location
  doc.font('Helvetica-Bold').fontSize(11).text(exp.company, 50, startY);
  doc.font('Helvetica').fontSize(10).text(exp.location, { align: 'right' });
  
  // Role & Duration
  doc.font('Helvetica-Oblique').fontSize(10).text(exp.role, 50, startY + 14);
  doc.font('Helvetica').fontSize(10).text(exp.duration, { align: 'right' });
  
  doc.moveDown(0.5);
  
  // Description
  if (exp.description && exp.description.length > 0) {
    exp.description.forEach(point => {
      doc.font('Helvetica').fontSize(10).text(`• ${point}`, { indent: 10, align: 'justify', lineGap: 2 });
    });
  }
  doc.moveDown(1);
});

// Projects
addSectionTitle('Key Projects');
data.projects.forEach(proj => {
  const startY = doc.y;
  
  // Title & Tech
  doc.font('Helvetica-Bold').fontSize(11).text(proj.title, 50, startY, { continued: true });
  doc.font('Helvetica-Oblique').fontSize(10).fillColor(secondaryColor).text(`  |  ${proj.tech}`);
  
  // Link (Right aligned)
  if (proj.link) {
    doc.fillColor('blue').text('View Project', 450, startY, { link: proj.link, align: 'right' });
    doc.fillColor(primaryColor); // Reset color
  }
  
  doc.moveDown(0.3);
  doc.font('Helvetica').fontSize(10).text(proj.description, { align: 'justify', lineGap: 2 });
  doc.moveDown(0.8);
});

// Education
if (data.education.length > 0) {
  addSectionTitle('Education');
  data.education.forEach(edu => {
    const startY = doc.y;
    doc.font('Helvetica-Bold').fontSize(11).text(edu.institution, 50, startY);
    doc.font('Helvetica').fontSize(10).text(edu.year, { align: 'right' });
    doc.font('Helvetica').fontSize(10).text(edu.degree, 50, startY + 14);
    doc.moveDown(1);
  });
}

// Finalize
doc.end();
console.log(`Resume generated at ${outputPath}`);
