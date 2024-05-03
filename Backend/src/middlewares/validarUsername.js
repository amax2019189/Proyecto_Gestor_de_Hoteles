const validateUsernameLength = (req, res, next) => {
    const {username} = req.body;

    if (username.length < 3 || username.length > 15) {
        return res.status(400).json({
            error: 'Username must be between 3 and 15 characters long'
        });
    }

    next();
}