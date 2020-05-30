const Clarifai = require('clarifai');

//You must add your own API key here from Clarifai.
const app = new Clarifai.App({
 apiKey: 'a4b1116bfce343d29fa7b0b37b280978'
});

const handleApiCall = (req, res) => {
 app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
 .then(data => {
 	res.json(data);
 })
 	.catch(err => res.satus(400).json('algo deu errado com a API'))
}

const handleImage = (req, res, db) => {
	const { id } = req.body;
	db('users').where('id', '=', id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries => {
		res.json(entries[0]);
	})
		.catch (err => res.status(400).json
			('nao foi possivel'))
}

module.exports = {
	handleImage,
	handleApiCall
}

