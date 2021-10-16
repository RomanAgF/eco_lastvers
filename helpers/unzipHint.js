import getConfig from "next/config";

const {serverRuntimeConfig} = getConfig()


export default function unzip(hint) {
    switch (hint) {
        case serverRuntimeConfig.HINT_STATE.UNUSED: // 00
            return {used: false, active: false}
        case serverRuntimeConfig.HINT_STATE.USED: // 10
            return {used: true, active: false}
        case serverRuntimeConfig.HINT_STATE.ACTIVE: // 11
            return {used: true, active: true}
    }
}

