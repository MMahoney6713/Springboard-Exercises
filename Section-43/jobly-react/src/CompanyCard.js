import React from "react";
import Card from 'react-bootstrap/Card';
import {LinkContainer} from 'react-router-bootstrap'
import { Link } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';

const CompanyCard = ({company}) => {

    return (
        <LinkContainer to={`/companies/${company.handle}`}>
            <Nav.Link>
                <Card style={{ margin: '1rem 5rem'}}>
                    <Card.Body>
                        <Card.Title>
                            {company.name}
                            <img src={company.logoUrl} alt={company.name} className="float-right ml-5"></img>
                        </Card.Title>
                        <Card.Text>{company.description}</Card.Text>
                    </Card.Body>
                </Card>
            </Nav.Link>
        </LinkContainer>
    )
}

export default CompanyCard;