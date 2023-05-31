import React from 'react'
import Link from 'next/link'
import { Button, Container, Row, Col } from 'react-bootstrap';

import Q0014Image from '../src/images/Started.png';


export default function index() {
    return (
        <Container fluid className={""}>
            <Row className="justify-content-center align-items-center text-center">
                <Col xs={12} md={6}>
                    <img src={Q0014Image.src} loading="lazy" alt="_0014" className="img-fluid col-12" />

                    <Link href="/SignIn">
                        <Button variant="primary" className="mt-3 col-8">{`Get started`}</Button>
                    </Link>
                </Col>
            </Row>
            <br />
        </Container>
    )
}
