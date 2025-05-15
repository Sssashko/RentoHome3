import { fetchHomeQuery } from 'api/homes';
import { Home } from 'types';
import { create } from 'zustand';

interface Store {
  homes: Home[];                // stored list of homes
  fetchHomes: () => Promise<void>; // load homes from backend
  createHome: (home: Home) => void; // add new home
  editHome: (home: Home) => void;   // update existing home
  removeHome: (id: number) => void; // delete home by id
}

const useHomesStore = create<Store>()((set) => ({
  homes: [],                    // initial: empty listcapital

  fetchHomes: async () => {
    const homes = await fetchHomeQuery(); // fetch from API
    set({ homes });              // replace state
  },

  createHome: (home) => {
    set((state) => ({ homes: [...state.homes, home] })); // append new
  },

  editHome: (editedHome) => {
    set(({ homes }) => ({
      homes: homes.map((home) =>
        home.id !== editedHome.id ? home : editedHome // replace matching
      ),
    }));
  },

  removeHome: (id) => {
    set(({ homes }) => ({
      homes: homes.filter((home) => home.id !== id), // filter out
    }));
  },
}));

export default useHomesStore;
