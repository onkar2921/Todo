const todo = require("../modal/todo");
// const cron = require('node-cron');

const createTodoController = async (req, res) => {
  try {
    const { content, category } = req.body;

    const user = req.user;

    const data = await todo.create({
      user: user.exist?._id,
      content,
      category,
    });

    if (data) {
      return res.status(200).json({ message: "todo created", data: data });
    }

    return res.status(500).json({ message: "failed in creation of todo" });
  } catch (error) {
    console.log(error);
  }
};

const getAllTodoController = async (req, res) => {
  try {
    const user = req.user;

    const data = await todo
      .find({ user: user.exist?._id })
      .populate("user")
      .populate("category");

    if (data) {
      return res.status(200).json({ message: "get all todos", data });
    }
  } catch (error) {
    console.log(error);
  }
};

const deleteTodoController = async (req, res) => {
  try {
    const { TodoId } = req.params;

    const data = await todo.findByIdAndDelete(TodoId);

    if (data) {
      return res.status(200).json({ message: "todo deleted" });
    }
    return res.status(500).json({ message: "failed in deletion of todo" });
  } catch (error) {
    console.log(error);
  }
};

const updateTodoController = async (req, res) => {
  try {
    const { TodoId } = req.params;
    const { content } = req.body;

    const data = await todo
      .findByIdAndUpdate(TodoId, { content }, { new: true })
      .populate("user");

    if (data) {
      return res.status(200).json({ message: "todo updated", data });
    }
    return res.status(500).json({ message: "failed in updation of todo" });
  } catch (error) {
    console.log(error);
  }
};

const getrTodoOnCategoryController = async (req, res) => {
  try {
    const { category } = req.body;
    const user = req.params;

    const data = await todo.find({
      $and: [{ user: user?.user }, { category: category }],
    });

    if (data) {
      return res
        .status(200)
        .json({ message: "getting specfic category todos", data });
    }
    return res
      .status(500)
      .json({ message: "no specific data found for this category" });
  } catch (error) {
    console.log(error);
  }
};

// # ┌────────────── second (optional)
// # │ ┌──────────── minute
// # │ │ ┌────────── hour
// # │ │ │ ┌──────── day of month
// # │ │ │ │ ┌────── month
// # │ │ │ │ │ ┌──── day of week
// # │ │ │ │ │ │
// # │ │ │ │ │ │
// # * * * * * *

// const reminderController=async(req,res)=>{
//     try {

//         const {time,text}=req.body

//             // Schedule a cron job to send a reminder
//             cron.schedule('0 1 * * *', () => {
//               console.log('Sending a reminder to the frontend...');
//               // Emit a reminder event to the connected clients
//               socket.emit('reminder', { message: 'It\'s time for your reminder!' });
//             }, {
//               scheduled: true,
//               timezone: 'America/Sao_Paulo',
//             });

//     } catch (error) {
//         console.log(error)
//     }
// }

module.exports = {
  createTodoController,
  getAllTodoController,
  deleteTodoController,
  updateTodoController,
  getrTodoOnCategoryController,
};
