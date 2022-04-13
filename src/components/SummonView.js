import {Card, Container, Navbar} from "react-bootstrap";
import Hero from "./Hero";
import {useState} from "react";
import DschinnView from "./DschinnView";

function loadHero() {
    const raw = localStorage.getItem(HERO_KEY)
    if (raw) {
        return JSON.parse(raw)
    } else {
        return {}
    }
}

const DSCHINN_DIFFICULTY = 8

const elementAffinityTable = {
    feuer: 'wasser',
    wasser: 'feuer',
    eis: 'hummus',
    luft: 'erz',
    humus: 'eis',
    erz: 'luft',
}

function conditional(condition, value) {
    return condition ? value : 0
}

const HERO_KEY = 'hero-stats'

export default function SummonView() {
    const [hero, setHero] = useState(loadHero())
    const saveHero = hero => {
        localStorage.setItem(HERO_KEY, JSON.stringify(hero))
        setHero(hero)
    }

    const [rawDschinnConfig, setDschinnConfig] = useState({})
    const dschinnConfig = Object.assign({
        summonElement: null, stars: 0, location: 0, trueName: 0, clothes: 0, recentlySummonedDaemon: false,
        usesBloodMagic: false, giftSummoning: 0, giftControl: 0, purity: 0, tenTimesMaterial: false,
    }, rawDschinnConfig)

    const calcZfpRemaining = () => {
        const summonElement = dschinnConfig.summonElement

        let result = hero.dschinnruf - DSCHINN_DIFFICULTY
        result += conditional(hero[`${summonElement}Begabung`], 2)
        result += conditional(hero[`${summonElement}Merkmalskenntnis`], 2)
        result -= conditional(hero[`${elementAffinityTable[summonElement]}Begabung`], 2)
        result -= conditional(hero[`${elementAffinityTable[summonElement]}Merkmalskenntnis`], 2)
        result -= conditional(hero.daemonischBegabung, 2)
        result -= conditional(hero.daemonischMerkmalskenntnis, 2)
        result -= conditional(hero.paktierer, 6)
        result -= dschinnConfig.stars
        result -= dschinnConfig.location
        result -= dschinnConfig.clothes
        result -= dschinnConfig.giftSummoning
        result += dschinnConfig.purity
        result += conditional(dschinnConfig.tenTimesMaterial, 2)
        result += dschinnConfig.trueName
        return result
    }

    const summoningZfp = calcZfpRemaining()

    return (
        <Container>
            <Navbar>
                <Container>
                    <Navbar.Brand>Dschinn2go</Navbar.Brand>
                </Container>
            </Navbar>
            <Card>
                <Card.Header>Held</Card.Header>
                <Card.Body>
                    <Hero hero={hero} onChange={saveHero} />
                </Card.Body>
            </Card>
            <Card className="mt-5">
                <Card.Header>Herbeirufung</Card.Header>
                <Card.Body>
                    <DschinnView value={dschinnConfig} onChange={setDschinnConfig} />
                </Card.Body>
            </Card>
            <Navbar>
                <Container fluid>
                    ZfP: {summoningZfp}
                    &nbsp;
                    {summoningZfp > hero.dschinnruf && `Max. ZfP*: ${hero.dschinnruf}`}
                </Container>
            </Navbar>
        </Container>
    )
}
