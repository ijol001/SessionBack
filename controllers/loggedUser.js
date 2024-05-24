var logoutUser = async (req, res, next) => {
    if (req.session) {
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).send({ "status": "failed", "message": "Logout failed", "error": err });
            }
            res.status(200).send({ "status": "success", "message": "Logged out successfully" });
        });
    } else {
        res.status(401).send({ "status": "failed", "message": "Unauthorized User, No sessionID" });
    }
};

export default logoutUser;
