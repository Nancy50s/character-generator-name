export interface Character {
  name: string;
  race: string;
  class: string;
  alignment: string;
  stats: {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
  };
  backstory: string;
  personality: string;
  equipment: string[];
  imageUrl?: string;
}

export type CharacterGenre = 'Fantasy' | 'Sci-Fi' | 'Cyberpunk' | 'Modern' | 'Horror';
