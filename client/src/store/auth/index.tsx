import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { logOutQuery } from 'api/auth';
import { User } from 'types';

interface Store {
  user: User | null;                        // currently logged-in user, or null if none
  setUser: (user: User | null) => Promise<void>; // update user in state (accepts null to clear)
  logOut: () => Promise<void>;              // call API to log out and clear user
}

const useAuthStore = create<Store>()(
  persist(
    (set, get) => ({
      user: null,                           // initial: not authenticated

      setUser: async (user: User | null) => {
        set({ user });                      // save new user or clear
      },

      logOut: async () => {
        const user = get().user;            // get current user
        if (user) {
          await logOutQuery(user.id).catch(() => {}); // try server logout, ignore errors
        }
        set({ user: null });                // clear user locally
      }
    }),
    { name: 'auth' }                        // localStorage key
  )
);

export const useLogOut = () => useAuthStore((state) => state.logOut);
export default useAuthStore;
