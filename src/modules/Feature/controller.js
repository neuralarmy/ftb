const Note = require('../Feature/model.js');

/// Create and Save a new feature
exports.create = (req, res) => {
     //Validate request
    if(!req.body.name) {
        return res.status(400).send({
            message: "Feature name can not be empty"
        });
    }

    // Create a feature
    const note = new Note({
        projectid: req.body.projectid,
        ownername: req.body.ownername,
        projectname: req.body.name,
        name: req.body.name,
        description: req.body.description,
        enabled: req.body.enabled
    });

    // Save feature in the database
    note.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Feature."
        });
    });
};

// Retrieve and return all feature from the database.
exports.findAll = (req, res) => {
    Note.find()
    .then(notes => {
        res.send(notes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Feature."
        });
    });
};

// Find a single feature with a noteId
exports.findOne = (req, res) => {
    Note.findById(req.params.noteId)
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Feature not found with id " + req.params.noteId
            });            
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Feature not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Feature with id " + req.params.noteId
        });
    });
};

// Update a feature identified by the noteId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.name) {
        return res.status(400).send({
            message: "Feature name can not be empty"
        });
    }

    // Find feature and update it with the request body
    Note.findByIdAndUpdate(req.params.noteId, {
        projectid: req.body.projectid,
        ownername: req.body.ownername,
        projectname: req.body.pname,
        name: req.body.name,
        description: req.body.description,
        enabled: req.body.enabled,
    }, {new: true})
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Feature not found with id " + req.params.noteId
            });
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Feature not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Error updating Feature with id " + req.params.noteId
        });
    });
};

// Delete a feature with the specified noteId in the request
exports.delete = (req, res) => {
    Note.findByIdAndRemove(req.params.noteId)
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Feature not found with id " + req.params.noteId
            });
        }
        res.send({message: "Feature deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Feature not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Could not delete Feature with id " + req.params.noteId
        });
    });
};