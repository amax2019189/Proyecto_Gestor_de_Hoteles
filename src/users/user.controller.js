import roomModel from "../rooms/room.model.js";
import salonsModel from "../salons/salons.model.js";
import User from "../users/user.model.js";
import bcrypt from 'bcryptjs';

export const getRoomsAndSalons = async (req, res) => {
  try {
    const rooms = await roomModel.find();
    const salons = await salonsModel.find();

    res.status(200).json(rooms, salons);
  } catch (error) {
    console.log("error when obtaining the data: ", error);
    res.status(500).json({ error: "error interno del server" });
  }
};

export const updateAccount = async (req, res) => {
  const userId = req.user.uid; 
  const { email, username, newPassword } = req.body;

  try {
      const usuario = await User.findById(userId);

      if (!usuario) {
          return res.status(404).json({ msg: 'User not found' });
      }

      if (usuario.role !== 'ROL_USER' || usuario._id.toString() !== userId) {
          return res.status(403).json({ msg: 'You do not have permission to perform this action' });
      }

      usuario.email = email;
      usuario.username = username;

      if (newPassword) {
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(newPassword, salt);
          usuario.password = hashedPassword;
      }

      await usuario.save();

      res.json({ msg: 'Your account has been updated', usuario });
  } catch (error) {
      console.error(error.message);
      res.status(500).send('Server ERROR');
  }
};
  
  

  export const deleteAccount = async (req, res) => {
    const userId = req.user.uid;
  
    try {
        const usuario = await User.findById(userId);
  
        if (!usuario) {
            return res.status(404).json({ msg: 'User not found' });
        }
  
        if (usuario.role !== 'ROL_USER' || usuario._id.toString() !== userId) {
            return res.status(403).json({ msg: 'You do not have permission to perform this action' });
        }
  
        await User.deleteOne({ _id: userId });
  
        res.json({ msg: 'Your account has been deleted' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server ERROR');
    }
  };
  

