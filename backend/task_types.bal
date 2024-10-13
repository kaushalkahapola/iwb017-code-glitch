import ballerina/time;

type Task record {|
    int task_id;
    string title;
    string description;
    int posted_by;
    string offered_task;
    string status;
    int? community_id;
    time:Utc created_at;
|};

type CreateTaskRequest record {|
    string title;
    string description;
    int posted_by;
    string? community_id;
    string offered_task;
|};

type UpdateTaskRequest record {|
    string title;
    string description;
    string offered_task;
    string status;
    string? community_id;
|};
