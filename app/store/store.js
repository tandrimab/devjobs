import { create } from "zustand";
import { persist } from 'zustand/middleware';

const useStore = create(
    persist((set) => ({
        jobs: [],
        setJobs: (jobs) => set((state) => (
            {
                ...state,
                jobs
            }
        ))
    }),
    {
        name: 'jobs',
    },
    ));
export default useStore;