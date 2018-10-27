import { Router } from "express";
import passport from "passport";
import userController from "../controllers/userController";
import UserMiddleware from "../middlewares/users";
import TokenMiddleware from "../middlewares/token";

const router = Router();

router.post(
    "/auth/signup",
    UserMiddleware.validateUserSignup,
    userController.createUser
);
router.post(
    "/auth/login",
    UserMiddleware.validateUserLogin,
    userController.loginUser
);
router.post(
    "/auth/changepassword",
    UserMiddleware.validateChangePasswordEmail,
    TokenMiddleware.verifyToken,
    userController.changePassword
);
router.get(
    "/auth/email/verify/:id",
    TokenMiddleware.verifyToken,
    userController.getSecretToken
);
router.post(
    "/auth/email/changepassword",
    UserMiddleware.validateChangePassword,
    TokenMiddleware.verifyToken,
    userController.changePasswordByToken
);

// Google login
router.get(
    "/auth/google",
    passport.authenticate("google", {
        scope: ["profile"]
    })
);

router.get(
    "/auth/google/redirect",
    passport.authenticate("google", { failureRedirect: "/login" }),
    (req, res) => {
        console.log("success here");
        res.redirect("/");
    }
);

// Facebook login
router.get("/auth/facebook", passport.authenticate("facebook"));
router.get(
    "/auth/facebook/redirect",
    passport.authenticate("facebook", {
        failureRedirect: "/api/v1",
        successRedirect: "/api/v1"
    })
);

export default router;
