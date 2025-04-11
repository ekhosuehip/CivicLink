import { Router } from 'express';
import { protect } from '../middlewares/authMiddleware';
import { accessChat, fetchChat, createGroup, renameGroup, addToGroup, removeFromGroup } from '../controllers/chatController';

const router = Router()
// protect all routes
router.use(protect)

router.post('/', accessChat )
router.get('/', fetchChat)
router.post('/group', createGroup)
router.put('/rename', renameGroup)
router.put('/add', addToGroup)
router.put('/remove', removeFromGroup)

export default router