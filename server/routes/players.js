var express = require('express');
var router = express.Router();
const fs = require('fs');

const paths = {
    "available": "./data/available.json",
    "myTeam": "./data/my-team.json",
    "allOthers": "./data/all-others.json"
}

/* GET home page. */
router.get('/', function(req, res, next) {
    fs.readFile(paths["available"], 'utf8', (err, jsonString) => {
        if (err) {
            console.log("File read failed:", err)
            return
        }
        const allPlayers = JSON.parse(jsonString)
        res.json(allPlayers);
    })
});

router.get('/draft/myTeam', (req, res, next) => {
    
    fs.readFile(paths["myTeam"], 'utf8', (err, jsonString) => {
        if (err) {
            console.log("File read failed:", err)
            return
        }
        const allPlayers = JSON.parse(jsonString)
        res.json(allPlayers);
    })
});

router.post('/draft/myTeam', (req, res, next) => {
    // console.log(req.body);
    const draftedPlayer = {
        Rank: req.body.Rank,
        Name: req.body.Name,
        Team: req.body.Team,
        Bye: req.body.Bye,
        Pos: req.body.Pos
    }

    console.log(draftedPlayer);
    // Update and Remove Player From Available
    fs.readFile(paths["available"], 'utf8', (err, data) => {
        if (err) throw err;

        const allPlayers = JSON.parse(data)
        const updatedAvilablePlayers = allPlayers.filter( player => player.Rank != draftedPlayer.Rank);

        const updatedAvilablePlayersAsString = JSON.stringify(updatedAvilablePlayers);
        //Do your processing, MD5, send a satellite to the moon, etc.
        fs.writeFile(paths["available"], updatedAvilablePlayersAsString, function(err) {
            if (err) throw err;
            console.log('complete');
        });
    });

    // Update My Team
    fs.readFile(paths["myTeam"], 'utf8', (err, data) => {
        if (err) throw err;
        const myPlayers = JSON.parse(data)
        myPlayers.push(draftedPlayer)
        const myPlayersAsString = JSON.stringify(myPlayers)
        //Do your processing, MD5, send a satellite to the moon, etc.
        fs.writeFile(paths["myTeam"], myPlayersAsString, function(err) {
            if (err) throw err;
            console.log("Write complete!");
            res.json({
                "status": 200,
                "msg": "Success",
                "playerAdded": draftedPlayer.Name
            }).status(200);
        });
    });


})

router.post('/draft/others', (req, res, next) => {

    const draftedPlayer = {
        Rank: req.body.Rank,
        Name: req.body.Name,
        Team: req.body.Team,
        Bye: req.body.Bye,
        Pos: req.body.Pos
    }

    console.log(draftedPlayer);

    // Update and Remove Player From Available
    fs.readFile(paths["available"], 'utf8', (err, data) => {
        if (err) throw err;

        const allPlayers = JSON.parse(data)
        const updatedAvilablePlayers = allPlayers.filter( player => player.Rank != draftedPlayer.Rank);

        const updatedAvilablePlayersAsString = JSON.stringify(updatedAvilablePlayers);
        //Do your processing, MD5, send a satellite to the moon, etc.
        fs.writeFile(paths["available"], updatedAvilablePlayersAsString, function(err) {
            if (err) throw err;
            console.log('complete');
        });
    });

    // Update My Team
    // Update My Team
    fs.readFile(paths["allOthers"], 'utf8', (err, data) => {
        if (err) throw err;
        const myPlayers = JSON.parse(data)
        myPlayers.push(draftedPlayer)
        const myPlayersAsString = JSON.stringify(myPlayers)
        //Do your processing, MD5, send a satellite to the moon, etc.
        fs.writeFile(paths["allOthers"], myPlayersAsString, function(err) {
            if (err) throw err;
            console.log("Write complete!");
            res.json({
                "status": 200,
                "msg": "Success",
                "playerAdded": draftedPlayer.Name
            }).status(200);
        });
    });
})

module.exports = router;
