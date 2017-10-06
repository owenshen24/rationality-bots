var times = 1;
var nextstep = 0;
var answers = document.querySelector('.answers');
var questions = document.querySelector('.questions');
var Submit = document.querySelector('.Submit');
var enter = document.querySelector('.enter');
var reset = document.querySelector('.reset');

var done = "done";
var yes = "yes";
var no = "no";

function clearThis(target) {
        target.value= "";
}

function chat() {
    var ans = String(enter.value);
    
    if ((ans.toLowerCase().localeCompare(done) === 0)) {
    questions.innerHTML = 'Imagine that it is one week later and you failed to get anything done! What happened?';
    clearThis(enter);
    nextstep++;
    }
    else
    if (nextstep === 1) {
    answers.innerHTML += 'Plausible failure: | ' + ans + '<br>';
    questions.innerHTML = 'How can you prevent this from happening?';
    clearThis(enter);
    nextstep++;
    }
    else
    if (nextstep === 2) {
    answers.innerHTML += 'Solution: | ' + ans + '<br>';
    questions.innerHTML = 'Imagine that it is one week later and your solution failed! Do you really think your solution will work? (Enter "yes" or "no)';
    clearThis(enter);
    nextstep++;  
    }
    else
    if (nextstep === 3) {
      if ((ans.toLowerCase().localeCompare(yes) === 0)) {
      questions.innerHTML = 'Congrats! You have problem-proofed your plan!';
      clearThis(enter);
      hide();
      }
      if ((ans.toLowerCase().localeCompare(no) === 0)) {
      questions.innerHTML = 'What went wrong this time?';
      clearThis(enter);
      nextstep = 1;
      }
    }
    else
    if (times === 1) {
    answers.innerHTML = 'What do you want to do? | ' + ans + '<br>';
    questions.innerHTML = 'What is Step 1?';
    clearThis(enter);
    }
    else 
    if (times > 1) {
    answers.innerHTML += ('Step' + ' ' + (times-1) + ' | ' + ans + '<br>');
    questions.innerHTML = 'What is Step ' + times + '?' + '<br>' + '(Enter "done" if done)';
    clearThis(enter);
    }
    
    times++;
}

enter.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode == 13) {
        Submit.click();
    }
});

Submit.addEventListener("click", chat);

function resetAll() {
  hide();
  questions.innerHTML = 'What do you want to do?';
  answers.innerHTML = " ";
  times = 1;
  nextstep = 0;
}

reset.addEventListener("click", resetAll);

function hide () {
    var x = document.querySelector('.form')
    if (x.style.display === 'none') {
        x.style.display = 'block';
    } else {
        x.style.display = 'none';
    }
}