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
import MyEditor from "../../components/Oraginis/MyEditor";
import LvlLabel from "../../components/molecules/LvlLabel";

// const columnStyles = {
//     checkbox: { backgroundColor: 'lightgray' },
//     userId: { backgroundColor: 'lightyellow' },
//     id: { backgroundColor: 'lightblue' },
//     title: { backgroundColor: 'lightgreen' },
//     body: { backgroundColor: 'lightcoral' },
// };

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
    const [posts,setPosts] = useState([]);
    const [content,setContent] = useState('');
    const [post,setPost] = useState({
        title : "",
        category : null,
        created_at : dayjs(),
        description: "",
        active : true,
    })
    const [selectedRows, setSelectedRows] = useState([]);

    const handleSelectedRowsChange = (selectedRows) => {
      setSelectedRows(selectedRows);
    };
    
    const handleGetContent = (content) =>{
        setContent(content)
    }
    const [visibleDialogAdd,setVisibleDialogAdd] = useState(false);

    const onSubmitDialogAdd = () =>{
        setVisibleDialogAdd(false);
    }   

    const handleBtnAdd = () =>{
        setVisibleDialogAdd(true);
        setPost({
            title : "",
            category : null,
            created_at : dayjs(),
            description: "",
            content :"",
            active : true
        })
    }
    const handleCancelDialogAdd = () =>{
        setVisibleDialogAdd(false);
    }
    const handleChangeCreatedAtNewPost = (value) =>{
        setPost({...post,created_at : value.format('YYYY-MM-DD')})
    }
    const getUsers = async () =>{
        try{
            const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
            if(res.data && res.data.length){
                setPosts(res.data);
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
            <LvlButton onClick={handleBtnAdd} label='Add' styled={{marginRight : '1rem'}}></LvlButton>
            <LvlButton label='Edit' styled={{marginRight : '1rem'}}></LvlButton>
            <LvlButton label='Delete' styled={{marginRight : '1rem'}}></LvlButton>
        </div>
        <LvlTable
                data={posts}
                rows={10} 
                //  columnStyles={columnStyles} 
                pagination={true}
                selected="multiple" 
                scrollHeight={'800px'} 
                sort={true}
                onSelectedRowsChange={handleSelectedRowsChange}
                >
        </LvlTable>
        {/* dialog add post */}
        <LvlDialog 
            header="Creat New Post"
            visible={visibleDialogAdd} 
            size={'xl'} 
            labelBtnSubmit={'Add'}
            handleSubmit={onSubmitDialogAdd} 
            handleCancel={handleCancelDialogAdd} >
            <div className="flex mb-3">
                <LvlLabel required className={'text-lg w-16 flex items-center'}>Title</LvlLabel>
                <div className="ml-2">
                <LvlTextField 
                            placeholder="Title..." 
                            value={post.title} fullWidth={true} 
                            onChange={(e) => setPost({...post,title : e.target.value})}/>
                </div>
            </div>
            <div className="flex mb-3">
                <LvlLabel className={'text-lg w-16 flex items-center'}>Category</LvlLabel>
                <LvlSelect 
                        value={post.category} 
                        onChange={(e) =>setPost({...post,category : e.target.value})}
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
                    <LvlTextArea value={post.description} fullWidth={true} placeholder="Description..." rows={4} onChange={(e) => setPost({...post,description : e.target.value})}/>
                </div>
            </div>
            <div className="flex mb-3">
                <LvlLabel className={'text-lg w-16 flex items-center'}>Content</LvlLabel>
                <div className="ml-4 w-full">
                    <MyEditor value={content} onChange={handleGetContent} placeholder={'typing content...'} height={400}></MyEditor>
                </div>
            </div>
            <div className="flex mb-3">
                <LvlLabel className={'text-lg w-16 flex items-center'}>Active</LvlLabel>
                <div className="ml-1 w-full">
                    <LvlCheckbox value={post.active} onChange={(e) => setPost({...post,active : e.target.checked})}></LvlCheckbox>
                </div>
            </div>
        </LvlDialog>
    </div>
    </>
}

export default Post;