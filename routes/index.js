var express = require('express');
var router = express.Router();

var axios = require('axios');
var cheerio = require('cheerio');

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

module.exports = router;
