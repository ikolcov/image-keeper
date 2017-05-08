import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import Routes from './routes';
import store from './redux/store';
import './index.css';

const App = () => <Provider store={store}><Router><Routes /></Router></Provider>;

function render(Component) {
  ReactDOM.render(<Component />, document.getElementById('root'));
}

render(App);

if (module.hot) {
  module.hot.accept(App, () => {
    const NextApp = App.default;
    render(NextApp);
  });
}
