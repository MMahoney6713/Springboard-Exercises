import React from "react";
import Card from 'react-bootstrap/Card';
import {LinkContainer} from 'react-router-bootstrap'
import { Link } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';

const JobCard = ({job}) => {

    return (
        <LinkContainer to={`/jobs/${job.id}`}>
            <Nav.Link>
                <Card style={{ margin: '1rem 5rem'}}>
                    <Card.Body>
                        <Card.Title>{job.title}</Card.Title>
                        <Card.Subtitle>{job.companyName}</Card.Subtitle>
                        <Card.Text>Salary: {job.salary}</Card.Text>
                        <Card.Text>Equity: {job.equity}</Card.Text>
                    </Card.Body>
                </Card>
            </Nav.Link>
        </LinkContainer>
    )
}

export default JobCard;