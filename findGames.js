const TeemoJS = require('teemojs');
const fs = require('fs');
let api = TeemoJS('RGAPI-d8deeb03-317d-441b-b6df-9346c79cca9a');
const gamelist = require('./gamelist.json')
const matches = gamelist
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://mocko:mocko123@database1.opo7e.mongodb.net/databas?retryWrites=true&w=majority";


function matchlist(match) {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("databas");
        for (let i = 0; i < 10; i++) {
            api.get('eun1', 'match.getMatchlist', match.participantIdentities[i].player.accountId, {
                champion: 107,
                queue: 420,
                season: 11
            })
                .then(data => {
                    if (data != null) {
                        for (let k = 0; k < Object.keys(data.matches).length; k++) {
                            dbo.collection("databas").insertOne({gameId:(JSON.stringify(data.matches[k].gameId) + ", ")}, function (err, res) {
                                if (err) throw err;
                            });
                        }
                    }
                });
        }
    })
}


async function findrengargames() {
    for (let m = 0; m < Object.keys(matches).length; m++) {
        console.log(matches[m])
        const match = await api.get('eun1', 'match.getMatch', matches[m])
        await matchlist(match)
    }
}


findrengargames()

