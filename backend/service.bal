// import ballerinax/mysql;
import ballerina/http;
import ballerina/sql;
import ballerina/lang.'int as langint;
http:CorsConfig corsConfig = {
    allowOrigins: ["*"],
    allowCredentials: false
};



service / on new http:Listener(9090) {

    // CRUD operations for users
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


    // CRUD operations for tasks

    resource function get tasks() returns Task[]|http:InternalServerError|error {
        Task[] tasks = check getTasks();
        return tasks;
    }

    resource function post tasks(CreateTaskRequest task) returns sql:ExecutionResult|sql:Error {
        return createTask(task);
    }

    resource function get tasks/[string id]() returns Task|http:InternalServerError|error {
        int|error intId = langint:fromString(id);
        if intId is error {
            return error("Invalid task id");
        }
        return getTaskById(intId);
    }

    resource function delete tasks/[string id]() returns sql:ExecutionResult|sql:Error {
        int|error intId = langint:fromString(id);
        if intId is error {
            return error("Invalid task id");
        }
        return deleteTask(intId);
    }

    resource function put tasks/[string id](UpdateTaskRequest task) returns sql:ExecutionResult|sql:Error {
        int|error intId = langint:fromString(id);
        if intId is error {
            return error("Invalid task id");
        }
        return updateTask(intId, task);
    }
};
