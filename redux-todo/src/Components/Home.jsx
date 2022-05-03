import styled from "styled-components";
import { useSelector,useDispatch } from "react-redux";
import { Profile } from "./Profile";
import { TagStats } from "./TagsStats";
import { useEffect } from "react";
import {gettododata} from "../Redux/Todos/action"
import "./Home.css";
import { TaskContainer } from "./TaskContainer";

const Container = styled.div`
width:99%;
height:620px;
// border: 1px solid black;

margin: 10px auto;
`



const Task = styled.div`
width:98%;
height:88%;
// border: 1px solid black;
margin: auto;
margin-top:30px;
display:grid;
grid-template-columns:repeat(12,1fr);
gap:25px;
`;
const GridItem1 = styled.div`
grid-column:1/4;
// border: 1px solid gray;
`;
const GridItem2 = styled.div`
grid-column:4/7;



`;
const GridItem3 = styled.div`
grid-column:7/10;


`;
const GridItem4 = styled.div`
grid-column:10/13;


`;
export const Home = () => {

    const { token, username } = useSelector((store) => store.login)
    const {todos} = useSelector((state) => state.todos)
    const dispatch = useDispatch();
    useEffect(() => {
       dispatch(gettododata()) 
    },[])
    
    // console.log(username,token)
    return <Container>
        <TagStats todos={ todos} />
        
        <Task>
            <GridItem1><Profile username={username} token={token} /></GridItem1> 
            <GridItem2><div id="head" style={{backgroundColor:"#BFFFF0"}}>TODO</div>
                <TaskContainer task={ todos.filter((item)=>item.status=="Todo")}/>
            </GridItem2>
            <GridItem3><div id="head" style={{backgroundColor:"#EEE4AB"}}>INPROGRESS</div>
            <TaskContainer task={ todos.filter((item)=>item.status=="Inprogress")}/>
            </GridItem3>
            <GridItem4><div id="head" style={{backgroundColor:"#F9EBC8"}}>DONE</div>
            <TaskContainer task={ todos.filter((item)=>item.status=="Done")}/>
            </GridItem4>
       </Task>
        </Container>
    
}