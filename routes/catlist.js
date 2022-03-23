const express = require('express');
const db = require('./../modules/db_connect');

const router = express.Router();

router.get('/', async (req, res)=>{
    const [rs] = await db.query(`SELECT * FROM catlist`);
    res.render('ab-list', {rs});
});

module.exports = router;

