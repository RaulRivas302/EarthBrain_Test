import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { getName } from './utils/getfn'

import './App.css'
import Material  from './MaterialComponent/material'
import { MaterialData } from './type';

function App() {
  const ApiURl='http://localhost:3000/materials'
const [materials, setMaterials]=useState<MaterialData[]>([]);
useEffect(() => {
  getName(setMaterials)
},[])
  return (
    <>
    <div>
    {materials &&  <Material materials={materials} setMaterials={setMaterials}/>}
    </div>
    </>
  )
}

export default App
