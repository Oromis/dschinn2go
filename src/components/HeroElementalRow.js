import {Col, Form, Row} from "react-bootstrap";

export default function HeroElementalRow({element, label, hero, onChange}) {
    const begabung = `${element}Begabung`
    const kenntnis = `${element}Merkmalskenntnis`

    const setBool = (stat, e) => {
        onChange({ ...hero, [stat]: e.target.checked })
    }

    return (
        <Row className="mb-3">
            <Col sm={2}>
                {label}
            </Col>
            <Form.Group as={Col} sm={4} controlId={begabung}>
                <Form.Check
                    checked={hero[begabung] ?? false}
                    onChange={e => setBool(begabung, e)}
                    label="Begabung"
                />
            </Form.Group>
            <Form.Group as={Col} controlId={kenntnis}>
                <Form.Check
                    checked={hero[kenntnis] ?? false}
                    onChange={e => setBool(kenntnis, e)}
                    label="Merkmalskenntnis"
                />
            </Form.Group>
        </Row>
    )
};