import 'babel-register';
import React from 'react';
import {render} from 'react-dom';
import {Router, Route} from 'react-router';
import history from 'history';
import App from './App';

export default <Route path="/" component={App}/>;
