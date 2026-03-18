import { Character, CharacterGenre } from "../types";

const DATA = {
  Fantasy: {
    names: ["Alaric", "Elara", "Thrain", "Lyra", "Kaelen", "Morwen"],
    races: ["Elf", "Dwarf", "Human", "Halfling", "Dragonborn", "Orc"],
    classes: ["Warrior", "Mage", "Rogue", "Paladin", "Druid", "Bard"],
    alignments: ["Lawful Good", "Neutral Good", "Chaotic Good", "Lawful Neutral", "True Neutral", "Chaotic Neutral", "Lawful Evil", "Neutral Evil", "Chaotic Evil"],
    personality: ["Stoic and brave", "Curious and impulsive", "Wise and cautious", "Loyal and fierce"],
    backstories: [
      "A former knight who lost their kingdom to a dragon and now seeks redemption.",
      "A young mage who discovered an ancient scroll and is now pursued by a mysterious cult.",
      "A thief with a heart of gold, stealing from the rich to feed their starving village.",
      "A druid whose forest was burned down, now wandering the world to find a new home."
    ],
    equipment: ["Steel Sword", "Leather Armor", "Magic Staff", "Healing Potion", "Rope (50ft)"]
  },
  "Sci-Fi": {
    names: ["Nova", "Jax", "Kira", "Zane", "Lyra-7", "Orion"],
    races: ["Human", "Android", "Cyborg", "Martian", "Star-born", "Void-walker"],
    classes: ["Pilot", "Engineer", "Mercenary", "Hacker", "Diplomat", "Scientist"],
    alignments: ["Unaligned", "Corporate Loyal", "Rebel", "Anarchist", "Pacifist"],
    personality: ["Cold and calculating", "Optimistic and energetic", "Sarcastic and weary", "Highly analytical"],
    backstories: [
      "A pilot who survived a black hole and returned with strange, unexplained abilities.",
      "An android that gained sentience and is now running from its corporate creators.",
      "A veteran of the Galactic Wars, looking for a quiet life on a frontier planet.",
      "A brilliant scientist who accidentally opened a portal to another dimension."
    ],
    equipment: ["Laser Pistol", "Plasma Shield", "Multi-tool", "Oxygen Tank", "Neural Link"]
  },
  Cyberpunk: {
    names: ["Neon", "Glitch", "Cipher", "Vex", "Static", "Echo"],
    races: ["Human", "Augmented Human", "Synthetic", "Clone"],
    classes: ["Netrunner", "Street Samurai", "Fixer", "Techie", "Medtech"],
    alignments: ["Anti-Corp", "Street-wise", "Neutral", "Mercenary"],
    personality: ["Cynical and street-smart", "Obsessed with tech", "Quiet and deadly", "Flashy and loud"],
    backstories: [
      "A disgraced corporate executive living in the slums, planning their revenge.",
      "A netrunner who saw something they shouldn't have in the deep web.",
      "A street samurai with experimental chrome that's slowly killing them.",
      "A fixer who knows everyone's secrets, but has no one to trust."
    ],
    equipment: ["Cyber-deck", "Monofilament Blade", "Smart-glasses", "Adrenaline Booster", "Fake ID"]
  },
  Modern: {
    names: ["John", "Sarah", "Michael", "Emma", "David", "Olivia"],
    races: ["Human"],
    classes: ["Detective", "Doctor", "Journalist", "Athlete", "Artist", "Teacher"],
    alignments: ["Law-abiding", "Rebellious", "Apathetic", "Altruistic"],
    personality: ["Hard-working and tired", "Ambitious and driven", "Kind and empathetic", "Skeptical and observant"],
    backstories: [
      "A detective investigating a cold case that hits too close to home.",
      "A doctor who left a prestigious hospital to work in a community clinic.",
      "A journalist trying to expose corruption in the city's highest offices.",
      "An artist whose work is secretly inspired by their prophetic dreams."
    ],
    equipment: ["Smartphone", "Notebook", "Flashlight", "First-aid Kit", "Camera"]
  },
  Horror: {
    names: ["Silas", "Eleanor", "Caleb", "Abigail", "Victor", "Clara"],
    races: ["Human", "Ghost", "Cursed One", "Vampire", "Werewolf"],
    classes: ["Occultist", "Survivor", "Grave-robber", "Exorcist", "Medium"],
    alignments: ["Terrified", "Corrupted", "Determined", "Insane"],
    personality: ["Paranoid and jumpy", "Grim and determined", "Haunted and silent", "Unsettlingly calm"],
    backstories: [
      "The sole survivor of a massacre, now hunted by something unseen.",
      "An occultist who performed a ritual that went horribly wrong.",
      "A medium who can hear the whispers of the dead, and they won't stop.",
      "A cursed individual who must pass their burden to another before they die."
    ],
    equipment: ["Silver Dagger", "Holy Water", "Old Journal", "Flickering Lantern", "Salt Bag"]
  }
};

function getRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generateLocalCharacter(genre: CharacterGenre): Character {
  const data = DATA[genre];
  
  return {
    name: getRandom(data.names),
    race: getRandom(data.races),
    class: getRandom(data.classes),
    alignment: getRandom(data.alignments),
    stats: {
      strength: Math.floor(Math.random() * 16) + 3,
      dexterity: Math.floor(Math.random() * 16) + 3,
      constitution: Math.floor(Math.random() * 16) + 3,
      intelligence: Math.floor(Math.random() * 16) + 3,
      wisdom: Math.floor(Math.random() * 16) + 3,
      charisma: Math.floor(Math.random() * 16) + 3,
    },
    backstory: getRandom(data.backstories),
    personality: getRandom(data.personality),
    equipment: [getRandom(data.equipment), getRandom(data.equipment)],
    imageUrl: `https://picsum.photos/seed/${Math.random()}/512/512`
  };
}
