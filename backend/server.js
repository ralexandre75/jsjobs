const express = require('express');
const app = express();
const bodyParser = require('body-parser');
let data = require('./jobs');
let initialJobs = data.jobs;
let addedJobs = [];
users = [
            {id: 1, email: 'sm@test.fr', nickname: 'Tutu', password: 'aze', role: 'admin'},
            {id: 2, email: 'sm2@test.fr', nickname: 'Tutu2', password: 'qsd', role: 'user'}
        ];

//const fakeUser = {id: 1, email: 'sm@test.fr', nickname: 'Tutu', password: 'aze'};
const jwt = require('jsonwebtoken');
const secret = 'qsdjS12ozehdoIJ123DJOZJLDSCqsdeffdg123ER56SDFZedhWXojqshduzaohduihqsDAqsdq';



const getAllJobs = () => {
    return [...addedJobs, ...initialJobs];
}
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'content-type');
    next();
});


const api = express.Router();
const auth = express.Router();

auth.post('/login', (req, res) => {
    if (req.body){
        const email = req.body.email.toLocaleLowerCase();
        const password = req.body.password.toLocaleLowerCase();
        const index = users.findIndex(user => user.email === email);

        //if(email === fakeUser.email && password === fakeUser.password)         
        if(index > -1 && users[index].password === password){
            let user = users[index];
            let token = '';
            if (user.email === 'sm@test.fr'){
                token = jwt.sign({ iss: 'http://localhost:4201', role: 'admin', email: req.body.email}, secret);
            } else {
                token = jwt.sign({ iss: 'http://localhost:4201', role: 'user', email: req.body.email}, secret);
            }
            
            // res.json({ success: true, data: req.body});
            
            res.json({success: true, token: token});
            
        } else {
            res.status(401).json({ success: false, message: 'identifiants incorrects'});
        }
    } else {
        res.status(500).json({ success: false, message: 'données manquantes'});
    }
});

auth.post('/register', (req, res) => {
    console.log('req.body', req.body);
    if (req.body){
        const email = req.body.email.toLocaleLowerCase().trim();
        const password = req.body.password.toLocaleLowerCase().trim();
        const nickname = req.body.nickname.trim();
        users = [{id: Date.now(), email: email, password: password}, ...users];
        res.json({ success: true, users: users});
    } else {
        res.json({ success: false, message: 'la création a échoué'});
    }
});

api.get('/jobs', (req, res) => {
    // res.json({ success: true, message: 'hello world'});
    // res.json(data.jobs);
    res.json(getAllJobs());
});

const checkUserToken = (req,res, next) => {
    // Authorization: Bearer azeeaaeazeeaazzeaz123azezaeezeaeze
    if(!req.header('authorization')) {
        return res.status(401).json({ success: false, message: "Header d'authentification manquant"});
    }

    const authorizationParts = req.header('authorization').split();
    let token = authorizationParts[1];
    const decodedToken = jwt.verify(token, secret);
    console.log('decodedToken', decodedToken);
    next();
};


api.post('/jobs', checkUserToken, (req, res) => {
    console.log('****************************')
    const job = req.body;
    addedJobs = [job, ...addedJobs]
    console.log("total nb of job :", getAllJobs().length);
    res.json(job);
});

api.get('/search/:term/:place?', (req, res) => {
    const term = req.params.term.toLowerCase().trim();
    let place = req.params.place;
    let jobs = getAllJobs().filter(j => (j.description.toLowerCase().includes(term) || j.title.toLowerCase().includes(term)));
    if (place) {
        place = place.toLowerCase().trim();
        jobs = jobs.filter(j => (j.city.toLowerCase().includes(place)));
    }
    res.json({ success: true, jobs });
});

api.get('/jobs/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const job = getAllJobs().filter(j => j.id === id);
    if (job.length === 1) {
        res.json({ success: true, job: job[0] });
    } else {
        res.json({ success: false, message: `pas de job ayant pour id ${id}` });
    }
})


app.use('/api', api);
app.use('/auth', auth);

const port = 4201;
app.listen(port, () => {
    console.log(`listening on port ${port}`)
});