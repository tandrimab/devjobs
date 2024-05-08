import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useStore = create(
  persist(
    (set) => ({
      jobs: [],
      setJobs: (jobs) =>
        set((state) => ({
          ...state,
          jobs,
        })),
      setPrevPath: (path) => set(path),
    }),
    {
      name: "jobs",
    }
  )
);

export const usePathStore = create(
  persist(
    (set) => ({
      prevPath: "/",
      setPrevPath: (path) => set(path),
    }),
    {
      name: "prevPath",
    }
  )
);
