import axios from 'axios';
import {useRef} from 'react'
import Link from 'next/link';
import {useRouter} from "next/router";


function SignUpForm() {
    const loginInputRef = useRef();
    const passwordInputRef1 = useRef();
    const passwordInputRef2 = useRef();
    const router = useRouter();

    async function submit(event) {
        event.preventDefault();

        const login = loginInputRef.current.value.trim();
        const password1 = passwordInputRef1.current.value.trim();
        const password2 = passwordInputRef2.current.value.trim();

        try {
            const response = await axios.post('/api/auth/sign-up', {login, password1, password2});
            if (response.status === 200) {
                await router.push('/game');
            }
        } catch (e) {
            if (e.response.data?.message) {
                alert(e.response.data.message);
            }
        }
    }

    return (
        <form className="modal-window-welcome__item" onSubmit={submit}>
            <input
                name="login"
                placeholder="Login"
                className="modal__input ui"
                type="text"
                autoFocus
                required
                ref={loginInputRef}
            />
            <input
                name="password1"
                placeholder="Password"
                className="modal__input ui"
                type="password"
                required
                ref={passwordInputRef1}
            />
            <input
                name="password2"
                placeholder="Confirm password"
                className="modal__input ui"
                type="password"
                required
                ref={passwordInputRef2}
            />
            <button className="modal__button modal-window-welcome__btn ui">Sign up</button>
            <span>Already have an account? <Link href="/">Sign in</Link></span>
        </form>
    )
}

export default SignUpForm;