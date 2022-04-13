import {Col, Form, Row} from "react-bootstrap";
import SliderElement from "./SliderElement";
import {asNumber, LABEL_W, VAL_W} from "./Hero";

export default function DschinnView({ value, onChange }) {
    const {
        summonElement = null, stars = 0, location = 0, trueName = 0, clothes = 0, recentlySummonedDaemon = false,
        usesBloodMagic = false, giftSummoning = 0, giftControl = 0, purity = 0, tenTimesMaterial = false,
    } = value

    const setConfig = (field, value) => {
        onChange({ ...value, [field]: value })
    }

    return (
        <Form>
            <Row className="mt-3">
                <Col md={6}>
                    <Row>
                        <Col sm={LABEL_W}>Element</Col>
                        <Form.Group as={Col} sm={VAL_W} controlId="summonElement">
                            <Form.Select value={summonElement} onChange={e => setConfig('summonElement', e.target.value)}>
                                <option value="feuer">Feuer</option>
                                <option value="wasser">Wasser</option>
                                <option value="eis">Eis</option>
                                <option value="luft">Luft</option>
                                <option value="humus">Humus</option>
                                <option value="erz">Erz</option>
                            </Form.Select>
                        </Form.Group>
                    </Row>
                </Col>
                <Col md={6}>
                    <SliderElement
                        label="Wahrer Name"
                        controlId="trueName"
                        value={trueName}
                        onChange={e => setConfig('trueName', asNumber(e.target.value))}
                        min={0}
                        max={7}
                        minLabel="Keiner"
                        maxLabel="Exakt"
                    />
                </Col>
            </Row>
            <Row className="mt-3">
                <Col md={6}>
                    <SliderElement
                        label="Sternenkonstellation"
                        controlId="stars"
                        value={stars}
                        onChange={e => setConfig('stars', asNumber(e.target.value))}
                        min={-3}
                        max={7}
                        maxLabel="Schlecht"
                        minLabel="Gut"
                    />
                </Col>
                <Col md={6}>
                    <SliderElement
                        label="Reinheit des Ortes"
                        controlId="location"
                        value={location}
                        onChange={e => setConfig('location', asNumber(e.target.value))}
                        min={-7}
                        max={7}
                        maxLabel="Schlecht"
                        minLabel="Gut"
                    />
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <Row className="mt-2">
                        <Col sm={LABEL_W} className="">Kleidung</Col>
                        <Form.Group as={Col} sm={VAL_W} controlId="clothes">
                            <Form.Check
                                inline
                                label="Gewöhnlich"
                                name="clothes"
                                type="radio"
                                value={0}
                                id="clothes-0"
                                checked={clothes === 0}
                                onChange={e => setConfig('clothes', asNumber(e.target.value))}
                            />
                            <Form.Check
                                inline
                                label="Passend"
                                name="clothes"
                                type="radio"
                                value={-1}
                                id="clothes-1"
                                checked={clothes === -1}
                                onChange={e => setConfig('clothes', asNumber(e.target.value))}
                            />
                            <Form.Check
                                inline
                                label="Ideal"
                                name="clothes"
                                type="radio"
                                value={-2}
                                id="clothes-2"
                                checked={clothes === -2}
                                onChange={e => setConfig('clothes', asNumber(e.target.value))}
                            />
                        </Form.Group>
                    </Row>
                </Col>
            </Row>
            <Row className="mt-3">
                <Col md={6}>
                    <Form.Group controlId="daemonSummoned">
                        <Form.Check
                            checked={recentlySummonedDaemon}
                            onChange={e => setConfig('recentlySummonedDaemon', e.target.checked)}
                            label="Hast du in letzter Zeit einen oder mehrere Dämonen beschworen?"
                        />
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group controlId="usesBloodMagic">
                        <Form.Check
                            checked={usesBloodMagic}
                            onChange={e => setConfig('usesBloodMagic', e.target.checked)}
                            label="Nutzt du Blutmagie zum Herbeirufen?"
                        />
                    </Form.Group>
                </Col>
            </Row>
            <Row className="mt-3">
                <Col md={6}>
                    <SliderElement
                        label="Geschenk (Herbeirufung)"
                        controlId="giftSummoning"
                        value={giftSummoning}
                        onChange={e => setConfig('giftSummoning', asNumber(e.target.value))}
                        min={-7}
                        max={7}
                        minLabel="Gut"
                        maxLabel="Schlecht"
                    />
                </Col>
                <Col md={6}>
                    <SliderElement
                        label="Geschenk (Kontrolle)"
                        controlId="giftControl"
                        value={giftControl}
                        onChange={e => setConfig('giftControl', asNumber(e.target.value))}
                        min={-7}
                        max={7}
                        minLabel="Gut"
                        maxLabel="Schlecht"
                    />
                </Col>
            </Row>
            <Row className="mt-3">
                <Col md={6}>
                    <Row>
                        <Col sm={LABEL_W}>Reinheit</Col>
                        <Form.Group as={Col} sm={VAL_W} controlId="purityselect">
                            <Form.Select value={purity} onChange={e => setConfig('purity', asNumber(e.target.value))}>
                                <option value={7}>Besonders edel</option>
                                <option value={4}>Edel</option>
                                <option value={2}>Konzentriert</option>
                                <option value={0}>Rein</option>
                                <option value={-2}>Gemindert</option>
                                <option value={-4}>Unedel</option>
                                <option value={-7}>Besonders unedel</option>
                            </Form.Select>
                        </Form.Group>
                    </Row>
                </Col>
                <Col md={6}>
                    <Form.Group controlId="tenTimesMaterial">
                        <Form.Check
                            checked={tenTimesMaterial}
                            onChange={e => setConfig('tenTimesMaterial', e.target.checked)}
                            label="Zehnfaches Material?"
                        />
                    </Form.Group>
                </Col>
            </Row>
        </Form>
    )
}