import ballerina/sql;
import ballerinax/mysql;
import iwb017/backend.db;

mysql:Client dbClient = db:getDbClient();

// request_id INT AUTO_INCREMENT PRIMARY KEY,
//     task_id INT NOT NULL,
//     posted_by INT NOT NULL,
//     requested_by INT NOT NULL,
//     request_status VARCHAR(50) DEFAULT 'Pending', -- Can be 'Pending', 'Accepted', or 'Rejected'
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     FOREIGN KEY (task_id) REFERENCES Tasks(task_id) ON DELETE CASCADE,
//     FOREIGN KEY (posted_by) REFERENCES Users(user_id) ON DELETE CASCADE,
//     FOREIGN KEY (requested_by) REFERENCES Users(user_id) ON DELETE CASCADE

public type SwapRequest record {
    int request_id;
    int task_id;
    int posted_by;
    int requested_by;
    string request_status;
};

public type CreateSwapRequest record {
    int task_id;
    int posted_by;
    int requested_by;
};

public type UpdateSwapRequest record {
    string status; // e.g., "accepted" or "rejected"
};

public function getSwapRequestsByUserId(int userId) returns SwapRequest[]|error {
    sql:ParameterizedQuery query = `SELECT * FROM SwapRequests WHERE posted_by = ${userId}`;
    stream<SwapRequest, error?> swapRequestStream = dbClient->query(query);
    return from SwapRequest swap in swapRequestStream select swap;
}

public function getSwapRequestsByTaskId(int taskId) returns SwapRequest[]|error {
    sql:ParameterizedQuery query = `SELECT * FROM SwapRequests WHERE task_id = ${taskId}`;
    stream<SwapRequest, error?> swapRequestStream = dbClient->query(query);
    return from SwapRequest swap in swapRequestStream select swap;
}

public function createSwapRequest(CreateSwapRequest swap) returns sql:ExecutionResult|sql:Error {
    sql:ParameterizedQuery query = `INSERT INTO SwapRequests (task_id, posted_by, requested_by) VALUES (${swap.task_id}, ${swap.posted_by}, ${swap.requested_by})`;
    return dbClient->execute(query);
}

public function updateSwapRequest(UpdateSwapRequest swap, int requestId) returns sql:ExecutionResult|sql:Error {
    sql:ParameterizedQuery query = `UPDATE SwapRequests SET request_status = ${swap.status} WHERE request_id = ${requestId}`;
    return dbClient->execute(query);
}

public function deleteSwapRequest(int requestId) returns sql:ExecutionResult|sql:Error {
    sql:ParameterizedQuery query = `DELETE FROM SwapRequests WHERE request_id = ${requestId}`;
    return dbClient->execute(query);
}