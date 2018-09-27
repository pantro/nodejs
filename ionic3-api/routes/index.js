var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express App Updated!!!' });
});

router.get('/hola-mundo', function(req, res, next) {
   res.json([{msg: 'Hola Mundo'}]);
});

router.get('/change-layout', function(req, res, next) {
   res.render('change-layout', {
       title: 'ChangeLayout',
       page: 'Variable Page',
       layout: 'handlebars-layout'
   })
});

router.get('/handlebars', (req, res, next) => {
    res.render('handlebars', {
        users: [
            {id: 1, name: 'iparra'},
            {id: 2, name: 'juan'}
        ],
        owner: {
            firstName: 'Israel',
            lastName: 'Parra'
        },
        appName: 'Unodepiera',
        layout: 'handlebars-layout'
    })
})

module.exports = router;
