import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {Routes, Route } from 'react-router-dom';
import NameList from './NameList';
import SingleView from './SingleView';
import FightPage from './FightPage';

function App() {

  const [ pokeList, setPokeList ] = useState([]);
  const [ pokeUser, setPokeUser ] = useState();
  const [ pokeComp, setPokeComp ] = useState();

  //comparator-function for sorting pokeList:
  function compare (a, b){
    if(a.name.english < b.name.english){
      return -1;
    }
    if(a.name.english > b.name.english){
      return 1;
    }
    return 0;
    }

  //fetch from backend/API + set state variable pokeList via setter:
  useEffect(() => {
    axios.get("https://pokebackend.onrender.com/pokemon")
    .then(res => setPokeList(res.data.sort(compare)))
    .catch(err => console.log(err))
  }, []);

  return (
    <div className="App">

      <Routes>
        <Route path="/" element={<NameList pokeList={pokeList}/>}/>
        <Route path="/pokemon/:id" element={<SingleView pokeList={pokeList} setPokeUser={setPokeUser} setPokeComp={setPokeComp}/>}/>  {/*ergibt routing überhaupt Sinn hier? */}
        <Route path="/pokemon/fight" element={<FightPage pokeUser={pokeUser} pokeComp={pokeComp}/>}/>
      </Routes>
    </div>
  );
}

export default App;
