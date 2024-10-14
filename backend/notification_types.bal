import ballerina/time;

type Notification record {| 
    int id; 
    int user_id; 
    string message; 
    boolean read_status; 
    time:Utc created_at; 
|};

type CreateNotificationRequest record {| 
    int user_id; 
    string message; 
|};

type UpdateNotificationRequest record {| 
    boolean read_status; 
|};
