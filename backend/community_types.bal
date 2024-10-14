import ballerina/time;

type Community record {| 
    int community_id; 
    string name; 
    string description; 
    string location; 
    int created_by; 
    time:Utc created_at; 
|};

type CreateCommunityRequest record {| 
    string name; 
    string description; 
    string location; 
    int created_by; // The user ID of the creator
|};

type UpdateCommunityRequest record {| 
    string name; 
    string description; 
    string location; 
|};
