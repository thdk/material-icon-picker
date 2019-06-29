import React from 'react';
import './App.css';

import IconPicker from 'material-design-icon-picker-react';

import 'material-design-icon-picker-react/dist/style.css';

const App: React.FC = () =>
    <IconPicker textfield={{outlined: false, label: "My icon"}}></IconPicker>

export default App;
