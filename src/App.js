import Form from './Components/Form/Form';
import form from './json/form.json';

import './App.css';

function App() {
  return (
    <div className="App">
      <Form form={form}/>
    </div>
  );
}

export default App;
