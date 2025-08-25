export interface Module {
  id: string;
  name: string;
  description?: string;
  priority: 'high' | 'medium' | 'low';
  frequency: 'frequent' | 'occasional' | 'rare';
  icon?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  modules: Module[];
}

export const searchModules: Category[] = [
  {
    id: 'academics',
    name: 'Academics',
    icon: '📚',
    color: '#3B82F6',
    modules: [
      // Courses & Classes
      { id: 'assignment', name: 'Assignment (CA)', description: 'View and submit assignments', priority: 'high', frequency: 'frequent', icon: 'document-text' },
      { id: 'attendance', name: 'Attendance', description: 'Check your attendance records', priority: 'high', frequency: 'frequent', icon: 'checkmark-circle' },
      { id: 'back-to-basics', name: 'Back to Basics', description: 'Foundational learning resources', priority: 'medium', frequency: 'occasional', icon: 'school' },
      { id: 'backlog-registration', name: 'Backlog Registration', description: 'Register for backlog subjects', priority: 'medium', frequency: 'rare', icon: 'add-circle' },
      { id: 'timetable', name: 'Time table', description: 'View your class schedule', priority: 'high', frequency: 'frequent', icon: 'calendar' },
      { id: 'teacher-leave', name: 'Teacher on Leave', description: 'Check teacher availability', priority: 'medium', frequency: 'occasional', icon: 'person-remove' },
      
      // Exams & Results
      { id: 'exam-attendance', name: 'Exam Attendance', description: 'Mark exam attendance', priority: 'high', frequency: 'occasional', icon: 'clipboard' },
      { id: 'seating-plan', name: 'Seating Plan', description: 'View exam seating arrangements', priority: 'medium', frequency: 'occasional', icon: 'grid' },
      { id: 'reappear-registration', name: 'ReAppear Registration', description: 'Register for re-appear exams', priority: 'medium', frequency: 'rare', icon: 'repeat' },
      { id: 'report-card', name: 'Report Card', description: 'View detailed academic report', priority: 'high', frequency: 'occasional', icon: 'document' },
      { id: 'result', name: 'Result', description: 'Check your exam results', priority: 'high', frequency: 'frequent', icon: 'trophy' },
      { id: 'residential-slip', name: 'Residential Reporting Slip', description: 'Residential reporting documentation', priority: 'low', frequency: 'rare', icon: 'home' },
      
      // Feedback (Academic)
      { id: 'class-feedback', name: 'Student Class Feedback', description: 'Provide feedback on classes', priority: 'medium', frequency: 'occasional', icon: 'chatbubble-ellipses' },
      { id: 'student-feedback', name: 'Student Feedback', description: 'General student feedback', priority: 'medium', frequency: 'occasional', icon: 'chatbubble' },
      { id: 'skill-feedback', name: 'Skill Development Feedback', description: 'Feedback on skill development programs', priority: 'medium', frequency: 'occasional', icon: 'star' },
    ]
  },
  {
    id: 'mentorship',
    name: 'Mentorship & Student Development',
    icon: '🎓',
    color: '#10B981',
    modules: [
      // Mentoring
      { id: 'alumni-mentor', name: 'Alumni Mentor Selection', description: 'Choose your alumni mentor', priority: 'medium', frequency: 'rare', icon: 'people' },
      { id: 'mentor-meeting', name: 'Mentor Meeting Details', description: 'Schedule and view mentor meetings', priority: 'medium', frequency: 'occasional', icon: 'calendar-outline' },
      { id: 'mentor-feedback', name: 'Feedback on Mentor Meeting', description: 'Provide feedback on mentor sessions', priority: 'medium', frequency: 'occasional', icon: 'chatbubble-outline' },
      
      // Skill & Career Growth
      { id: 'ten-to-thrive', name: '10 to Thrive', description: 'Essential skills development program', priority: 'medium', frequency: 'occasional', icon: 'trending-up' },
      { id: 'pep-activities', name: 'PEP Activities', description: 'Personality Enhancement Program activities', priority: 'medium', frequency: 'occasional', icon: 'body' },
    ]
  },
  {
    id: 'campus-life',
    name: 'Campus Life & Services',
    icon: '🏫',
    color: '#8B5CF6',
    modules: [
      // Appointments & Approvals
      { id: 'book-appointment', name: 'Book Appointment', description: 'Schedule appointments with faculty', priority: 'medium', frequency: 'occasional', icon: 'calendar-number' },
      { id: 'doctor-appointment', name: 'Doctor Appointment', description: 'Book medical appointments', priority: 'high', frequency: 'occasional', icon: 'medical' },
      { id: 'exit-undertaking', name: 'Continue Exit Undertaking', description: 'Process exit documentation', priority: 'low', frequency: 'rare', icon: 'exit' },
      
      // Documents & Forms
      { id: 'document-upload', name: 'Document Upload', description: 'Upload required documents', priority: 'medium', frequency: 'occasional', icon: 'cloud-upload' },
      { id: 'electives-polling', name: 'Electives Polling', description: 'Vote for elective subjects', priority: 'medium', frequency: 'rare', icon: 'ballot' },
      { id: 'entry-exit-logs', name: 'Entry Exit Logs', description: 'View campus entry/exit records', priority: 'low', frequency: 'rare', icon: 'list' },
      
      // Events
      { id: 'events', name: 'Events', description: 'Browse campus events', priority: 'high', frequency: 'frequent', icon: 'calendar-clear' },
      { id: 'event-attendance', name: 'Event Attendance', description: 'Mark attendance for events', priority: 'medium', frequency: 'occasional', icon: 'checkbox' },
      { id: 'event-qr-scanner', name: 'Event Attendance QR Scanner', description: 'Scan QR for event attendance', priority: 'medium', frequency: 'occasional', icon: 'qr-code-outline' },
      { id: 'guest-lecture-feedback', name: 'Guest Lecture/Workshop Feedback', description: 'Provide feedback on guest sessions', priority: 'medium', frequency: 'occasional', icon: 'mic' },
      
      // Library
      { id: 'library-feedback', name: 'Library Resource Feedback', description: 'Feedback on library resources', priority: 'low', frequency: 'rare', icon: 'library' },
      { id: 'library-search', name: 'Library Search', description: 'Search library catalog', priority: 'medium', frequency: 'frequent', icon: 'book' },
      { id: 'language-lab', name: 'Language Lab Slot Booking', description: 'Book language lab sessions', priority: 'medium', frequency: 'occasional', icon: 'headset' },
      
      // Utilities
      { id: 'change-password', name: 'Change UMS Password', description: 'Update your UMS password', priority: 'medium', frequency: 'rare', icon: 'key' },
      { id: 'holidays', name: 'List of Holidays', description: 'View academic calendar holidays', priority: 'medium', frequency: 'occasional', icon: 'sunny' },
      { id: 'makeup-adjustment', name: 'Make Up Adjustment', description: 'Request makeup classes', priority: 'medium', frequency: 'occasional', icon: 'refresh' },
      { id: 'inventory', name: 'Inventory', description: 'Check inventory status', priority: 'low', frequency: 'rare', icon: 'cube' },
      
      // Communication
      { id: 'announcements', name: 'Announcements', description: 'View official announcements', priority: 'high', frequency: 'frequent', icon: 'megaphone' },
      { id: 'messages', name: 'Messages', description: 'Check your messages', priority: 'high', frequency: 'frequent', icon: 'mail' },
      
      // Other Engagement
      { id: 'quick-quiz', name: 'Quick Quiz', description: 'Take quick knowledge quizzes', priority: 'medium', frequency: 'occasional', icon: 'help-circle' },
      
      // Campus Navigation
      { id: 'virtual-tour', name: 'Virtual Tour', description: 'Take a virtual campus tour', priority: 'low', frequency: 'rare', icon: 'camera' },
      { id: '360-virtual-tour', name: '360 Virtual Tour', description: 'Immersive 360° campus tour', priority: 'low', frequency: 'rare', icon: 'videocam' },
      
      // Access & Security
      { id: 'visitor-gate-pass', name: 'Visitor Gate Pass', description: 'Generate visitor passes', priority: 'medium', frequency: 'occasional', icon: 'card' },
    ]
  },
  {
    id: 'hostel-mess',
    name: 'Hostel, Mess & Food',
    icon: '🍴',
    color: '#F59E0B',
    modules: [
      // Hostel
      { id: 'hostel-leave', name: 'Hostel Leave Slip', description: 'Apply for hostel leave', priority: 'medium', frequency: 'occasional', icon: 'bed' },
      { id: 'laundry', name: 'Laundry', description: 'Laundry service management', priority: 'medium', frequency: 'frequent', icon: 'shirt' },
      
      // Mess
      { id: 'mess-feedback', name: 'Mess Food Feedback', description: 'Provide feedback on mess food', priority: 'medium', frequency: 'occasional', icon: 'restaurant' },
      { id: 'mess-scanner', name: 'Mess Food Scanner', description: 'Scan for mess meal tracking', priority: 'medium', frequency: 'frequent', icon: 'scan' },
      { id: 'special-food', name: 'Special Food Services', description: 'Order special food services', priority: 'medium', frequency: 'occasional', icon: 'pizza' },
      
      // Food & Shops
      { id: 'food-shops', name: 'Food Shops', description: 'Browse campus food outlets', priority: 'medium', frequency: 'frequent', icon: 'storefront' },
    ]
  },
  {
    id: 'placement',
    name: 'Placement & Career',
    icon: '💼',
    color: '#EF4444',
    modules: [
      // Drives & Opportunities
      { id: 'placement-drive', name: 'Placement Drive', description: 'View placement opportunities', priority: 'high', frequency: 'frequent', icon: 'briefcase' },
      { id: 'placement-summary', name: 'Placement Drive Summary', description: 'Placement statistics and summary', priority: 'medium', frequency: 'occasional', icon: 'bar-chart' },
      
      // Utilities
      { id: 'placement-barcode', name: 'Placement Barcode Scanner', description: 'Scan placement related barcodes', priority: 'medium', frequency: 'occasional', icon: 'barcode' },
    ]
  },
  {
    id: 'health-safety',
    name: 'Health & Safety',
    icon: '🏥',
    color: '#06B6D4',
    modules: [
      // Medical
      { id: 'hospital-helpline', name: 'Uni Hospital Help Line', description: 'Contact university hospital', priority: 'high', frequency: 'rare', icon: 'call' },
    ]
  },
  {
    id: 'transport',
    name: 'Transport & Travel',
    icon: '🚍',
    color: '#84CC16',
    modules: [
      // Transport
      { id: 'transport-preference', name: 'Transport Preference', description: 'Set transport preferences', priority: 'medium', frequency: 'rare', icon: 'bus' },
      
      // Travel Forms
      { id: 'railway-concession', name: 'Railway Concession Form', description: 'Apply for railway concession', priority: 'medium', frequency: 'occasional', icon: 'train' },
    ]
  },
  {
    id: 'finance',
    name: 'Finance',
    icon: '💳',
    color: '#F97316',
    modules: [
      // Payments
      { id: 'fee-payment', name: 'Fee Payment', description: 'Pay university fees', priority: 'high', frequency: 'occasional', icon: 'card-outline' },
      { id: 'fee-schedule', name: 'Fee Payment Schedule', description: 'View fee payment schedule', priority: 'high', frequency: 'occasional', icon: 'time' },
      { id: 'fee-statement', name: 'Fee Statement', description: 'Download fee statements', priority: 'medium', frequency: 'occasional', icon: 'receipt' },
    ]
  },
  {
    id: 'rms',
    name: 'RMS (Resource Management)',
    icon: '🏢',
    color: '#6B7280',
    modules: [
      { id: 'rms-status', name: 'RMS Request Status', description: 'Check RMS request status', priority: 'medium', frequency: 'occasional', icon: 'pulse' },
      { id: 'rms-scanner', name: 'RMS Scanner', description: 'Scan RMS related codes', priority: 'medium', frequency: 'occasional', icon: 'scan-outline' },
      { id: 'log-rms', name: 'Log RMS Request', description: 'Submit new RMS requests', priority: 'medium', frequency: 'occasional', icon: 'add-outline' },
    ]
  },
  {
    id: 'labs-teaching',
    name: 'Labs & Teaching Feedback',
    icon: '🧪',
    color: '#EC4899',
    modules: [
      // Lab
      { id: 'lab-feedback', name: 'Lab Resource Feedback', description: 'Provide feedback on lab resources', priority: 'medium', frequency: 'occasional', icon: 'flask' },
      
      // Teaching
      { id: 'lecture-feedback', name: 'Lecture Feedback', description: 'Provide feedback on lectures', priority: 'medium', frequency: 'frequent', icon: 'person-circle' },
      { id: 'teaching-internship', name: 'Evaluation of Teaching Internship', description: 'Evaluate teaching internship programs', priority: 'low', frequency: 'rare', icon: 'school-outline' },
    ]
  }
];

// Get recommended modules based on priority and frequency
export const getRecommendedModules = (): Module[] => {
  const allModules: Module[] = [];
  searchModules.forEach(category => {
    allModules.push(...category.modules);
  });

  return allModules
    .filter(module => module.priority === 'high' || module.frequency === 'frequent')
    .sort((a, b) => {
      // Sort by priority first, then by frequency
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      const frequencyOrder = { frequent: 3, occasional: 2, rare: 1 };
      
      const aPriority = priorityOrder[a.priority];
      const bPriority = priorityOrder[b.priority];
      
      if (aPriority !== bPriority) {
        return bPriority - aPriority;
      }
      
      const aFrequency = frequencyOrder[a.frequency];
      const bFrequency = frequencyOrder[b.frequency];
      
      return bFrequency - aFrequency;
    })
    .slice(0, 8); // Return top 8 recommended modules
};

// Search function
export const searchInModules = (query: string): { category: Category; module: Module }[] => {
  if (!query.trim()) return [];
  
  const results: { category: Category; module: Module }[] = [];
  const queryLower = query.toLowerCase();
  
  searchModules.forEach(category => {
    // Search in category name
    if (category.name.toLowerCase().includes(queryLower)) {
      category.modules.forEach(module => {
        results.push({ category, module });
      });
    }
    
    // Search in module names and descriptions
    category.modules.forEach(module => {
      const moduleMatches = 
        module.name.toLowerCase().includes(queryLower) ||
        (module.description && module.description.toLowerCase().includes(queryLower));
      
      if (moduleMatches && !results.some(r => r.module.id === module.id)) {
        results.push({ category, module });
      }
    });
  });
  
  return results;
};
