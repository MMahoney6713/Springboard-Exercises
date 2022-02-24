import React, {useState, useEffect} from "react";
import JoblyApi from "./api";
import { useParams } from "react-router-dom";

import CompanyCard from "./CompanyCard";
import JobCard from "./JobCard";

const Company = () => {

    const {handle} = useParams();
    const [company, setCompany] = useState({});
    
    useEffect(() => {
        async function fetchCompany() {
            const response = await JoblyApi.getCompany(`${handle}`)
            setCompany(response);
        }
        fetchCompany();
    }, [])

    

    return (
        <div className="">
            {company.jobs ? 
            <div>
                <h1>{company.name}</h1>
                {company.jobs.map(job => {
                    job.companyName = company.name;
                    return (
                        <JobCard job={job} key={job.id}/>
                    )
                }
                )}
            </div>
            : 'Loading...'}
        </div>
    )
}

export default Company;