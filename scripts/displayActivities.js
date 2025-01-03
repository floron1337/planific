import { deleteActivity, fetchActivities } from "./activitiesHandler.js";

const activitiesContainer = document.getElementById("activity-container");

displayActivities();

function displayActivities(){
    const activities = fetchActivities();
    let content = ""

    activities.forEach((activity, index) => {
        const totalObjectivesCount = activity.objectives.length;
        let completedObjectivesCount = 0;

        for(let i = 0; i < totalObjectivesCount; i++){
            if(activity.objectives[i].done === true)
                completedObjectivesCount++;
        }

        const progressPercentage = totalObjectivesCount > 0 ? Math.round((completedObjectivesCount / totalObjectivesCount) * 100) : 0;

        let activityHtml = `
        <div class="activity">
            <div class="activity-header">
                <h2>${activity.title}</h2>
                <button class="delete-activity-btn secondary-btn" id="d-${index}"><i class="fa-solid fa-trash"></i></button>
            </div>
            <div class="activity-progress">
                <h3>Progres</h3>
                <div class="progress-bar">
                    <div style="width: ${progressPercentage}%;">${progressPercentage}%</div>
                </div>
            </div>
            <br/>
            <h3>${activity.objectives.length || 0} Obiective</h3>
            <p>${activity.description || ""}</p>
            <br/> <br/>
            <a href="obiective.html?activity=${index}" class="secondary-btn">Vezi Obiective</a>
            <br/><br/>
        </div>  
        `
        content += activityHtml;
    });

    activitiesContainer.innerHTML = content;

    const deleteButtons = document.getElementsByClassName("delete-activity-btn")
    for(let i = 0; i < deleteButtons.length; i++){
        deleteButtons[i].addEventListener("click", handleDeleteActivityButton);
    }
}

function handleDeleteActivityButton(e){
    if(!e)
        return

    const btnId = e.target.getAttribute("id");
    const activityId = parseInt(btnId.substring(2));
    
    deleteActivity(activityId);
    displayActivities();
}
