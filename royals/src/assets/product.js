import Diamondbracelet from './3.webp';
import Diamondpendantset from './4s.jpg';
import Dimondmangalsutra from './5.jpg';
import beadednacjlace from './8.png';
import Celeste_Real_Diamond_Bracelet from './bangle.webp';
import Diamond_Necklace from './bangles.webp';
import White from './white.avif';

// ─── PRODUCT DATA ────────────────────────────────────────────────────────────
export const products = [
  {
    id: 1,
    name: "Diamond Bracelet",
    price: 245000,
    image: Diamondbracelet,
    category: "Bracelets",
    tag: "Bestseller",
    description: "Elegant round-cut diamonds set in 18k white gold. Ideal for weddings and festive occasions.",
    metal: "18k White Gold",
    stone: "Round-Cut Diamond",
    weight: "7.2g",
    sku: "RJ-BR-001"
  },
  {
    id: 2,
    name: "Diamond Pendant Set",
    price: 10000000,
    image: Diamondpendantset,
    category: "Pendants",
    tag: "Exclusive",
    description: "A stunning solitaire pendant with matching earrings, masterfully crafted in 22k yellow gold.",
    metal: "22k Yellow Gold",
    stone: "Solitaire Diamond",
    weight: "12.5g",
    sku: "RJ-PD-002"
  },
  {
    id: 3,
    name: "Diamond Mangalsutra",
    price: 320000,
    image: Dimondmangalsutra,
    category: "Mangalsutra",
    tag: "Traditional",
    description: "A modern take on the sacred mangalsutra — delicate diamond clusters on a classic black bead chain.",
    metal: "22k Gold",
    stone: "SI Diamond",
    weight: "9.8g",
    sku: "RJ-MG-003"
  },
  {
    id: 4,
    name: "Beaded Necklace",
    price: 350000,
    image: beadednacjlace,
    category: "Necklaces",
    tag: "New Arrival",
    description: "Handcrafted multistrand necklace",
    metal: "Sterling Silver",
    stone: "Glass Beads",
    weight: "5.4g",
    sku: "RJ-NK-004"
  },
  {
    id: 5,
    name: "Celeste Diamond Bracelet",
    price: 164000,
    image: Celeste_Real_Diamond_Bracelet,
    category: "Bracelets",
    tag: "Popular",
    description: "Inspired by the celestial sky — delicate floral patterns set with naturally mined diamonds in 18k gold.",
    metal: "18k Rose Gold",
    stone: "Natural Diamond",
    weight: "6.1g",
    sku: "RJ-BR-005"
  },
  {
    id: 6,
    name: "Grand Diamond Necklace",
    price: 20000000,
    image: Diamond_Necklace,
    category: "Necklaces",
    tag: "Luxury",
    description: "A statement necklace featuring 3.5 carats of GIA-certified diamonds set in 18k rose gold.",
    metal: "18k Rose Gold",
    stone: "GIA-Certified Diamond (3.5 ct)",
    weight: "28.3g",
    sku: "RJ-NK-006"
  },
  {
    id: 7,
    name: "Emerald & Diamond Ring",
    price: 485000,
    image: Diamondbracelet,
    category: "Rings",
    tag: "New Arrival",
    description: "A vivid Colombian emerald flanked by brilliant-cut diamonds in a platinum halo setting.",
    metal: "Platinum",
    stone: "Colombian Emerald + Diamond",
    weight: "5.0g",
    sku: "RJ-RG-007"
  },
  {
    id: 8,
    name: "South Sea Pearl Drop Earrings",
    price: 95000,
    image: Dimondmangalsutra,
    category: "Earrings",
    tag: "Classic",
    description: "South Sea cultured pearls suspended from a diamond-studded 18k gold hook. Timeless elegance.",
    metal: "18k Yellow Gold",
    stone: "South Sea Pearl + Diamond",
    weight: "4.2g",
    sku: "RJ-ER-008"
  },
  {
    id: 9,
    name: "Ruby Cluster Bangle",
    price: 780000,
    image: Celeste_Real_Diamond_Bracelet,
    category: "Bangles",
    tag: "Exclusive",
    description: "Burmese rubies and pavé diamonds set in a sleek 22k gold bangle — bold, graceful, unforgettable.",
    metal: "22k Yellow Gold",
    stone: "Burmese Ruby + Pavé Diamond",
    weight: "18.7g",
    sku: "RJ-BN-009"
  },
  {
    id: 10,
    name: "Ruby Cluster Bangle",
    price: 780000,
    image: White,
    category: "Bangles",
    tag: "Exclusive",
    description: "Burmese rubies and pavé diamonds set in a sleek 22k gold bangle — bold, graceful, unforgettable.",
    metal: "22k Yellow Gold",
    stone: "Burmese Ruby + Pavé Diamond",
    weight: "18.7g",
    sku: "RJ-BN-009"
  }
];

export const categories = ["All", "Bracelets", "Necklaces", "Pendants", "Rings", "Bangles", "Earrings", "Mangalsutra"];

export const tagColors = {
  Bestseller: "#000",
  Exclusive: "#1a1a1a",
  Traditional: "#222",
  "New Arrival": "#333",
  Popular: "#111",
  Luxury: "#000",
  Classic: "#1f1f1f",
};

export const formatINR = (n) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(n);