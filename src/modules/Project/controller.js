const Note = require('../Project/model.js');

/// Create and Save a new Project
exports.create = (req, res) => {
    // Validate request
    if(!req.body.name) {
       return res.status(400).send({
            message: "Project name can not be empty"
        });
    }

    // Create a Project
    const note = new Note({
        ownerid: req.body.ownerid,
        ownername: req.body.ownername,
        name: req.body.name,
        url: req.body.url,
        description: req.body.description,
        status: req.body.status
    });

    // Save Project in the database
    note.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Project."
        });
    });
};

// Retrieve and return all Projects from the database.
exports.findAll = (req, res) => {
    Note.find()
    .then(notes => {
        res.send(notes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Project."
        });
    });
};

// Find a single Project with a noteId
exports.findOne = (req, res) => {
    Note.findById(req.params.noteId)
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Project not found with id " + req.params.noteId
            });            
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Project not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Project with id " + req.params.noteId
        });
    });
};

// Update a Project identified by the noteId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.name) {
        return res.status(400).send({
            message: "Project name can not be empty"
        });
    }

    // Find Project and update it with the request body
    Note.findByIdAndUpdate(req.params.noteId, {
        ownerid: req.body.user,
        ownername: req.body.uname,
        name: req.body.name,
        url: req.body.url,
        description: req.body.description,
        status: req.body.status
    }, {new: true})
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Project not found with id " + req.params.noteId
            });
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Project not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Error updating Project with id " + req.params.noteId
        });
    });
};

// Delete a Project with the specified noteId in the request
exports.delete = (req, res) => {
    Note.findByIdAndRemove(req.params.noteId)
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Project not found with id " + req.params.noteId
            });
        }
        res.send({message: "Project deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Project not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Could not delete Project with id " + req.params.noteId
        });
    });
};