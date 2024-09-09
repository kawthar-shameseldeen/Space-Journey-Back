import Event from '../models/eventModel.js';
import User from '../models/userModel.js';
export const getEvents = async (req, res) => {
  try {
    const events = await Event.find({ date: { $gte: new Date() } });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch events', error });
  }
};




export const addEventToUser = async (req, res) => {
  const { userId, name, description, date, liveStreamUrl } = req.body;

};
