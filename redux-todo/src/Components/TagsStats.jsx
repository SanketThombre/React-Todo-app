
import styled from "styled-components";
import { useSelector } from "react-redux";

const Status = styled.div`
width:100%;
height:40px;
// border: 1px solid red;
display: flex;
gap:30px;
margin-top:10px;
`

const All = styled.div`
height:100%;
width:25%;
border: 1px solid gray;
border-radius:10px;
display: flex;
justify-content:center;
align-items:center

`;

export const TagStats = ({todos}) => {

    // const {todos} = useSelector((store)=> store.todos)
    console.log(todos);
    return (
       
        <Status>
            
    <All style={{ backgroundColor: 'tomato' }}><h3>ALL : { todos.filter((item)=>item.tags.personal && item.tags.official && item.tags.others).length }</h3></All>
    <All style={{backgroundColor: '#b5eecc'}}><h3>PERSONAL : { todos.filter((item)=>item.tags.personal).length }</h3></All>
    <All style={{backgroundColor: '#8891b2'}}><h3>OFFICIAL : { todos.filter((item)=>item.tags.official).length }</h3></All>
    <All style={{backgroundColor: '#f1c557'}}><h3>OTHERS : { todos.filter((item)=>item.tags.others).length }</h3></All>
        </Status>
    )
}