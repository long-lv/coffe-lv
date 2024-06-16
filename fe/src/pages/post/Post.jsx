import axios from "axios";
import { useEffect, useState } from "react";
import LvlButton from "../../components/Oraginis/LvlButton";
import LvlTable from "../../components/Oraginis/LvlTable";

const columnStyles = {
    checkbox: { backgroundColor: 'lightgray' },
    userId: { backgroundColor: 'lightyellow' },
    id: { backgroundColor: 'lightblue' },
    title: { backgroundColor: 'lightgreen' },
    body: { backgroundColor: 'lightcoral' },
  };
const Post = () =>{
    const [porst,setPorst] = useState([]);
    const handleClickBtn = () =>{
        console.log('aaaa');
    }

    const getUsers = async () =>{
        try{
            const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
            if(res.data && res.data.length){
                setPorst(res.data);
            }
        }catch (err) {
            console.log(err);
        }
    }
    useEffect( () =>{
        getUsers();
    },[])
    return <>
    <div>
        <div className="w-full flex justify-end mb-2">
            <LvlButton onClick={handleClickBtn} label='Add' styled={{marginRight : '1rem'}}></LvlButton>
            <LvlButton onClick={handleClickBtn} label='Edit' styled={{marginRight : '1rem'}}></LvlButton>
            <LvlButton onClick={handleClickBtn} label='Delete' styled={{marginRight : '1rem'}}></LvlButton>
        </div>
        <LvlTable data={porst} columnStyles={columnStyles} pagination={true} selected="multiple" scrollHeight={'450px'} sort={true}></LvlTable>
    </div>
    </>
}

export default Post;