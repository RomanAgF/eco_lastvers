import axios from "../../helpers/frontendAxios";
import {useState} from 'react';
import gameStore from "../../store/gameStore";


const STYLES = {
    default: ['millionaire-ui-answers__item', 'ui'],
    picked: ['millionaire-ui-answers__item', 'ui', 'millionaire-ui-answers__item_picked'],
    correct: ['millionaire-ui-answers__item', 'ui', 'millionaire-ui-answers__item_accept'],
    incorrect: ['millionaire-ui-answers__item', 'ui', 'millionaire-ui-answers__item_fail'],
}

function Answer(props) {
    const [styles, setStyles] = useState(STYLES.default);

    async function submit() {
        if (!gameStore.isButtonsEnabled) return;

        setStyles(STYLES.picked)

        gameStore.disableButtons();

        const response = await axios.post('/api/questions/answer', {id: props.id});
        if (response.data.correct) {
            const song = new Audio("/sounds/true answer.mp3");
            setStyles(STYLES.correct);
            song.play();
        } else {
            const song = new Audio("/sounds/wrong_ans.mp3");
            setStyles(STYLES.incorrect);
            song.play();
        }

        setTimeout(() => {
            console.log("Here")
            axios.get('/api/questions')
                .then(questionResponse => gameStore.updateQuestion(questionResponse.data))
            setStyles(STYLES.default);
        }, 2 * 1000)
    }

    console.log(`render ${props.id}`);

    return <div className={styles.join(' ')} onClick={submit}>
        {props.text}
    </div>
}


export default Answer;