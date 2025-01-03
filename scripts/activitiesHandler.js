import users from './users.json' with {type: "json"};

export function fetchActivities(){
    const isLoggedIn = localStorage.getItem("LOGGED_IN") || false;

    if(!isLoggedIn)
        return []

    return JSON.parse(localStorage.getItem("USER_ACTIVITIES")) || [];
}

export function fetchObjectives(activityId){
    const isLoggedIn = localStorage.getItem("LOGGED_IN") || false;

    if(!isLoggedIn)
        return []

    const activities = JSON.parse(localStorage.getItem("USER_ACTIVITIES"));
    return activities[activityId].objectives || [];
}

export function deleteActivity(activityId){
    const isLoggedIn = localStorage.getItem("LOGGED_IN") || false;

    if(!isLoggedIn)
        return []

    const activities = JSON.parse(localStorage.getItem("USER_ACTIVITIES"));
    activities.splice(activityId, 1);

    localStorage.setItem("USER_ACTIVITIES", JSON.stringify(activities));
}

export function addObjective(activityId, objective){
    const isLoggedIn = localStorage.getItem("LOGGED_IN") || false;

    if(!isLoggedIn)
        return []

    const activities = JSON.parse(localStorage.getItem("USER_ACTIVITIES"));
    if(activities[activityId].objectives)
        activities[activityId].objectives.unshift(objective);
    else
        activities[activityId].objectives = [objective];

    localStorage.setItem("USER_ACTIVITIES", JSON.stringify(activities));
}

export function completeObjective(activityId, objectiveId){
    const isLoggedIn = localStorage.getItem("LOGGED_IN") || false;

    if(!isLoggedIn)
        return []

    const activities = JSON.parse(localStorage.getItem("USER_ACTIVITIES"));
    activities[activityId].objectives[objectiveId].done = true;

    localStorage.setItem("USER_ACTIVITIES", JSON.stringify(activities));
}

export function deleteObjective(activityId, objectiveId){
    const isLoggedIn = localStorage.getItem("LOGGED_IN") || false;

    if(!isLoggedIn)
        return []

    const activities = JSON.parse(localStorage.getItem("USER_ACTIVITIES"));
    activities[activityId].objectives.splice(objectiveId, 1);

    localStorage.setItem("USER_ACTIVITIES", JSON.stringify(activities));
}