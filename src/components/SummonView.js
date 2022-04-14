import {Button, Card, Container} from "react-bootstrap";
import Hero from "./Hero";
import DschinnView from "./DschinnView";
import HeaderBar from "./HeaderBar";
import Footer from "./Footer";
import {ROLL_VIEW} from "./Views";

export default function SummonView({ hero, onChangeHero, dschinnConfig, onChangeDschinn, summoningZfp, onChangeView }) {
    return (
        <>
            <Container className="flex-grow-1">
                <HeaderBar />
                <Card>
                    <Card.Header>Held</Card.Header>
                    <Card.Body>
                        <Hero hero={hero} onChange={onChangeHero} />
                    </Card.Body>
                </Card>
                <Card className="mt-4">
                    <Card.Header>Herbeirufung</Card.Header>
                    <Card.Body>
                        <DschinnView value={dschinnConfig} onChange={onChangeDschinn} />
                    </Card.Body>
                </Card>
            </Container>
            <Footer summoningZfp={summoningZfp} heroSkill={hero[dschinnConfig.summonType]}>
                <Button variant="primary" onClick={() => onChangeView(ROLL_VIEW)}>Herbeirufen!</Button>
            </Footer>
        </>
    )
}
