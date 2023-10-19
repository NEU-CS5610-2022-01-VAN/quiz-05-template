import express from "express";
import pkg from "@prisma/client";
import morgan from "morgan";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));

const { PrismaClient } = pkg;
const prisma = new PrismaClient();

app.get("/todos/:email", async (req, res) => {
  const email = req.params.email
  const todoItems = await prisma.todoItem.findMany({
    where: {
      author: {
        email: email
      },
    },
  });
  res.json(todoItems);
});

// ==== Endpoints to implement: ====
// creates a todo item 
// deletes a todo item by id
// get a todo item by id
// updates a todo item by id

app.listen(8000, () => {
  console.log("Server running on http://localhost:8000 🎉 🚀");
});
