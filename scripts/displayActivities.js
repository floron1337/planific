import { fetchActivities } from "./activitiesHandler.js";

const activitiesContainer = document.getElementById("activity-container");

displayActivities();

function displayActivities(){
    const activities = fetchActivities();
    let content = ""

    activities.forEach((activity, index) => {
        let activityHtml = `
        <div class="activity">
            <div class="activity-header">
                <h2>${activity.title}</h2>
                <button class="secondary-btn"><i class="fa-solid fa-trash"></i></button>
            </div>
            <div class="activity-progress">
                <h3>Progres</h3> <img src="img/activitati/bar_placeholder.png" width="125" height="20" alt="progress bar"/>
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
}
