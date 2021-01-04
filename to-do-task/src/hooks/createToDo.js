import axios from "axios";
import React from "react";

export const createToDo = async (e, todo) => {
  e.preventDefault();
    await axios("http://localhost:5000/todos", {
      method: "POST",
      body: JSON.stringify(todo),
      headers: { "Content-Type": "application/json" },
    });
};
