import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import HeaderBar from "./HeaderBar";
import Footer from "./Footer";
import {COMMAND_VIEW, SUMMON_VIEW} from "./Views";
import {asNumber} from "./Hero";

export default function RollView({ hero, dschinnConfig, summoningZfp, onChangeView, zfpStar, onZfpStarChange }) {
    let zfw = hero[dschinnConfig.summonType]
    let message
    if (summoningZfp < 0) {
        message = `Du hast keine ZfP übrig. Zusätzlich ist die Probe um ${Math.abs(summoningZfp)} erschwert.`
    } else if (summoningZfp <= zfw) {
        message = `Du hast noch ${summoningZfp} ZfP übrig zum Zaubern.`
    } else {
        message = `Du hast deinen vollen ZfW von ${zfw} übrig und zusätzlich eine Erleichterung ` +
            `von ${summoningZfp - zfw}.`
    }

    return (
        <>
            <Container className="flex-grow-1 d-flex flex-column">
                <HeaderBar onBack={() => onChangeView(SUMMON_VIEW)} />
                <Row className="justify-content-center flex-grow-1">
                    <Col sm={6} className="d-flex flex-column justify-content-center">
                        <Form>
                            <Card>
                                <Card.Header>
                                    Wirf eine MU ({hero.mut}) / KL ({hero.klugheit}) / CH ({hero.charisma}) Probe!
                                </Card.Header>
                                <Card.Body>
                                    <p>{message}</p>
                                    <div className="d-flex align-items-center" style={{ gap: '0.3em' }}>
                                        <span>Ich habe</span>
                                        <Form.Control
                                            value={zfpStar}
                                            onChange={e => onZfpStarChange(e.target.value.length > 0 ? asNumber(e.target.value) : '')}
                                            type="number"
                                            className="w-auto"
                                        />
                                        <span>ZfP übrig.</span>
                                    </div>
                                </Card.Body>
                                <Card.Footer className="text-end">
                                    <Button onClick={() => onChangeView(COMMAND_VIEW)}>Der Dschinn ist da!</Button>
                                </Card.Footer>
                            </Card>
                        </Form>
                    </Col>
                </Row>
            </Container>
            <Footer summoningZfp={summoningZfp} heroSkill={zfw} />
        </>
    );
}
