// Altermium site content. Add projects, posts, events and people here.
// Not sure of the format? Open the site at #/post and use the Post builder.
window.SITE = {
  name: "Altermium",
  tagline: "We make games, mods, servers and the communities around them.",
  about: "Altermium is an independent team. We write Minecraft plugins and mods, run servers, build video games and apps, and look after the communities that grow around them.",
  social: { x: "https://x.com/AltermiumTeam", discord: "https://discord.gg/Au4Mx7CaCq" },
  categories: ["Plugins", "Mods", "Servers", "Games", "Apps", "Communities"],
  status: { live: "Live", dev: "In development", plan: "Planned", done: "Archived" },
  // Default look for every visitor. Visitors can change it in Customize; copy the snippet from there to change the default.
  theme: { mode: "dark", accent: "#ff5a36", tint: 8, radius: 4, font: "serif", density: "1", fx: "stars", motion: "on" },
  presets: [
    { n: "Ember", c: "#ff5a36" }, { n: "Aurora", c: "#2dd4bf" }, { n: "Ocean", c: "#3b82f6" }, { n: "Violet", c: "#8b5cf6" },
    { n: "Forest", c: "#22c55e" }, { n: "Sakura", c: "#f472b6" }, { n: "Gold", c: "#f5b301" }, { n: "Crimson", c: "#e11d48" },
    { n: "Sunset", c: "#fb923c" }, { n: "Cyan", c: "#22d3ee" }, { n: "Lime", c: "#a3e635" }, { n: "Magenta", c: "#d946ef" }
  ],
  // Words that rotate in the home page intro line.
  words: ["games", "mods", "servers", "communities", "apps", "worlds"],
  mission: "Build worlds people want to live in, and the communities that keep them alive.",
  divisions: [
    { name: "Plugins and Mods", text: "Server software and game modifications for Minecraft networks.", cats: ["Plugins", "Mods"] },
    { name: "Servers and Network", text: "Minecraft servers and networks we design, run and keep online.", cats: ["Servers"] },
    { name: "Games", text: "Original video games, from prototypes to full releases.", cats: ["Games"] },
    { name: "Apps and Bots", text: "Tools, apps and Discord bots for our players and members.", cats: ["Apps"] },
    { name: "Communities", text: "Discord communities with events, announcements and moderation teams.", cats: ["Communities"] }
  ],
  values: [
    { title: "Open to everyone", text: "Our communities welcome every member, whether you build, play or just want to talk." },
    { title: "Share what you build", text: "Members post their creations, trade ideas and give each other feedback." },
    { title: "Active and up to date", text: "Announcements, updates and events keep each community moving." }
  ],
  timeline: [
    { y: "2023", t: "Altermium goes online", x: "The Altermium account joins X in January 2023." },
    { y: "2026", t: "Cyflixel community established", x: "The official community for Cyflixel Minecraft players opens in May." },
    { y: "2026", t: "Creativity community established", x: "A server for people who make things opens in October." },
    { y: "2026", t: "New Altermium website", x: "Projects, journal, events, people and server status in one place." }
  ],
  // Open roles: { title, team, type, text, link }. Leave empty if none.
  roles: [],
  // Minecraft servers for the Status page: { name, ip }. Live player counts load from mcsrvstat.us.
  servers: [],
  // Rank prefixes shown before names on the People page, in display order.
  ranks: { FOUNDER: "#ff5a36", DEV: "#6ab0ff", STAFF: "#8ddc7a" },
  projects: [
    { slug: "creativity", name: "Creativity", cat: "Communities", status: "live", year: 2026,
      short: "A server where your creativity never ends.",
      desc: "Share what you make, discuss ideas with other members and show the things you build. Open to everyone.",
      tags: ["Discord", "Creative"], invite: "Au4Mx7CaCq", link: "https://discord.gg/Au4Mx7CaCq",
      image: "images/creativity.webp", fit: "contain", color: "#C71F63",
      features: ["Share your creations", "Talk through ideas with other members", "Open to everyone"], log: [] },
    { slug: "cyflixel", name: "Cyflixel", cat: "Communities", status: "live", year: 2026,
      short: "The official community for Cyflixel Minecraft players.",
      desc: "Get announcements and updates, join exclusive events and meet an active, welcoming community.",
      tags: ["Discord", "Minecraft"], invite: "KwAmfyJsKp", link: "https://discord.gg/KwAmfyJsKp",
      image: "images/cyflixel.webp", fit: "cover", color: "#1B4F8F",
      features: ["Announcements and updates", "Exclusive events", "An active, welcoming community"], log: [] },
    { slug: "cyflixel-rank", name: "Cyflixel Rank", cat: "Plugins", status: "live", year: 2026,
      short: "Ranks, nicknames and parties for a BungeeCord network.",
      desc: "Rank, nick and party plugin for the Cyflixel network. Player data is shared between proxies through MySQL, so ranks and parties follow players across the network.",
      tags: ["Java", "BungeeCord", "MySQL"], features: ["Ranks with prefixes", "Nicknames", "Parties", "Player data shared across proxies"], log: [] },
    { slug: "creativity-bot", name: "Creativity Bot", cat: "Apps", status: "live", year: 2026,
      short: "The Discord bot inside the Creativity community.",
      desc: "A Discord bot built with discord.js that runs the Creativity server with slash commands.",
      tags: ["Discord", "Node.js"], features: ["Slash commands"], log: [] }
  ],
  // Journal posts: date is YYYY-MM-DD. pin: true keeps a post first.
  news: [
    { title: "The new Altermium website is live", tag: "Update", date: "2026-11-04", pin: true, text: "One home for everything we make: our projects, announcements, events and the people behind them." },
    { title: "Creativity and Cyflixel are open to everyone", tag: "Community", date: "2026-10-28", text: "Join Creativity to share what you make, or Cyflixel for Minecraft. Invites are on each project page." }
  ],
  // Events: date is YYYY-MM-DDTHH:MM in your local time. Past events move to the Past list.
  events: [],
  team: [
    { name: "Aryan Dahal", prefix: "FOUNDER", role: "Founder, Altermium", bio: "", link: "https://x.com/AltermiumTeam" }
  ]
};
