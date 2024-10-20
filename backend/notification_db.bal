import ballerina/sql;

// 1. Create a new notification
function createNotification(CreateNotificationRequest notification) returns sql:ExecutionResult|sql:Error {
    CreateNotificationRequest {user_id, message} = notification;
    sql:ParameterizedQuery query = `INSERT INTO Notifications (user_id, message) VALUES (${user_id}, ${message})`;
    return dbClient->execute(query);
}

// 2. Update read status of a notification
function updateNotificationReadStatus(int notificationId, boolean readStatus) returns sql:ExecutionResult|sql:Error {
    sql:ParameterizedQuery query = `UPDATE Notifications SET read_status = ${readStatus} WHERE id = ${notificationId}`;
    return dbClient->execute(query);
}

// 3. Delete a notification
function deleteNotification(int notificationId) returns sql:ExecutionResult|sql:Error {
    sql:ParameterizedQuery query = `DELETE FROM Notifications WHERE id = ${notificationId}`;
    return dbClient->execute(query);
}

// 4. Get notifications of a user (sorted by created_at, newest first)
function getNotificationsByUserId(int userId) returns Notification[]|error {
    sql:ParameterizedQuery query = `SELECT * FROM Notifications WHERE user_id = ${userId} ORDER BY created_at DESC`;
    stream<Notification, error?> notificationsStream = dbClient->query(query);
    return from Notification notification in notificationsStream select notification;
}

// 5. Get notifications from a similar message (sorted by created_at, newest first)
function getNotificationsByMessage(string message) returns Notification[]|error {
    sql:ParameterizedQuery query = `SELECT * FROM Notifications WHERE message LIKE ${"%" + message + "%"} ORDER BY created_at DESC`;
    stream<Notification, error?> notificationsStream = dbClient->query(query);
    return from Notification notification in notificationsStream select notification;
}
