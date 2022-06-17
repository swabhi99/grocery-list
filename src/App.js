import { useState,useEffect } from "react";
import List from "./List";
import Alert from "./Alert";

let getLocalStorage=()=>{
  const list = localStorage.getItem('list')
  if(list){
    return JSON.parse(localStorage.getItem('list'))
  }
  return []
}

function App() {
  const [name, setName] = useState('');
  const [list, setList] = useState(getLocalStorage());
  const [isEdit, setIsEdit] = useState(false);
  const [editId,setEditId] = useState(null)
  const [alert,setAlert] = useState({
    show:false,
    msg:'',
    type:''
  })

  const handleSubmit = (e)=>{
    e.preventDefault();
    if(!name){
      showAlert(true,'please enter value','danger');
    }
    else if(name && isEdit){
        setList(list.map((l)=>{
            if(l.id===editId){
              return {...l,title:name}
            }
            return l
        }))
        setEditId(null)
        setIsEdit(false)
        setName('')
    }
    else{
      const newItem = {
        id:Math.floor(Date.now()),
        title:name
      }
      setList([...list,newItem])
      setName('')
      setAlert(true,'item added to list','success')
    }
  }
  
  const deleteItem = (id)=>{
    setList(list.filter((item)=>item.id!==id))
  }

  const editItem = (id)=>{
    const currentList = list.find((item)=>item.id===id);
    setEditId(currentList.id);
    setName(currentList.title);
    setIsEdit(true)
  }

  const showAlert = (show=false,msg,type)=>{
      setAlert({show,msg,type})
  }

  useEffect(() => {
    localStorage.setItem('list',JSON.stringify(list))
  }, [list]);

  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert}/>}
          <h3>grocery bud</h3>
          <div className="form-control">
            <input type="text" className="grocery" placeholder="e.g apple"
             value={name} onChange={(e)=>setName(e.target.value)}
            />
            <button type="submit" className="submit-btn">
              {isEdit ? 'edit':'submit'}
            </button>
          </div>
      </form>

      {list.length>0 &&
         <div className="grocery-container">
         <List items={list} editItem={editItem} deleteItem={deleteItem}></List>
          <button className="clear-btn" onClick={()=>setList([])}>clear items</button>
         </div>
      }
     
    </section>
  );
}

export default App;
