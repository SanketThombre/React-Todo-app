
import styled from "styled-components";
import axios from "axios";
import { useDispatch } from "react-redux";
import { gettododata } from "../Redux/Todos/action";
import { useNavigate } from "react-router-dom";



const Wrapper = styled.div`
margin:15px;
border: 2px solid gray;
padding:10px;
border-radius: 10px;
`;

const DescriptionWrapper = styled.div`
display: flex;
align-items: center;
justify-content:space-between;
`;

const Subtaskssection = styled.div`
margin-top:10px;

`;
const Button = styled.button`
padding:5px 15px;
border-radius: 8px;
margin-top:10px;
margin-left:10px;
background-color:#3A3845;
color:#F7CCAC;
cursor:pointer;
`;
const Ebutton = styled.button`
padding:5px 15px;
border-radius: 8px;
margin-top:10px;
background-color:#3A3845;
color:#F7CCAC;
cursor:pointer;
`;

export const Taskitems = (props) => {
    // console.log("props",props)
    const { title, description, subtasks, tags,status, date, id } = props;
    const { personal, others, official } = tags;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const Tododelete = () => {
        axios.delete(`http://localhost:8000/todos/${id}`) 
        .then(()=>dispatch(gettododata()))
    }
    return (
        <Wrapper>
                <h2 style={{ margin: 0}}>{title}</h2>
                <DescriptionWrapper>

                <div>
                    <p>{personal && "PERSONAL"} {" "} {others && "OTHERS"} {" "} {official && "OFFICIAL"}</p>
                   
                </div>
                <p>Date: { date}</p>
            </DescriptionWrapper>
            <p style={{ margin: 0 }}>Description: { description}</p>
            <Subtaskssection>
                {subtasks.map((el) => (
                    <div key={el.id}>
                        <label>
                            <input type="checkbox" checked={el.subtaskstatus}
                                onChange={(e) => {
                                    const subtaskAfterToggle = subtasks.map(
                                        (item) => item.id == el.id
                                    
                                        ? { ...el, subtaskstatus: e.target.checked }
                                        : item
                                    )
                                    const payload = {
                                        title,
                                        description,
                                        date,
                                        tags,
                                        subtasks: subtaskAfterToggle,
                                       status

                                    };

                                    axios.put(`http://localhost:8000/todos/${id}`, payload)
                                    .then(()=>dispatch(gettododata())) 

                        }}
                            />
                            {el.subtasktitle}</label>
                        
                    </div>
                ))}
            </Subtaskssection>
            <Ebutton onClick={() =>
                navigate(`/todos/${id}/edit`)
                }>Edit</Ebutton>
            
            <Button onClick={() =>Tododelete()}>Delete</Button>
                </Wrapper>
        
    )
}