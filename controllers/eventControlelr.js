import Event from '../models/eventModel.js';
export const getEvents = async (req, res) => {
  try {
    const events = await Event.find({ date: { $gte: new Date() } });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch events', error });
  }
};

export const createEvent = async (req, res) => {
  const { name, description, date, liveStreamUrl } = req.body;
  try {
    const event = new Event({ name, description, date, liveStreamUrl });
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create event', error });
  }
};
