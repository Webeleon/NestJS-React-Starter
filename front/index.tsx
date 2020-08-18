import * as React from 'react';
import * as ReactDom from 'react-dom';

import { App } from './components/App';

const domElement = document.getElementById('app');
ReactDom.render(<App />, domElement);
