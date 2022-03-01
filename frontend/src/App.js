import axios from 'axios';
import {useState, useEffect} from 'react'
import './App.css';
const URL ='http://localhost/shoppinglist_backend/'


function App() {
  const [item, setItem] = useState('')
  const [amount, setAmount] = useState('')
  const [items, setItems] = useState([])
  useEffect(() => {
  axios.get(URL).then((response)=>{
    console.log(response.data);
    setItems(response.data)
  }).catch(error=>{
    alert(error.response ? error.response.data.error:error)
  })
  }, [])

  function save(e){
    e.preventDefault()
    const json=JSON.stringify(item)
    axios.post(URL+'add.php',json,{
      headers:{
        'Content-Type':'application/json'
      }
    })
    .then((response)=>{
      setItems(items=>[...items,response.data])
      setItem('')
      setAmount(amount)
    }).catch(error=>{
      alert(error.response ? error.response.data.error:error)
    })
  }

function remove(id){
const json =JSON.stringify({id:id})
axios.post(URL+'delete.php',json,{
  headers:{'Content-Type':'application/json'}
})
.then((response)=>{
  const newlistwithoutremoved= items.filter((item)=>item.id!==id);
  setItems(newlistwithoutremoved);
}).catch(error=>{
  alert(error.response ? error.response.data.error : error)
})
}

  return (
    <div className='container'>
      <form onSubmit={save}>
        <h2>Shopping list Pauli Haarnio</h2>
        <label>New item</label>
        <input value={item.description} placeholder='Add a new item' onChange={e=>setItem(e.target.value)}></input>
        <input value={item.amount} placeholder='Add amount' onChange={e=>setAmount(e.target.value)}></input>
        <button>Add</button>
      </form>
      <ol>
        {items?.map(item=>(
          <li key={item.id}>
            {item.description}&nbsp;
            {item.amount}&nbsp;
          <a href='#' className="delete" onClick={()=>remove(item.id)}>
            Delete
          </a>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default App;
