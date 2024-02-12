async function createAccount() {
    var newUsername = document.getElementById('newUsername').value;
    var newPassword = document.getElementById('newPassword').value;

    try {
        // Read the content of the file
        const response = await fetch('users.txt');
        const data = await response.text();

        // Split the content into lines
        const lines = data.split('\n');

        // Check if the username already exists
        const userExists = lines.some(line => {
            const [storedUsername] = line.split(':');
            return storedUsername === newUsername;
        });

        if (userExists) {
            // Show the error pop-up
            openPopup('errorPopup');
        } else {
            // Append the new user to the lines
            lines.push(`${newUsername}:${newPassword}`);

            // Join the lines into a new content
            const newContent = lines.join('\n');

            // Write the new content back to the file
            await fetch('users.txt', { method: 'PUT', body: newContent });

            // Show the success pop-up
            openPopup('successPopup');
            // You can redirect to login.html after a delay if needed
            // setTimeout(() => window.location.href = 'login.html', 2000);
        }
    } catch (error) {
        console.error('Error reading/writing the file:', error);
    }
}

function openPopup(popupId) {
    document.getElementById(popupId).style.display = 'block';
}

function closePopup(popupId) {
    document.getElementById(popupId).style.display = 'none';
}
