import { useCallback, useEffect, useState,useRef } from 'react'
import './index.css'
import './App.css'
import { array } from 'i/lib/util'

function App() {
  const [length, setlength] = useState(8)
  const [charallow, setcharallow] = useState(true)
  const [numallow, setnumallow] = useState(true)
  const [psw, setpsw] = useState("")

  //userefhook
  const pswref=useRef(null)

  const pswgenerator=useCallback (() =>{
    let pass=""
    let str=
    "QWERTYUIOPASDFGHJKLZXCVBNMmnbvcxzlkjhgfdsapoiuytrewq"

    if(numallow) str+="0123456789"
    if(charallow) str+="@#$%^&*()_-/><?`~=+"


    for(let i=1;i<=length;i++){
      let char=Math.floor(Math.random () * str.length+1)
      pass+=str.charAt(char)
    }
    setpsw(pass)


  },[length,charallow,numallow,psw])

  const copypswtoclipboard=useCallback(() =>{
    pswref.current?.select();
    window.navigator.clipboard.writeText(psw)
  },[psw])

  useEffect(()=>{
    pswgenerator()
  },
[length,numallow,charallow])
  return (
   <div
   className='w-full max-w-md mx-auto shadow-md 
   rounded-lg px-4 my-8 bg-gray-800
   text-orange-500'>
   <h1 className='text-white text-center 
   my-3'>Password Generator
   </h1>
    <div className='flex shadow rounded-lg
    overflow-hidden mb-4'>
      <input type="text" 
      value={psw}
      className='outline-none w-full py-1 px-3 '
      placeholder='password'
      readOnly
      ref={pswref}
      />
      <button
      onClick={copypswtoclipboard}
      className='outline-none bg-blue-700 text-white
      px-3 py-0.5 shrink-0'>copy</button>
    </div>
    <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
        <input type="range" 
        min={6}
        max={100}
        value={length}
        className='cursor-pointer'
        onChange={(e) =>{setlength(e.target.value)}
        }
        /> <label>Length:{length}</label>
      </div>
      <div className='flex items-center gap-x-1'>
        <input type="checkbox" 
        defaultChecked={numallow}
        id='numinput'
        onChange={()=>{
          setnumallow((prev)=>!prev)
        }}
        />
        <label htmlFor="numinput">Numbers</label>
      </div>
      <div className='flex items-center gap-x-1'>
        <input type="checkbox" 
        defaultChecked={charallow}
        id='charinput'
        onChange={()=>{
          setcharallow((prev)=>!prev)
        }}
        />
        <label htmlFor="charinput">Characters</label>
      </div>
    </div>
   </div> 
   
  )
}

export default App
