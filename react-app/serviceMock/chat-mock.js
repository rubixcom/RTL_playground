const express = require('express')
const txtgen = require('txtgen')
const cors = require('cors')
const app = express()
const randomCat = require('random-cat');
const random = require('random-name')
const port = 3001

app.use(cors());
app.get('/messages', (req, res) => {
	const message = {
		picURL: randomCat.get({
			width: 400,
			height: 200
		}),
		fromUser: random.first(),
		timestamp: new Date().getTime(),
		text: txtgen.sentence()
	};
	if (Math.random() < 0.6)
		res.send(JSON.stringify([message]));
	else
		res.send(JSON.stringify([]));

});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
