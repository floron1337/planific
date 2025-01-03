import { addObjective, completeObjective, deleteObjective, fetchActivities, fetchObjectives } from "./activitiesHandler.js"

const activitySelector = document.getElementById("objective-selector")

activitySelector.addEventListener("change", displayObjectives)

displayActivities()

const urlParams = new URLSearchParams(window.location.search);
const paramsActivityIndex = urlParams.get('activity') || 0;

activitySelector.selectedIndex = paramsActivityIndex; 
displayObjectives();  

const addObjectivesMenuBtn = document.getElementById("add-objective-menu-btn");
const objectiveCreator = document.getElementById("new-objective-creator")

addObjectivesMenuBtn.addEventListener("click", handleAddObjectiveMenuButton)

let menuOpen = false

const addObjectiveButton = document.getElementById("add-objective-btn")
const newObjectiveTitleInput = document.getElementById("new-objective-title")
addObjectiveButton.addEventListener("click", handleAddObjectiveButton)

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

    objectives.forEach((objective, index) => {
        if(!objective.done){
            activeObjectives += `
            <div class="objective">
                <div>
                    <p>Activ</p>
                    <h2>${objective.title}</h2>
                    <br>
                    <button class="secondary-btn complete-objective-btn" id="c-${index}">Marchează complet</button>
                </div>
                <button class="danger-btn delete-objective-btn" id="d-${index}"><i class="fa-solid fa-trash"></i></button>
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

    const completeButtons = document.getElementsByClassName("complete-objective-btn")
    for(let i = 0; i < completeButtons.length; i++){
        completeButtons[i].addEventListener("click", handleCompleteObjectiveButton);
    }
}

function handleAddObjectiveMenuButton(e){
    if(e)
        e.preventDefault();

    menuOpen = !menuOpen;

    if(menuOpen){
        objectiveCreator.className = ""
        addObjectivesMenuBtn.innerHTML = `Inchide Meniu <i class="fa-solid fa-arrow-up"></i>`   
    }
    else{
        addObjectivesMenuBtn.innerHTML = `Adauga Obiective <i class="fa-solid fa-arrow-down"></i>`
        objectiveCreator.className = "hidden"
    }
}

function handleAddObjectiveButton(e){
    if(e)
        e.preventDefault()

    if(newObjectiveTitleInput.value.length == 0)
        return

    let activityId = activitySelector.selectedIndex;
    let newObjective = {
        "title": newObjectiveTitleInput.value,
        "done": false
    }

    addObjective(activityId, newObjective);
    displayObjectives();

    newObjectiveTitleInput.value = ""
}

function handleCompleteObjectiveButton(e){
    if(e)
        e.preventDefault()

    const activityId = activitySelector.selectedIndex;
    const objectiveId = parseInt(e.target.id.substring(2))

    completeObjective(activityId, objectiveId);
    displayObjectives();
}