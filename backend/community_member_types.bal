// File: community_member_types.bal
import ballerina/time;

type CommunityMember record {| 
    int membership_id; 
    int community_id; 
    int user_id; 
    time:Utc joined_at; 
|};

type CreateCommunityMemberRequest record {| 
    int community_id; 
    int user_id; 
|};
