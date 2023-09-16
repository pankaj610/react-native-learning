import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { create } from "zustand";


export const useAppStore = create<AppStateType>((set) => ({
    isLoggedIn: false,
    setLoggedIn: (value: boolean) => {
        set((state) => ({ ...state, isLoggedIn: value }))
    },
    login: () => {
        GoogleSignin.signIn();
    }
}))