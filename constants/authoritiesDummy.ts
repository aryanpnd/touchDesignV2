export interface Authority {
  id: string;
  profilePicture: any; // require() import
  roleToYou: string; // "Industry Mentor" | "Mentor" | "Head of Department"
  name: string;
  designation: string; // "Assistant Professor" | "Pro-Vice-Chancellor"
  branch: string; // "School of Engineering"
  email: string;
  phone: string;
}

export const authorities: Authority[] = [
  {
    id: '1',
    profilePicture: require('@/assets/images/lpu-logo.png'), // placeholder
    roleToYou: 'Industry Mentor',
    name: 'Dr. Rajesh Kumar',
    designation: 'Pro-Vice-Chancellor',
    branch: 'School of Engineering',
    email: 'rajesh.kumar@lpu.co.in',
    phone: '+91 98765 43210',
  },
  {
    id: '2',
    profilePicture: require('@/assets/images/lpu-logo.png'), // placeholder
    roleToYou: 'Head of Department',
    name: 'Prof. Priya Sharma',
    designation: 'Assistant Professor',
    branch: 'School of Computer Science',
    email: 'priya.sharma@lpu.co.in',
    phone: '+91 98765 43211',
  },
  {
    id: '3',
    profilePicture: require('@/assets/images/lpu-logo.png'), // placeholder
    roleToYou: 'Mentor',
    name: 'Dr. Amit Singh',
    designation: 'Associate Professor',
    branch: 'School of Engineering',
    email: 'amit.singh@lpu.co.in',
    phone: '+91 98765 43212',
  },
  {
    id: '4',
    profilePicture: require('@/assets/images/lpu-logo.png'), // placeholder
    roleToYou: 'Industry Mentor',
    name: 'Ms. Neha Gupta',
    designation: 'Assistant Professor',
    branch: 'School of Management',
    email: 'neha.gupta@lpu.co.in',
    phone: '+91 98765 43213',
  },
  {
    id: '5',
    profilePicture: require('@/assets/images/lpu-logo.png'), // placeholder
    roleToYou: 'Mentor',
    name: 'Dr. Suresh Patel',
    designation: 'Professor',
    branch: 'School of Engineering',
    email: 'suresh.patel@lpu.co.in',
    phone: '+91 98765 43214',
  },
];