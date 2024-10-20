import ballerina/time;

type TaskSwap record {
    int swap_id;
    int task_id;
    int offered_by;   // User ID of the person making the offer
    int accepted_by;  // User ID of the person accepting the offer (nullable)
    time:Utc created_at; // Timestamp for when the swap was created
    string status;     // Status of the swap (e.g., "pending", "accepted", "rejected")
};

type CreateTaskSwapRequest record {
    int task_id;
    int offered_by;
    string status; // default to "pending"
};

type UpdateTaskSwapRequest record {
    int accepted_by;
    string status; // e.g., "accepted" or "rejected"
};
