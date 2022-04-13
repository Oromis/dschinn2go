import {Col, Form, Row} from "react-bootstrap";
import HeroElementalRow from "./HeroElementalRow";
import SliderElement from "./SliderElement";

export function asNumber(str) {
    const res = +str
    if (isNaN(res)) {
        return null
    }
    return res
}

export const LABEL_W = 4
export const VAL_W = 8

export default function Hero({ hero, onChange }) {

    const setName = (e) => {
        onChange({ ...hero, name: e.target.value })
    }

    const setNum = (stat, e) => {
        onChange({ ...hero, [stat]: asNumber(e.target.value) })
    }

    const setBool = (stat, e) => {
        onChange({ ...hero, [stat]: e.target.checked })
    }

    return (
        <Form>
            <Row>
                <Col md={6}>
                    <Form.Group as={Row} className="mb-3" controlId="heroName">
                        <Form.Label column sm={LABEL_W} className="">Name</Form.Label>
                        <Col sm={VAL_W}>
                            <Form.Control value={hero.name ?? ''} onChange={setName} type="text" placeholder="Name" />
                        </Col>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <Form.Group as={Row} className="mb-3" controlId="heroMu">
                        <Form.Label column sm={LABEL_W} className="">Mut</Form.Label>
                        <Col sm={VAL_W}>
                            <Form.Control value={hero.mut ?? ''} onChange={e => setNum('mut', e)} type="number" placeholder="10" />
                        </Col>
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group as={Row} className="mb-3" controlId="heroIn">
                        <Form.Label column sm={LABEL_W} className="">Intuition</Form.Label>
                        <Col sm={VAL_W}>
                            <Form.Control value={hero.intuition ?? ''} onChange={e => setNum('intuition', e)} type="number" placeholder="10" />
                        </Col>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <Form.Group as={Row} className="mb-3" controlId="heroCh">
                        <Form.Label column sm={LABEL_W} className="">Charisma</Form.Label>
                        <Col sm={VAL_W}>
                            <Form.Control value={hero.charisma ?? ''} onChange={e => setNum('charisma', e)} type="number" placeholder="10" />
                        </Col>
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group as={Row} className="mb-3" controlId="heroDschinnenruf">
                        <Form.Label column sm={LABEL_W} className="">ZfW Dschinnruf</Form.Label>
                        <Col sm={VAL_W}>
                            <Form.Control value={hero.dschinnruf ?? ''} onChange={e => setNum('dschinnruf', e)} type="number" placeholder="10" />
                        </Col>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <Form.Group as={Row} className="mb-3" controlId="heroEleAff">
                        <Col sm={LABEL_W} />
                        <Col sm={VAL_W}>
                            <Form.Check
                                checked={hero.elementalAffinity ?? false}
                                onChange={e => setBool('elementalAffinity', e)}
                                label="Affinität zu Elementaren"
                            />
                        </Col>
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group as={Row} className="mb-3" controlId="heroElementarist">
                        <Col sm={VAL_W}>
                            <Form.Check
                                checked={hero.elementarist ?? false}
                                onChange={e => setBool('elementarist', e)}
                                label="Elementarist"
                            />
                        </Col>
                    </Form.Group>
                </Col>
            </Row>
            <HeroElementalRow hero={hero} label="Feuer" element="feuer" onChange={onChange} />
            <HeroElementalRow hero={hero} label="Wasser" element="wasser" onChange={onChange} />
            <HeroElementalRow hero={hero} label="Eis" element="eis" onChange={onChange} />
            <HeroElementalRow hero={hero} label="Luft" element="luft" onChange={onChange} />
            <HeroElementalRow hero={hero} label="Humus" element="humus" onChange={onChange} />
            <HeroElementalRow hero={hero} label="Erz" element="erz" onChange={onChange} />
            <HeroElementalRow hero={hero} label="Dämonisch" element="daemonisch" onChange={onChange} />
            <Row>
                <Col md={6}>
                    <Form.Group as={Row} className="mb-3" controlId="heroPaktierer">
                        <Col sm={LABEL_W} />
                        <Col sm={VAL_W}>
                            <Form.Check
                                checked={hero.paktierer ?? false}
                                onChange={e => setBool('paktierer', e)}
                                label="Paktierer"
                            />
                        </Col>
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group as={Row} className="mb-3" controlId="heroVerhAura">
                        <Col sm={VAL_W}>
                            <Form.Check
                                checked={hero.verhuellteAura ?? false}
                                onChange={e => setBool('verhuellteAura', e)}
                                label="Verhüllte Aura"
                            />
                        </Col>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <SliderElement
                        label="Schwache Ausstrahlung"
                        controlId="heroSchwAuss"
                        value={hero.schwacheAusstrahlung ?? 0}
                        onChange={e => setNum('schwacheAusstrahlung', e)}
                        min={0}
                        max={5}
                    />
                </Col>
                <Col md={6}>
                    <SliderElement
                        label="Stigma"
                        controlId="heroStig"
                        value={hero.stigma ?? 0}
                        onChange={e => setNum('stigma', e)}
                        min={0}
                        max={3}
                    />
                </Col>
            </Row>
        </Form>
    )
}