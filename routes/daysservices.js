// daysservices
import express from 'express'
import dayServiceMiddlware from '../middlewares/daysservice'

const router = express.Router()

router.use(dayServiceMiddlware);

router.get('/', async (req, res, next) => {
	let { CardNo, ValiString } = req.query;
	let rst = '';
	// 查询
	if (CardNo && ValiString) {
		try {
			rst = await req.fetchDaysService(CardNo, ValiString);
		} catch (err) {
			rst = err;
		}
	}
	res.render('daysservices', {title: 'daysservices', rst});
});

module.exports = router