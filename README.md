# Intro to gRPC

RPC: Remote Procedure Calls

## What is gRPC?

Is an open-source remote procedure call(RPC) framework created by Google. It is an inter-process communication technology based on HTTP/2, that is used for client-server and duplex streaming of data, and this data streaming is highly efficient because of the use of protocol buffers.

## Motivation behind gRPC

- Communication should be efficient

  - Huge amount of data exchange between microservices
  - Mobile network can be slow with limted bandwidth

- Communication should be simple

  - Client and Server should focus on the core business logic
  - Let the framework handle the rest(communication)

- There is problem with Client libraries

  - Needs to stick with a specific communication protocol
  - Hard to maintain and patch security fixes
  - If server decides to change the communication protocol, it will break

## What are Protobufs?

- Protobuf is language neutral data serializing protocol like a JSON or XML.
- Protobuf is binary
- Supports multiple programming language
- Its faster and light weight than any other serializing/deserializing protocol out there
- It provides a strongly typed API contract between client and server, which is super safe to work with.
- Written in IDL format (Interface Definition Language)

## How gRPC works?

Client application can directly call a method on server application on a different machine as if they were present locally

<img src="https://grpc.io/img/landing-2.svg">

- It uses HTTP2 under the hood
- In the client code it looks like we are calling a method on server directly
- A gRPC service contains, the server, protocol buffer, and the client
  - The server has the procedures or subroutines or methods that perform different actions
  - The protocol buffer states the types, and shape of each request and response.
  - The client uses the protocol buffer to get a service and then connect to it via the server's URL and port.

## Modes in gRPC

<img src="https://res.cloudinary.com/practicaldev/image/fetch/s--q75a_ZW6--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/dz6wx5q713fj7yvpnetv.png">

- Unary
- Server Streaming
- Client Streaming
- Bidirectional Streaming

## When to use gRPC

- Microservices
  - Low latency and high throughput communication
  - Strong API contract
- Realtime Communication
  - Bidirectional Streaming
- Network constrained environments
  - Super lightweight message format
- Polygot environments
  - Code generation out of the box for many languages

## gRPC vs REST

<img src="https://res.cloudinary.com/practicaldev/image/fetch/s--Gs-DIpNx--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/io14pagxwlknvggc3tko.png">

## Pros and Cons of gRPC

- Pros

  - Fast and Compact
  - One client library
  - Duplex streaming
  - Platform agnostic
  - Uses HTTP2 which is upgrade from HTTP1.1
  - Progress feedback (streaming)
  - Cancel request (H2 feature)

- Cons
  - No browser support
  - No url endpoint so cannot be tested with tools like Postman
  - No predefined status codes

## Few Links

https://github.com/grpc/grpc-node/blob/master/packages/proto-loader/README.md
