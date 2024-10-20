import ballerina/sql;

function getCommunities() returns Community[]|error {
    sql:ParameterizedQuery query = `SELECT * FROM Communities`;
    stream<Community, error?> CommunityStream = dbClient->query(query);
    return from Community community in CommunityStream select community;
}

function getCommunityById(int id) returns Community|error {
    sql:ParameterizedQuery query = `SELECT * FROM Communities WHERE community_id = ${id}`;
    return dbClient->queryRow(query);
}

function createCommunity(CreateCommunityRequest community) returns sql:ExecutionResult|sql:Error {
    CreateCommunityRequest {name, description, location, created_by} = community;
    sql:ParameterizedQuery query = `INSERT INTO Communities (name, description, location, created_by) 
                                    VALUES (${name}, ${description}, ${location}, ${created_by})`;
    return dbClient->execute(query);
}

function updateCommunity(UpdateCommunityRequest community, int community_id) returns sql:ExecutionResult|sql:Error {
    UpdateCommunityRequest {name, description, location} = community;
    sql:ParameterizedQuery query = `UPDATE Communities SET name = ${name}, description = ${description}, 
                                    location = ${location} WHERE community_id = ${community_id}`;
    return dbClient->execute(query);
}

function deleteCommunity(int community_id) returns sql:ExecutionResult|sql:Error {
    sql:ParameterizedQuery query = `DELETE FROM Communities WHERE community_id = ${community_id}`;
    return dbClient->execute(query);
}
