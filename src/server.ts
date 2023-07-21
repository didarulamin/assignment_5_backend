import { app, connectdb } from "./app";

connectdb()
  .then(() => {
    app.listen(5003, () => {
      console.log("Server is running on port 5003");
    });
  })
  .catch();
