var axios = require('axios');
var cheerio = require('cheerio');

// 过滤获取dom中的值
const filterDoms = ($doms) => {
		let arr = [];
		$doms.map((idx, item) => {
			arr.push(item.attribs['data-asin']);
		})
		return arr;
}

// 爬取价格
const fetchAmazPrice = (queryUrl) => {
	let fetchPro = new Promise((resolve, reject)=> {

		axios
		.get(queryUrl)
		.then(rst => {
			// 获取jquery
			let $ = cheerio.load(rst.data);
			let $asinDoms = $('[data-asin]');
			resolve({
				query: queryUrl,
				list: filterDoms($asinDoms)
			});
		})
		.catch(err => {
			reject(err);
		})

	});

	return fetchPro;
}

module.exports = fetchAmazPrice;