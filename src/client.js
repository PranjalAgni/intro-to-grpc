const path = require("path");
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const { randMovie } = require("@ngneat/falso");
const { nanoid } = require("nanoid");

const PROTO_PATH = path.join(__dirname, "todo.proto");
const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};

const packageDefinition = protoLoader.loadSync(PROTO_PATH, options);
const TodoService =
  grpc.loadPackageDefinition(packageDefinition).todoPackage.TodoService;

const client = new TodoService(
  "localhost:50051",
  grpc.credentials.createInsecure()
);

// client.readTodos({}, (error, response) => {
//   if (error) throw error;
//   console.log("Recieved from server ", response);
// });

// client.createTodo({ id: nanoid(), text: randMovie() }, (error, response) => {
//   if (error) throw error;
//   console.log(response);
// });

const call = client.readTodosStream();

call.on("data", (item) => {
  console.log("Recieved item from server: ", item);
});

call.on("end", () => {
  console.log("Todo streaming completed");
});
