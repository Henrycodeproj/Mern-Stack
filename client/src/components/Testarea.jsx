import {useState, useRef, useEffect} from 'react'
import TextareaAutosize from '@mui/material/TextareaAutosize';

const Testarea = () => {
    const minRows = 5
    const [rows, setRows] = useState(minRows);
    const [value, setValue] = useState("");
    
    useEffect(() => {
      const rowlen = value.split("\n");
  
      if (rowlen.length > minRows) {
        setRows(rowlen.length);
      }
    }, [value]);
  return (
    <div>
    <textarea rows={rows} onChange={(text) => setValue(text.target.value)} />
        <button>submit button</button>
    </div>
  )
}

export default Testarea
