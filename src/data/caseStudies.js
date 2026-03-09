import HolidayHomesImg from "../assets/Bwythn.jpg";
import HolidoughImg from "../assets/Holidough-desktop.jpg";
import UMCImg from "../assets/UMC.jpg";

export const caseStudies = [
  {
    id: "holiday-homes",
    title: "Holiday Homes & Lets",
    tagline:
      "A commission-free direct booking platform for two UK holiday rental properties, built to cut out third-party fees and give the owner full control.",
    description:
      "Holiday Homes & Lets serves two properties: one in Anglesey, Wales and one in Dorset, England. Guests browse details and photo galleries, check live availability, and get an instant price breakdown before booking. The owner manages everything through a protected admin dashboard without paying platform fees.",
    features: [
      "The live availability calendar calculates a full cost breakdown the moment a guest picks their dates, factoring in property-specific rules like cleaning fees, per-pet deposits, and multi-week discounts fetched from the backend in real time.",
      "Each property has 128 images served in two passes: fast-loading thumbnails first, with the full-size version fading in only when needed. A lightbox handles full-screen navigation.",
      "The site was originally built for the Anglesey property only. When the owner took on a second property in Dorset I refactored it into a config-driven multi-property setup, loading all per-property data (content, pricing rules, gallery paths, capacity) programmatically based on which property is selected.",
      "The admin dashboard is JWT-protected and lets the owner view bookings on a calendar, set date-specific pricing, and manage stale records, all scoped to their property.",
      "After every build a Node script uses Puppeteer to render all 9 routes and save the output as static HTML. This gives search engines fully resolved content, including JSON-LD structured data for vacation rental listings.",
      "The What to Do guide has a self-advancing image reel for each section (attractions, restaurants, beaches). Images are pulled from the main asset pool using a keyword filter so nothing is duplicated.",
    ],
    highlights: [
      "Vite hashes asset filenames in production, which makes dynamic image paths impossible to construct at runtime. I built a custom resolver that uses import.meta.glob to eagerly bundle every image at build time, then resolves the correct path through exact-match, fuzzy-match, and fallback in sequence.",
      "The two properties have structurally different pricing rules: one charges a flat cleaning fee on short stays, the other applies percentage discounts at 7 and 28 nights plus a per-pet deposit. Instead of hardcoding that logic, the rules are declared in config and evaluated server-side. The pet-count input also debounces at 300ms to avoid hammering the API.",
      "The site is deployed on shared hosting (HostPresto/LiteSpeed) that has no SSR support. To preserve SEO, a Puppeteer script runs after each build, waits for the page to settle, and saves rendered HTML for all 9 public routes. LiteSpeed's aggressive caching also required server-side no-cache headers on index.html to stop stale builds from getting stuck.",
      "The property About page gallery and the What to Do guide sections draw from the same image pool but need to show different images. A keyword-based filter defined per section pulls matching images by filename pattern, which removes the need to maintain separate image lists.",
      "Platforms like Airbnb don't expose their booking APIs, which creates a double-booking risk when a property is listed in multiple places. The solution was routing everything through Google Calendar. When a guest books via the site, it writes the dates to a Google Calendar. External platforms can sync bidirectionally with Google Calendar, so a booking made anywhere updates the calendar, which updates everywhere else. The availability calendar on the site reads from this same source, keeping it accurate without any direct integration with third-party platforms.",
      "The react-image-lightbox library crashed at runtime with a cryptic error. I traced it through the library's internals to a missing global object that isn't available in Vite's ESM environment. The fix was adding global: 'globalThis' to vite.config.js.",
    ],
    stack: {
      Frontend: [
        "React 18",
        "Vite 6",
        "React Router v7",
        "SCSS",
        "Bootstrap 5",
        "react-date-range",
        "react-image-gallery",
      ],
      Backend: [
        "Node.js REST API",
        "JWT authentication",
        "FormSpree",
        "EmailJS",
      ],
      Other: [
        "Puppeteer",
        "Google Calendar API",
        "JSON-LD structured data",
        "LiteSpeed / cPanel",
        "Google Maps",
      ],
    },
    scale: {
      properties: 2,
      routes: 9,
      components: 25,
      images: 128,
      status: "Production: live with real bookings and paying guests",
    },
    img: HolidayHomesImg,
    live: "https://holidayhomesandlets.co.uk/",
    github: "https://github.com/Jack-Berry/Parker-website",
    colour: "col-c",
  },
  {
    id: "umc",
    title: "Useless Men's Co-operative",
    tagline:
      "A skill-matching platform that connects men with complementary strengths so they can teach, learn, and meet up in the real world.",
    description:
      "A community networking platform built around practical self-improvement. Users complete skill assessments across categories like DIY, technology, and communication, then get matched with nearby people who can cover their weak spots, and vice versa. On top of matching it has real-time encrypted messaging, a friends system, local events, and a news feed. This is phase one of a larger ongoing project.",
    features: [
      "Multi-step skill assessments across categories including DIY, technology, communication, self-care, and community. Answers are scored on a Likert scale and rolled up into category and tag scores stored as JSONB on each user profile. The assessment content is fully managed by admins, so the number of assessments and questions grows over time.",
      "Users view their results as a radar chart, bar chart, or colour-coded heatmap at the category level, then drill into any category to see per-skill-tag breakdowns in the same three views. The drill-down is state-driven with no extra network requests.",
      "Users are matched when they're within a configurable radius and their skill scores are complementary. The matching query uses a Haversine distance calculation directly in PostgreSQL, no application-layer loops.",
      "All direct messages are encrypted with AES-256-GCM before leaving the client. Each conversation has its own key derived via HKDF, so the server stores and relays ciphertext it can never read.",
      "Socket.io handles live online/offline indicators and instant message delivery. Users join per-thread rooms and receive presence updates pushed from the backend without any polling.",
      "Users can send, accept, or decline friend requests. Non-friend matches start a conversation via a single-use cryptographically signed token that expires after one use.",
      "The admin panel is a full CMS for managing assessment content. It supports drag-and-drop reordering, active/inactive toggling, tag linking, and a SQL snapshot tool that saves point-in-time backups as executable restore scripts.",
    ],
    highlights: [
      "Each conversation has a unique encryption key derived from a server-side master secret and a per-conversation salt using HKDF-SHA-256. The IV, ciphertext, GCM auth tag, and AAD are stored separately in base64. The server can forward messages without ever seeing the content.",
      "The match query runs a Haversine formula directly in PostgreSQL to filter by radius, then scores candidates based on how well their JSONB skill fields complement the requesting user's weak areas. The threshold values (weak below 40, strong above 70) are tunable via query params, keeping everything in a single round-trip.",
      "After every assessment submission a multi-step PostgreSQL CTE computes average Likert scores per category, normalises them to 0-100, joins with the question_tags table to get tag-level averages, then writes both sets of scores back to the user row in one atomic operation.",
      "Questions have a parent_id field that creates a tree of base questions and conditional follow-ups. The frontend only shows a follow-up when its parent answer crosses a threshold, and the admin panel exposes the full tree with separate edit routes per parent.",
      "The API client intercepts every 401, silently refreshes the token, and retries the failed request. Concurrent requests during a refresh are queued and replayed once the new token arrives. A localStorage event listener propagates session state across tabs so logging out in one tab clears everything.",
      "The skill visualisation has two levels sharing the same three-mode toggle (radar, bar, heatmap). The radar chart uses a custom tick renderer that wraps long category labels across two lines to stop them overflowing the chart boundary. The heatmap is a custom Tailwind CSS grid rather than a charting library component, with colour thresholds at 40 and 70. Both levels read from pre-aggregated JSONB scores already in the Redux store, falling back to client-side computation from raw Likert answers if scores haven't been written yet.",
    ],
    stack: {
      Frontend: [
        "React 19",
        "Vite 7",
        "Redux Toolkit",
        "TailwindCSS",
        "Framer Motion",
        "Socket.io Client",
        "Recharts",
      ],
      Backend: [
        "Node.js",
        "Express.js 5",
        "Socket.io 4",
        "JWT",
        "bcrypt",
        "Sharp",
        "Node crypto (AES-256-GCM)",
      ],
      Database: ["PostgreSQL"],
      Other: ["Supabase Storage", "Google Maps API", "Nodemailer"],
    },
    scale: {
      "API endpoints": "70+",
      "DB tables": 12,
      "Redux slices": 7,
      components: "37+",
      status:
        "Phase 1 of an ongoing project, live at uselessmen.org with real auth, encryption, and a production database",
    },
    img: UMCImg,
    live: "https://uselessmen.org",
    github: "https://github.com/Jack-Berry/UMC-Front",
    colour: "col-a",
  },
  {
    id: "holidough",
    title: "Holidough",
    tagline:
      "My contributions to a group bootcamp project: the expense data pipeline, multi-day splitting logic, and bill-sharing feature.",
    description:
      "Holidough was the capstone project from a 3-month full-stack bootcamp, built as a group. My main responsibility was the expense data pipeline: taking input from the UI, normalising it into typed objects, and handling the tricky case of expenses that span multiple days. I also designed and built the bill-splitting feature independently.",
    features: [
      "Expenses that span multiple days are split into individual daily objects that share a parent ID. You can edit a single day's cost without touching the rest, or repackage them back into a multi-day expense.",
      "I built the bill-splitting module from scratch. Amounts can be split evenly at the press of a button or adjusted manually per person. Splits live independently of their parent expense and can be added, removed, or edited at any time.",
      "All user input goes through a pipeline I wrote that validates values, coerces them to canonical types, and assigns a unique ID before anything reaches the backend. This caught format mismatches caused by inconsistent inputs across the team.",
      "Users create a trip, add members, log expenses as they go, and get a final settlement at the end showing exactly who owes whom.",
    ],
    highlights: [
      "The input form accepted values in various formats depending on who wrote the feature. My pipeline coerces everything to canonical types, validates ranges, and rejects bad data before it hits the API. This stopped a whole category of bugs caused by type inconsistencies between team members' code.",
      "Instead of storing a multi-day expense as one record with a duration field, I split it into daily objects linked by a shared parent ID. This let the rest of the app treat all expenses the same way, with aggregation and editing handled cleanly at the data layer rather than scattered across different components.",
    ],
    stack: {
      Frontend: ["React", "Vite", "SCSS", "Axios"],
      Backend: ["Node.js", "Express.js", "JWT", "bcrypt"],
      Database: ["MongoDB"],
      Other: ["Exchange Rate API", "Render"],
    },
    scale: {
      status:
        "Group bootcamp project. I owned the expense pipeline, multi-day splitting, and bill-splitting feature.",
    },
    img: HolidoughImg,
    live: "https://holidough.uk/",
    github: "https://github.com/russell-gh/travel-tally",
    githubBack: "https://github.com/russell-gh/travel-tally-back-end",
    colour: "col-b",
  },
];
