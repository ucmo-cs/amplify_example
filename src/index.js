import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Amplify from 'aws-amplify';
import aws_exports from './aws-exports';
Amplify.configure(aws_exports);

const style = {
  color: 'red',
  margin: '10px'
}

ReactDOM.render(
  <React.StrictMode>
    <h1 className="text-center" style={style}>React Car Application</h1>
    <App/>
  </React.StrictMode>,
  document.getElementById('root')
);
