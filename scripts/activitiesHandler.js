export function fetchActivities(){
    const isLoggedIn = localStorage.getItem("LOGGED_IN") || false;

    if(!isLoggedIn)
        return []

    return JSON.parse(localStorage.getItem("USER_ACTIVITIES")) || [];
}

export function getTotalObjectivesCount(){
    const activities = fetchActivities();
    
    if(activities.length === 0)
        return 0;
    
    let objectivesCount = 0;

    activities.forEach(activity => {
        objectivesCount += activity.objectives.length || 0;        
    });

    return objectivesCount;
}

export function getActiveObjectivesCount(){
    const activities = fetchActivities();
    let objectivesCount = 0;

    activities.forEach(activity => {
        if(activity.objectives){
            activity.objectives.forEach(objective => {
                if(!objective.done)
                    objectivesCount++;
            });
        }
    });

    return objectivesCount;
}

export function fetchObjectives(activityId){
    const isLoggedIn = localStorage.getItem("LOGGED_IN") || false;

    if(!isLoggedIn)
        return []

    const activities = JSON.parse(localStorage.getItem("USER_ACTIVITIES"));
    return activities[activityId].objectives || [];
}

export function createActivity(activity){
    const isLoggedIn = localStorage.getItem("LOGGED_IN") || false;

    if(!isLoggedIn)
        return []

    const activities = JSON.parse(localStorage.getItem("USER_ACTIVITIES"));
    activities.push(activity);

    localStorage.setItem("USER_ACTIVITIES", JSON.stringify(activities));
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