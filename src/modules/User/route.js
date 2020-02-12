module.exports = function(app){

    const user_controller = require('../User/controller.js');
    //app.get('/user', (req, res) => res.send('Hello User!'))
    //other routes..
    // Create a new Note
    app.post('/user', user_controller.create);

    // Retrieve all Notes
    app.get('/user', user_controller.findAll);

    // Retrieve a single Note with noteId
    app.get('/user/:noteId', user_controller.findOne);

    // Update a Note with noteId
    app.put('/user/:noteId', user_controller.update);

    // Delete a Note with noteId
    app.delete('/user/:noteId', user_controller.delete);
    
}