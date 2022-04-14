import {Button, Container, Navbar} from "react-bootstrap";

export default function HeaderBar({ onBack }) {
    return (
        <Navbar>
            <Container className="d-flex">
                <Navbar.Brand className="d-flex" style={{ gap: '0.3em' }}>
                    {onBack && <Button size="sm" variant="light" onClick={onBack}>&lt;</Button>}
                    Dschinn2go
                </Navbar.Brand>
            </Container>
        </Navbar>
    )
}
