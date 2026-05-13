import { create } from "zustand";

const useUIStore = create((set) => ({
  leftSidebarOpen: true,
  rightSidebarOpen: true,
  toggleLeft: () => set((s) => ({ leftSidebarOpen: !s.leftSidebarOpen })),
  toggleRight: () => set((s) => ({ rightSidebarOpen: !s.rightSidebarOpen })),
}));

export default useUIStore;
