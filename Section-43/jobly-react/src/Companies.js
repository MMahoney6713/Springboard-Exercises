import React, {useState, useEffect} from "react";
import JoblyApi from "./api";

import CompanyCard from "./CompanyCard";

const Companies = ({joblyState}) => {

    const companies = joblyState['companies'];
    const setCompanies = joblyState['setCompanies'];
    
    useEffect(() => {
        
        async function fetchCompanies() {
            const response = await JoblyApi.getAll('companies')
            setCompanies(response);
        }
        fetchCompanies();
    }, [])

    return (
        <div className="CompaniesList">
            <h1>Companies</h1>
            
            {companies ? companies.map(company => (
                <CompanyCard company={company} key={company.handle}/>
            )) : 'Loading...'}
            
        </div>
    )
}

export default Companies;