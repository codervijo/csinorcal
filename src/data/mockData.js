export const families = [
  {
    id: 1,
    name: "Cherian Family",
    phone: "831-555-1234",
    members: ["Vijo Cherian"],
  },
  {
    id: 2,
    name: "Eapen Family",
    phone: "831-555-5678",
    members: ["John Eapen"],
  },
];

export const contributions = [
  { id: 1, date: "Jan 15, 2026", amount: 200 },
  { id: 2, date: "Feb 10, 2026", amount: 150 },
  { id: 3, date: "Mar 05, 2026", amount: 300 },
];

export const events = [
  {
    id: 1,
    title: "Sunday Service",
    date: "Every Sunday",
    time: "10:00 AM",
    description: "Join us for our weekly Sunday worship service with praise, prayer, and the Word.",
  },
  {
    id: 2,
    title: "Youth Meeting",
    date: "Every Friday",
    time: "6:00 PM",
    description: "A time for young people to connect, grow in faith, and have fun together.",
  },
  {
    id: 3,
    title: "Choir Practice",
    date: "Every Saturday",
    time: "5:00 PM",
    description: "Rehearsal for the church choir. All singers welcome!",
  },
];

export const news = [
  {
    id: 1,
    title: "Church Anniversary Celebration",
    image: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=600&h=300&fit=crop",
    description: "Join us as we celebrate our church's anniversary with special services, guest speakers, and fellowship meals throughout the weekend.",
    date: "Apr 20, 2026",
    fullContent: "We are thrilled to announce our annual Church Anniversary Celebration! This year marks a significant milestone in our journey of faith together. The celebration will span the entire weekend with special worship services on Saturday evening and Sunday morning. We have invited renowned guest speakers who will share messages of hope and renewal. A fellowship meal will follow the Sunday service where families can connect and rejoice together. Please sign up at the welcome desk to bring a dish to share.",
  },
  {
    id: 2,
    title: "New Youth Program Launch",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=300&fit=crop",
    description: "Exciting new programs designed for our youth to grow in faith, build community, and develop leadership skills.",
    date: "Apr 05, 2026",
    fullContent: "We are excited to launch our brand-new Youth Program! Designed for teens aged 13–18, the program includes weekly Bible study sessions, community service projects, leadership workshops, and fun social events. Our goal is to create a safe and encouraging environment where young people can explore their faith, develop strong friendships, and discover their God-given gifts. The program kicks off this Friday at 6:00 PM. Parents are invited to an orientation session. Contact the church office for more details.",
  },
];

export const aboutGroups = [
  {
    id: "sunday-school",
    name: "Sunday School",
    icon: "MenuBook",
    description: "Our Sunday School program provides Bible-based education for all ages. Classes are held every Sunday morning before the main worship service. We have dedicated teachers who prepare engaging lessons to help children, teens, and adults grow in their understanding of Scripture.",
  },
  {
    id: "finance",
    name: "Finance",
    icon: "AccountBalance",
    description: "The Finance Committee oversees the stewardship of church funds, budgeting, and financial reporting. We ensure transparency and accountability in managing the resources God has entrusted to our community.",
  },
  {
    id: "choir",
    name: "Choir",
    icon: "MusicNote",
    description: "Our church choir leads worship through music every Sunday. We welcome singers of all skill levels. Choir practice is held every Saturday at 5:00 PM. Join us to lift your voice in praise!",
  },
  {
    id: "youth",
    name: "Youth",
    icon: "Groups",
    description: "The Youth Ministry is dedicated to nurturing the next generation of believers. We organize Bible studies, retreats, community service projects, and social events for teens and young adults.",
  },
  {
    id: "mens-fellowship",
    name: "Men's Fellowship",
    icon: "Person",
    description: "The Men's Fellowship brings together men of the church for prayer, Bible study, and mutual encouragement. We meet monthly for fellowship breakfasts and organize service projects throughout the year.",
  },
  {
    id: "womens-fellowship",
    name: "Women's Fellowship",
    icon: "Person",
    description: "The Women's Fellowship provides a supportive community for women to grow spiritually, serve together, and build lasting friendships. We host regular meetings, retreats, and outreach programs.",
  },
];

export const photoAlbums = [
  {
    id: "album-1",
    title: "Sunday Service",
    sourceUrl: "https://photos.google.com/share/example1",
    photos: [
      { id: "p1", url: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=400&h=300&fit=crop", caption: "Worship Service" },
      { id: "p2", url: "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=400&h=300&fit=crop", caption: "Choir Performance" },
      { id: "p3", url: "https://images.unsplash.com/photo-1544427920-c49ccfb85579?w=400&h=300&fit=crop", caption: "Fellowship Time" },
      { id: "p4", url: "https://images.unsplash.com/photo-1445445290350-18a3b86e0968?w=400&h=300&fit=crop", caption: "Prayer Meeting" },
    ],
  },
  {
    id: "album-2",
    title: "Youth Retreat 2026",
    sourceUrl: "https://photos.google.com/share/example2",
    photos: [
      { id: "p5", url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=300&fit=crop", caption: "Group Photo" },
      { id: "p6", url: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=400&h=300&fit=crop", caption: "Team Building" },
      { id: "p7", url: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400&h=300&fit=crop", caption: "Campfire Night" },
    ],
  },
];

// API abstraction layer for future ICONCMO integration
export const api = {
  getFamilies: () => Promise.resolve(families),
  getFamily: (id) => Promise.resolve(families.find((f) => f.id === id)),
  getContributions: () => Promise.resolve(contributions),
  getEvents: () => Promise.resolve(events),
  getNews: () => Promise.resolve(news),
  getNewsArticle: (id) => Promise.resolve(news.find((n) => n.id === id)),
  getAboutGroups: () => Promise.resolve(aboutGroups),
  getAboutGroup: (id) => Promise.resolve(aboutGroups.find((g) => g.id === id)),
};
