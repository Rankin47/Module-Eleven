const express = require ("express");
const fs = require ("fs");
const path = require ("path");
const util = require ("util");

const writeFileAsync = util.promisify(fs.writeFile);
const readFileAsync = util.promisify(fs.readFile);

const app = express ();
const PORT = process.env.PORT || 8000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static("./db/db.json"))

app.get("/api/notes",function(req,res){
    readFileAsync("./develop/db.json", "utf8").then(function(data) {
        notes = [].concat(JSON.parse(data))
        res.json(notes);
    })
});

app.post("/api/notes", function(req, res){
    const note = req.body;
    readFileAsync("./db.json", "utf8").then (function(data){
        const notes = [].concat(JSON.parse(data));
        note.id = notes .lengh +1 
        notes.push (note);
        return notes
    }).then(function(notes){
        writeFileAsync("./db/db.json", JSON.stringify(notes))
        res.json (note);
    })
});

app.delete("/api/notes/:id", function(req,res){
    const idToDelete = parseInt(req.params.id);
    readFileAsync("./dp/db.json", "utf-8").then(function(data){
        const notes = [].concat(JSON.parse(data));
        const newNotesData = []
        for (let i = 0; i <notes.length; i++){
            if (idToDelete !== notes[i].id){
                newNotesData.push(notes[i])
                }
            }
            return newNotesData
        }).then(function(notes) {
            writeFileAsync("./db/db.json", JSON.stringify(notes))
            res.send('SAVED');
        
        })
        })
 
        app.get("/notes", function(req,res){
            res.sendFile(path.join(__dirname, "./develop/notes.html"));
        });
        app.get("/", function(req,res){
            res.sendFile(path.join(__dirname, "./develop/index.html"));
        });
        app.get("*", function(req,res){
            res.sendFile(path.join(__dirname, "./develop/index.html"));
        });

        app.listen(PORT,function(){
            console.log("listening to " + PORT);
        });


