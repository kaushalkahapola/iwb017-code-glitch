// File: community_member_types.bal
import ballerina/time;
import ballerina/sql;
import ballerinax/mysql;
import iwb017/backend.db;
import iwb017/backend.community;
import iwb017/backend.users;

mysql:Client dbClient = db:getDbClient();

public type CommunityMember record {| 
    int membership_id; 
    int community_id; 
    int user_id; 
    time:Utc joined_at; 
|};

public type CreateCommunityMemberRequest record {| 
    int community_id; 
    int user_id; 
|};

public function getMembersWithUserDetails(int communityId) returns users:User[]|error {
    sql:ParameterizedQuery query = `SELECT u.user_id, u.username, u.email, u.location, u.bio, u.rating, u.created_at
                                    FROM Users u
                                    JOIN CommunityMembers cm ON u.user_id = cm.user_id
                                    WHERE cm.community_id = ${communityId}`;
    stream<users:User, error?> membersStream = dbClient->query(query);
    return from users:User member in membersStream select member;
}

public function getCommunitiesByUserId(int userId) returns community:Community[]|error {
    sql:ParameterizedQuery query = `SELECT c.* FROM Communities c 
                                    JOIN CommunityMembers cm ON c.community_id = cm.community_id
                                    WHERE cm.user_id = ${userId}`;
    stream<community:Community, error?> communitiesStream = dbClient->query(query);
    return from community:Community community in communitiesStream select community;
}

public function addMemberToCommunity(CreateCommunityMemberRequest member) returns sql:ExecutionResult|sql:Error {
    CreateCommunityMemberRequest {community_id, user_id} = member;
    sql:ParameterizedQuery query = `INSERT INTO CommunityMembers (community_id, user_id) VALUES (${community_id}, ${user_id})`;
    return dbClient->execute(query);
}

public function removeMemberFromCommunity(int communityId, int userId) returns sql:ExecutionResult|sql:Error {
    sql:ParameterizedQuery query = `DELETE FROM CommunityMembers WHERE community_id = ${communityId} AND user_id = ${userId}`;
    return dbClient->execute(query);
}
