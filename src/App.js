import React, {useState, useEffect} from 'react';
import './App.css'
import Header from './components/Header';
import api from './services/api';

export default function App() {
  const [techArr, techFunc] = useState([]);

  useEffect(() => {
    api.get('tech').then( resp => {
      techFunc(resp.data);
    })
  }, []);

  async function handleAddTechs() {
    const response = await api.post('tech', {
      name : "React",
      description : "Library javascript"
    });

    const techData = response.data;

    techFunc([...techArr, techData]);
  }

  return (
    <>
      <Header titulo="Techs" />

      <ul>
        { techArr.map(tech => (
            <li key={tech.id}>{tech.name} - <b> {tech.description} </b></li>
        ))}
      </ul>

      <button type="button" onClick={handleAddTechs}>Add Proj.</button>
    </>
  )
}