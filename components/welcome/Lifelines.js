export default function Lifelines() {
    return <div className="modal-window-welcome__item">
        <h2 className="modal__title">Lifelines:</h2>
        <div className="modal-hint-list">
            <div className="modal-hint-item">
                <i className="modal-hint-item__icon fas fa-balance-scale"></i>
                <div className="modal-hint-item__info">
                    <h3 className="modal-hint-item__title">&laquo;50x50&raquo;</h3>
                    <div className="modal-hint-item__descr">removes 2 wrong answers.</div>
                </div>
            </div>
            <div className="modal-hint-item">
                <i className="modal-hint-item__icon fas fa-check-double"></i>
                <div className="modal-hint-item__info">
                    <h3 className="modal-hint-item__title">&laquo;Double your chance&raquo;</h3>
                    <div className="modal-hint-item__descr">You can pick 2 answers. If one of them is correct,
                        the game continues!
                    </div>
                </div>
            </div>
            <div className="modal-hint-item">
                <i className="modal-hint-item__icon fas fa-shield-alt"></i>
                <div className="modal-hint-item__info">
                    <h3 className="modal-hint-item__title">&laquo;Second chance&raquo;</h3>
                    <div className="modal-hint-item__descr">If used, you can pick the wrong question and move to
                        the next question.
                    </div>

                    <button className="music" onClick={()=> alert("NOT READY")}>
                        <img src="/img/mute.png" width="40" alt="sound"/>
                    </button>
                </div>
            </div>
        </div>
    </div>
}