const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const stripe = require('stripe')('pk_test_vzItG7f0Smx4FpOd7N03Xoaw');

const app =express();

//handlebar
app.engine('handlebars',exphbs({defaultlayout:'main'}));
app.set('view engine','handlebars');

//body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//static folder
app.use(express.static(`${__dirname}/public`));

//index router
app.get('/',(req,res)=>{
	res.render('index');
});

app.post('/charge',(req,res)=>{
	const amount= 2500;

	stripe.customers.create({
		email:req.body.stripeEmail,
		source: req.body.stripeToken
	})
	.then(customer => stripe.charges.create({
		amount,
		description:"Ceramcis buys",
		currency:"usd",
		customer:customer.id
	}))

});

const port = process.env.PORT || 4000;

app.listen(port, ()=>{
	console.log('Server Started');
});