import ballerina/time;
import ballerina/sql;
import ballerinax/mysql;
import iwb017/backend.db;

mysql:Client dbClient = db:getDbClient();

public type Community record {| 
    int community_id; 
    string name; 
    string description; 
    string location; 
    int created_by; 
    time:Utc created_at; 
|};

public type CreateCommunityRequest record {| 
    string name; 
    string description; 
    string location; 
    int created_by; // The user ID of the creator
|};

public type UpdateCommunityRequest record {| 
    string name; 
    string description; 
    string location; 
|};

public function getCommunities() returns Community[]|error {
    sql:ParameterizedQuery query = `SELECT * FROM Communities`;
   stream<Community, error?> CommunityStream  = dbClient->query(query);
    return from Community community in CommunityStream select community;
}

public function getCommunityById(int id) returns Community|error {
    sql:ParameterizedQuery query = `SELECT * FROM Communities WHERE community_id = ${id}`;
    return dbClient->queryRow(query);
}

public function getCommunityByName(string name) returns Community|error {
    sql:ParameterizedQuery query = `SELECT * FROM Communities WHERE name = ${name}`;
    return dbClient->queryRow(query);
}

public function createCommunity(CreateCommunityRequest community) returns sql:ExecutionResult|sql:Error|error {
    CreateCommunityRequest {name, description, location, created_by} = community;
    sql:ParameterizedQuery query = `INSERT INTO Communities (name, description, location, created_by) 
                                    VALUES (${name}, ${description}, ${location}, ${created_by})`;
    sql:ExecutionResult|sql:Error res = dbClient->execute(query);
    Community com = check getCommunityByName(name); // Fixed assignment syntax
    sql:ParameterizedQuery query2 = `INSERT INTO CommunityMembers (community_id, user_id) VALUES (${com.community_id}, ${created_by})`;
    return dbClient->execute(query2);
}

public function updateCommunity(UpdateCommunityRequest community, int community_id) returns sql:ExecutionResult|sql:Error {
    UpdateCommunityRequest {name, description, location} = community;
    sql:ParameterizedQuery query = `UPDATE Communities SET name = ${name}, description = ${description}, 
                                    location = ${location} WHERE community_id = ${community_id}`;
    return dbClient->execute(query);
}

public function deleteCommunity(int community_id) returns sql:ExecutionResult|sql:Error {
    sql:ParameterizedQuery query = `DELETE FROM Communities WHERE community_id = ${community_id}`;
    return dbClient->execute(query);
}