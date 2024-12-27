import { fetchActivities, fetchObjectives } from "./activitiesHandler.js"

const activitySelector = document.getElementById("objective-selector")

activitySelector.addEventListener("change", displayObjectives)

displayActivities()

const urlParams = new URLSearchParams(window.location.search);
const paramsActivityIndex = urlParams.get('activity');

if(paramsActivityIndex){
    activitySelector.selectedIndex = paramsActivityIndex; 
    displayObjectives();  
}

function displayActivities(){
    const activities = fetchActivities()
    let content = ""
    
    activities.forEach((activity, index) => {
        content += `<option value="${index}">${activity.title}</option>`
    });

    activitySelector.innerHTML = content
}

function displayObjectives(e){
    if(e)
        e.preventDefault();

    const objectives = fetchObjectives(activitySelector.selectedIndex);
    
    let activeObjectives = ""
    let finishedObjectives = ""

    objectives.forEach(objective => {
        if(!objective.done){
            activeObjectives += `
            <div class="objective">
                <div>
                    <p>Activ</p>
                    <h2>${objective.title}</h2>
                    <br>
                    <button class="secondary-btn">Marchează complet</button>
                </div>
                <button class="danger-btn"><i class="fa-solid fa-trash"></i></button>
            </div>
            `
        }
        else{
            finishedObjectives += `
            <div class="objective done">
                <div>
                    <p>Completat</p>
                    <h2>${objective.title}</h2>
                    <br>
                </div>
            </div>
            `
        }
    });

    const objectiveContainer = document.getElementById("objective-container");
    const content = activeObjectives + finishedObjectives;
    objectiveContainer.innerHTML = content;
}