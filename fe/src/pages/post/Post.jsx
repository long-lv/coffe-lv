import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import LvlButton from "../../components/Oraginis/LvlButton";
import LvlCalendar from "../../components/Oraginis/LvlCalendar";
import LvlCheckbox from "../../components/Oraginis/LvlCheckbox";
import LvlDialog from "../../components/Oraginis/LvlDialog";
import LvlSelect from "../../components/Oraginis/LvlSelect";
import LvlTable from "../../components/Oraginis/LvlTable";
import LvlTextArea from "../../components/Oraginis/LvlTextArea";
import LvlTextField from "../../components/Oraginis/LvlTextField";
import LvlLabel from "../../components/molecules/LvlLabel";

const columnStyles = {
    checkbox: { backgroundColor: 'lightgray' },
    userId: { backgroundColor: 'lightyellow' },
    id: { backgroundColor: 'lightblue' },
    title: { backgroundColor: 'lightgreen' },
    body: { backgroundColor: 'lightcoral' },
  };

  const categories = [
    {
      "categories_id": "1",
      "name": "New Years Parties",
      "slug": "new-years-eve"
    },
    {
      "categories_id": "71",
      "name": "Joonbug Calendar",
      "slug": "nightlife-calendar"
    },
    {
      "categories_id": "69",
      "name": "Lindy Calendar",
      "slug": "nightlife-calendar"
    }
  ]
const Post = () =>{
    const [porst,setPorst] = useState([]);
    const [newPost,setNewPost] = useState({
        title : "",
        category : null,
        created_at : dayjs(),
        description: "",
        active : true
    })
    const [visibleDialogAdd,setVisibleDialogAdd] = useState(false);

    const onSubmitDialogAdd = () =>{
        setVisibleDialogAdd(false);
        setNewPost({})
        console.log(newPost)
    }   

    const handleBtnAdd = () =>{
        setVisibleDialogAdd(true);
    }
    const handleCancelDialogAdd = () =>{
        setVisibleDialogAdd(false);
        setNewPost({})
    }
    const handleChangeCreatedAtNewPost = (value) =>{
        setNewPost({...newPost,created_at : value.format('YYYY-MM-DD')})
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
        <LvlDialog header="Creat New Post" handleSubmit={onSubmitDialogAdd} handleCancel={handleCancelDialogAdd} visible={visibleDialogAdd}>
            <div className="flex mb-3">
                <LvlLabel required className={'text-lg w-16 flex items-center'}>Title</LvlLabel>
                <div className="ml-2">
                <LvlTextField 
                            placeholder="Title..." 
                            value={newPost.title} fullWidth={true} 
                            onChange={(e) => setNewPost({...newPost,title : e.target.value})}/>
                </div>
            </div>
            <div className="flex mb-3">
                <LvlLabel className={'text-lg w-16 flex items-center'}>Category</LvlLabel>
                <LvlSelect 
                        value={newPost.category} 
                        onChange={(e) =>setNewPost({...newPost,category : e.target.value})}
                        options={categories} 
                        optionLabel={'name'}
                        optionValue={'categories_id'} 
                        className="mt-2 ml-2"/>
            </div>
            <div className="flex mb-3">
                <LvlLabel className={'text-lg w-16 flex items-center'}>Created At</LvlLabel>
                <div className="ml-2"><LvlCalendar onchange={handleChangeCreatedAtNewPost}/></div>
            </div>
            <div className="flex mb-3">
                <LvlLabel className={'text-lg w-16 flex items-center'}>Desc</LvlLabel>
                <div className="ml-4 w-full">
                    <LvlTextArea value={newPost.description} fullWidth={true} placeholder="Description..." rows={4} onChange={(e) => setNewPost({...newPost,description : e.target.value})}/>
                </div>
            </div>
            <div className="flex mb-3">
                <LvlLabel className={'text-lg w-16 flex items-center'}>Active</LvlLabel>
                <div className="ml-1 w-full">
                    <LvlCheckbox value={newPost.active} onChange={(e) => setNewPost({...newPost,active : e.target.checked})}></LvlCheckbox>
                </div>
            </div>
        </LvlDialog>
        <div className="w-full flex justify-end mb-2">
            <LvlButton onClick={handleBtnAdd} label='Add' styled={{marginRight : '1rem'}}></LvlButton>
            <LvlButton label='Edit' styled={{marginRight : '1rem'}}></LvlButton>
            <LvlButton label='Delete' styled={{marginRight : '1rem'}}></LvlButton>
        </div>
        <LvlTable data={porst} columnStyles={columnStyles} pagination={true} selected="multiple" scrollHeight={'450px'} sort={true}></LvlTable>
    </div>
    </>
}

export default Post;