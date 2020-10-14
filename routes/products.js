const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const mailer = require('./mailer');
const botTelegram = require('../api/telegramMsg');
const reCaptcha = require('../config/reCaptcha');
const Product = require('../models/product');

const urlencodedParser = bodyParser.urlencoded({ extended: false });

let mailSended = undefined;


router.get('/:link', async (req, res) => {
  const product = await Product.findOne({ link: req.params.link });
  if (product === null) {
    res.redirect('/')
  }
  res.render('products/show', { 
    product,
    title: product.title,
    og_title: product.title,
    description: product.description,
    og_description: product.description,
    keywords: product.keywords,
		og_url: `https://vectorm8.ru/products/${product.link}`,
    recaptcha: true,
    yandexMetrica: true
  });
});

router.post('/:link', reCaptcha, urlencodedParser, async (req, res) => {
  if (!req.body && req.body === undefined) {
    return res.sendStatus(400)
  }
  const product = await Product.findOne({ link: req.params.link });
  mailSended = req.body;
  let telegramFields = [
    `Узнать стоимость ${product.name}.`,
    `Сообщение от: ${mailSended.name}`,
    `Email: ${mailSended.email}`,
    `Телефон: ${mailSended.phone}`,
    `Комментарий: ${mailSended.message}`
  ];
  const message = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_ADDRESSEE,
    subject: 'new message',
    text: `Узнать стоимость ${product.name}.
      Cообщение от: ${mailSended.name}.
        Email: ${mailSended.email}
      телефон: ${mailSended.phone}
      
        Комментарий: ${mailSended.message}`
  }
  botTelegram.sendMsg(telegramFields);
  mailer(message);
  res.redirect('/products/info');
});


module.exports = router;


//УДАЛИТЬ ВСЁ ЧТО НИЖЕ КАК ДОБАВЛЮ ПРОДУКТЫ В БД
//
//

// const express = require('express');
// const router = express.Router();
// const bodyParser = require('body-parser');
// const mailer = require('./mailer');
// const botTelegram = require('../api/telegramMsg');
// const reCaptcha = require('../config/reCaptcha');

// const urlencodedParser = bodyParser.urlencoded({extended: false});

// let mailSended = undefined;

// router.get('/fuelConsumption', function(req, res) {
// 	res.render('products/fuelConsumption', {
// 	  title: "Система контроля расхода топлива",
// 	  description: "Установка систем контроля расхода топлива. Вологда.  Череповец. Вологодская область. Архангельская область. Ярославская область.",
// 	  keywords: "контроль топлива, ГЛОНАСС , GPS, мониторинг транспорта",
// 	  og_title: "Система контроля расхода топлива",
// 	  og_description: "Установка систем контроля расхода топлива. Вологда.  Череповец. Вологодская область. Архангельская область. Ярославская область.",
// 	  og_url: "https://vectorm8.ru/products/fuelConsumption",
// 	  recaptcha: true,
// 	  yandexMetrica: true
// 	});
// });

// router.post('/fuelConsumption', reCaptcha, urlencodedParser, function (req, res) {
// 	if(!req.body && req.body === undefined) return res.sendStatus(400);
// 	mailSended = req.body;
// 	let telegramFields = [
// 		'Узнать стоимость системы контроля расхода топлива.',
// 	    `Сообщение от: ${mailSended.name}`,
// 	    `Email: ${mailSended.email}`,
// 	    `Телефон: ${mailSended.phone}`,
// 	    `Комментарий: ${mailSended.message}`
// 	];
// 	const message = {
//     from: process.env.EMAIL_USER,
//     to: process.env.EMAIL_ADDRESSEE,
//     subject: 'new message',
// 	text: `Узнать стоимость системы контроля расхода топлива.
// 		Cообщение от: ${mailSended.name}.
//     	Email: ${mailSended.email}
// 		телефон: ${mailSended.phone}
		
//     	Комментарий: ${mailSended.message}`
// 	}
// 	botTelegram.sendMsg(telegramFields);
// 	mailer(message);
// 	res.redirect('/products/info');
// });


// router.get('/gasStationMonitoring', function(req, res) {
// 	res.render('products/gasStationMonitoring', {
// 	  title: "Система мониторинга АЗС",
// 	  description: "Установка системы мониторинга АЗС.  Вологда.  Череповец. Вологодская область. Архангельская область. Ярославская область.",
// 	  keywords: "АЗС, контроль топлива, ГЛОНАСС, GPS",
// 	  og_title: "Система мониторинга АЗС",
// 	  og_description: "Установка системы мониторинга АЗС.  Вологда.  Череповец. Вологодская область. Архангельская область. Ярославская область.",
// 	  og_url: "https://vectorm8.ru/products/gasStationMonitoring",
// 	  recaptcha: true,
// 	  yandexMetrica: true
// 	});
// });

// router.post('/gasStationMonitoring', reCaptcha, urlencodedParser, function (req, res) {
// 	if(!req.body && req.body === undefined) return res.sendStatus(400);
// 	mailSended = req.body;
// 	let telegramFields = [
// 		'Узнать стоимость системы мониторинга АЗС.',
// 	    `Сообщение от: ${mailSended.name}`,
// 	    `Email: ${mailSended.email}`,
// 	    `Телефон: ${mailSended.phone}`,
// 	    `Комментарий: ${mailSended.message}`
// 	];
// 	const message = {
//     from: process.env.EMAIL_USER,
//     to: process.env.EMAIL_ADDRESSEE,
//     subject: 'new message',
// 	text: `Узнать стоимость системы мониторинга АЗС.
// 		Cообщение от: ${mailSended.name}.
//     	Email: ${mailSended.email}
//     	телефон: ${mailSended.phone}

//     	Комментарий: ${mailSended.message}`
// 	}
// 	botTelegram.sendMsg(telegramFields);
// 	mailer(message);
// 	res.redirect('/products/info');
// });


// router.get('/videoControlSystem', function(req, res) {
// 	res.render('products/videoControlSystem', {
// 	  title: "Видеомониторинг транспорта",
// 	  description: "Установка систем видеомониторинга на транспорте. Вологда.  Череповец. Вологодская область. Архангельская область. Ярославская область.",
// 	  keywords: "Видеомониторинг, спутниковый мониторинг.",
// 	  og_title: "Видеомониторинг транспорта",
// 	  og_description: "Установка систем видеомониторинга на транспорте. Вологда.  Череповец. Вологодская область. Архангельская область. Ярославская область.",
// 	  og_url: "https://vectorm8.ru/products/videoControlSystem",
// 	  recaptcha: true,
// 	  yandexMetrica: true
// 	});
// });

// router.post('/videoControlSystem', reCaptcha, urlencodedParser, function (req, res) {
// 	if(!req.body && req.body === undefined) return res.sendStatus(400);
// 	mailSended = req.body;
// 	let telegramFields = [
// 		'Узнать стоимость видеоконтроля транспорта.',
// 	    `Сообщение от: ${mailSended.name}`,
// 	    `Email: ${mailSended.email}`,
// 	    `Телефон: ${mailSended.phone}`,
// 	    `Комментарий: ${mailSended.message}`
// 	];
// 	const message = {
//     from: process.env.EMAIL_USER,
//     to: process.env.EMAIL_ADDRESSEE,
//     subject: 'new message',
// 	text: `Узнать стоимость видеоконтроля транспорта.
// 		Cообщение от: ${mailSended.name}.
//     	Email: ${mailSended.email}
//     	телефон: ${mailSended.phone}

//     	Комментарий: ${mailSended.message}`
// 	}
// 	botTelegram.sendMsg(telegramFields);
// 	mailer(message);
// 	res.redirect('/products/info');
// });


// router.get('/agronavigator', function(req, res) {
// 	res.render('products/agronavigator', {
// 	  title: "Агронавигатор. Система параллельного вождения.",
// 	  description: "Установка агронавигаторов и систем параллельного вождения. Вологда.  Череповец. Вологодская область. Архангельская область. Ярославская область.",
// 	  keywords: "агронавигатор, агроном, сельское хозяйство, параллельное вождение",
// 	  og_title: "Агронавигатор. Система параллельного вождения.",
// 	  og_description: "Установка агронавигаторов и систем параллельного вождения. Вологда.  Череповец. Вологодская область. Архангельская область. Ярославская область.",
// 	  og_url: "https://vectorm8.ru/products/agronavigator",
// 	  recaptcha: true,
// 	  yandexMetrica: true
// 	});
// });

// router.post('/agronavigator', reCaptcha, urlencodedParser, function (req, res) {
// 	if(!req.body && req.body === undefined) return res.sendStatus(400);
// 	mailSended = req.body;
// 	let telegramFields = [
// 		'Узнать стоимость: агронавигатор.',
// 	    `Сообщение от: ${mailSended.name}`,
// 	    `Email: ${mailSended.email}`,
// 	    `Телефон: ${mailSended.phone}`,
// 	    `Комментарий: ${mailSended.message}`
// 	];
// 	const message = {
//     from: process.env.EMAIL_USER,
//     to: process.env.EMAIL_ADDRESSEE,
//     subject: 'new message',
// 	text: `Узнать стоимость: агронавигатор.
// 		Cообщение от: ${mailSended.name}.
//     	Email: ${mailSended.email}
//     	телефон: ${mailSended.phone}

//     	Комментарий: ${mailSended.message}`
// 	}
// 	botTelegram.sendMsg(telegramFields);
// 	mailer(message);
// 	res.redirect('/products/info');
// });


// router.get('/driversControlSystem', function(req, res) {
// 	res.render('products/driversControlSystem', {
// 	  title: "Система интерактивного контроля водителей",
// 	  description: "Установка интерактивного контроля водителей. Вологда.  Череповец. Вологодская область. Архангельская область. Ярославская область.",
// 	  keywords: "контроль водителей, диспетчер автопарка, связь",
// 	  og_title: "Система интерактивного контроля водителей",
// 	  og_description: "Установка интерактивного контроля водителей. Вологда.  Череповец. Вологодская область. Архангельская область. Ярославская область.",
// 	  og_url: "https://vectorm8.ru/products/driversControlSystem",
// 	  recaptcha: true,
// 	  yandexMetrica: true
// 	});
// });

// router.post('/driversControlSystem', reCaptcha, urlencodedParser, function (req, res) {
// 	if(!req.body && req.body === undefined) return res.sendStatus(400);
// 	mailSended = req.body;
// 	let telegramFields = [
// 		'Узнать стоимость системы интерактивного контроля водителей.',
// 	    `Сообщение от: ${mailSended.name}`,
// 	    `Email: ${mailSended.email}`,
// 	    `Телефон: ${mailSended.phone}`,
// 	    `Комментарий: ${mailSended.message}`
// 	];
// 	const message = {
//     from: process.env.EMAIL_USER,
//     to: process.env.EMAIL_ADDRESSEE,
//     subject: 'new message',
// 	text: `Узнать стоимость системы интерактивного контроля водителей.
// 		Cообщение от: ${mailSended.name}.
//     	Email: ${mailSended.email}
//     	телефон: ${mailSended.phone}

//     	Комментарий: ${mailSended.message}`
// 	}
// 	botTelegram.sendMsg(telegramFields);
// 	mailer(message);
// 	res.redirect('/products/info');
// });


// router.get('/lighthouse', function(req, res) {
// 	res.render('products/lighthouse', {
// 	  title: "Проблесковый маячок",
// 	  description: "Установка проблесковых маяков. Вологда.  Череповец. Вологодская область. Архангельская область. Ярославская область.",
// 	  keywords: "проблесковый маяк",
// 	  og_title: "Проблесковый маячок",
// 	  og_description: "Установка проблесковых маяков. Вологда.  Череповец. Вологодская область. Архангельская область. Ярославская область.",
// 	  og_url: "https://vectorm8.ru/products/lighthouse",
// 	  recaptcha: true,
// 	  yandexMetrica: true
// 	});
// });

// router.post('/lighthouse', reCaptcha, urlencodedParser, function (req, res) {
// 	if(!req.body && req.body === undefined) return res.sendStatus(400);
// 	mailSended = req.body;
// 	let telegramFields = [
// 		'Узнать стоимость проблескового маячка.',
// 	    `Сообщение от: ${mailSended.name}`,
// 	    `Email: ${mailSended.email}`,
// 	    `Телефон: ${mailSended.phone}`,
// 	    `Комментарий: ${mailSended.message}`
// 	];
// 	const message = {
//     from: process.env.EMAIL_USER,
//     to: process.env.EMAIL_ADDRESSEE,
//     subject: 'new message',
// 	text: `Узнать стоимость проблескового маячка.
// 		Cообщение от: ${mailSended.name}.
//     	Email: ${mailSended.email}
//     	телефон: ${mailSended.phone}

//     	Комментарий: ${mailSended.message}`
// 	}
// 	botTelegram.sendMsg(telegramFields);
// 	mailer(message);
// 	res.redirect('/products/info');
// });


// router.get('/era-glonass', function(req, res) {
// 	res.render('products/eraGlonass', {
// 		title: "ЭРА-ГЛОНАСС",
// 		description: "Постановление №153. Установка терминалов Omnicomm АСН. Вологда.  Череповец. Вологодская область. Архангельская область. Ярославская область.",
// 		keywords: "ЭРА-ГЛОНАСС",
// 		og_title: "ЭРА-ГЛОНАСС",
// 		og_description: "Постановление №153. Установка терминалов Omnicomm АСН. Вологда.  Череповец. Вологодская область. Архангельская область. Ярославская область.",
// 		og_url: "https://vectorm8.ru/products/era-glonass",
// 		recaptcha: true,
// 		yandexMetrica: true
// 	});
// });

// router.post('/era-glonass', reCaptcha, urlencodedParser, function (req, res) {
// 	if(!req.body && req.body === undefined) return res.sendStatus(400);
// 	mailSended = req.body;
// 	let telegramFields = [
// 		'Узнать стоимость ЭРА-ГЛОНАСС.',
// 	    `Сообщение от: ${mailSended.name}`,
// 	    `Email: ${mailSended.email}`,
// 	    `Телефон: ${mailSended.phone}`,
// 	    `Комментарий: ${mailSended.message}`
// 	];
// 	const message = {
//     from: process.env.EMAIL_USER,
//     to: process.env.EMAIL_ADDRESSEE,
//     subject: 'new message',
// 	text: `Узнать стоимость ЭРА-ГЛОНАСС.
// 		Cообщение от: ${mailSended.name}.
//     	Email: ${mailSended.email}
//     	телефон: ${mailSended.phone}

//     	Комментарий: ${mailSended.message}`
// 	}
// 	botTelegram.sendMsg(telegramFields);
// 	mailer(message);
// 	res.redirect('/products/info');
// });


// router.get('/tire_pressure_control', function(req, res) {
// 	res.render('products/tirePressureControl', {
// 		title: "Контроль давления в шинах",
// 		description: "Установка систем контроля давления в шинах. Вологда.  Череповец. Вологодская область. Архангельская область. Ярославская область. Костромская область.",
// 		keywords: "ЭРА-ГЛОНАСС",
// 		og_title: "Контроль давления в шинах",
// 		og_description: "Установка систем контроля давления в шинах. Вологда.  Череповец. Вологодская область. Архангельская область. Ярославская область. Костромская область.",
// 		og_url: "https://vectorm8.ru/products/tire_pressure_control",
// 		recaptcha: true,
// 		yandexMetrica: true
// 	});
// });

// router.post('/tire_pressure_control', reCaptcha, urlencodedParser, function (req, res) {
// 	if(!req.body && req.body === undefined) return res.sendStatus(400);

// 	mailSended = req.body;

// 	let telegramFields = [
// 		'Узнать стоимость системы контроля давления в шинах.',
// 	    `Сообщение от: ${mailSended.name}`,
// 	    `Email: ${mailSended.email}`,
// 	    `Телефон: ${mailSended.phone}`,
// 	    `Комментарий: ${mailSended.message}`
// 	];

// 	const message = {
//     	from: process.env.EMAIL_USER,
//     	to: process.env.EMAIL_ADDRESSEE,
//     	subject: 'new message',
// 		text: `Узнать стоимость системы контроля давления в шинах.
// 			Cообщение от: ${mailSended.name}.
//     		Email: ${mailSended.email}
//     		телефон: ${mailSended.phone}
		
//     		Комментарий: ${mailSended.message}`
// 	}

// 	botTelegram.sendMsg(telegramFields);
// 	mailer(message);
// 	res.redirect('/products/info');
// });


// router.get('/info', (req, res) => {
// 	res.render('emailsended', {
// 		email: mailSended.email,
// 		yandexMetrica: true
// 	})
// });

// module.exports = router;