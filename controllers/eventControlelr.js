// import Event from "../schema/eventSchema.js";
import { User } from "../models/userModel.js";
import {Event} from "../models/eventModel.js";

export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Error fetching events", error });
  }
};

export const addEventToUser = async (req, res) => {
  const { username, name, description, date, liveStreamUrl } = req.body;

  try {
    const user = await User.find({username:username});

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newEvent = {
      
      name,
      description,
      date,
      liveStreamUrl,
      notificationSent: false,
    };

    // user.events.push(newEvent);

    // await user.save();

    res
      .status(200)
      .json({
        message: "Event added and notification created",
        event: newEvent,
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyEvent =async(req,res)=>{
  try{
  const myevent = await Event.find({ username: req.params.username }).select(
    "event"
  ); 
  if (!myevent || myevent.length === 0) {
    return res.status(404).json({ message: "No events found for this user" });
  }
  res.status(200).json(myevent);
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }

}