import express from 'express';
import supplier from '../controllers/supplier.js';

const router = express.Router();


router.post('/registerSupplier', supplier.registerSupplier)
router.get('/listSupplier', supplier.listSupplier)
router.get("/findSupplier/:_id", supplier.findSupplier);
router.put("/updateSupplier", supplier.updateSupplier)
router.delete("/deleteSupplier/:_id", supplier.deleteSupplier)

export default router;