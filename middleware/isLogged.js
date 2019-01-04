export const isLogged =(req,res,next) => {
    if (req.user) {
        return next();
      } 
      else {
        res.json({
            message: "Sign in first",
            redirect: "/signin",
        })
    }
}