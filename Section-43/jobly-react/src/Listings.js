import React, {useState, useEffect} from "react";
import JoblyApi from "./api";
import { capitalizeFirst } from "./helpers";

const Listings = ({content, joblyState}) => {

    const state = joblyState[`${content}`];
    
    useEffect(() => {
        
        async function fetchData(url) {
            const setState = joblyState[`set${capitalizeFirst(url)}`]
            const response = await JoblyApi.getAll(url)
            // console.log(response)
            setState(response);
        }
        fetchData(content)
    }, [])

    return (
        <div>
            <h1>{content}</h1>
            <ul>
                {state.map(item => (
                    <li>{item.name}</li>
                ))}
            </ul>
        </div>
        
    )
}

export default Listings;