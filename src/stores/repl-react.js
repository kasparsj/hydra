import url from "@swc/wasm-web/wasm_bg.wasm?url";
import initSwc, { transformSync } from "@swc/wasm-web";

let initialized = false;

export default {
    eval: async (arg, callback = () => {}) => {
        const info = {
            isError: false,
            codeString: '',
            errorMessage: ''
        }

        // wrap everything in an async function with React support
        const jsxString = `(async() => {
    const Scene = () => {
      ${arg}
    };
    const root = ReactDOM.createRoot(document.getElementById('react-root'));
    root.render(<Scene />);
})().catch(${(err) => { window._reportError(err) }})`
        try {
            if (!initialized) {
                await initSwc(url)
            }
            const transpiled = transformSync(jsxString, {
                jsc: {
                    parser: { syntax: "ecmascript", jsx: true },
                    transform: { react: { runtime: "automatic" } },
                },
                module: { type: "commonjs" },
            })
            window.exports = {}
            window.require = () => { return {jsx: window.jsx} }
            new Function(transpiled.code)()
        } catch (err) {
            info.errorMessage = err.message || err
        }
        info.codeString = jsxString
        if (info.errorMessage.length > 0) info.isError = true
        callback(info)
    }
}
