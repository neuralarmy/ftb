module.exports = function(app){

    //app.get('/feature', (req, res) => res.send('Hello Feature!'))

    //other routes..
    // Import Feature Controller
    const feature_controller = require('../Feature/controller.js');
    
    // Create a new feature
    app.post('/feature', feature_controller.create);

    // Retrieve all feature
    app.get('/feature', feature_controller.findAll);

    // Retrieve a single feature with noteId
    app.get('/feature/:noteId', feature_controller.findOne);

    // Update a feature with noteId
    app.put('/feature/:noteId', feature_controller.update);

    // Delete a feature with noteId
    app.delete('/feature/:noteId', feature_controller.delete);
    
}