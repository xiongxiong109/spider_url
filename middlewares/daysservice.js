// 得仕卡middleware
import axios from 'axios'
import cheerio from 'cheerio'

export default (req, res, next) => {
	req.fetchDaysService = async(
		CardNo = '',
		ValiString = '',
		path = 'http://www.daysservices.com/Site/Card/Balance'
	) => new Promise((resolve, reject) => {
		axios({
			method: 'post',
			timeout: 8000,
			url: `${path}?CardNo=${CardNo}&ValiString=${ValiString}`
		})
		.then(rst => {
			const $ = cheerio.load(rst.data);
			let $card = $('#cardbalance');
			let price = 0;
			if ($card.length) {
				console.log(rst.data);
				// price = $card.innerHTML();
			}
			console.log(price);
			resolve(price)
		})
		.catch(err => {
			reject(err)
			console.log(err)
		})
	})
	next();
}