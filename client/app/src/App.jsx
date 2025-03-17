import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  const [kids, setKids ] = useState([]); /*useState([]) crea una variable de estado 
                                        llamada kids inicializada como un array vacío*/ 
  const [name, setName] = useState("")
  const [age, setAge] = useState(0)
  const [email, setEmail] = useState("")

  const [newName, setNewName] = useState("")

  useEffect(() => { /*Use effect ejecuta el componente cuando se renderiza*/
    fecthKids();
  }, [])  /*El array vacío [] como segundo parámetro significa que solo se
            ejecutará una vez, cuando el componente se monte*/

  const fecthKids = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/kids/")
      const data = await response.json()
      setKids(data);
    } catch (err) {
      console.log(err)
    }
  };

  const addKid = async () => {
    const kidData = {
      name,
      age_kid: age,
      email_kid: email
    };
    try {
      const response = await fetch("http://127.0.0.1:8000/api/kids/create/", {
        method: "POST",
        headers: {
          'Content-Type' : "application/json",
        },
        body: JSON.stringify(kidData)
      });

      const data = await response.json()
      setKids((prev) => [...prev, data])
    } catch (err) {
      console.log(err);
    }   
  };

  const updateKid = async (pk, age_kid, email_kid) => {
    const kidData = {
      name: newName,
      age_kid,
      email_kid
    };
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/kids/${pk}/`, {
        method: "PUT",
        headers: {
          'Content-Type' : "application/json",
        },
        body: JSON.stringify(kidData),
      });

      const data = await response.json()
      setKids((prev) => 
        prev.map((kid) => {
        if (kid.id === pk) {
          return data;
        } else {
          return kid;
        }
      })) 
    } catch (err) {
      console.log(err);
    }   
  }

  const deleteKid = async (pk) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/kids/${pk}/`, {
        method: "DELETE",

      });

      setKids((prev) => prev.filter((book) => book.id !== pk))
    } catch (err) {
      console.log(err)
    }
  } 

  return (
    <>
      <h1>
        "Menores" Class
      </h1>

      <div>
        <input 
          type="text" 
          placeholder='Kids names...' 
          onChange={(e) => setName(e.target.value)}
        />
        <input 
          type="number" 
          placeholder='Kids ages...' 
          onChange={(e) => setAge(e.target.value)}
        />
        <input 
          type="email" 
          placeholder='Kids Emails...'
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={addKid}> Add Kid</button>
      </div>
      {kids.map((kid) => (
        <div>
          <p>Name: {kid.name}</p>
          <p>Age: {kid.age_kid}</p>
          <p>Email: {kid.email_kid}</p>
          <input 
            type="text" 
            placeholder='New Title...'
            onChange={(e) => setNewName(e.target.value)}
          />
          <button onClick={() => updateKid(kid.id, kid.age_kid, kid.email_kid)}>Change Title</button>
          <button onClick={() => deleteKid(kid.id)}>Delete Title</button>
        </div>
      ))}
    </>
  )
}

export default App
