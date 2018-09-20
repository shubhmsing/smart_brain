const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const db = knex({
	client: 'pg',
	connection: {
		host: '127.0.0.1',
		user: 'postgres',
		password: 'admin',
		database: 'smart_brain'
	}
});

const app = express();
app.use(bodyParser.json());
app.use(cors());


const match_pwd = (pwd, user) => {
	return bcrypt.compareSync(pwd, user.hash);
}


app.get('/', (req, res)=>{
	res.send("Welcome to smart brain app");
})

app.post('/signin', (req, res)=>{
	db('login').select('hash', 'email').where('email', '=', req.body.email)
	.then(data => {
		if(data.length){
			if(match_pwd(req.body.password, data[0])) {
				db('users').select('*').where('email', '=', data[0].email)
				.then(user => res.json({"status": "LogedIn Successfully", user: user[0]}));
		 	} else {
		 		res.status(400).json({"status": "Incorrect password"})
		 	}
	 	} else {
	 		res.status(404).json({"status": "User doesn't exits"});
	 	}
	});
})

app.post('/register', (req, res)=>{
	const {email, name, password} = req.body;
	const hash = bcrypt.hashSync(password);
	db.transaction(trx => {
		trx.insert({
			hash: hash,
			email: email
		})
		.into('login')
		.returning('email')
		.then(login_email => {
			db('users')
			.returning('*')
			.insert({
				email: login_email[0],
				name: name,
				joined: new Date()
			})
			.then(user => {
				res.json(user[0]);
			})
			.catch(err => res.status(400).json('failed to register'));
		})
		.then(trx.commit)
		.catch(trx.rollback);
	})
	.then(resp => {
  		console.log('Transaction complete.');
	})
	.catch(err => {
  		console.error(err);
  		res.status(400).json('failed to register');
	});
});


app.get('/profile/:id', (req, res) => {
	const {id} = req.params;
	db.select('*').from('users').where({id})
	.then(user => {
		user.length ? res.json(user[0]) : res.status(404).send("user not found");
	})
	.catch(err => res.status(400).send(err))
});

app.put('/image', (req, res)=>{
	const {id} = req.body;
	db('users')
	.where('id', '=', id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries => {
		console.log(entries);
		entries.length ? res.json(entries[0]) : res.status(400).json('user not found');
	})
	.catch(err => res.status(400).json("unable to get entries"));
})

app.get('*', (req, res)=>{
	res.status(400).send("404, Oops We didn't get what you are looking for.");
})

app.listen(3000, ()=>console.log("Server is running on 3000 port"));