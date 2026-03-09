import PortfolioImg from "../assets/Portfolio-desktop.jpg";
import Hyundai from "../assets/Hyundai-desktop.jpg";
import Weather from "../assets/Weather-desktop.jpg";
import Drawbridge from "../assets/Drawbridge-desktop.jpg";
import Rice from "../assets/Rice-desktop.jpg";

export const projects = [
  {
    id: "drawbridge",
    title: "Drawbridge Portal",
    description:
      "A webapp I created to manage access to electric gates via a smart switch and Node.js backend. It allows me to easily give guests access without giving them a physical key or remote.",
    features: [
      "Node.js backend proxies the gate controller command over the local network via a Shelley smart switch",
      "JWT-authenticated so only invited guests can trigger the gate",
      "Custom schedules and access periods avaiable for each guest",
      "Guests only see a simple interface with an open button",
      "Logs all activity so you can monitor who is coming and going and when",
    ],
    img: Drawbridge,
    live: "https://letmein.top/",
    github: "https://github.com/Jack-Berry/Drawbridge-Portal",
    tags: ["project"],
  },
  {
    id: "rice",
    title: "Rice Cooker Calculator",
    description:
      "I always cook too much rice in my rice cooker, so I built this tool to calculate the exact amounts of raw rice and water needed for a target cooked weight. It can be fine tuned to your rice cooker if the first try isn't accurate.",
    features: [
      "Input a target cooked weight and get back the exact raw rice and water amounts. It also works in reverse raw -> cooked",
      "Yield ratio calculator so it can be fine tuned to your rice cooker if it was incorrect",
      "User can set preferred texture of rice from firm to soft",
      "Custom animation depending on portion size",
      "Fully client-side, no backend or dependencies",
    ],
    img: Rice,
    live: "https://rice-calc.netlify.app/",
    github: "https://github.com/Jack-Berry/riceCalc",
    tags: ["project"],
  },
  {
    id: "portfolio",
    title: "This website",
    description: "Of course this website had to be included!",
    features: [
      "Light and dark mode with CSS custom properties, persisted to localStorage",
      "Canvas-based particle animations on the About page",
      "Infinite card carousel with clone-based infinite loop and no flicker on wrap",
    ],
    img: PortfolioImg,
    live: "https://www.berrydev.co.uk/",
    github: "https://github.com/Jack-Berry/Portfolio",
    tags: ["project"],
  },
  {
    id: "hyundai",
    title: "Hyundai Homage",
    description:
      "A homage to the Hyundai website using only vanilla CSS and HTML.",
    features: [
      "Pixel-accurate recreation of the Hyundai website layout and visual style",
      "No JavaScript, no frameworks — pure HTML and CSS only",
      "Responsive across mobile and desktop",
    ],
    img: Hyundai,
    live: "https://main--hyundai-homage.netlify.app/",
    github: "https://github.com/Jack-Berry/JB-Homage",
    tags: ["project"],
  },
  {
    id: "weather",
    title: "Weather App",
    description:
      "A simple weather app using the Open Weather API and vanilla JavaScript and CSS.",
    features: [
      "Live weather data via the Open Weather API",
      "Hourly and 7-day forecast views",
      "Location search with browser geolocation fallback",
    ],
    img: Weather,
    live: "https://jbweather-app.netlify.app/",
    github: "https://github.com/Jack-Berry/Weather",
    tags: ["project"],
  },
];
