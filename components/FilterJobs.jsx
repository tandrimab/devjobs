"use client";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import FilterJobsWeb from "./FilterJobsWeb";
import FilterJobsMob from "./FilterJobsMob";
import useWindowSize from "@/utilities/hooks/useWindowSize";
import useDebounce from "@/utilities/hooks/useDebounce";
import { useFilteredJobs, useStore } from "@/app/store/store";

function FilterJobs() {
  const [filters, setFilters] = useState({
    position: "",
    location: "",
    isFulltime: false,
  });
  const [windowWidth, _] = useWindowSize();
  const filteredJobs = useStore((state) => state.jobs);
  const setFilteredJobs = useFilteredJobs((state) => state.setFilteredJobs);
  const timeout = useRef();

  const searchPositionName = useCallback(() => {
    const result = filteredJobs.filter((job) => {
      return (
        (!filters.position.length ||
          job.position
            .toLowerCase()
            .includes(filters.position.toLowerCase())) &&
        (!filters.location.length ||
          job.location
            .toLowerCase()
            .includes(filters.location.toLowerCase())) &&
        (!filters.isFulltime || job.contract.toLowerCase() == "full time")
      );
    });
    setFilteredJobs(result);
  }, [filters.isFulltime, filters.position, filters.location]);

  const debouncedSearchPositionName = useDebounce(
    searchPositionName,
    timeout,
    1000
  );

  useEffect(() => {
    debouncedSearchPositionName();
  }, [filters.isFulltime, filters.position, filters.location]);

  const handleSearchInput = (e) => {
    const { value, name } = e.target;
    if (name === "isFulltime") {
      setFilters((filter) => ({
        ...filter,
        isFulltime: e.target.checked,
      }));
    } else {
      setFilters((filter) => ({
        ...filter,
        [name]: value,
      }));
    }
  };

  const clearFilters = () => {
    setFilters({
        position: "",
        location: "",
        isFulltime: false,
      })
  }

  const childProps = {
    handleSearchInput,
    filters,
    clearFilters
  };

  return windowWidth <= 968 ? (
    <FilterJobsMob {...childProps} />
  ) : (
    <FilterJobsWeb {...childProps} />
  );
}

export default memo(FilterJobs);
