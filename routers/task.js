const express = require('express')
const router = express.Router()
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const midd = require('../middleware/authMiddleware')
const jwt = require('jsonwebtoken')
const conn = require("../partials/connection_mysql");
const User = require('../models/user');
const Task = require('../models/tasks');
const middadmin = require('../middleware/adminmidd');
const suiviActivity = require('../middleware/suiviActivity');
const activity_logs = require('../models/activity_logs')
const methodOverride = require('method-override');
router.use(methodOverride('_method'));
router.get('/create',(req,res)=>{
    res.render('createTask')
})

router.post('/create' ,async (req, res) => {
    let task = req.body;
    const token = req.cookies.token_access;
    const userData = jwt.decode(token);
    // console.log(userData)
    task.user_id = userData.id;
    let new_task = new Task(task);
    await new_task.save().then(()=>{
        let newActivity = new activity_logs({user_id : task.user_id , description : "creation" , action : 'create' ,task_id : new_task._id })
        newActivity.save();
        const query = "insert into tasks(id,title,description,user_id) values(?,?,?,?)"
        conn.query(query, [String(new_task._id),task.title, task.description, task.user_id], (err, result) => {
            if (err) {
                console.log(`erreur lors de l' insertion mysql:${err}`)
                res.render("AllTasks")
                return
            }
            res.status(201).redirect('/api/tasks');
        })
    }).catch((err)=>{
        console.log(`erreur lors de l' insertion:${err}`);
        res.redirect('/api/tasks')
    })
})

router.get('/tasks', async (req, res) => {
    let tasks = [];
    tasks[0] = await Task.find();
    query = "select * from tasks"
    conn.query(query, (err, results) => {
        if (err) {
            console.log("not found in mysql");
        }
        tasks[1] = results
    })

    res.render("AllTasks" , {tasks : tasks[0]})
})
router.get('/tasks/:id',async (req, res) => {
    const { id } = req.params;
    await Task.findById(id).then((resultat)=>{
        res.render('onetask',{task : resultat})
    }).catch(()=>{
        console.log("not found in mongoose")
        query = "select * from tasks where id = ? ";
        connection2.query(query, [id], (err, results) => {
            if (err) {
                tasks = "not found in mysql"
            }
            res.render('onetask',{task : results})
        })
    });
    
})


router.use(suiviActivity)

router.get('/tasks/:id/edit', middadmin, async (req, res) => {
    const { id } = req.params;
    try {
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).send("Task not found");
        }
        res.render("editTask", { task });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});

router.post('/tasks/:id/edit', middadmin, async (req, res) => {
    const { id } = req.params;
    const task = req.body;
    await Task.findByIdAndUpdate(id, task).then(()=>{
        query = "UPDATE tasks SET title = ?, description = ? WHERE id = ?";
        conn.query(query, [task.title, task.description,String(id)], (err) => {
            if (err) {
                res.send("not updated in mysql");
            }
            res.redirect('/api/tasks')       
        })
    }).catch(()=>{
        console.log("not modified");
    });

    
})
router.get('/tasks/:id/edit',async (req,res)=>{
    const { id } = req.params;
    await Task.findById(id).then((resultat)=>{
        res.render('editTask',{task : resultat})
    }).catch(()=>{
        console.log("not found in mongoose")
        query = "select * from tasks where id = ? ";
        connection2.query(query, [id], (err, results) => {
            if (err) {
                tasks = "not found in mysql"
            }
            res.render('editTask',{task : results})
        })
    });
})
router.delete('/tasks/:id', middadmin ,async (req, res) => {
    const { id } = req.params;
    await Task.findByIdAndDelete(id).then(()=>{
        query = "delete from tasks where id = ? ";
        conn.query(query, [id], (err) => {
            if (err) {
                res.send("not deleted in mysql");
            } 
            res.status(201).redirect('/api/tasks');
            
        })
    }).catch(()=>{
        res.redirect('/api/tasks');
    });
})
module.exports = router;
