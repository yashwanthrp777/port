// Profile & Resume Data for YASHWANTH R P
export const CONFIG = {
  name: 'YASHWANTH R P',
  title: 'Software Engineer | Cloud Computing & DevOps',
  location: 'Chikkamagaluru, Karnataka',
  email: 'yashwanthrpy@gmail.com',
  phone: '+91 7204731787',
  github: 'https://github.com/yashwanthrp777',
  linkedin: 'https://www.linkedin.com/in/yashwanth-r-p-bb9733345?utm_source=share_via&utm_content=profile&utm_medium=member_android',
  resume: `${import.meta.env.BASE_URL}resume.pdf`,
  objective:
    'MCA student with strong technical skills in Java, Python, Web Development, Cloud Computing, and DevOps. Passionate about building scalable, user-centric applications and continuously learning modern technologies such as AWS, Terraform, and AI integration. Seeking opportunities to excel, drive innovation, and make meaningful contributions to the tech sector.',
}

export const INITIAL_SKILLS = {
  'Programming Languages': ['Java', 'Python', 'C'],
  'Web Technologies': ['HTML', 'CSS', 'PHP', 'React.js', 'Tailwind CSS'],
  'Cloud Platforms': [
    'AWS IAM',
    'AWS EC2',
    'AWS S3',
    'AWS VPC',
    'AWS RDS',
    'AWS Lambda',
    'AWS DynamoDB',
    'API Gateway',
    'Amazon SNS',
    'AWS Amplify',
  ],
  'DevOps & Tools': ['Terraform', 'Docker', 'Git', 'GitHub', 'CI/CD Pipelines'],
  'Databases': ['MySQL', 'Convex Database'],
  'Operating Systems & Networking': [
    'Linux (Shell Scripting)',
    'Windows',
    'Computer Networking',
  ],
}

export const INITIAL_PROJECTS = [
  {
    id: 1,
    title: 'AI EVENT ORGANISER RP',
    category: 'Full-Stack & Generative AI',
    tech: [
      'Next.js',
      'React',
      'Convex',
      'Clerk',
      'Google Gemini API',
      'Tailwind CSS',
      'Unsplash API',
      'Vercel',
    ],
    points: [
      'Developed a full-stack AI-powered event management platform for event creation, discovery, registration, and attendee management.',
      'Integrated Google Gemini AI API to automatically generate event titles, descriptions, agendas, and FAQs from natural language prompts.',
      'Implemented secure authentication and role-based access control using Clerk, with real-time backend updates through Convex.',
      'Generated QR-code-based digital tickets for attendee check-in and deployed the application on Vercel.',
    ],
    github: 'https://github.com/yashwanthrp777',
    demo: null,
  },
  {
    id: 2,
    title: 'AWS VPC INFRASTRUCTURE AUTOMATION WITH TERRAFORM',
    category: 'Cloud & Infrastructure as Code',
    tech: ['Terraform', 'AWS VPC', 'EC2', 'S3', 'IAM', 'Apache Web Server'],
    points: [
      'Developed an Infrastructure as Code (IaC) project using Terraform to automate provisioning of AWS resources.',
      'Created an EC2 instance with an IAM role to securely access an S3 bucket and host a static website.',
      'Configured user data scripts to install Apache and deploy website content automatically.',
      'Used Terraform variables and outputs to simplify deployment and infrastructure management.',
    ],
    github: 'https://github.com/yashwanthrp777',
    demo: null,
  },
  {
    id: 3,
    title: 'CLOUDCART – SERVERLESS E-COMMERCE INFRASTRUCTURE ON AWS',
    category: 'Serverless Cloud Architecture',
    tech: [
      'Terraform',
      'AWS Lambda',
      'API Gateway',
      'DynamoDB',
      'Amazon SNS',
      'S3',
      'EC2',
      'Nginx',
      'Python',
    ],
    points: [
      'Developed an end-to-end e-commerce infrastructure on AWS using Terraform.',
      'Built a serverless backend using AWS Lambda, API Gateway, and DynamoDB.',
      'Integrated Amazon SNS to send automated email notifications for new orders.',
      'Hosted a responsive e-commerce website on EC2 using Nginx.',
    ],
    github: 'https://github.com/yashwanthrp777',
    demo: null,
  },
  {
    id: 4,
    title: 'AI Resume Analyzer & ATS Optimization Platform',
    category: 'AI Application & CI/CD DevOps',
    tech: [
      'React.js',
      'TypeScript',
      'Tailwind CSS',
      'AI APIs',
      'Docker',
      'GitHub Actions',
      'AWS EC2',
    ],
    points: [
      'Developed an AI-powered Resume Analyzer that evaluates resumes against job descriptions and generates ATS scores with personalized feedback.',
      'Built a responsive web application using React.js, TypeScript, Tailwind CSS, and AI APIs for resume analysis and optimization.',
      'Implemented CI/CD pipelines with GitHub Actions, containerized the application using Docker, and deployed it on AWS EC2 for automated delivery and scalability.',
    ],
    github: 'https://github.com/yashwanthrp777',
    demo: null,
  },
]

export const EDUCATION = [
  {
    degree: 'Master of Computer Applications (MCA)',
    institution: 'RV Institute of Technology and Management, Bengaluru',
    period: '2024 – 2026',
    score: 'CGPA: 8.26 / 10',
    type: 'Postgraduate',
  },
  {
    degree: 'Bachelor of Computer Applications (BCA)',
    institution: 'Bapuji Institute of Hi-Tech Education, Davangere',
    period: '2020 – 2023',
    score: 'CGPA: 7.25 / 10',
    type: 'Undergraduate',
  },
]

export const INTERNSHIP = {
  role: 'Cloud Computing Intern',
  company: 'Rooman Technologies',
  period: 'Internship',
  points: [
    'Worked on Linux server administration, deployment workflows and cloud infrastructure fundamentals.',
    'Assisted in application hosting, monitoring and environment configuration.',
  ],
}

