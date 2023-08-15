const pool = require("../db");

const Create = async (req, res) => {
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
};

const Get = async (req, res) => {
  try {
    const allTodo = await pool.query("Select * from pgserver");
    res.json(allTodo.rows);
  } catch (error) {
    console.log(error);
  }
};

const GetById = async (req, res) => {
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
};

const Update = async (req, res) => {
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
};

const Delete = async (req, res) => {
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
};

module.exports = { Create, Get, GetById, Update, Delete };
