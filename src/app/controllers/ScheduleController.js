import { startOfDay, endOfDay, parseISO } from 'date-fns';
import { Op } from 'sequelize';

import Appointment from '../models/Appointment';
import User from '../models/User';

class ScheculeController {
  async index(req, res) {
    const checkUserProvider = await User.findOne({
      where: {
        id: req.userId,
        provider: true,
      },
    });

    if (!checkUserProvider)
      res.status(401).json({ error: 'User is not a Provider.' });

    const { date } = req.query;
    const pasrsedDate = parseISO(date);

    const Appointments = await Appointment.findAll({
      where: {
        provider_id: req.userId,
        canceled_at: null,
        date: {
          [Op.between]: [startOfDay(pasrsedDate), endOfDay(pasrsedDate)],
        },
      },
      order: ['date'],
    });

    return res.json(Appointments);
  }
}

export default new ScheculeController();
