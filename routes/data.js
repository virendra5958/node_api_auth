const express = require('express');
const Person = require('../models/personSchema');

const router = express.Router();



router.post('/', async (req, res) => {
    const data = req.body;
  
    const newPerson = new Person(data);
  
    try {
      const savedPerson = await newPerson.save();
      console.log(savedPerson);
      res.status(201).json(savedPerson); 
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to save person' });
    }
  });

  
  
// data get from server
router.get('/', async (req, res) => {
    try {
      const data = await Person.find().maxTimeMS(30000); 
  
      console.log('Data fetched');
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to retrieve persons' });
    }
  });
  

  router.put('/:id', async (req,res) => {
    try{
     const personId = req.params.id;
     const updatePersonalData = req.body;

     const response = await Person.findByIdAndUpdate(personId, updatePersonalData,{
        new: true,
        runValidators: true,
     })

     if(!response){
        return res.status(404).json({error: 'person no founf'})
     }
     console.log('data updated');
     res.status(200).json(data);
    }
    catch(error){


    }
  })


  router.delete('/:id', async (req,res) => {
    try{
     const personId = req.params.id;
     const updatePersonalData = req.body;

     const response = await Person.findOneAndDelete(personId, updatePersonalData,{
        new: true,
        runValidators: true,
     })

     if(!response){
        return res.status(404).json({error: 'person deleted'})
     }
     console.log('data deleted');
     res.status(200).json(data);
    }
    catch(error){


    }
  })






  
  router.get('/:workType', async (req, res) => {
    try {
      const workType = req.params.workType.toLowerCase();
      if (workType === 'chef' || workType === 'owner' || workType === 'manager') {
        const data = await Person.find({ work: workType }).maxTimeMS(30000);
        console.log('Data fetched');
        res.status(200).json(data);
      } else {
        res.status(400).json({ error: 'Invalid work type' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to retrieve persons' });
    }
  });


  router.post('/:workType', async (req, res) => {
    try {
      const workType = req.params.workType.toLowerCase();
      if (workType === 'chef' || workType === 'owner' || workType === 'manager') {
        const data = await Person.find({ work: workType }).maxTimeMS(30000);
        console.log('Data fetched');
        res.status(200).json(data);
      } else {
        res.status(400).json({ error: 'Invalid work type' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to retrieve persons' });
    }
  });


  
  module.exports= router;