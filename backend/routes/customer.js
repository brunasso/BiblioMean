import express from 'express';
import customer from '../controllers/customer.js';

const router = express.Router();


router.post('/registerCustomer', customer.registerCustomer);
router.get('/listCustomer', customer.listCustomer);


export default router;