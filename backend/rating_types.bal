import ballerina/time;

type Rating record {| 
    int rating_id;
    int task_id; 
    int rated_user; 
    int rating_value; 
    string feedback; 
    time:Utc created_at; 
|};

type CreateRatingRequest record {| 
    int task_id; 
    int rated_user; 
    int rating_value; 
    string feedback; 
|};

type UpdateRatingRequest record {| 
    int rating_value; 
    string feedback; 
|};
