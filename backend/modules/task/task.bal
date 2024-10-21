import ballerina/time;
import ballerina/sql;
import ballerina/lang.'int as langint;
import ballerinax/mysql;
import iwb017/backend.db;

mysql:Client dbClient = db:getDbClient();

public type Task record {|
    int task_id;
    string title;
    string description;
    int posted_by;
    string offered_task;
    string status;
    int? community_id;
    time:Utc created_at;
|};

public type CreateTaskRequest record {|
    string title;
    string description;
    int posted_by;
    string? community_id;
    string offered_task;
|};

public type UpdateTaskRequest record {|
    string title;
    string description;
    string offered_task;
    string status;
    string? community_id;
|};


public function getTasks() returns Task[]|error {
    sql:ParameterizedQuery query = `SELECT * FROM Tasks`;
    stream<Task,error?> TaskStream = dbClient->query(query);
    return from Task task in TaskStream select task;
}

public function createTask(CreateTaskRequest task) returns sql:ExecutionResult|sql:Error {
    CreateTaskRequest {title, description, posted_by, community_id, offered_task} = task;
    if community_id is null {
        sql:ParameterizedQuery query = `INSERT INTO Tasks (title, description, posted_by, offered_task) VALUES (${title}, ${description}, ${posted_by}, ${offered_task})`;
        return dbClient->execute(query);
    } else {
        int|error com_id = langint:fromString(community_id);
        if com_id is error {
            return error("Invalid community id");
        }
        sql:ParameterizedQuery query = `INSERT INTO Tasks (title, description, posted_by, community_id, offered_task) VALUES (${title}, ${description}, ${posted_by}, ${com_id}, ${offered_task})`;
        return dbClient->execute(query);
    }
}

public function getTaskById(int task_id) returns Task|error {
    sql:ParameterizedQuery query = `SELECT * FROM Tasks WHERE task_id = ${task_id}`;
    return dbClient->queryRow(query);
}

public function deleteTask(int task_id) returns sql:ExecutionResult|sql:Error {
    sql:ParameterizedQuery query = `DELETE FROM Tasks WHERE task_id = ${task_id}`;
    return dbClient->execute(query);
}

public function updateTask(int task_id, UpdateTaskRequest task) returns sql:ExecutionResult|sql:Error {
    UpdateTaskRequest {title, description, offered_task, status, community_id} = task;
    // let's create the query dynamically based on if the fields are null or not
    if community_id is null {
        sql:ParameterizedQuery query = `UPDATE Tasks SET title = ${title}, description = ${description}, status = ${status}, offered_task = ${offered_task} WHERE task_id = ${task_id}`;
        return dbClient->execute(query);
    } else {
        int|error com_id = langint:fromString(community_id);
        if com_id is error {
            return error("Invalid community id");
        }
        sql:ParameterizedQuery query = `UPDATE Tasks SET title = ${title}, description = ${description}, status = ${status}, community_id = ${com_id}, offered_task = ${offered_task} WHERE task_id = ${task_id}`;
        return dbClient->execute(query);
    }
}

public function getTasksByCommunity(int community_id) returns Task[]|error {
    sql:ParameterizedQuery query = `SELECT * FROM Tasks WHERE community_id = ${community_id}`;
    stream<Task,error?> TaskStream = dbClient->query(query);
    return from Task task in TaskStream select task;
}

public function getTasksByUser(int user_id) returns Task[]|error {
    sql:ParameterizedQuery query = `SELECT * FROM Tasks WHERE posted_by = ${user_id}`;
    stream<Task,error?> TaskStream = dbClient->query(query);
    return from Task task in TaskStream select task;
}
