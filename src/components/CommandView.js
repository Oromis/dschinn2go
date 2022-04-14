import {Col, Container, Row} from "react-bootstrap";
import HeaderBar from "./HeaderBar";
import Footer from "./Footer";
import {ROLL_VIEW} from "./Views";
import {conditional, elementAffinityTable} from "../App";

export default function CommandView({ hero, dschinnConfig, summoningZfp, onChangeView, zfpStar }) {
    const controlBase = Math.round((hero.mut + hero.intuition + 2 * hero.charisma + hero.dschinnruf) / 5)

    const calcControlValue = base => {
        let result = base
        result -= 4
        result += Math.round(dschinnConfig.trueName / 3)
        result += conditional(hero.elementalAffinity, 3)
        result += conditional(hero[`${dschinnConfig.summonElement}Begabung`], 2)
        result += conditional(hero[`${dschinnConfig.summonElement}Merkmalskenntnis`], 2)
        result -= conditional(hero[`${elementAffinityTable[dschinnConfig.summonElement]}Begabung`], 2)
        result -= conditional(hero[`${elementAffinityTable[dschinnConfig.summonElement]}Merkmalskenntnis`], 2)
        result -= conditional(hero.daemonischBegabung,4)
        result -= conditional(hero.daemonischMerkmalskenntnis, 4)
        result -= conditional(hero.paktierer, 9)
        result -= conditional(hero.verhuellteAura, 1)
        result += (hero.schwacheAusstrahlung ?? 0) * 2
        result += hero.stigma
        result -= dschinnConfig.clothes
        result += dschinnConfig.giftControl
        result -= conditional(dschinnConfig.recentlySummonedDaemon, 4)
        result -= conditional(dschinnConfig.usesBloodMagic, 12)
        result += Math.round(dschinnConfig.stars / 3)
        result += Math.round(dschinnConfig.location / 3)
        result += conditional(hero.elementarist, 3)
        return result
    }

    const controlValue = calcControlValue(controlBase)

    return (
        <>
            <Container className="flex-grow-1 d-flex flex-column">
                <HeaderBar onBack={() => onChangeView(ROLL_VIEW)} />
                <Row>
                    <Col>
                        <p>Dein Basis-Kontrollwert ist: {controlBase}</p>
                        <p>Mit den Bedingungen der Beschwörung: {controlValue}</p>
                    </Col>
                </Row>
            </Container>
            <Footer summoningZfp={summoningZfp} heroSkill={hero.dschinnruf} />
        </>
    );
}
