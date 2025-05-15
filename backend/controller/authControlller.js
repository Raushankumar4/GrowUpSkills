// import passport from 'passport';

// // Handle Google login
// export const googleLogin = (req, res, next) => {
//   passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
// };

// // Handle Google callback after authentication
// export const googleCallback = (req, res, next) => {
//   passport.authenticate('google', {
//     failureRedirect: '/auth/google/failure', // Redirect on failure
//     successRedirect: '/dashboard', // Redirect on success (e.g., user dashboard)
//   })(req, res, next);
// };

// // Handle logout
// export const logout = (req, res) => {
//   req.logout((err) => {
//     if (err) {
//       return next(err);
//     }
//     res.redirect('/'); // Redirect to home page after logout
//   });
// };

// // Get the current authenticated user
// export const getUser = (req, res) => {
//   if (req.user) {
//     res.json(req.user); // Send the user details if authenticated
//   } else {
//     res.status(401).json({ message: 'Not authenticated' }); // Send error if not authenticated
//   }
// };
