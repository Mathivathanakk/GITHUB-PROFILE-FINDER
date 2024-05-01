//Getting all the html elements
const userName = document.getElementById("username");
const getdetailsButton = document.getElementById("getdetails");
const profile = document.getElementById("profile");
const repo = document.getElementById("repo");

//getting username from input and using async function to fetch the data from github

getdetailsButton.addEventListener("click", async () => {
  const userInput = userName.value;
  //console.log(userInput)
  //using the github api to fetch the profile details from the server
  //since we are going to fetch from api we are changing to async function and await keyword to handle  the promise
  const res = await fetch(`https://api.github.com/users/${userInput}`);
  //since it will be in the readable stream we are using .json
  const data = await res.json();
  //console.log(data)
  getProfile(data);
  getrepo(userInput);
});

//displaying the profile details after getting the username
function getProfile(data) {
  //console.log(data);
  //displaying profile details in the cards
  profile.innerHTML = `<div class="card">
<div class="card-img">
<img src=${data.avatar_url} alt=${data.name}>
</div>
<div class="card-body">
<div class="card-title">${data.name}</div>
<div class="card-subheading">${data.login}</div>
<div class="card-text">
<p>${data.bio}</p>
<p><i class="ri-user-follow-fill"></i> ${data.followers} follower . ${data.following} following</p>
<p><i class="ri-map-pin-line"></i> ${data.location}</p>
<button><a href=${data.html_url} target="_blank"><b>VISIT PROFILE</b></a></button>
</div>
</div>
</div>
`;
}

//get the username and passing the another api to displaying the repo details
async function getrepo(userInput) {
  //console.log(userInput)
  const repository = await fetch(
    `https://api.github.com/users/${userInput}/repos`
  );
  //console.log(repository)
  const result = await repository.json();
  //console.log(result);
  for (let i = 0; i < result.length; i++) {
    repo.innerHTML += `<div class="card">
<div class="card-body">
<div class="card-title">${result[i].full_name}</div>
<div class="card-subheading">${result[i].description}</div>
<div class="card-text">
<button><a href=${result[i].html_url} target="_blank"><b>VISIT REPOSITORY</b></a></button>
</div>
</div>
<\div>
`;
  }
}
