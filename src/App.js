import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import SummonView from "./components/SummonView";
import {useState} from "react";
import {COMMAND_VIEW, ROLL_VIEW, SUMMON_VIEW} from "./components/Views";
import RollView from "./components/RollView";
import CommandView from "./components/CommandView";

function loadHero() {
    const raw = localStorage.getItem(HERO_KEY)
    if (raw) {
        return JSON.parse(raw)
    } else {
        return {}
    }
}

const DSCHINN_DIFFICULTY = 8

export const elementAffinityTable = {
    feuer: 'wasser',
    wasser: 'feuer',
    eis: 'hummus',
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
        summonElement: '', stars: 0, location: 0, trueName: 0, clothes: 0, recentlySummonedDaemon: false,
        usesBloodMagic: false, giftSummoning: 0, giftControl: 0, purity: 0, tenTimesMaterial: false,
        doubledSpellDuration: false,
    }, rawDschinnConfig)

    const [zfpStar, setZfpStar] = useState('')

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
