import ballerina/http;

// Define an HTTP listener on port 8080
listener http:Listener helloListener = new(8080);

// Define a service bound to the HTTP listener
service /hello on helloListener {

    // Define a resource that handles GET requests to "/hello/greet"
    resource function get greet(http:Caller caller, http:Request req) returns error? {
        check caller->respond("Hello from Ballerina!");
    }
}
