const Schedule = require('../models/Schedule');

exports.getByTown = async (req, res) => {
  try {
    const { town } = req.query;
    if (!town) return res.status(400).send('Town name is required');

    const outages = await Schedule.getByTown(town);
    res.json(outages);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};
