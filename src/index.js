import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MarkdownEditor from './components/MarkdownEditor'

import { BrowserRouter, Route } from 'react-router-dom'

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<Route exact path="/" render={(props) => <MarkdownEditor {...props} />} />
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('main')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
