export default function unzip(hint) {
    switch (hint) {
        case 0: // 00
            return {used: false, active: false}
        case 2: // 10
            return {used: true, active: false}
        case 3: // 11
            return {used: true, active: true}
    }
}