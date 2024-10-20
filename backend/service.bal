// File: service.bal
import ballerina/http;
import ballerina/sql;
import ballerina/lang.'int as langint;

// CORS Configuration
// The service-level CORS config applies globally to each `resource`.
@http:ServiceConfig {
    cors: {
        allowOrigins: ["http://localhost:3000"],
        allowCredentials: false,
        allowHeaders: ["Content-Type", "Authorization"],
        allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
    }
}

// HTTP Service
service / on new http:Listener(9090) {

    // ------- User CRUD Operations -------- //

    resource function get greeting() returns string {
        return "Hello from ballerina!";
    }

    // GET all users
    resource function get users() returns User[]|http:InternalServerError|error {
        User[] users = check getUsers();
        return users;
    }

    // GET a specific user by ID
    resource function get users/[string id]() returns User|http:InternalServerError|error {
        int|error intId = langint:fromString(id);
        if intId is error {
            return error("Invalid user id");
        }
        User user = check getUserById(intId);
        return user;
    }

    // POST create a new user
    resource function post users(CreateUserRequest user) returns sql:ExecutionResult|sql:Error {
        return createUser(user);
    }

    // PUT update a specific user by ID
    resource function put users/[string id](UpdateUserRequest user) returns sql:ExecutionResult|sql:Error {
        int|error intId = langint:fromString(id);
        if intId is error {
            return error("Invalid user id");
        }
        return updateUser(user, intId);
    }

    // DELETE a specific user by ID
    resource function delete users/[string id]() returns sql:ExecutionResult|sql:Error {
        int|error intId = langint:fromString(id);
        if intId is error {
            return error("Invalid user id");
        }
        return deleteUser(intId);
    }

    // ------- Community CRUD Operations -------- //

    // GET all communities
    resource function get communities() returns Community[]|http:InternalServerError|error {
        Community[] communities = check getCommunities();
        return communities;
    }

    // GET a specific community by ID
    resource function get communities/[string id]() returns Community|http:InternalServerError|error {
        int|error intId = langint:fromString(id);
        if intId is error {
            return error("Invalid community id");
        }
        Community community = check getCommunityById(intId);
        return community;
    }

    // POST create a new community
    resource function post communities(CreateCommunityRequest community) returns sql:ExecutionResult|sql:Error {
        return createCommunity(community);
    }

    // PUT update a specific community by ID
    resource function put communities/[string id](UpdateCommunityRequest community) returns sql:ExecutionResult|sql:Error {
        int|error intId = langint:fromString(id);
        if intId is error {
            return error("Invalid community id");
        }
        return updateCommunity(community, intId);
    }

    // DELETE a specific community by ID
    resource function delete communities/[string id]() returns sql:ExecutionResult|sql:Error {
        int|error intId = langint:fromString(id);
        if intId is error {
            return error("Invalid community id");
        }
        return deleteCommunity(intId);
    }

    // ------- Community Members Operations ------- //

// 1. GET all members of a specific community with user details
    resource function get communityMembers/[string communityId]() returns User[]|http:InternalServerError|error {
        int|error intCommunityId = langint:fromString(communityId);
        if intCommunityId is error {
            return error("Invalid community id");
        }
        User[] members = check getMembersWithUserDetails(intCommunityId);
        return members;
    }

    // 2. GET all communities a given user belongs to
    resource function get memberCommunities/[string userId]() returns Community[]|http:InternalServerError|error {
        int|error intUserId = langint:fromString(userId);
        if intUserId is error {
            return error("Invalid user id");
        }
        Community[] communities = check getCommunitiesByUserId(intUserId);
        return communities;
    }

    // 3. POST add a member to a community
    resource function post communityMembers(CreateCommunityMemberRequest member) returns sql:ExecutionResult|sql:Error {
        return addMemberToCommunity(member);
    }

    // 4. DELETE remove a member from a community
    resource function delete communityMembers/[string communityId]/[string userId]() returns sql:ExecutionResult|sql:Error {
        int|error intCommunityId = langint:fromString(communityId);
        int|error intUserId = langint:fromString(userId);
        if intCommunityId is error || intUserId is error {
            return error("Invalid community id or user id");
        }
        return removeMemberFromCommunity(intCommunityId, intUserId);
    }

    // ------- Notifications Operations ------- //

    // 1. Create a new notification
    resource function post notifications(CreateNotificationRequest notification) returns sql:ExecutionResult|sql:Error {
        return createNotification(notification);
    }

    // 2. Edit the read status of a notification
    resource function put notifications/[string id](UpdateNotificationRequest notification) returns sql:ExecutionResult|sql:Error {
        int|error intId = langint:fromString(id);
        if intId is error {
            return error("Invalid notification id");
        }
        return updateNotificationReadStatus(intId, notification.read_status);
    }

    // 3. Delete a notification
    resource function delete notifications/[string id]() returns sql:ExecutionResult|sql:Error {
        int|error intId = langint:fromString(id);
        if intId is error {
            return error("Invalid notification id");
        }
        return deleteNotification(intId);
    }

    // 4. Get notifications of a user
    resource function get notifications/[string userId]() returns Notification[]|http:InternalServerError|error {
        int|error intUserId = langint:fromString(userId);
        if intUserId is error {
            return error("Invalid user id");
        }
        Notification[] notifications = check getNotificationsByUserId(intUserId);
        return notifications;
    }

    // 5. Get notifications from a similar message
    resource function get notifications/similar/[string message]() returns Notification[]|http:InternalServerError|error {
        Notification[] notifications = check getNotificationsByMessage(message);
        return notifications;
    }


    // ------- Task CRUD Operations -------- //

    // GET all tasks
    resource function get tasks() returns Task[]|http:InternalServerError|error {
        Task[] tasks = check getTasks();
        return tasks;
    }

    // POST create a new task
    resource function post tasks(CreateTaskRequest task) returns sql:ExecutionResult|sql:Error {
        return createTask(task);
    }

    // GET a specific task by ID
    resource function get tasks/[string id]() returns Task|http:InternalServerError|error {
        int|error intId = langint:fromString(id);
        if intId is error {
            return error("Invalid task id");
        }
        return getTaskById(intId);
    }

    // DELETE a specific task by ID
    resource function delete tasks/[string id]() returns sql:ExecutionResult|sql:Error {
        int|error intId = langint:fromString(id);
        if intId is error {
            return error("Invalid task id");
        }
        return deleteTask(intId);
    }

    // PUT update a specific task by ID
    resource function put tasks/[string id](UpdateTaskRequest task) returns sql:ExecutionResult|sql:Error {
        int|error intId = langint:fromString(id);
        if intId is error {
            return error("Invalid task id");
        }
        return updateTask(intId, task);
    }

    // GET all tasks by community
    resource function get tasks/community/[string communityId]() returns Task[]|http:InternalServerError|error {
        int|error intCommunityId = langint:fromString(communityId);
        if intCommunityId is error {
            return error("Invalid community id");
        }
        Task[] tasks = check getTasksByCommunity(intCommunityId);
        return tasks;
    }

    // GET all tasks by user
    resource function get tasks/user/[string userId]() returns Task[]|http:InternalServerError|error {
        int|error intUserId = langint:fromString(userId);
        if intUserId is error {
            return error("Invalid user id");
        }
        Task[] tasks = check getTasksByUser(intUserId);
        return tasks;
    }


    // ------- Task Swap Operations ------- //

    // Get all task swaps
    resource function get taskSwaps() returns TaskSwap[]|http:InternalServerError|error {
        TaskSwap[] swaps = check getTaskSwaps();
        return swaps;
    }

    // Get task swap by ID
    resource function get taskSwaps/[string swapId]() returns TaskSwap|http:InternalServerError|error {
        int|error intSwapId = langint:fromString(swapId);
        if intSwapId is error {
            return error("Invalid swap id");
        }
        return getTaskSwapById(intSwapId);
    }

    // Create a new task swap
    resource function post taskSwaps(CreateTaskSwapRequest swap) returns sql:ExecutionResult|sql:Error {
        return createTaskSwap(swap);
    }

    // Update a task swap
    resource function put taskSwaps/[string swapId](UpdateTaskSwapRequest swap) returns sql:ExecutionResult|sql:Error {
        int|error intSwapId = langint:fromString(swapId);
        if intSwapId is error {
            return error("Invalid swap id");
        }
        return updateTaskSwap(swap, intSwapId);
    }

    // Delete a task swap
    resource function delete taskSwaps/[string swapId]() returns sql:ExecutionResult|sql:Error {
        int|error intSwapId = langint:fromString(swapId);
        if intSwapId is error {
            return error("Invalid swap id");
        }
        return deleteTaskSwap(intSwapId);
    }

    // Get all task swaps for a user
    resource function get taskSwaps/user/[string userId]() returns TaskSwap[]|http:InternalServerError|error {
        int|error intUserId = langint:fromString(userId);
        if intUserId is error {
            return error("Invalid user id");
        }
        TaskSwap[] swaps = check getTaskSwapsByUserId(intUserId);
        return swaps;
    }

    // Get offered task swaps for a user
    resource function get taskSwaps/user/[string userId]/offered() returns TaskSwap[]|http:InternalServerError|error {
        int|error intUserId = langint:fromString(userId);
        if intUserId is error {
            return error("Invalid user id");
        }
        TaskSwap[] swaps = check getOfferedTaskSwapsByUserId(intUserId);
        return swaps;
    }

    // Get accepted task swaps for a user
    resource function get taskSwaps/user/[string userId]/accepted() returns TaskSwap[]|http:InternalServerError|error {
        int|error intUserId = langint:fromString(userId);
        if intUserId is error {
            return error("Invalid user id");
        }
        TaskSwap[] swaps = check getAcceptedTaskSwapsByUserId(intUserId);
        return swaps;
    }

    // ------- Rating Operations ------- //

    resource function post ratings(CreateRatingRequest rating) returns sql:ExecutionResult|sql:Error {
        return createRating(rating);
    }

    resource function get ratings/task/[string taskId]() returns Rating[]|http:InternalServerError|error {
        int|error intTaskId = langint:fromString(taskId);
        if intTaskId is error {
            return error("Invalid task id");
        }
        return check getRatingsByTaskId(intTaskId);
    }

    resource function get ratings/user/[string userId]() returns Rating[]|http:InternalServerError|error {
        int|error intUserId = langint:fromString(userId);
        if intUserId is error {
            return error("Invalid user id");
        }
        return check getRatingsByUserId(intUserId);
    }

    resource function put ratings/update/[string ratingId](UpdateRatingRequest rating) returns sql:ExecutionResult|sql:Error {
        int|error intRatingId = langint:fromString(ratingId);
        if intRatingId is error {
            return error("Invalid rating id");
        }
        return updateRating(intRatingId, rating);
    }

    resource function delete ratings/delete/[string ratingId]() returns sql:ExecutionResult|sql:Error {
        int|error intRatingId = langint:fromString(ratingId);
        if intRatingId is error {
            return error("Invalid rating id");
        }
        return deleteRating(intRatingId);
    }

    resource function get ratings/average/[string taskId]() returns decimal|http:InternalServerError|error {
        int|error intTaskId = langint:fromString(taskId);
        if intTaskId is error {
            return error("Invalid task id");
        }
        return check getAverageRatingByTaskId(intTaskId);
    }
}
