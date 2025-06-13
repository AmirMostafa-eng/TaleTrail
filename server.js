
import jsonServer from "json-server";
import auth from "json-server-auth";
import cors from "cors";

const app = jsonServer.create();
const router = jsonServer.router("data/db.json");

// Bind the router db to the app
app.db = router.db;

app.use(cors());
app.use(jsonServer.defaults());
app.use(auth);
app.use(router);

app.listen(3001, () => {
  console.log("JSON Server with Auth is running on port 3001");
});
