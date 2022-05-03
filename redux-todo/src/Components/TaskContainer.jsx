import { Taskitems } from "./Taskitems"
import styled from "styled-components";

const Container = styled.div`
width:100%;
height:510px;
border: 1px solid gray;
overflow:auto;
background-color:whitesmoke;
`;

export const TaskContainer = ({task}) => {
    console.log("task",task)
    return (

        <Container>{task.map((el) => (
            <Taskitems key={el.id } {...el}/> 
        ))}</Container>
    )
}