import searchValidation from './validarBusquedaCoincidencia.js';
import regionalSearchValidation from './validarBusquedaRegional.js';
import { verificarUser } from './validarEmail.js';

const reservationController = {
  searchReservations: (req, res) => {
    searchValidation(req, res, () => {
      const { filteredData } = req;
      res.json(filteredData);
    });
  },

  searchRegionalReservations: (req, res) => {
    regionalSearchValidation(req, res, () => {
      const { filteredData } = req;
      res.json(filteredData);
    });
  },

  createReservation: (req, res) => {
    verificarUser(req, res, () => {
      // Lógica para crear una nueva reservación
      const { email, /* otros campos de la reservación */ } = req.body;
      // Guardar la reservación en la base de datos
      res.json({ message: 'Reservación creada exitosamente' });
    });
  },
};

export default reservationController;