import ballerina/sql;

function getTaskSwaps() returns TaskSwap[]|error {
    sql:ParameterizedQuery query = `SELECT * FROM TaskSwaps`;
    stream<TaskSwap, error?> taskSwapStream = dbClient->query(query);
    return from TaskSwap swap in taskSwapStream select swap;
}

function getTaskSwapById(int swap_id) returns TaskSwap|error {
    sql:ParameterizedQuery query = `SELECT * FROM TaskSwaps WHERE swap_id = ${swap_id}`;
    return dbClient->queryRow(query);
}

function createTaskSwap(CreateTaskSwapRequest swap) returns sql:ExecutionResult|sql:Error {
    sql:ParameterizedQuery query = `INSERT INTO TaskSwaps (task_id, offered_by, status) VALUES (${swap.task_id}, ${swap.offered_by}, ${swap.status})`;
    return dbClient->execute(query);
}

function updateTaskSwap(UpdateTaskSwapRequest swap, int swap_id) returns sql:ExecutionResult|sql:Error {
    sql:ParameterizedQuery query = `UPDATE TaskSwaps SET accepted_by = ${swap.accepted_by}, status = ${swap.status} WHERE swap_id = ${swap_id}`;
    return dbClient->execute(query);
}

function deleteTaskSwap(int swap_id) returns sql:ExecutionResult|sql:Error {
    sql:ParameterizedQuery query = `DELETE FROM TaskSwaps WHERE swap_id = ${swap_id}`;
    return dbClient->execute(query);
}

function getTaskSwapsByUserId(int user_id) returns TaskSwap[]|error {
    sql:ParameterizedQuery query = `SELECT * FROM TaskSwaps WHERE offered_by = ${user_id} OR accepted_by = ${user_id}`;
    stream<TaskSwap, error?> taskSwapStream = dbClient->query(query);
    return from TaskSwap swap in taskSwapStream select swap;
}

function getOfferedTaskSwapsByUserId(int user_id) returns TaskSwap[]|error {
    sql:ParameterizedQuery query = `SELECT * FROM TaskSwaps WHERE offered_by = ${user_id}`;
    stream<TaskSwap, error?> taskSwapStream = dbClient->query(query);
    return from TaskSwap swap in taskSwapStream select swap;
}

function getAcceptedTaskSwapsByUserId(int user_id) returns TaskSwap[]|error {
    sql:ParameterizedQuery query = `SELECT * FROM TaskSwaps WHERE accepted_by = ${user_id}`;
    stream<TaskSwap, error?> taskSwapStream = dbClient->query(query);
    return from TaskSwap swap in taskSwapStream select swap;
}
