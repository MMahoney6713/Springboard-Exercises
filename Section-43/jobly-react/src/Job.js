import React, {useState, useEffect} from "react";
import JoblyApi from "./api";
import { useParams } from "react-router-dom";

import JobCard from "./JobCard";

const Job = () => {

    const {id} = useParams();
    const [job, setJob] = useState({});
    
    useEffect(() => {
        
        async function fetchJob() {
            const response = await JoblyApi.getJob(`${id}`)
            setJob(response);
        }
        fetchJob();
    }, [])

    

    return (
        <div className="">
            {job ? 
            <JobCard job={job} />
            : 'Loading...'}
            
            
            {/* {jobs ? jobs.map(job => (
                <JobCard job={job}/>
            )) : 'Loading...'} */}
            
        </div>
    )
}

export default Job;