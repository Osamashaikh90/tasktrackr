const express = require("express");
const app = express();
const cors = require("cors");
const port = 4000;
const pool = require("./db");
app.use(cors());
app.use(express.json());

//routes
//create a todo
app.post("/todo/create", async (req, res) => {
  try {
    const { description } = req.body;
    const work = await pool.query(
      "INSERT INTO pgserver (description) VALUES($1) returning *",
      [description]
    );
    res.json(work.rows[0]);
    console.log("data in db");
  } catch (error) {
    console.log(error);
  }
});

//get all todo
app.get("/todo/get", async (req, res) => {
  try {
    const allTodo = await pool.query("Select * from pgserver");
    res.json(allTodo.rows);
  } catch (error) {
    console.log(error);
  }
});

//get a single todo
app.get("/todo/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const singleTodo = await pool.query(
      "Select * from pgserver where server_id = $1",
      [id]
    );
    res.json(singleTodo.rows[0]);
  } catch (error) {
    console.log(error);
  }
});

// update a single id
app.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await pool.query(
      "update pgserver set description = $1 where server_id = $2",
      [description, id]
    );
    res.json("updated Successfully!! ");
  } catch (error) {
    console.log(error);
  }
});

//delete
app.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query(
      "delete from pgserver where server_id = $1 ",
      [id]
    );
    res.json("Deleted Succesfully!!");
  } catch (error) {
    console.log(error.message);
  }
});

app.get("/", (req, res) => {
  res.send("Hello from server");
});

app.listen(port, () => {
  console.log(`${port} I am connected .`);
});
