import { fetchHomeQuery } from 'api/homes';
import { Home } from 'types';
import { create } from 'zustand';

interface Store {
  homes: Home[];
  fetchHomes: () => Promise<void>;
  createHome: (home: Home) => void;
  editHome: (home: Home) => void;
  removeHome: (id: number) => void;
}

const useHomesStore = create<Store>()((set) => ({
  homes: [],
  fetchHomes: async () => {
    const homes = await fetchHomeQuery();
    set({ homes });
  },
  createHome: (home: Home) => {
    set((state) => ({ homes: [...state.homes, home] }));
  },
  editHome: (editedHome: Home) => {
    set(({ homes }) => ({
      homes: homes.map((home) => (home.id !== editedHome.id ? home : editedHome)),
    }));
  },
  removeHome: (id: number) => {
    set(({ homes }) => ({ homes: homes.filter((home) => home.id !== id) }));
  },
}));

export default useHomesStore;
