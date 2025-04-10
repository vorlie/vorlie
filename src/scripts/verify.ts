interface User {
    userId: string;
    username: string;
    avatar: string;
    verifiedAt: string;
    verified: boolean;
}

let user: User | null = null;
let verificationStatus: string | null = null;
let verifiedDate: string | null = null;

// Check if localStorage is available
if (typeof localStorage !== 'undefined') {
    // Check if user data exists in localStorage
    const storedUser = localStorage.getItem("user");

    // If user data is found in localStorage, use it
    if (storedUser) {
        user = JSON.parse(storedUser);
        verificationStatus = user && user.verified
            ? "You are verified!"
            : null;
        verifiedDate = user ? new Date(Number(user.verifiedAt) * 1000).toLocaleString() : null;
    } else {
        // If no data in localStorage, check the URL for query parameters
        const urlParams = new URLSearchParams(window.location.search);
        const urlUserId = urlParams.get("id");
        const urlUsername = urlParams.get("username");
        const urlAvatar = urlParams.get("avatar");
        const urlVerifiedAt = urlParams.get("verified_at");
        const urlVerified = urlParams.get("verified");

        // If URL params exist, save them to localStorage
        if (urlUserId && urlUsername && urlAvatar && urlVerifiedAt) {
            const userData = {
                userId: urlUserId,
                username: urlUsername,
                avatar: urlAvatar,
                verifiedAt: urlVerifiedAt,
                verified: urlVerified === 'true',
            };
            localStorage.setItem("user", JSON.stringify(userData));

            // Update user info
            user = userData;
            verificationStatus = user.verified
                ? "You are verified!"
                : null;
            verifiedDate = new Date(Number(user.verifiedAt) * 1000).toLocaleString();
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Dynamically generate the HTML structure
    const container = document.querySelector('.verify-container');

    if (verificationStatus) {
        const userInfo = document.createElement('div');
        userInfo.classList.add('user-info');

        const userInfoContainer = document.createElement('div');
        userInfoContainer.classList.add('user-info-container');

        const userAvatar = document.createElement('img');
        userAvatar.classList.add('user-avatar');
        userAvatar.src = `https://cdn.discordapp.com/avatars/${user?.userId}/${user?.avatar}.png`;
        userAvatar.alt = 'User Avatar';

        const userDetails = document.createElement('div');
        userDetails.classList.add('user-details');

        const username = document.createElement('p');
        username.classList.add('user-info-text');
        username.innerHTML = `<strong>Username:</strong> ${user?.username} (<span class="span-color">${user?.userId}</span>)`;

        const verifiedAt = document.createElement('p');
        verifiedAt.classList.add('user-info-text');
        verifiedAt.innerHTML = `<strong>Verified at:</strong> ${verifiedDate}`;

        userDetails.appendChild(username);
        userDetails.appendChild(verifiedAt);
        userInfoContainer.appendChild(userAvatar);
        userInfoContainer.appendChild(userDetails);
        userInfo.appendChild(userInfoContainer);

        const responseMessage = document.createElement('p');
        responseMessage.classList.add('response-message', 'verified');
        responseMessage.innerText = verificationStatus;

        userInfo.appendChild(responseMessage);
        container?.appendChild(userInfo);
    } else {
        const message = document.createElement('div');
        message.classList.add('user-info');
    
        // Add response message
        const responseMessage = document.createElement('p');
        responseMessage.classList.add('response-message');
        responseMessage.innerText = 'Please log in to verify your account.';
    
        // Add a message telling the user to join the server before logging in
        const joinServerMessage = document.createElement('p');
        joinServerMessage.classList.add('join-server-message');
        joinServerMessage.innerText = 'Make sure you join our Discord server before logging in:';
    
        // Create the Discord invite link
        const discordInviteButton = document.createElement('a');
        discordInviteButton.href = 'https://vorlie.pl/?link=miko_support';  // Replace with your server's invite link
        discordInviteButton.classList.add('discord-button');
        discordInviteButton.innerText = 'Join Our Discord Server';
    
        // Create the login button
        const loginButton = document.createElement('a');
        loginButton.href = 'https://api.vorlie.pl/v1/login';
        loginButton.classList.add('discord-button');
        loginButton.innerText = 'Login with Discord';
    
        // Append elements to the message container
        message.appendChild(responseMessage);
        message.appendChild(joinServerMessage);
        message.appendChild(discordInviteButton);
        message.appendChild(loginButton);
    
        container?.appendChild(message);
    }    
});