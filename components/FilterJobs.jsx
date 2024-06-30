"use client"
import { useEffect, useState } from "react"
import FilterJobsWeb from "./FilterJobsWeb";
import FilterJobsMob from "./FilterJobsMob";
import useWindowSize from "@/utilities/hooks/useWindowSize";

export default function FilterJobs() {
    const [searchTitle, setSearchTitle] = useState('');
    const [area, setArea] = useState('');
    const [isFulltime, setIsFulltime] = useState();
    const  [shrinkFilter, setShrinkFilter] = useState();
    const [windowWidth, _] = useWindowSize();

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
        windowWidth <= 968 ? <FilterJobsMob
            {...childProps}
        /> :
        <FilterJobsWeb {...childProps} />
    )
}