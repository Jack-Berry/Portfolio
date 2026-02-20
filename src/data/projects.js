import HolidoughUI from "../assets/Holidough-desktop.jpg";
import HolidoughExpense from "../assets/Holidough-AddExpense.jpg";
import HolidoughBillSplits from "../assets/Holidough-BillSplits.jpg";
import PortfolioImg from "../assets/Portfolio-desktop.jpg";
import Cottage from "../assets/Bwythn.jpg";
import Hyundai from "../assets/Hyundai-desktop.jpg";
import Weather from "../assets/Weather-desktop.jpg";

export const projects = [
  {
    id: "holidough",
    title: "Holidough",
    description:
      "A full-stack holiday budgeting app built as a group project. Handles expense tracking, multi-day splitting, and bill sharing.",
    img: HolidoughUI,
    live: "https://holidough.uk/",
    github: "https://github.com/russell-gh/travel-tally",
    githubBack: "https://github.com/russell-gh/travel-tally-back-end",
    tags: ["featured", "hero"],
    heroSlides: [
      {
        img: HolidoughUI,
        description:
          "Holidough is a complete holiday budgeting app with an intuitive UI. This is a full-stack React app I built as part of a group project. My primary role was handling all input and processing of the expense data.",
      },
      {
        img: HolidoughExpense,
        description:
          "This involved taking the data inputted by the user, converting it into the correct formats, then saving as an object with a unique ID. If it was a multi day expense, a function I wrote would split this expense up into multiple expense objects which would receive a separate shared ID. This meant multi-day expenses could then be edited as an individual expense for each day or repackaged as a multi day expense to be edited.",
      },
      {
        img: HolidoughBillSplits,
        description:
          "I also wrote the optional bill splitting feature. This operated similarly to creating an expense, but can be added, removed or edited independently of the expense. These can easily be split evenly by pressing the button or the amount can be inputted manually.",
      },
    ],
  },
  {
    id: "portfolio",
    title: "This website",
    description: "Of course this website had to be included!",
    img: PortfolioImg,
    live: "https://www.berrydev.co.uk/",
    github: "https://github.com/Jack-Berry/Portfolio",
    tags: ["featured"],
  },
  {
    id: "cottage",
    title: "Bwthyn Preswylfa",
    description:
      "A commission for a holiday home website. I had to create clever workarounds for several problems to help the client avoid subscriptions and other charges.",
    img: Cottage,
    live: "https://holidayhomesandlets.co.uk/",
    github: "https://github.com/Jack-Berry/Parker-website",
    tags: ["featured"],
  },
  {
    id: "hyundai",
    title: "Hyundai Homage",
    description:
      "A homage to the Hyundai website using only vanilla CSS and HTML.",
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
    img: Weather,
    live: "https://jbweather-app.netlify.app/",
    github: "https://github.com/Jack-Berry/Weather",
    tags: ["project"],
  },
];
