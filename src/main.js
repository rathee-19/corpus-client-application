import { jsx as _jsx } from "react/jsx-runtime";
import './styles/index.less';
if (import.meta.env.DEV && import.meta.env.VITE_USE_MOCK === 'true') {
    import('./mock');
}
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './stores';
console.log('[main] store before render:', store.getState());
ReactDOM.render(_jsx(Provider, { store: store, children: _jsx(App, {}, void 0) }, void 0), document.getElementById('root'));
