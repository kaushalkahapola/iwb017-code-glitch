// import ballerinax/mysql;
import ballerina/http;
import ballerina/sql;
import ballerina/lang.'int as langint;
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

    resource function get users/[string id]() returns User|http:InternalServerError|error {
        int|error intId = langint:fromString(id);
        if intId is error {
            return error("Invalid user id");
        }
        User user = check getUserById(intId);
        return user;
    }

    resource function post users(CreateUserRequest user) returns sql:ExecutionResult|sql:Error {
        return createUser(user);
    }

    resource function put users/[string id](UpdateUserRequest user) returns sql:ExecutionResult|sql:Error {
        int|error intId = langint:fromString(id);
        if intId is error {
            return error("Invalid user id");
        }
        return updateUser(user, intId);
    }

    resource function delete users/[string id]() returns sql:ExecutionResult|sql:Error {
        int|error intId = langint:fromString(id);
        if intId is error {
            return error("Invalid user id");
        }
        return deleteUser(intId);
    }
};
