var express = require('express');
var router = express.Router();

var axios = require('axios');
var cheerio = require('cheerio');

var fetchAmazPrice = require('../services/fetchAmazPrice');

const title = 'nodejs 爬取网站的url链接';

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', {title: title, content: []});
});

router.post('/', (req, res, next) => {
	var url = req.body.url;
	if (url) {
		axios
		.get(url)
		.then(rst => {
			let $ = cheerio.load(rst.data);
			let $alinks = $('a');
			let urlArr = [];
			$alinks.each((idx, ele) => {
				urlArr.push($(ele).attr('href'))
			});
			console.log(urlArr);
			res.render('index', {
				title: 'Express',
				content: urlArr
			});
		})
		.catch(e => {
			res.render('index', {title: title, content: []});
		});
	} else {
		res.render('index', {title: title, content: []});
	}
});

// 爬取亚马逊商品价格
router.get('/amaz', (req, res, next) => {
	let baseUrl = 'https://www.amazon.co.jp/s/ref=sr_pg_2?keywords=';
	let queryStrs = [
		'iphone+6s',
		'iphone',
		'ipad+pro+9.7',
		'ipod'
	];
	let funArrs = [];
	// 构造queryUrl
	queryStrs.map(keywords => {
		let url = `${baseUrl}${keywords}`;
		funArrs.push(fetchAmazPrice(url));
	});

	Promise
	.all(funArrs)
	.then(spiders => {
		res.render('amaz', {
			title: title,
			data: spiders
		});
	})
	.catch(err => {
		res.send(err);
	});
});

module.exports = router;
