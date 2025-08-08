import { Router } from 'express';
import { schools, industryPartners, postSecondary } from "./database_utility.js";

const router = Router();

router.get('/schools', (req, res) => {
    res.json(schools);
});
router.get( '/industry', (req, res) => {
    res.json(industryPartners);
});
router.get('/postsec', (req, res) => {
    res.json(postSecondary);
});

router.get('/schools/:id', (req, res) => {})
router.get('/industry/:id', (req, res) => {})
router.get('/postsec/:id', (req, res) => {})

router.post('/schools', (req, res) => {})
router.post('/industry', (req, res) => {})
router.post('/postsec', (req, res) => {})

router.put('/schools:id', (req, res) => {})
router.put('/industry:id', (req, res) => {})
router.put('/postsec:id', (req, res) => {})

router.delete('/schools:id', (req, res) => {})
router.delete('/industry:id', (req, res) => {})
router.delete('/postsec:id', (req, res) => {})

export default router;