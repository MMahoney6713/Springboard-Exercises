import React, {useState, useEffect} from "react";
import JoblyApi from "./api";

import JobCard from "./JobCard";


const Jobs = ({joblyState}) => {

    const jobs = joblyState['jobs'];
    const setJobs = joblyState['setJobs'];
    
    useEffect(() => {
        
        async function fetchJobs() {
            const response = await JoblyApi.getAll('jobs')
            setJobs(response);
        }
        fetchJobs();
    }, [])

    return (
        <div className="JobsList">
            <h1>Jobs</h1>
            
            {jobs ? jobs.map(job => (
                <JobCard job={job} key={job.id}/>
            )) : 'Loading...'}
            
        </div>
    )
}

export default Jobs;