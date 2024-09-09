
import  Event from "../schema/eventSchema.js";
import  {User} from "../models/userModel.js"
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

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newEvent = {
      name,
      description,
      date,
      liveStreamUrl,
      NotificationSent: false,
    };

    user.events.push(newEvent);
    await user.save();

    res.status(200).json({ message: 'Event added successfully', event: newEvent });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
