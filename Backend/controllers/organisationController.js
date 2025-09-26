// Minimal organisationController.js placeholder

function createOrganisation(req, res) {
  // Return a fake organisation object with a test _id
  res.status(200).json({
    organisation: {
      _id: "6512f7c8e4b0a2a1b2c3d4e5",
      name: req.body.name || "Test Org"
    }
  });
}

function generateJoinCode(req, res) {
  res.status(200).json({ joinCode: 'JOIN123' });
}

function joinOrganisation(req, res) {
  res.status(200).json({ message: 'Joined organisation (placeholder)' });
}

module.exports = {
  createOrganisation,
  generateJoinCode,
  joinOrganisation
};
