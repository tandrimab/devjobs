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

export const useUserdetails = create(
  persist(
    (set) => ({
      isUserDetailsUploaded: false,
      assertUserDetailsUploaded: (val) => set(val),
    }),
    {
      name: "isUserDetailsUploaded",
    }
  )
);

export const useFilteredJobs = create(
  persist(
    (set) => ({
      filteredJobs: [],
      setFilteredJobs: (filteredJobs) => 
        set((state) => ({
          filteredJobs,
        })),
    }),
    {
      name: "filteredJobs",
    }
  )
);