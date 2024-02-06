"use client"
import { useEffect, useState } from "react"
import FilterJobsWeb from "./FilterJobsWeb";
import FilterJobsMob from "./FilterJobsMob";

export default function FilterJobs() {
    const [searchTitle, setSearchTitle] = useState('');
    const [area, setArea] = useState('');
    const [isFulltime, setIsFulltime] = useState();
    const  [shrinkFilter, setShrinkFilter] = useState();

    useEffect(() => {
        setShrinkFilter(window.matchMedia("min-width(768px)").matches);
    }, []);

    const updateFullTime = (e) => {
        setIsFulltime(!isFulltime);
    }

    const childProps = {
        searchTitle,
        area,
        isFulltime,
        setSearchTitle,
        setArea,
        setIsFulltime,
    }

    return (
        <FilterJobsMob
            {...childProps}

        />
    )
}