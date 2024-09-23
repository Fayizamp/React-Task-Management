import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Home.css";
import { Container, Form, ListGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { IoMdDoneAll } from "react-icons/io";
import { completeTask, deleteTask } from "../redux/taskSlice";

function Home() {
  const tasks = useSelector((state) => state.tasks);
  
  console.log(tasks);
  const dispatch =useDispatch();
  const navigate = useNavigate()

  const handleDelete = (id) => {
    console.log("del")
    dispatch(deleteTask(id));
  }

  const handleComplete =(id) => {
    console.log("com", id);
    dispatch(completeTask(id));
  }

  const handleEdit = (id) => {
    navigate(`/edit/${id}`)
  }

  const [filter, setFilter] = useState("all");

 
  const filteredTasks = tasks.filter(task => {
    if (filter === "all") return true;
    else
    return task.status === filter;
  });

  return (
    <Container>
      <h2 className="space">Task Management App</h2>
      <div className="float">
        <Link to="/add" className="bttn">
          + Create Task
        </Link>
        <Form.Select id="status" className="sel" value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="incomplete">Incomplete</option>
        </Form.Select>
      </div>

      <h4>Task Lists</h4>
      <div className="list">
        <ListGroup as="ul">
          {filteredTasks.map((task, index) => (
            <ListGroup.Item as="li" key={index} 
            style={task.status === "completed" ? { backgroundColor: '#d4edda', color: '#155724' } : {}}>
              <div className="sty">
                {/* <input type="checkbox" /> */}
                {/*  {task.status} */}
                <strong>{task.title}</strong>
                <span className="flex">
                  <IoMdDoneAll className="items" id="complete"  onClick={() => handleComplete(task.id)} />
                  <FaEdit className="items" id="edit" onClick={() => handleEdit(task.id)} />
                  <MdDelete className="items" id="delete"  onClick={() => handleDelete(task.id)}/>
                </span>
                <p>{task.time}</p>
              </div>
            </ListGroup.Item>
          ))}
          {/* <ListGroup.Item as="li">Cras justo odio</ListGroup.Item>
            <ListGroup.Item as="li">Cras justo odio</ListGroup.Item> */}
        </ListGroup>
      </div>
    </Container>
  );
}

export default Home;
