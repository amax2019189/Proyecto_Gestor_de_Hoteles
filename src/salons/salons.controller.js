import Salons from './salons.model.js';

export const salonsPost = async (req, res) => {
    const { name, amount, eventType } = req.body;
    try {
        const salon = new Salons({ name, amount, eventType });
        await salon.save();
        res.status(201).json({ salon });
    } catch (error) {
        res.status(500).json({ message: "Error creating the salon", error: error.message });
    }
};

export const scheduleEvent = async (req, res) => {
    const { salonId, date, duration, specialRequirements } = req.body;
    try {
        const salon = await Salons.findById(salonId);
        if (!salon) {
            return res.status(404).json({ message: "Salon not found" });
        }
        salon.events.push({ date, duration, specialRequirements });
        await salon.save();
        res.status(201).json(salon);
    } catch (error) {
        res.status(500).json({ message: "Error scheduling the event", error: error.message });
    }
};


export const modifyEvent = async (req, res) => {
    const { salonId, eventId, newDetails } = req.body;

    try {
        const salon = await Salons.findById(salonId);
        if (!salon) {
            return res.status(404).json({ message: "Salon not found" });
        }

        const event = salon.events.id(eventId);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }

        event.set(newDetails);
        await salon.save();

        res.status(200).json(salon);
    } catch (error) {
        res.status(500).json({ message: "Error modifying the event", error });
    }
}

// Cancelar un evento
export const cancelEvent = async (req, res) => {
    const { salonId, eventId } = req.body;

    try {
        const salon = await Salons.findById(salonId);
        if (!salon) {
            return res.status(404).json({ message: "Salon not found" });
        }

        const eventIndex = salon.events.findIndex(event => event._id.toString() === eventId);
        if (eventIndex === -1) {
            return res.status(404).json({ message: "Event not found" });
        }

        salon.events.splice(eventIndex, 1); 
        await salon.save();

        res.status(200).json({ message: "Event cancelled successfully", salon });
    } catch (error) {
        res.status(500).json({ message: "Error cancelling the event", error: error.message });
    }
}


