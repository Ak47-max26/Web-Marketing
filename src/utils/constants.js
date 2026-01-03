// Constants and configuration data
export const integrationTools = [
  { name: 'GitHub', icon: 'GitHubLogo' },
  { name: 'Notion', icon: 'NotionLogo' },
  { name: 'Google Calendar', icon: 'GoogleCalendarLogo' },
  { name: 'Gmail', icon: 'GmailLogo' },
  { name: 'Slack', icon: 'SlackLogo' },
  { name: 'Figma', icon: 'FigmaLogo' },
  { name: 'LinkedIn', icon: 'LinkedInLogo' },
  { name: 'Google Drive', icon: 'GoogleDriveLogo' },
  { name: 'VS Code', icon: 'VSCodeLogo' },
  { name: 'Spotify', icon: 'SpotifyLogo' }
];

export const animationConstants = {
  float: {
    duration: 8000,
    easing: 'ease-in-out',
    delay: 0
  },
  marquee: {
    duration: 40000,
    easing: 'linear',
    direction: 'normal'
  },
  blob: {
    duration: 10000,
    iterations: 'infinite',
    easing: 'linear'
  }
};

export const philosophyItems = [
  {
    title: "Autonomous Intelligence",
    desc: "Runs silently every 3 hours to optimize your plan.",
    icon: "Brain"
  },
  {
    title: "Memory Mesh",
    desc: "Remembers context across weeks, months, and years.",
    icon: "Activity"
  },
  {
    title: "Emotional Context",
    desc: "Understands the 'why' behind your productivity drops.",
    icon: "Sparkles"
  }
];

export const navigationItems = ['Philosophy', 'Features', 'Core OS', 'Moonshots'];

export const spotlightFeatures = [
  {
    title: 'Taskmind Engine',
    description: 'Most apps list tasks. Taskmind weighs them. It calculates complexity against your energy score to ensure you never overcommit.',
    tags: ['Energy Scoring', 'Complexity Weighting', 'Auto-Batching'],
    colSpan: 'md:col-span-2',
    backgroundIcon: 'LayoutGrid'
  },
  {
    title: 'Autonomy Agents',
    description: 'Background processes that analyze your financial, health, and career data every 3 hours.',
    colSpan: 'md:row-span-2',
    backgroundIcon: 'Activity',
    agents: [
      {
        name: 'Finance Agent',
        status: 'green',
        message: 'Subscription overlap detected. Potential savings: $45/mo.'
      },
      {
        name: 'Health Agent',
        status: 'blue',
        message: 'Sleep debt accumulating. Suggesting 10PM cutoff.'
      }
    ]
  },
  {
    title: 'Command Kernel',
    description: 'Natural language parser. Type "Meeting with John next Tuesday" and it handles the rest.',
    icon: 'Terminal',
    backgroundIcon: 'Terminal'
  },
  {
    title: 'Reflection',
    description: 'Auto-journaling that detects emotional shifts and nudges you towards balance before you crash.',
    icon: 'MessageSquare',
    backgroundIcon: 'MessageSquare'
  }
];

export const moonshotItems = [
  {
    title: 'ShadowGPT',
    description: 'Your digital "Shadow Self." Unlike polite assistants, ShadowGPT challenges your biases and provides brutal honesty to foster growth.',
    icon: 'Ghost',
    category: 'Psychology'
  },
  {
    title: 'Quantum Sync',
    description: 'Synchronizes your contextual memory across devices and time. Makes Astrivya feel like a continuous consciousness.',
    icon: 'Globe',
    category: 'Memory Mesh'
  }
];
