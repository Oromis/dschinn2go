import {Col, Form, Row} from "react-bootstrap";
import {LABEL_W, VAL_W} from "./Hero";

export default function SliderElement({ label, id, value, onChange, min, max, minLabel, maxLabel }) {
    return (
        <Row>
            <Col sm={LABEL_W} className="">{label}</Col>
            <Form.Group as={Col} sm={VAL_W} controlId={id}>
                <div className="d-flex justify-content-between">
                    <div>{minLabel}</div>
                    <div>{value}</div>
                    <div>{maxLabel}</div>
                </div>
                <Form.Range
                    value={value}
                    onChange={onChange}
                    step={1}
                    min={min}
                    max={max}
                />
            </Form.Group>
        </Row>
    )
}
