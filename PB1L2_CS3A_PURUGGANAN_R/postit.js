// Store current username after first entry
let currentUsername = "";

/**
 * Step 1: User enters name - only once
 */
function enterName() {
    const nameInput = document.getElementById('username');
    const enteredName = nameInput.value.trim();
    
    // Validate input
    if (!enteredName) {
        alert("Please enter your name to continue!");
        return;
    }
    
    // Save username
    currentUsername = enteredName;
    
    // Switch from name screen to post screen
    document.querySelector('.name-section').style.display = 'none';
    document.querySelector('.post-section').classList.add('active');
    document.getElementById('welcomeUser').textContent = currentUsername;
}

/**
 * Step 2: Encrypt data - Stringify: USERNAME + POST + DATE
 * Using Base64 encoding for demonstration
 */
function encryptData(username, postContent) {
    const currentDate = new Date().toLocaleString();
    const dataString = username + " | " + postContent + " | " + currentDate;
    
    // Convert string to Base64 encoded string
    const encrypted = btoa(unescape(encodeURIComponent(dataString)));
    return encrypted;
}

/**
 * Step 3: Handle new post submission
 */
function addPost() {
    const captionInput = document.getElementById('postCaption');
    const postText = captionInput.value.trim();
    
    // Validate post is not empty
    if (!postText) {
        alert("Please write something before posting!");
        return;
    }
    
    // Generate encrypted value
    const encryptedResult = encryptData(currentUsername, postText);
    
    // Create post card HTML
    const postThread = document.getElementById('postThread');
    const newPost = document.createElement('div');
    newPost.className = 'post-card';
    
    newPost.innerHTML = `
        <div class="post-label"> ORIGINAL POST:</div>
        <div class="post-content">${postText}</div>
        <div class="post-label"> ENCRYPTED:</div>
        <div class="post-encrypted">${encryptedResult}</div>
    `;
    
    // Add new post at the TOP of the thread
    postThread.insertBefore(newPost, postThread.firstChild);
    
    // Clear textarea for next post
    captionInput.value = "";
    
    console.log("Post added successfully");
}