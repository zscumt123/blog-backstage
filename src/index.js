import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.less';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import configStore, { rootSaga } from './store';
const store = configStore();
store.runSaga(rootSaga);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
