import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import SummonView from "./components/SummonView";
import {useState} from "react";
import {COMMAND_VIEW, ROLL_VIEW, SUMMON_VIEW} from "./components/Views";
import RollView from "./components/RollView";
import CommandView from "./components/CommandView";

const DEFAULT_HERO = {
    name: '',
    mut: null,
    intuition: null,
    charisma: null,
    klugheit: null,
    elementarerMeister: null,
    dschinnruf: null,
    elementarerDiener: null,
    elementalAffinity: false,
    elementarist: false,
    paktierer: false,
    verhuellteAura: false,
    schwacheAusstrahlung: 0,
    stigma: 0,
    elementarharmonisierteAura: false,
    feuerBegabung: false,
    feuerMerkmalskenntnis: false,
    wasserBegabung: false,
    wasserMerkmalskenntnis: false,
    eisBegabung: false,
    eisMerkmalskenntnis: false,
    luftBegabung: false,
    luftMerkmalskenntnis: false,
    humusBegabung: false,
    humusMerkmalskenntnis: false,
    erzBegabung: false,
    erzMerkmalskenntnis: false,
    daemonischBegabung: false,
    daemonischMerkmalskenntnis: false,
}

function loadHero() {
    const raw = localStorage.getItem(HERO_KEY)
    if (raw) {
        return Object.assign({}, DEFAULT_HERO, JSON.parse(raw))
    } else {
        return DEFAULT_HERO
    }
}

const difficultyTable = {
    elementarerDiener: 4,
    dschinnruf: 8,
    elementarerMeister: 12,
}

export const elementAffinityTable = {
    feuer: 'wasser',
    wasser: 'feuer',
    eis: 'humus',
    luft: 'erz',
    humus: 'eis',
    erz: 'luft',
}

export function conditional(condition, value) {
    return condition ? value : 0
}

const HERO_KEY = 'hero-stats'

function App() {
    const [hero, setHero] = useState(loadHero())
    const saveHero = hero => {
        localStorage.setItem(HERO_KEY, JSON.stringify(hero))
        setHero(hero)
    }
    const [view, setView] = useState(SUMMON_VIEW)

    const [rawDschinnConfig, setDschinnConfig] = useState({})
    const dschinnConfig = Object.assign({
        summonType: '',
        summonElement: '', stars: 0, location: 0, trueName: 0, clothes: 0, recentlySummonedDaemon: false,
        usesBloodMagic: false, giftSummoning: 0, giftControl: 0, purity: 0, tenTimesMaterial: false,
        doubledSpellDuration: false,
    }, rawDschinnConfig)

    const [zfpStar, setZfpStar] = useState('')

    const calcZfpRemaining = () => {
        const summonElement = dschinnConfig.summonElement

        let result = (hero[dschinnConfig.summonType] ?? 0)
        result -= difficultyTable[dschinnConfig.summonType] ?? 0
        result += conditional(hero[`${summonElement}Begabung`], 2)
        result += conditional(hero[`${summonElement}Merkmalskenntnis`], 2)
        if (!hero.elementarharmonisierteAura) {
            result -= conditional(hero[`${elementAffinityTable[summonElement]}Begabung`], 2);
            result -= conditional(hero[`${elementAffinityTable[summonElement]}Merkmalskenntnis`], 2)
        }
        result -= conditional(hero.daemonischBegabung, 2)
        result -= conditional(hero.daemonischMerkmalskenntnis, 2)
        result -= conditional(hero.paktierer, 6)
        result += dschinnConfig.stars
        result += dschinnConfig.location
        result -= dschinnConfig.clothes
        result += dschinnConfig.giftSummoning
        result += dschinnConfig.purity
        result += conditional(dschinnConfig.tenTimesMaterial, 2)
        result += dschinnConfig.trueName
        result += conditional(dschinnConfig.doubledSpellDuration, 4)
        return result
    }

    const summoningZfp = calcZfpRemaining()

    return (
        <div className="App d-flex flex-column" style={{ minHeight: '100vh' }}>
            {view === SUMMON_VIEW && (
                <SummonView
                    hero={hero} onChangeHero={saveHero}
                    dschinnConfig={dschinnConfig} onChangeDschinn={setDschinnConfig}
                    summoningZfp={summoningZfp}
                    onChangeView={setView}
                />
            )}
            {view === ROLL_VIEW && (
                <RollView
                    hero={hero}
                    dschinnConfig={dschinnConfig}
                    summoningZfp={summoningZfp}
                    onChangeView={setView}
                    zfpStar={zfpStar}
                    onZfpStarChange={setZfpStar}
                />
            )}
            {view === COMMAND_VIEW && (
                <CommandView
                    hero={hero}
                    dschinnConfig={dschinnConfig}
                    summoningZfp={summoningZfp}
                    onChangeView={setView}
                    zfpStar={zfpStar}
                />
            )}
        </div>
    );
}

export default App;
