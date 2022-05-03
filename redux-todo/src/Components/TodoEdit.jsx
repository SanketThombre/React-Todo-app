
import { useReducer,useState,useEffect } from "react";
import { v4 as uuid } from "uuid";
import axios from "axios";
import { gettododata } from "../Redux/Todos/action";
import {useDispatch,useSelector} from "react-redux";
import { TagStats } from "./TagsStats";
import styled from "styled-components";
import { Profile } from "./Profile";
import {useParams,useNavigate} from "react-router-dom";

const Main = styled.div`
display: flex;
margin-top: 20px;
gap:20px
`;

const Box1 = styled.div`
flex:0.7;
`;

const Box2 = styled.div`
flex:2;
border: 1px solid gray;
display: flex;
padding:30px;
justify-content:space-evenly;
background-color:#98B4AA;
`;

const Title = styled.div`
width:300px;
height:200px;
border: 3px solid black;
padding:15px;
border-radius: 5px;
`;

const Label = styled.label`
float:left;
margin-left:20px;
margin-bottom:10px;
font-size:20px;

`;

const Input = styled.input`
width:85%;
height:25px;
border-radius: 10px;
border:none;
padding:5px 10px;
margin-bottom:5px;
`;

const Sinput = styled.input`

float : left;
width: 15px;
height: 15px;

`;
const Slabel = styled.label`

float : left;
margin-left:20px;
// font-size:20px;
font-weight:bold;

`;

const Tags = styled.div`
width:300px;
height:120px;
border: 3px solid black;
padding:15px;
border-radius: 5px;
`;

const Addbutton = styled.button`
width:50px;
height:25px;
padding:15px 10px;
display:flex;
align-items:center;
justify-content:center;
border-radius:8px;
border:none;
`;
const Dbutton = styled.button`
padding:3px 15px;
border-radius: 8px;
background-color:#3A3845;
color:#F7CCAC;
cursor:pointer;
`;


const Button = styled.button`
padding:8px 25px;
border-radius: 8px;
margin-top:10px;
background-color:black;
color:white;
cursor:pointer;
`;

const initState = {
    title: "",
    description: "",
    status: "",
    subtasks: [],
    tags: { official: false, personal: false, others: false },
    date: "",
}

const reducer = (state, { type, payload }) => {
    switch (type) {
        case "Title":
            return { ...state, title: payload };
        case "Description":
            return { ...state, description: payload };
        case "Status":
            return { ...state, status: payload };
        case "Tags":
            return { ...state, tags: { ...state.tags, ...payload } };
        case "Date":
            return { ...state, date: payload };
        case "Subtasks":
            return { ...state, subtasks: [...state.subtasks, payload] };
        case "Toggle_Subtask":

            const subtaskAfterToggle = state.subtasks.map((el) =>
            el.id==payload.id ? {...el,subtaskstatus:payload.status}:el
            )
            return { ...state, subtasks: subtaskAfterToggle };
        
        case "Delete_Subtask":
            const subtaskAfterDelete = state.subtasks.filter((el) =>
                el.id != payload.id
            )
            return { ...state, subtasks: subtaskAfterDelete };
        case "Update_InitState":
            return { ...state,...payload}
        
        case "Reset":
            return {...initState}
        
        default:
            throw new Error("Please give proper action object")
    }
}

export const TodoEdit = () => {

    const { todos } = useSelector((state) => state.todos);
    const { username,token } = useSelector((state) => state.login);
    const navigate = useNavigate();
    const [state, dispatch] = useReducer(reducer, initState);
    const { title, description, status, subtasks, tags, date } = state;
    const { official, personal, others } = tags;
    const [sub, setSub] = useState("");
    const reduxDispatch = useDispatch();
    const {id} = useParams();
// console.log(id)
    const editTasks = () => {
        const payload = { ...state };
        console.log(payload)
        axios.put(`http://localhost:8000/todos/${id}`, payload) 
            .then(() => reduxDispatch(gettododata()))
        .then(()=>navigate("/"))

    }

    useEffect(() => {
        axios.get(`http://localhost:8000/todos/${id}`)
            .then((res) => {  dispatch({ type: "Update_InitState", payload: res.data })  })
    },[])
    return (
        <div>
            <TagStats todos={todos} />
            <Main>
                <Box1>
                    <Profile username={username} token={token}/>
                </Box1>
               
                <Box2>

                    <div>
                        <Title>
            <Label>Title</Label>
            <br />
            <Input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e)=>dispatch({type: "Title", payload: e.target.value})}
            />
            <br />
            <br />
            <Label>Description</Label>
            <br />
            <Input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e)=>dispatch({type: "Description", payload: e.target.value})}
                            />
                            
                            </Title>
            <br />
                        
         <Title>
                           
                <h2 style={{ margin: "0" }}>Status</h2>
                 <hr width="100%" color="black"/>           
            <br />
           
            <Sinput
                type="radio"
               checked={status=="Todo"}
                
                onChange={(e)=>dispatch({type: "Status", payload: "Todo"})}
            />
            <Slabel> Todo</Slabel>
            <br />
           
            <Sinput
                type="radio"
               checked={status=="Inprogress"}
                
                onChange={(e)=>dispatch({type: "Status", payload: "Inprogress"})}
            />
             <Slabel>Inprogress</Slabel>
            <br />
            
            <Sinput
                type="radio"
               checked={status=="Done"}
                
                onChange={(e)=>dispatch({type: "Status", payload: "Done"})}
            />
             <Slabel>Done</Slabel>
        </Title>
            </div>
            <div>
               <Tags>         
                 <h2 style={{ margin: "0" }}>Tags</h2>
                 <hr width="100%" color="black"/>  
                <Sinput type="checkbox" checked={official} onChange={(e) => dispatch({ type: "Tags", payload: { official:e.target.checked }})}/>
                <Slabel>OFFICIAL</Slabel>
                <br />
                <Sinput type="checkbox" checked={personal } onChange={(e)=>dispatch({type: "Tags",  payload: { personal:e.target.checked }})}/>
                <Slabel>PERSONAL</Slabel>
                <br />
                <Sinput type="checkbox" checked={others} onChange={(e)=>dispatch({type: "Tags",  payload: { others:e.target.checked }})}/>
                <Slabel>OTHERS</Slabel>
            
                        </Tags>
                        <br />
                <br />
                <Input type="date" value={ date} onChange={(e)=>dispatch({type: "Date", payload: e.target.value})}/>
                <br />
            

                        <h2 style={{marginRight:"70px"}}>Edit Subtasks</h2>
            <div style={{display: "flex",gap:"20px",alignItems:"center"}}>
                <Input
                    type="text"
                    placeholder="Enter Subtask"
                    value={sub}
                    onChange={(e)=>setSub(e.target.value)}
                />
                <Addbutton onClick={() => {
                    const payload = {
                        id: uuid(),
                        subtasktitle: sub,
                        subtaskstatus: false,

                    };

                    dispatch({ type: "Subtasks", payload });
                    setSub("")
                }}>ADD</Addbutton>
             </div>
                        
                <div>
                    {subtasks.map((subtask) =>(
                        <div key={subtask.id} style={{display: "flex",gap:"15px",alignItems: "center"}}>

                            
                                <input type="checkbox" checked={subtask.subtaskstatus}
                                onChange={(e)=>dispatch({type: "Toggle_Subtask",payload:{id: subtask.id,status: e.target.checked}})}
                                />
                            <Label>
                                {subtask.subtasktitle}
                            </Label> 
                            <Dbutton onClick={()=>dispatch({type: "Delete_Subtask",payload:{id: subtask.id}})}>Delete</Dbutton>
                    </div>
                    ))}
                        </div>
                        <br />
                       
                    <Button onClick={editTasks}>Edit Tasks</Button>
                    </div> 
                    
            </Box2>  
                
                </Main>
        </div>
        
    )
}