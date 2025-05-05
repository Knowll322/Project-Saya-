// API URLs
const BASE_URL = "https://jsonplaceholder.typicode.com";
const USERS_URL = `${BASE_URL}/users`;
const POSTS_URL = `${BASE_URL}/posts`;

// Fetch User and Posts Data
async function fetchData(userId) {
  const userResponse = await fetch(`${USERS_URL}/${userId}`);
  const user = await userResponse.json();

  const postsResponse = await fetch(`${POSTS_URL}?userId=${userId}`);
  const posts = await postsResponse.json();

  return { user, posts };
}

// Callback Function
function loadDataWithCallback() {
  const userId = document.getElementById("userId").value;
  if (!userId) {
    alert("Please enter a valid User ID.");
    return;
  }

  setTimeout(() => {
    fetchData(userId).then((data) => {
      displayData(data);
    });
  }, 1000);
}

// Promise
function loadDataWithPromise() {
  const userId = document.getElementById("userId").value;
  if (!userId) {
    alert("Please enter a valid User ID.");
    return;
  }

  fetchData(userId)
    .then((data) => {
      displayData(data);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

// Async/Await
async function loadDataWithAsyncAwait() {
  const userId = document.getElementById("userId").value;
  if (!userId) {
    alert("Please enter a valid User ID.");
    return;
  }

  try {
    const data = await fetchData(userId);
    displayData(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Display Data
function displayData(data) {
  const output = document.getElementById("output");
  output.innerHTML = `
    <h2>User Info:</h2>
    <p><strong>Name:</strong> ${data.user.name}</p>
    <p><strong>Email:</strong> ${data.user.email}</p>
    <p><strong>City:</strong> ${data.user.address.city}</p>
    <h2>User Posts:</h2>
    <ul>${data.posts.map((post) => `<li>${post.title}</li>`).join("")}</ul>
  `;
}

// Event Listeners
document.getElementById("callback-btn").addEventListener("click", loadDataWithCallback);
document.getElementById("promise-btn").addEventListener("click", loadDataWithPromise);
document.getElementById("async-btn").addEventListener("click", loadDataWithAsyncAwait);
