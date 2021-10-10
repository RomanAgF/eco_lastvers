import axios from 'axios';
import {useRef} from 'react'
import Link from 'next/link';
import {useRouter} from "next/router";


function SignInForm() {
    const loginInputRef = useRef();
    const passwordInputRef = useRef();
    const router = useRouter();

    async function submit(event) {
        event.preventDefault();

        const login = loginInputRef.current.value;
        const password = passwordInputRef.current.value;

        try {
            const response = await axios.post('/api/auth/sign-in', {login, password});
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
                name="password"
                placeholder="Password"
                className="modal__input ui"
                type="password"
                required
                ref={passwordInputRef}
            />
            <input type="hidden" name="_csrf" value="{{csrfToken}}"/>
            <button className="modal__button modal-window-welcome__btn ui">Sign in</button>
            <span>Don&apos;t have an account? <Link href="/sign-up">Sign up</Link></span>
        </form>
    )
}

export default SignInForm;