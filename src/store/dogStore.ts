import { create } from 'zustand';

type DogState = {
  selectedBreed: string | null;
  setSelectedBreed: (breed: string | null) => void;
};

export const useDogStore = create<DogState>((set) => ({
  selectedBreed: null,
  setSelectedBreed: (breed) => set({ selectedBreed: breed }),
}));