// Edit this file to change the site content. Colors must be 6-digit hex like #2563EB.
window.SITE = {
  name: "Altermium",
  headline: "We make extraordinary games, mods and communities.",
  lead: "Altermium builds Minecraft plugins, mods and servers, video games, apps and online communities, including Creativity and Cyflixel.",
  social: { x: "https://x.com/AltermiumTeam" },
  theme: { mode: "auto", accent: "#2563EB", radius: "soft" }, // mode: light | dark | auto. radius: sharp | soft | round
  projects: [
    {
      name: "Creativity", tag: "Creative community", est: "Established October 2026",
      desc: "A server where your creativity never ends. Share what you make, discuss ideas with other members and show the things you build. Open to everyone.",
      link: "https://discord.gg/Au4Mx7CaCq", guild: "1564451031126114325", color: "#C71F63", image: "images/creativity.webp", fit: "contain"
    },
    {
      name: "Cyflixel", tag: "Minecraft community", est: "Established May 2026",
      desc: "The official Cyflixel community for Minecraft players. Get announcements and updates, join exclusive events and meet an active, welcoming community.",
      link: "https://discord.gg/KwAmfyJsKp", guild: "1500084302254444676", color: "#1B4F8F", image: "images/cyflixel.webp", fit: "cover"
    }
  ],
  values: [
    { title: "Open to everyone", text: "Our communities welcome every member, whether you build, play or just want to talk." },
    { title: "Share what you build", text: "Members post their creations, trade ideas and give each other feedback." },
    { title: "Active and up to date", text: "Announcements, updates and events keep each community moving." }
  ],
  offer: [
    { title: "Minecraft plugins", text: "Custom plugins for servers and networks: ranks, parties, scoreboards, minigames and more." },
    { title: "Mods", text: "Mods that add new features and gameplay to the games people already love." },
    { title: "Servers", text: "Minecraft servers and networks that we design, build and run ourselves." },
    { title: "Online communities", text: "Active Discord communities with announcements, events and a welcoming team." },
    { title: "Video games", text: "Original games built by our team, from small experiments to bigger projects." },
    { title: "Apps", text: "Useful apps and tools for our players, members and creators." }
  ],
  // Announcements: date is YYYY-MM-DD. pin: true keeps a post at the top.
  news: [
    { title: "The new Altermium website is live", tag: "Update", date: "2026-11-04", pin: true, text: "Altermium now has one home for everything we make, with announcements, events and our communities in one place." },
    { title: "Creativity and Cyflixel are open to everyone", tag: "Community", date: "2026-10-28", pin: false, text: "Join Creativity to share what you make, or Cyflixel for Minecraft. Invites are in the Our communities section." }
  ],
  // Events: date is YYYY-MM-DDTHH:MM (your local time). Past events hide automatically.
  events: [],
  founder: { name: "Aryan Dahal", role: "Founder, Altermium" }
};
