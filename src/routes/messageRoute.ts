import { Router } from 'express';
import { protect } from '../middlewares/authMiddleware';
import { sendMessage, allMessages } from '../controllers/messageController';

const router = Router()
// protect all routes
router.use(protect)

router.post('/', sendMessage)
router.get('/:chatId', allMessages)

export default router