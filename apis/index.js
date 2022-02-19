const express = require("express");
const Answer = require("./config");
const bodyParser = require('body-parser');
var ed = require('edit-distance');
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded())
app.set('view engine', 'ejs');
const db = require("./config");

app.post("/createpost", async(req, res) => {
    const data = req.body;
    // console.log(data);
    try{
        await Answer.add(data);
    }
    catch (err){
        console.log(err);
    }
    res.redirect("/");
});

app.get("/create", async(req, res)=>{
    // console.log("hi");
    res.render("../insertrec");
})

app.get("/update", async(req, res)=>{
    res.render("../updaterec");
})

app.get("/", async(req, res)=>{
    try{
        const snapshot = await Answer.get();
        const list = snapshot.docs.map((doc)=>({id: doc.id, ...doc.data()}))
        var right = [];
        var wrong = [];

        var insert, remove, update;
        insert = remove = function(node) { return 1; };
        update = function(stringA, stringB) { return stringA !== stringB ? 2 : 0; };

        for (let i = 0; i < list.length; i++){
            if (ed.levenshtein(list[i]["answer"].toLowerCase(), "black", insert, remove, update).distance <= 2){
                right.push(list[i]);
            }
            else{
                wrong.push(list[i]);
            }
        }
        res.render("../readjson", {right:right, wrong:wrong});
    }
    catch (err){
        console.log(err);
    }
})

app.post("/updatepost", async(req, res) => {
    var ans = db.where("email", "==", req.body.email).limit(1);
    const ss = await ans.get();
    const record = ss.docs.map((doc)=>({id: doc.id, ...doc.data()}))[0];
    const id = record.id;
    console.log(record)
    console.log(req.body)
    try{
        
        await Answer.doc(id).update(req.body);
    }
    catch (err){
        console.log(err);
    }
    res.redirect("/");
});

app.post("/delete", async(req, res) => {
    const id = req.body.id;
    try{
        await Answer.doc(id).delete();
    }
    catch (err){
        console.log(err);
    }
    res.send({msg: "Answer deleted"});
});

app.listen(4000, ()=>console.log("up and running on port 4000"));