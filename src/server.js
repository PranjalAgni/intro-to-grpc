const path = require("path");
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const PROTO_PATH = path.join(__dirname, "todo.proto");
const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};

const packageDefinition = protoLoader.loadSync(PROTO_PATH, options);
const todoProto = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();

// In-memory todo DB
const todoList = [];

// Service methods goes here

const createTodo = (call, callback) => {
  const { id, text } = call.request;
  todoList.push({ id, text });
  callback(null, { id, text });
};

const readTodos = (_call, callback) => {
  callback(null, { items: todoList });
};

const readTodosStream = (call, _callback) => {
  todoList.forEach((todo) => {
    call.write(todo);
  });

  call.end();
};

// Service method end

server.addService(todoProto.todoPackage.TodoService.service, {
  createTodo,
  readTodos,
  readTodosStream,
});

server.bindAsync(
  "localhost:50051",
  grpc.ServerCredentials.createInsecure(),
  (error, port) => {
    if (error) {
      throw error;
    }

    console.log(`Server running at http://localhost:${port}`);
    server.start();
  }
);
