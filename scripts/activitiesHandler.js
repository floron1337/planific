import users from './users.json' with {type: "json"};

export function fetchActivities(){
    const isLoggedIn = localStorage.getItem("LOGGED_IN") || false;

    if(!isLoggedIn)
        return []

    const userEmail = localStorage.getItem("USER_EMAIL")
    return users[userEmail].activities || [];
}

export function fetchObjectives(activityId){
    const isLoggedIn = localStorage.getItem("LOGGED_IN") || false;

    if(!isLoggedIn)
        return []

    const userEmail = localStorage.getItem("USER_EMAIL")
    return users[userEmail].activities[activityId].objectives || [];
}