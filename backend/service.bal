// File: service.bal
import ballerina/http;
import ballerina/sql;
import ballerina/lang.'int as langint;
import backend.users;
import backend.community;
import backend.community_members;
import backend.notifications;
import backend.task;
import backend.swaps;
import backend.ratings;
import backend.swapReq;

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
    resource function get users() returns users:User[]|http:InternalServerError|error {
        users:User[] users = check users:getUsers();
        return users;
    }

    // GET a specific user by ID
    resource function get users/[string id]() returns users:User|http:InternalServerError|error {
        int|error intId = langint:fromString(id);
        if intId is error {
            return error("Invalid user id");
        }
        users:User user = check users:getUserById(intId);
        return user;
    }

    // POST create a new user
    resource function post users(users:CreateUserRequest user) returns sql:ExecutionResult|sql:Error {
        return users:createUser(user);
    }

    // PUT update a specific user by ID
    resource function put users/[string id](users:UpdateUserRequest user) returns sql:ExecutionResult|sql:Error {
        int|error intId = langint:fromString(id);
        if intId is error {
            return error("Invalid user id");
        }
        return users:updateUser(user, intId);
    }

    // DELETE a specific user by ID
    resource function delete users/[string id]() returns sql:ExecutionResult|sql:Error {
        int|error intId = langint:fromString(id);
        if intId is error {
            return error("Invalid user id");
        }
        return users:deleteUser(intId);
    }

    // ------- Community CRUD Operations -------- //

    // GET all communities
    resource function get communities() returns community:Community[]|http:InternalServerError|error {
        community:Community[] communities = check community:getCommunities();
        return communities;
    }

    // GET a specific community by ID
    resource function get communities/[string id]() returns community:Community|http:InternalServerError|error {
        int|error intId = langint:fromString(id);
        if intId is error {
            return error("Invalid community id");
        }
        community:Community community = check community:getCommunityById(intId);
        return community;
    }

    // POST create a new community
    resource function post communities(community:CreateCommunityRequest community) returns sql:ExecutionResult|sql:Error| error {
        return community:createCommunity(community);
    }

    // PUT update a specific community by ID
    resource function put communities/[string id](community:UpdateCommunityRequest community) returns sql:ExecutionResult|sql:Error {
        int|error intId = langint:fromString(id);
        if intId is error {
            return error("Invalid community id");
        }
        return community:updateCommunity(community, intId);
    }

    // DELETE a specific community by ID
    resource function delete communities/[string id]() returns sql:ExecutionResult|sql:Error {
        int|error intId = langint:fromString(id);
        if intId is error {
            return error("Invalid community id");
        }
        return community:deleteCommunity(intId);
    }

    // ------- Community Members Operations ------- //

// 1. GET all members of a specific community with user details
    resource function get communityMembers/[string communityId]() returns users:User[]|http:InternalServerError|error {
        int|error intCommunityId = langint:fromString(communityId);
        if intCommunityId is error {
            return error("Invalid community id");
        }
        users:User[] members = check community_members:getMembersWithUserDetails(intCommunityId);
        return members;
    }

    // 2. GET all communities a given user belongs to
    resource function get memberCommunities/[string userId]() returns community:Community[]|http:InternalServerError|error {
        int|error intUserId = langint:fromString(userId);
        if intUserId is error {
            return error("Invalid user id");
        }
        community:Community[] communities = check community_members:getCommunitiesByUserId(intUserId);
        return communities;
    }

    // 3. POST add a member to a community
    resource function post communityMembers(community_members:CreateCommunityMemberRequest member) returns sql:ExecutionResult|sql:Error {
        return community_members:addMemberToCommunity(member);
    }

    // 4. DELETE remove a member from a community
    resource function delete communityMembers/[string communityId]/[string userId]() returns sql:ExecutionResult|sql:Error {
        int|error intCommunityId = langint:fromString(communityId);
        int|error intUserId = langint:fromString(userId);
        if intCommunityId is error || intUserId is error {
            return error("Invalid community id or user id");
        }
        return community_members:removeMemberFromCommunity(intCommunityId, intUserId);
    }

    // ------- Notifications Operations ------- //

    // 1. Create a new notification
    resource function post notifications(notifications:CreateNotificationRequest notification) returns sql:ExecutionResult|sql:Error {
        return notifications:createNotification(notification);
    }

    // 2. Edit the read status of a notification
    resource function put notifications/[string id](notifications:UpdateNotificationRequest notification) returns sql:ExecutionResult|sql:Error {
        int|error intId = langint:fromString(id);
        if intId is error {
            return error("Invalid notification id");
        }
        return notifications:updateNotificationReadStatus(intId, notification.read_status);
    }

    // 3. Delete a notification
    resource function delete notifications/[string id]() returns sql:ExecutionResult|sql:Error {
        int|error intId = langint:fromString(id);
        if intId is error {
            return error("Invalid notification id");
        }
        return notifications:deleteNotification(intId);
    }

    // 4. Get notifications of a user
    resource function get notifications/[string userId]() returns notifications:Notification[]|http:InternalServerError|error {
        int|error intUserId = langint:fromString(userId);
        if intUserId is error {
            return error("Invalid user id");
        }
        notifications:Notification[] notifications = check notifications:getNotificationsByUserId(intUserId);
        return notifications;
    }

    // 5. Get notifications from a similar message
    resource function get notifications/similar/[string message]() returns notifications:Notification[]|http:InternalServerError|error {
        notifications:Notification[] notifications = check notifications:getNotificationsByMessage(message);
        return notifications;
    }


    // ------- Task CRUD Operations -------- //

    // GET all tasks
    resource function get tasks() returns task:Task[]|http:InternalServerError|error {
        task:Task[] tasks = check task:getTasks();
        return tasks;
    }

    // POST create a new task
    resource function post tasks(task:CreateTaskRequest task) returns sql:ExecutionResult|sql:Error {
        return task:createTask(task);
    }

    // GET a specific task by ID
    resource function get tasks/[string id]() returns task:Task|http:InternalServerError|error {
        int|error intId = langint:fromString(id);
        if intId is error {
            return error("Invalid task id");
        }
        task:Task task = check task:getTaskById(intId);
        return task;
    }

    // DELETE a specific task by ID
    resource function delete tasks/[string id]() returns sql:ExecutionResult|sql:Error {
        int|error intId = langint:fromString(id);
        if intId is error {
            return error("Invalid task id");
        }
        return task:deleteTask(intId);
    }

    // PUT update a specific task by ID
    resource function put tasks/[string id](task:UpdateTaskRequest task) returns sql:ExecutionResult|sql:Error {
        int|error intId = langint:fromString(id);
        if intId is error {
            return error("Invalid task id");
        }
        return task:updateTask(intId, task);
    }

    // GET all tasks by community
    resource function get tasks/community/[string communityId]() returns task:Task[]|http:InternalServerError|error {
        int|error intCommunityId = langint:fromString(communityId);
        if intCommunityId is error {
            return error("Invalid community id");
        }
        task:Task[] tasks = check task:getTasksByCommunity(intCommunityId);
        return tasks;
    }

    // GET all tasks by user
    resource function get tasks/user/[string userId]() returns task:Task[]|http:InternalServerError|error {
        int|error intUserId = langint:fromString(userId);
        if intUserId is error {
            return error("Invalid user id");
        }
        task:Task[] tasks = check task:getTasksByUser(intUserId);
        return tasks;
    }


    // ------- Task Swap Operations ------- //

    // Get all task swaps
    resource function get taskSwaps() returns swaps:TaskSwap[]|http:InternalServerError|error {
        swaps:TaskSwap[] swaps = check swaps:getTaskSwaps();
        return swaps;
    }

    // Get task swap by ID
    resource function get taskSwaps/[string swapId]() returns swaps:TaskSwap|http:InternalServerError|error {
        int|error intSwapId = langint:fromString(swapId);
        if intSwapId is error {
            return error("Invalid swap id");
        }
        return swaps:getTaskSwapById(intSwapId);
    }

    // Create a new task swap
    resource function post taskSwaps(swaps:CreateTaskSwapRequest swap) returns sql:ExecutionResult|sql:Error {
        return swaps:createTaskSwap(swap);
    }

    // Update a task swap
    resource function put taskSwaps/[string swapId](swaps:UpdateTaskSwapRequest swap) returns sql:ExecutionResult|sql:Error {
        int|error intSwapId = langint:fromString(swapId);
        if intSwapId is error {
            return error("Invalid swap id");
        }
        return swaps:updateTaskSwap(swap, intSwapId);
    }

    // Delete a task swap
    resource function delete taskSwaps/[string swapId]() returns sql:ExecutionResult|sql:Error {
        int|error intSwapId = langint:fromString(swapId);
        if intSwapId is error {
            return error("Invalid swap id");
        }
        return swaps:deleteTaskSwap(intSwapId);
    }

    // Get all task swaps for a user
    resource function get taskSwaps/user/[string userId]() returns swaps:TaskSwap[]|http:InternalServerError|error {
        int|error intUserId = langint:fromString(userId);
        if intUserId is error {
            return error("Invalid user id");
        }
        swaps:TaskSwap[] swaps = check swaps:getTaskSwapsByUserId(intUserId);
        return swaps;
    }

    // Get offered task swaps for a user
    resource function get taskSwaps/user/[string userId]/offered() returns swaps:TaskSwap[]|http:InternalServerError|error {
        int|error intUserId = langint:fromString(userId);
        if intUserId is error {
            return error("Invalid user id");
        }
        swaps:TaskSwap[] swaps = check swaps:getOfferedTaskSwapsByUserId(intUserId);
        return swaps;
    }

    // Get accepted task swaps for a user
    resource function get taskSwaps/user/[string userId]/accepted() returns swaps:TaskSwap[]|http:InternalServerError|error {
        int|error intUserId = langint:fromString(userId);
        if intUserId is error {
            return error("Invalid user id");
        }
        swaps:TaskSwap[] swaps = check swaps:getAcceptedTaskSwapsByUserId(intUserId);
        return swaps;
    }

    // ------- Rating Operations ------- //

    resource function post ratings(ratings:CreateRatingRequest rating) returns sql:ExecutionResult|sql:Error {
        return ratings:createRating(rating);
    }

    resource function get ratings/task/[string taskId]() returns ratings:Rating[]|http:InternalServerError|error {
        int|error intTaskId = langint:fromString(taskId);
        if intTaskId is error {
            return error("Invalid task id");
        }
        ratings:Rating[] ratings = check ratings:getRatingsByTaskId(intTaskId);
        return ratings;
    }

    resource function get ratings/user/[string userId]() returns ratings:Rating[]|http:InternalServerError|error {
        int|error intUserId = langint:fromString(userId);
        if intUserId is error {
            return error("Invalid user id");
        }
        ratings:Rating[] ratings = check ratings:getRatingsByUserId(intUserId);
        return ratings;
    }

    resource function put ratings/update/[string ratingId](ratings:UpdateRatingRequest rating) returns sql:ExecutionResult|sql:Error {
        int|error intRatingId = langint:fromString(ratingId);
        if intRatingId is error {
            return error("Invalid rating id");
        }
        return ratings:updateRating(intRatingId, rating);
    }

    resource function delete ratings/delete/[string ratingId]() returns sql:ExecutionResult|sql:Error {
        int|error intRatingId = langint:fromString(ratingId);
        if intRatingId is error {
            return error("Invalid rating id");
        }
        return ratings:deleteRating(intRatingId);
    }

    resource function get ratings/average/[string taskId]() returns decimal|http:InternalServerError|error {
        int|error intTaskId = langint:fromString(taskId);
        if intTaskId is error {
            return error("Invalid task id");
        }
        return ratings:getAverageRatingByTaskId(intTaskId);
    }


    // ------- Swap Request Operations ------- //

    // Get user swap requests
    resource function get swapRequests/user/[string userId]() returns swapReq:SwapRequest[]|http:InternalServerError|error {
        int|error intUserId = langint:fromString(userId);
        if intUserId is error {
            return error("Invalid user id");
        }
        swapReq:SwapRequest[] swaps = check swapReq:getSwapRequestsByUserId(intUserId);
        return swaps;
    }

    // Get task swap requests
    resource function get swapRequests/task/[string taskId]() returns swapReq:SwapRequest[]|http:InternalServerError|error {
        int|error intTaskId = langint:fromString(taskId);
        if intTaskId is error {
            return error("Invalid task id");
        }
        swapReq:SwapRequest[] swaps = check swapReq:getSwapRequestsByTaskId(intTaskId);
        return swaps;
    }

    // Create a new swap request
    resource function post swapRequests(swapReq:CreateSwapRequest swap) returns sql:ExecutionResult|sql:Error {
        return swapReq:createSwapRequest(swap);
    }

    // Update a swap request
    resource function put swapRequests/[string requestId](swapReq:UpdateSwapRequest swap) returns sql:ExecutionResult|sql:Error {
        int|error intRequestId = langint:fromString(requestId);
        if intRequestId is error {
            return error("Invalid request id");
        }
        return swapReq:updateSwapRequest(swap, intRequestId);
    }

    // Delete a swap request
    resource function delete swapRequests/[string requestId]() returns sql:ExecutionResult|sql:Error {
        int|error intRequestId = langint:fromString(requestId);
        if intRequestId is error {
            return error("Invalid request id");
        }
        return swapReq:deleteSwapRequest(intRequestId);
    }

}
