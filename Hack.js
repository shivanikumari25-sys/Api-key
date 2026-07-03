
let currentUser = "";
const goalForm =
document.getElementById("goalForm");

const goalList =
document.getElementById("goalList");
function showSignup(){
  document.getElementById("signupBox").style.display = "block";
  document.getElementById("loginBox").style.display = "none";
}
function showLogin(){
  document.getElementById("loginBox" ).style.display = "block";
  document.getElementById("signupBox").style.display = "none";
}
function signup(){
  let email =document.getElementById( "signupEmail").value;
  let password = document.getElementById("signupPassword").value;
  if(email === "" || password === ""){
    alert("Please fill all fields");
    return;
  }
  let users =
  JSON.parse(localStorage.getItem("users")) || [];
  let alreadyUser = users.find(user => user.email === email );
  if(alreadyUser){
    alert("User already exists");
    return;
  }
  users.push({
    email:email,
    password:password
  });
localStorage.setItem("users",
JSON.stringify(users) );
  alert("Signup Successful");
  document.getElementById("signupEmail").value = "";
  document.getElementById( "signupPassword" ).value = "";
}
function login(){
  let email =document.getElementById( "loginEmail").value;
  let password = document.getElementById( "loginPassword").value;
  let users = JSON.parse( localStorage.getItem("users") ) || [];
  let validUser =users.find(user =>
    user.email === email &&
    user.password === password
  );
  if(validUser){
    currentUser = email;
    document.getElementById("userName").innerText = email;
    alert("Login Successful");
    loadGoals();
  }
  else{
    alert("Invalid Email or Password");
  }

}
goalForm.addEventListener(
  "submit",

  function(e){
    e.preventDefault();
    if(currentUser === ""){
      alert("Please Login First");
      return;

    }
    let title = document.getElementById( "title").value;
    let description = document.getElementById("description").value;
    let category = document.getElementById( "category").value;
    let date = document.getElementById("date").value;
    let priority = document.getElementById( "priority").value;
    let target = document.getElementById("target").value;
    let goals =JSON.parse( localStorage.getItem("goals") ) || [];
    goals.push({id:Date.now(),user:currentUser,
 title:title,description:description,
 category:category,
      date:date,
      priority:priority,
      target:target,
      completed:false
    });
    localStorage.setItem( "goals",
   JSON.stringify(goals)
    );
    goalForm.reset();
    loadGoals();
    alert("Goal Added Successfully");
  }

);
function loadGoals(){
  goalList.innerHTML = "";
  let goals = JSON.parse( localStorage.getItem("goals")) || [];
let myGoals = goals.filter(goal => goal.user === currentUser
);
  document.getElementById( "totalGoals" ).innerText = myGoals.length;
  let completedGoals = myGoals.filter(goal =>
    goal.completed === true
  );
  document.getElementById("completedGoals").innerText = completedGoals.length;
  document.getElementById("pendingGoals" ).innerText = myGoals.length -completedGoals.length;
  if(myGoals.length === 0){
    goalList.innerHTML =
    "<h3>No Goals Added</h3>";
    return;
  }
  myGoals.forEach(goal => {
    let div = document.createElement("div");
    div.classList.add( "goal-card" );
    div.innerHTML = `
      <h3>${goal.title}</h3>
      <p>${goal.description}</p>
      <p>
      <b>Category:</b>
      ${goal.category}
      </p>

      <p>
      <b>Date:</b>
      ${goal.date}
      </p>

      <p>
      <b>Priority:</b>
      ${goal.priority}
      </p>

      <p>
      <b>Target:</b>
      ${goal.target}
      </p>

      <p>
      <b>Status:</b>

      ${
        goal.completed

        ? "Completed ✅"

        : "Pending ⏳"
      }

      </p>


      <div class="goal-buttons">

        <button
        class="edit-btn"
        onclick="editGoal(${goal.id})">

        Edit

        </button>


        <button
        class="delete-btn"
        onclick="deleteGoal(${goal.id})">

        Delete

        </button>


        <button
        class="complete-btn"
        onclick="completeGoal(${goal.id})">

        Complete

        </button>

      </div>

    `;


    goalList.appendChild(div);

  });

}

function deleteGoal(id){

  let goals =
  JSON.parse(
    localStorage.getItem("goals")
  ) || [];


  goals = goals.filter(goal =>

    goal.id !== id

  );


  localStorage.setItem(

    "goals",

    JSON.stringify(goals)

  );


  loadGoals();

}
function completeGoal(id){

  let goals =
  JSON.parse(
    localStorage.getItem("goals")
  ) || [];


  goals.forEach(goal => {

    if(goal.id === id){

      goal.completed = true;

    }

  });


  localStorage.setItem(

    "goals",

    JSON.stringify(goals)

  );


  loadGoals();

}
function editGoal(id){

  let goals =
  JSON.parse(
    localStorage.getItem("goals")
  ) || [];


  let goal =
  goals.find(goal =>

    goal.id === id

  );


  let newTitle =
  prompt(

    "Enter New Goal Title",

    goal.title

  );


  if(newTitle !== null &&
     newTitle !== ""){

    goal.title = newTitle;

  }


  localStorage.setItem(

    "goals",

    JSON.stringify(goals)

  );


  loadGoals();

}
function saveReflection(){

  let reflection =
  document.getElementById(
    "reflectionText"
  ).value;


  if(currentUser === ""){

    alert("Please Login First");

    return;

  }


  localStorage.setItem(

    currentUser + "_reflection",

    reflection

  );
  document.getElementById(
    "savedReflection"
  ).innerText =

  "Reflection Saved Successfully ✅";

}
function showAllGoals(){

  if(currentUser === ""){

    alert("Please Login First");

    return;

  }

  loadGoals();

}
function logout(){

  currentUser = "";


  document.getElementById(
    "userName"
  ).innerText = "User";


  goalList.innerHTML = "";


  document.getElementById(
    "totalGoals"
  ).innerText = 0;


  document.getElementById(
    "completedGoals"
  ).innerText = 0;


  document.getElementById(
    "pendingGoals"
  ).innerText = 0;


  alert("Logout Successful");

}