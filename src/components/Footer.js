import {Col, Container, InputGroup, Navbar, Row} from "react-bootstrap";

export default function Footer({ summoningZfp, heroSkill, children }) {
    return (
        <Navbar style={{ position: 'sticky', bottom: 0, marginTop: '2em', background: 'white', boxShadow: '0 0 6px #a7a7a7' }}>
            <Container>
                <Row className="flex-grow-1">
                    <Col className="d-flex justify-content-between" style={{ gap: '1em' }}>
                        <div>
                            <InputGroup className="w-auto">
                                <InputGroup.Text>ZfP</InputGroup.Text>
                                <InputGroup.Text>{summoningZfp}</InputGroup.Text>
                            </InputGroup>
                            {summoningZfp > heroSkill && (
                                <InputGroup className="w-auto">
                                    <InputGroup.Text>Max ZfP*</InputGroup.Text>
                                    <InputGroup.Text>{heroSkill}</InputGroup.Text>
                                </InputGroup>
                            )}
                        </div>
                        <div>
                            {children}
                        </div>
                    </Col>
                </Row>
            </Container>
        </Navbar>
    )
}