module.exports = function(app){

    //app.get('/project', (req, res) => res.send('Hello Project!'))

    //other routes..
    const project_controller = require('../Project/controller.js');
    //app.get('/user', (req, res) => res.send('Hello User!'))
    //other routes..
    // Create a new Note
    app.post('/project', project_controller.create);

    // Retrieve all Notes
    app.get('/project', project_controller.findAll);

    // Retrieve a single Note with noteId
    app.get('/project/:noteId', project_controller.findOne);

    // Update a Note with noteId
    app.put('/project/:noteId', project_controller.update);

    // Delete a Note with noteId
    app.delete('/project/:noteId', project_controller.delete);
}