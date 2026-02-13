document.addEventListener('DOMContentLoaded', () => {
    const chatMessages = document.getElementById('chat-messages');
    const chatForm = document.getElementById('chat-form');
    const userInput = document.getElementById('user-input');
    const typingIndicator = document.getElementById('typing-indicator');
    const starsContainer = document.querySelector('.stars-container');

    // Create dynamic background stars
    const createStars = () => {
        const starCount = 150;
        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            const size = Math.random() * 3 + 1;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            star.style.setProperty('--duration', `${Math.random() * 3 + 2}s`);
            starsContainer.appendChild(star);
        }
    };
    createStars();

    const addMessage = (text, isAi = true) => {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isAi ? 'ai-message' : 'user-message'}`;

        messageDiv.innerHTML = `
            <div class="avatar">${isAi ? '🤖' : '👤'}</div>
            <div class="text">${text}</div>
        `;

        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    };

    chatForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const message = userInput.value.trim();
        if (!message) return;

        // User message
        addMessage(message, false);
        userInput.value = '';

        // Show typing indicator
        typingIndicator.style.display = 'flex';
        chatMessages.scrollTop = chatMessages.scrollHeight;

        try {
            const response = await fetch('/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message })
            });

            const data = await response.json();

            // Hide indicator and add response
            typingIndicator.style.display = 'none';
            if (data.response) {
                addMessage(data.response);
            } else if (data.error) {
                addMessage(`Error: ${data.error}`, true);
            } else {
                addMessage("Oops! Something went wrong while getting the response.", true);
            }
        } catch (error) {
            typingIndicator.style.display = 'none';
            addMessage("Error: Could not connect to the server.", true);
            console.error('Error:', error);
        }
    });

    // Initial greeting animation delay
    setTimeout(() => {
        const firstMsg = chatMessages.querySelector('.message');
        if (firstMsg) firstMsg.style.opacity = '1';
    }, 500);
});
