import { Router } from 'express';
import { addInstitution, schools, industryPartners, postSecondary } from "./database_utility.js";

const router = Router();

router.get('/schools', (req, res) => {
    res.json(schools);
});
router.get( '/industry', (req, res) => {
    res.json(industryPartners);
    console.log(industryPartners);
});
router.get('/postsec', (req, res) => {
    res.json(postSecondary);
});

router.get('/schools/:id', (req, res) => {})
router.get('/industry/:id', (req, res) => {})
router.get('/postsec/:id', (req, res) => {})

router.post('/schools', (req, res) => {
    const body = req.body;
    addInstitution(body.institutionName, ["School"], body.institutionType, body.institutionAddress, 44, ["Program 1"], null,{
        lat: parseFloat(body.institutionLat),
        lng: parseFloat(body.institutionLong)
    }).then(r =>{
        console.log(r); res.redirect('/admin');
    }).catch(e => {
        console.log(e); res.redirect('/admin');
    });
})
router.post('/industry', (req, res) => {
    const body = req.body;
    addInstitution(body.institutionName, ["Industry Partner"], body.institutionType, body.institutionAddress, null, ["Program 1"], body.institutionContact, {
        lat: parseFloat(body.institutionLat),
        lng: parseFloat(body.institutionLong)
    }).then(r =>{
        console.log(r); res.redirect('/admin');
    }).catch(e => {
        console.log(e); res.redirect('/admin');
    });
})
router.post('/postsec', (req, res) => {
    const body = req.body;
    addInstitution(body.institutionName, ["Post Secondary"], body.institutionType, body.institutionAddress, null, ["Program 1"], body.institutionContact, {
        lat: parseFloat(body.institutionLat),
        lng: parseFloat(body.institutionLong)
    }).then(r =>{
        console.log(r); res.redirect('/admin');
    }).catch(e => {
        console.log(e); res.redirect('/admin');
    });
})

router.put('/schools:id', (req, res) => {})
router.put('/industry:id', (req, res) => {})
router.put('/postsec:id', (req, res) => {})

router.delete('/schools:id', (req, res) => {})
router.delete('/industry:id', (req, res) => {})
router.delete('/postsec:id', (req, res) => {})

export default router;