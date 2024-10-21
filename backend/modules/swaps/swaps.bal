import ballerina/time;
import ballerina/sql;
import ballerinax/mysql;
import iwb017/backend.db;

mysql:Client dbClient = db:getDbClient();

public type TaskSwap record {
    int swap_id;
    int task_id;
    int offered_by;   // User ID of the person making the offer
    int accepted_by;  // User ID of the person accepting the offer (nullable)
    time:Utc created_at; // Timestamp for when the swap was created
    string status;     // Status of the swap (e.g., "pending", "accepted", "rejected")
};

public type CreateTaskSwapRequest record {
    int task_id;
    int offered_by;
    string status; // default to "pending"
};

public type UpdateTaskSwapRequest record {
    int accepted_by;
    string status; // e.g., "accepted" or "rejected"
};



public function getTaskSwaps() returns TaskSwap[]|error {
    sql:ParameterizedQuery query = `SELECT * FROM TaskSwaps`;
    stream<TaskSwap, error?> taskSwapStream = dbClient->query(query);
    return from TaskSwap swap in taskSwapStream select swap;
}

public function getTaskSwapById(int swap_id) returns TaskSwap|error {
    sql:ParameterizedQuery query = `SELECT * FROM TaskSwaps WHERE swap_id = ${swap_id}`;
    return dbClient->queryRow(query);
}

public function createTaskSwap(CreateTaskSwapRequest swap) returns sql:ExecutionResult|sql:Error {
    sql:ParameterizedQuery query = `INSERT INTO TaskSwaps (task_id, offered_by, status) VALUES (${swap.task_id}, ${swap.offered_by}, ${swap.status})`;
    return dbClient->execute(query);
}

public function updateTaskSwap(UpdateTaskSwapRequest swap, int swap_id) returns sql:ExecutionResult|sql:Error {
    sql:ParameterizedQuery query = `UPDATE TaskSwaps SET accepted_by = ${swap.accepted_by}, status = ${swap.status} WHERE swap_id = ${swap_id}`;
    return dbClient->execute(query);
}

public function deleteTaskSwap(int swap_id) returns sql:ExecutionResult|sql:Error {
    sql:ParameterizedQuery query = `DELETE FROM TaskSwaps WHERE swap_id = ${swap_id}`;
    return dbClient->execute(query);
}

public function getTaskSwapsByUserId(int user_id) returns TaskSwap[]|error {
    sql:ParameterizedQuery query = `SELECT * FROM TaskSwaps WHERE offered_by = ${user_id} OR accepted_by = ${user_id}`;
    stream<TaskSwap, error?> taskSwapStream = dbClient->query(query);
    return from TaskSwap swap in taskSwapStream select swap;
}

public function getOfferedTaskSwapsByUserId(int user_id) returns TaskSwap[]|error {
    sql:ParameterizedQuery query = `SELECT * FROM TaskSwaps WHERE offered_by = ${user_id}`;
    stream<TaskSwap, error?> taskSwapStream = dbClient->query(query);
    return from TaskSwap swap in taskSwapStream select swap;
}

public function getAcceptedTaskSwapsByUserId(int user_id) returns TaskSwap[]|error {
    sql:ParameterizedQuery query = `SELECT * FROM TaskSwaps WHERE accepted_by = ${user_id}`;
    stream<TaskSwap, error?> taskSwapStream = dbClient->query(query);
    return from TaskSwap swap in taskSwapStream select swap;
}
