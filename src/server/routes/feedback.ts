import pool from '../db';

const feedbackFormHandler = async (req, res) => {
  const payload = req.body;

  try {
    await pool.query(
      `
      insert into public.feedback (payload) values ($1)
      `,
      [JSON.stringify(payload)]
    );
  } catch (e) {
    console.log(e);
    return res.status(500).send();
  }
  res.send();
};

export default feedbackFormHandler;
