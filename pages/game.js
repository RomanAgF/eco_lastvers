import Header from "../components/game/Header";
import axios from "../helpers/frontendAxios";
import Answer from "../components/game/Answer";
import {useEffect} from 'react';
import {observer} from "mobx-react-lite";
import gameStore from "../store/gameStore";
import {withIronSession} from "next-iron-session";
import getConfig from 'next/config';
import ensureLoggedIn from "../helpers/ensureLoggedIn";
import isGameStarted from "../helpers/isGameStarted";
import {findGameSession} from "../services/gameSessionService";


const {serverRuntimeConfig} = getConfig()


function Game() {
    useEffect(() => {
        axios.get('/api/questions').then(questionResponse => {
            if (questionResponse.data) {
                gameStore.updateQuestion(questionResponse.data)
            }
        })
    }, [])

    return (
        <div className="millionaire">
            <div className="millionaire-ui">
                <Header/>
                <div className="millionaire-ui__question ui">
                    <div className="millionaire-ui__question-text">
                        {gameStore?.question?.name}
                    </div>
                </div>
                <div className="millionaire-ui-answers">
                    {gameStore?.question?.answers.map(el =>
                        <Answer key={el.id} id={el.id} text={el.text} hidden={el.hidden}/>
                    )}
                </div>
            </div>
        </div>
    );
}

export default observer(Game);


export const getServerSideProps = withIronSession(
    ensureLoggedIn(async ({req}) => {
        const user = req.session.get('user');
        const gameSession = await findGameSession(user.login);

        if (!isGameStarted()) {
            return {redirect: {destination: '/waiting', permanent: false}};
        }

        if (gameSession.status !== 0) {
            return {redirect: {destination: '/results', permanent: false}};
        }

        return {props: {}}
    }, '/'),
    serverRuntimeConfig.ironSessionConfig
)