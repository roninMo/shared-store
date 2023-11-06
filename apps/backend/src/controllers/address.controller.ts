import express from 'express';
import { db } from '../database';
import { Address } from '../models/Address';
const router = express.Router();

// Get specific address
router.get('/:id', async (request, response, next) => {
  try {
    const id = request.params.id;
    const address = await Address.query().findById(id);
    console.log('get address', { address, id });
    
    if (address) {
      response.json({ status: 200, address });
    } else {
      response.sendStatus(404);
    }
  } catch(error) {
    next(error);
  }
});

// Get addresses
router.get('/', async (request, response, next) => {
  try {
    const addresses = await Address.query();
    console.log('get all addresses', { addresses });
    
    if (addresses) {
      response.json({ addresses });
    } else {
      response.sendStatus(404);
    }
  } catch(error) {
    next(error);
  }
});

// Delete address
router.delete('/:id', async (request, response, next) => {
  try {
    const id = request.params.id;
    const deletedAddress = await Address.query().deleteById(id);
    
    console.log('delete address ', { deletedAddress, id });
    if (deletedAddress) {
      response.sendStatus(200);
    } else {
      response.sendStatus(404);
    }
  } catch(error) {
    next(error);
  }
});

// Create address
router.post('/', async (request, response, next) => {
  try {
    if (request.body) {
      const address: Address = request.body;
      const createAddress = await Address.query().insert(address);

      console.log('create address', { createAddress });
      if (createAddress) {
        response.sendStatus(200);
      } else {
        response.sendStatus(400);
      }
    } else {
      const invalidContentError = {
        message: 'Create address was called without valid address information',
        type: 'InvalidContent'
      };
      next(invalidContentError);
    }

  } catch(error) {
    next(error);
  }
})

// Update address
router.put('/', async (request, response, next) => {
  try {
    if (request.body && request.body.id) {
      const address = request.body;
      const updateAddress = await Address.query().findById(address.id).patch(address);
      
      console.log('update address: ', { updateAddress, original: address });
      if (updateAddress) {
        response.sendStatus(200);
      } else {
        response.sendStatus(404);
      }
    } else {
      const invalidContentError = {
        message: 'Update address was called without valid address information',
        type: 'InvalidContent'
      };
      next(invalidContentError);
    }

  } catch(error) {
    next(error);
  }
});

module.exports = router;
