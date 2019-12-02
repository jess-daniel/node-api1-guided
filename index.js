const express = require("express");
const db = require("./data/hubs-model");

const port = 5000;

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
    res.send({ api: "running..." });
})

// list of hubs
server.get("/hubs", (req, res) => {
    db.find()
        .then(hubs => {
            res.status(200).json(hubs);
        })
        .catch(err => {
            res.status(500).json({ message: "server error", err });
    })
})

// add a hub
server.post("/hubs", (req, res) => {
    const hubData = req.body;
    if (hubData) {
        db.add(hubData)
            .then(hub => {
                res.status(201).json(hub);
            })
            .catch(err => {
                res.status(500).json({ message: "error posting new hub", err });
        })
    } else {
        res.status(400).json({ message: "invalid or missing hub" });
    }
})

// remove a hub
server.delete("/hubs/:id", (req, res) => {
    const { id } = req.params;
    db.remove(id)
        .then(removed => {
            if (removed) {
                res.status(200).json({ message: "hub removed successfully", removed });
            } else {
                res.status(404).json({ message: "hub not found" });
            }
        })
        .catch(err => {
            res.status(500).json({ message: "server error", err });
    })
})

// update needs id and req.body

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
