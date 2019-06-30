import React from 'react';
import './App.css';

import IconPicker from 'material-icon-picker';

import 'material-icon-picker/dist/style.css';

const App: React.FC = () => {

    const divEl = React.useRef<HTMLDivElement>(null);

    return <div style={{ display: "flex", flexDirection: "column" }}>
        <p style={{ marginBottom: "2em" }}>Pick your favorite google icon using the edit button or enter it directly in the textfield.</p>
        <div>
            <IconPicker textfield={{ outlined: false, label: "Favorite icon", helperTextValue: "Pick your favorite google icon" }} onChange={icon => {
                if (divEl.current) {
                    divEl.current.innerText = `Icon value: ${icon}`;
                }
            }} />
        </div>
        <div ref={divEl} style={{ marginTop: "2em" }}></div>
    </div>;
}


export default App;
