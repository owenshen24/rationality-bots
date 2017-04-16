//These are the HTML selectors to edit the stuff in the first place

let answers = document.querySelector('.answers');
let questions = document.querySelector('.questions');
let Submit = document.querySelector('.Submit');
let enter = document.querySelector('.enter');
let reset = document.querySelector('.reset');

//Button Selectors
let make = document.querySelector('.make');
let schedule = document.querySelector('.schedule');


//These are the variables to keep the loop going when you're entering stuff
let asktask = false;
let asktime = false;
let askWorkBlock = true;
let askBreakBlock = false;

//These are the arrays that I'll use to make the schedule
let estimates = [];
let tasks = [];

//This is the counter for updating the Tasks
let counter = 1;

//These are the times for the work and the break blocks
let workTime = 45;
let breakTime = 5;


//Clearing the input field function
function clearThis(target) {
        target.value= "";
}

//Hiding certain elements, probs need to rewrite to hide lots of things
function hide() {
    let x = document.querySelector('.hidden');
    if (x.style.display === 'none') {
        x.style.display = 'block';
    } else {
        x.style.display = 'none';
    }
}

function hide2() {
    let x = document.querySelector('.make');
    if (x.style.display === 'none') {
        x.style.display = 'inline';
    } else {
        x.style.display = 'none';
    }
}


//The chatting function for inputs is here
function chat() {
    
    let ans = String(enter.value);
    
        if (asktask) {
            questions.innerHTML = ('How long do you think it will take? (Enter in minutes)');
            counter++;
            asktask = false;
            answers.innerHTML += 'Task:' + ' ' + (counter-1) + ' | ' + ans + ' ';
            clearThis(enter);
            tasks.push(ans);
        } else if (askWorkBlock) {
        	questions.innerHTML = ('How long do you want each break to be? (Enter in minutes)');
        	askWorkBlock = false;
        	answers.innerHTML += 'Settings: work block:' + ' | ' + ans + ' min <br>';
        	askBreakBlock = true;
        	clearThis(enter);
        	workTime = ans;
        } else if (askBreakBlock) {
        	questions.innerHTML = ('What is Task 1? <br>');
        	askBreakBlock = false;
        	asktask = true;
        	answers.innerHTML += 'Settings: break block:' + ' | ' + ans + ' min <br>';
        	clearThis(enter);
        	breakTime = ans;
        }
        else 
            {
                questions.innerHTML = ('What is Task ' + counter + '?' + '<br>');
                asktask = true;
                let time = parseInt(ans, 10);
                answers.innerHTML += ' | ' + 'Time:' + ' ' + time + ' min' + '<br>';
                clearThis(enter);
                estimates.push(time);
            }
}
enter.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode == 13) {
        Submit.click();
    }
});
Submit.addEventListener("click", chat);



//This is the reset button to restart planning
function resetAll() {
    questions.innerHTML = 'What is Task 1?';
    answers.innerHTML = " ";
    schedule.innerHTML = " ";
    counter = 1;
    tasks.length = 0
    estimates.length = 0
    hide();
    hide2();
}
reset.addEventListener("click", resetAll);




//Multiplier function to account for overconfident estimates
function multiplier(arr) {
    for (let i = 0; i < arr.length; i++) {
        arr[i] = Math.ceil((arr[i]*1.25)/10)*10;
    }
}

//Displaying the array of times and updating the values
// function chunk(timeArray, taskArray) {
//     let total = 0;
    
//     for(let i = 0; i < timeArray.length; i++) {
//         total+= timeArray[i];

//         if (total > 45) {
//             let temp = timeArray[i];
//             timeArray[i] = timeArray[i] - (total-45);
            
//             timeArray.splice(i+1, 0, 5);
//             taskArray.splice(i+1, 0, 'Take a break!');
            
//             timeArray.splice(i+2, 0, (temp-timeArray[i]));
//             taskArray.splice(i+2, 0, taskArray[i]);
            
//             total = 0;
//         }
//     }
// }

// UPDATED - Displaying the array of times and updating the values
function chunk(timeArray, taskArray) {
    let total = 0;
    
    for(let i = 0; i < timeArray.length; i++) {
        total+= timeArray[i];

        if (total > 45) {
            let temp = timeArray[i];
            timeArray[i] = timeArray[i] - (total-45);
            
            timeArray.splice(i+1, 0, 5);
            taskArray.splice(i+1, 0, 'Take a break!');
            
            timeArray.splice(i+2, 0, (temp-timeArray[i]));
            taskArray.splice(i+2, 0, taskArray[i]);
            
            total = 0;
        }
    }
}

//This is the initial Start Time
let currTime = new Date(); 
let minute = Math.floor((Math.ceil((currTime.getMinutes()/10))*10)%60); 
let hour = currTime.getHours() + Math.floor((currTime.getMinutes() + 5)/60); 


//This is the actual Get Time function
function getTime(start, timeElaps) {
    
    let starthrs = 0;
    let startmin = 0;
    let endhrs = 0;
    let endmin = 0;
    
    starthrs = hour + Math.floor((start+minute)/60); 
    startmin = Math.floor((minute + Math.floor(start%60))%60);
    if (startmin < 10) {
        startmin = '0'+startmin;
    }
    
    let startTime = (starthrs + ':' + startmin);
    
    endhrs = hour + Math.floor((timeElaps+minute)/60); 
    endmin = Math.floor((minute + Math.floor(timeElaps%60))%60);
    if (endmin < 10) {
        endmin = '0'+endmin;
    }
    
    let endTime = (endhrs + ":" + endmin);
    
    return(starthrs + ":" + startmin + '-' + endhrs + ":" + endmin);
}


//This is the actual function that calls all the other stuff to make the function
function makeSchedule() {
    let timeArray = estimates;
    let taskArray = tasks;
    let total = 0;
    let start = 0;
    schedule.innerHTML += 'Schedule:' + '<br>';
    multiplier(timeArray);
    chunk(timeArray, taskArray);
    for (let i = 0; i < timeArray.length; i++) {
        total += timeArray[i];
        if (taskArray[i] === 'Take a break!') {
        schedule.innerHTML += '<li class= "schedule break">' + getTime(start, total, i) + ' -> ' + taskArray[i] + '<br>'+ '</li>';    
        }
        else {
        schedule.innerHTML += '<li class= "schedule"><a href ="#">' + getTime(start, total, i) + ' -> ' + taskArray[i] + '<br>'+ '</a></li>';
        start += timeArray[i];
    }}
    hide();
    hide2();
}
make.addEventListener("click", makeSchedule);


//This is the strike-through stuff
document.querySelector("li").addEventListener("click", function (e) {
    let li = e.target;
    if (li.style.textDecoration === "none") {
    li.style.textDecoration = "line-through";
    }
    else {
        li.style.textDecoration = "none";
    }
});









