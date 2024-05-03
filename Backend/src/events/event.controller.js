import event from "./event.model.js";

export const eventPost = async (req, res) => {
    const {
        eventName,
        eventNumber,
        hotel,
        availability,
        type,
        capacity,
        description,
        datesAvailable
    } = req.body;

    try{
        const events = new event({
            eventName,
            eventNumber,
            hotel,
            availability,
            type,
            capacity,
            description,
            datesAvailable
        })
    
        await events.save();
        res.status(200).json({
            msg: 'Event successfully added ', 
            events
        });
        
    }catch(error) {
        console.error('ERROR when adding the event'. error)
        res.status(400).json({error: error.message})
    };
}

export const getEvents = async (req, res) => {
    try {
      const events = await Events.find();
      res.status(200).json(events);
    } catch (error) {
      console.error("ERROR: when obtaining events ", error);
      res.status(500).json({ error: "ERROR: internal server" });
    }
  };
  
  export const updateEvent = async (req, res) => {
    const { id } = req.params;
    const {
      _id,
      eventName,
      ...resto
    } = req.body;
  
    try {
       
      const event = await Events.findById(id);
  
      if (!event) {
        return res.status(404).json({ msg: "Event not found" });
      }
  
      await Events.findByIdAndUpdate(id, resto);
      const Events = await event.findOne({ _id: id });

      res.status(200).json({ msg: "Event successfully updated", event });

    } catch (error) {
      console.error("ERROR updating the Event: ", error);
      res.status(400).json({ error: error.message });
    }
  };
  
  export const deleteEvent = async (req, res) => {
    const { id } = req.params;
  
    try {
      const event = await Events.findById(id);
  
      if (!event) {
        return res.status(404).json({ msg: "Event not found" });
      }
  
      res.status(200).json({ msg: "Event successfully eliminated" });
    } catch (error) {
      console.error("Error deleting event: ", error);
      res.status(400).json({ error: error.message });
    }
  };