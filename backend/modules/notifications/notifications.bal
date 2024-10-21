import ballerina/time;

import ballerina/sql;
import ballerinax/mysql;
import iwb017/backend.db;

mysql:Client dbClient = db:getDbClient();

public type Notification record {| 
    int id; 
    int user_id; 
    string message; 
    boolean read_status; 
    time:Utc created_at; 
|};

public type CreateNotificationRequest record {| 
    int user_id; 
    string message; 
|};

public type UpdateNotificationRequest record {| 
    boolean read_status; 
|};


// 1. Create a new notification
public function createNotification(CreateNotificationRequest notification) returns sql:ExecutionResult|sql:Error {
    CreateNotificationRequest {user_id, message} = notification;
    sql:ParameterizedQuery query = `INSERT INTO Notifications (user_id, message) VALUES (${user_id}, ${message})`;
    return dbClient->execute(query);
}

// 2. Update read status of a notification
public function updateNotificationReadStatus(int notificationId, boolean readStatus) returns sql:ExecutionResult|sql:Error {
    sql:ParameterizedQuery query = `UPDATE Notifications SET read_status = ${readStatus} WHERE id = ${notificationId}`;
    return dbClient->execute(query);
}

// 3. Delete a notification
public function deleteNotification(int notificationId) returns sql:ExecutionResult|sql:Error {
    sql:ParameterizedQuery query = `DELETE FROM Notifications WHERE id = ${notificationId}`;
    return dbClient->execute(query);
}

// 4. Get notifications of a user (sorted by created_at, newest first)
public function getNotificationsByUserId(int userId) returns Notification[]|error {
    sql:ParameterizedQuery query = `SELECT * FROM Notifications WHERE user_id = ${userId} ORDER BY created_at DESC`;
    stream<Notification, error?> notificationsStream = dbClient->query(query);
    return from Notification notification in notificationsStream select notification;
}

// 5. Get notifications from a similar message (sorted by created_at, newest first)
public function getNotificationsByMessage(string message) returns Notification[]|error {
    sql:ParameterizedQuery query = `SELECT * FROM Notifications WHERE message LIKE ${"%" + message + "%"} ORDER BY created_at DESC`;
    stream<Notification, error?> notificationsStream = dbClient->query(query);
    return from Notification notification in notificationsStream select notification;
}
