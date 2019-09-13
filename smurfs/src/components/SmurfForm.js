import React, { useContext, useEffect, useState } from 'react';
import axios from "axios";

import { SmurfContext } from '../contexts/SmurfContext';

function useAsyncEndpoint(fn) {
  const [res, setRes] = useState({
    data: null,
    complete: false,
    pending: false,
    error: false
  });
  const [req, setReq] = useState();

  useEffect(
    () => {
      if (!req) return;
      setRes({
        data: null,
        pending: true,
        error: false,
        complete: false
      });
      axios(req)
        .then(res =>
          setRes({
            data: res.data,
            pending: false,
            error: false,
            complete: true
          })
        )
        .catch(() =>
          setRes({
            data: null,
            pending: false,
            error: true,
            complete: true
          })
        );
    },
    [req]
  );

  return [res, (...args) => setReq(fn(...args))];
}

const todosApi = "http://localhost:3333/smurfs";


function postTodoEndpoint() {
  /* eslint-disable react-hooks/rules-of-hooks */
  return useAsyncEndpoint(data => ({
    url: todosApi,
    method: "POST",
    data
  }));
}

const SmurfForm = () => {

  const smurfForm = useContext(SmurfContext);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [newTodo, postNewTodo] = postTodoEndpoint();
      
  function createTodo() {
    postNewTodo({
      title,
      body,
      userId: 1
    });
  }

  return (
    <>
    <div>
      <label>
        Title: <input value={title} onChange={e => setTitle(e.target.value)} />
      </label>
      <label>
        Body: <input value={body} onChange={e => setBody(e.target.value)} />
      </label>
      <button onClick={createTodo}>Create Todo</button>
      <div className="new-todo">
        {(newTodo.pending && "Creating Todo...") ||
          (newTodo.complete &&
            `Todo with title ${newTodo.data.title} created with ID ${
              newTodo.data.id
            }`)}
      </div>
    </div>
    {/* <form >
      <input value={smurfForm.name} id='name' name='name' type='text' placeholder='Name' />
      <input value={smurfForm.age} id='age' name='height' type='text' placeholder='Age' />
      <input value={smurfForm.height} id='age' name='height' type='text' placeholder='Height' />
      <button type='submit'>Submit</button>
    </form> */}
    </>
  )
}
export default SmurfForm;