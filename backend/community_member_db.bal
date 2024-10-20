// File: community_member_db.bal
import ballerina/sql;

function getMembersWithUserDetails(int communityId) returns User[]|error {
    sql:ParameterizedQuery query = `SELECT u.user_id, u.username, u.email, u.location, u.bio, u.rating, u.created_at
                                    FROM Users u
                                    JOIN CommunityMembers cm ON u.user_id = cm.user_id
                                    WHERE cm.community_id = ${communityId}`;
    stream<User, error?> membersStream = dbClient->query(query);
    return from User member in membersStream select member;
}

function getCommunitiesByUserId(int userId) returns Community[]|error {
    sql:ParameterizedQuery query = `SELECT c.* FROM Communities c 
                                    JOIN CommunityMembers cm ON c.community_id = cm.community_id
                                    WHERE cm.user_id = ${userId}`;
    stream<Community, error?> communitiesStream = dbClient->query(query);
    return from Community community in communitiesStream select community;
}

function addMemberToCommunity(CreateCommunityMemberRequest member) returns sql:ExecutionResult|sql:Error {
    CreateCommunityMemberRequest {community_id, user_id} = member;
    sql:ParameterizedQuery query = `INSERT INTO CommunityMembers (community_id, user_id) VALUES (${community_id}, ${user_id})`;
    return dbClient->execute(query);
}

function removeMemberFromCommunity(int communityId, int userId) returns sql:ExecutionResult|sql:Error {
    sql:ParameterizedQuery query = `DELETE FROM CommunityMembers WHERE community_id = ${communityId} AND user_id = ${userId}`;
    return dbClient->execute(query);
}
