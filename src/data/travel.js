import MocChau1 from '../assets/travel/Vietnam/MocChau/MocChau1.jpg';
import MocChau2 from '../assets/travel/Vietnam/MocChau/MocChau2.jpg';
import MocChau3 from '../assets/travel/Vietnam/MocChau/MocChau3.jpg';
import MocChau4 from '../assets/travel/Vietnam/MocChau/MocChau4.jpg';
import MocChau5 from '../assets/travel/Vietnam/MocChau/MocChau5.jpg';

import YConcert20251 from "../assets/travel/Vietnam/Hanoi/YConcert/YConcert20251.jpg";
import YConcert20252 from "../assets/travel/Vietnam/Hanoi/YConcert/YConcert20252.jpg";
import YConcert20253 from "../assets/travel/Vietnam/Hanoi/YConcert/YConcert20253.jpg";
import YConcert20254 from "../assets/travel/Vietnam/Hanoi/YConcert/YConcert20254.jpg";
import YConcert20255 from "../assets/travel/Vietnam/Hanoi/YConcert/YConcert20255.jpg";

const travelData = [
  {
    id: 1,
    city: "Hanoi",
    country: "Vietnam",
    flag: "🇻🇳",
    lat: 21.0278,
    lng: 105.8342,
    images: [],
    date: "",
    events: [
      {
        id: 1,
        name: "YConcert 2025 with Bui Lan Huong, Soobin Hoang Son, and other artists",
        date: "22 Dec 2025",
        images: [YConcert20251, YConcert20252, YConcert20253, YConcert20254, YConcert20255],
      },
    ],
  },
  {
    id: 2,
    city: "Moc Chau",
    country: "Vietnam",
    flag: "🇻🇳",
    lat: 20.8360,
    lng: 104.6800,
    date: "November 2025",
    events: [
      {
        id: 1,
        name: "A memorable trip to pine forest, pet farm, little forest, a garden, pink grass hill with a beloved friend",
        date: "Nov 2025",
        images: [MocChau1, MocChau2, MocChau3, MocChau4, MocChau5],
      },
    ],
  },
];

export default travelData;
