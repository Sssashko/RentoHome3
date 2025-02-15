import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { logOutQuery } from 'api/auth';
import { User } from 'types';

interface Store {
    user: User | null;
    setUser: (user: User | null) => Promise<void>; // 👈 Разрешаем null
    logOut: () => Promise<void>; 
}

const useAuthStore = create<Store>()(
    persist(
        (set, get) => ({
            user: null,
            setUser: async (user: User | null) => { // 👈 Теперь можно передавать null
                set({ user });
            },
            logOut: async () => {
                const user = get().user;
                if (user) {
                    await logOutQuery(user.id).catch(() => {}); 
                }
                set({ user: null }); 
            }
        }),
        { name: 'auth' }
    )
);

export const useLogOut = () => useAuthStore((state) => state.logOut);

export default useAuthStore;
