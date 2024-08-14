var logoutUser = async (req, res) => {
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).send({ "status": "failed", "message": "Logout failed", "error": err });
            }
            res.status(200).send({ "status": "success", "message": "Logged out successfully" });
        });
};

export default logoutUser;
