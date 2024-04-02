import React, { useState } from 'react';
import Accordian from './components/Accordian';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
          <div style={{
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            padding:'24px'
          }}>
      <Accordian
        id="accordian1"
        onChange={() => setIsOpen((prev) => !prev)}
        label={'Accordian 1'}
        isOpen={isOpen}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius pariatur minima vitae mollitia
        deserunt facere repellendus repellat a accusamus culpa. Itaque, recusandae repudiandae?
        Dignissimos quae ex excepturi rem! Nemo, labore!
      </Accordian>
    </div>
  );
}

export default App;
