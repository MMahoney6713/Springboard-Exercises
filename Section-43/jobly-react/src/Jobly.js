import React, {useState} from "react";
import Routes from './Routes';
import Navigation from "./Navigation";

const Jobly = () => {

    const [jobs, setJobs] = useState();
    const [companies, setCompanies] = useState();
    const joblyState = {jobs, setJobs, companies, setCompanies}

    return (
        <>
            <Navigation pageTitle={'Jobly'} navLinks={['companies', 'jobs']}/>
            <Routes joblyState={joblyState}/>
        </>
    )
}

export default Jobly;