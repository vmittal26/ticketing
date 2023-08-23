import express from 'express';

const router = express.Router();

router.get('/api/users/current-user', async (req, res) => {
  res.send({ currentUser: req.currentUser });
});

export { router as currentUserRouter };
