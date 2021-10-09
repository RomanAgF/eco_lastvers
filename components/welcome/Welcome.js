import Lifelines from "./Lifelines";
import Banter from "./Banter";
import {useEffect, useRef} from 'react'
import Rules from "./Rules";

export default function Welcome(props) {
    const modalRef = useRef();
    const modalWindowRef = useRef();

    useEffect(() => {
        const modal = modalRef.current;
        const modalWindow = modalWindowRef.current;

        modal.classList.remove("modal-overlay_fill-bg");
        setTimeout(() => modalWindow.classList.add("modal-window_show"), 800);
    }, [])

    return (
        <div className="modal-overlay modal-overlay_fill-bg" ref={modalRef}>
            <div className="modal-window modal-window-welcome ui" ref={modalWindowRef}>
                <div className="modal-window-welcome__col">
                    <Lifelines/>
                </div>
                <div className="modal-window-welcome__col">
                    <Rules/>
                    {props.children}
                </div>
            </div>
        </div>
    )
}