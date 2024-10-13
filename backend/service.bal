// import ballerinax/mysql;
import ballerina/http;

http:CorsConfig corsConfig = {
    allowOrigins: ["*"],
    allowCredentials: false
};



service / on new http:Listener(9090) {

    resource function get greeting() returns string {
        // Send a response back to the caller.
        return "Hello from ballerina!";
    }

    resource function get users() returns User[]|http:InternalServerError|error {
        User[] users = check getUsers();
        return users;
    }
};
