function generatePassword() {
    var length = parseInt(document.getElementById('length').value);
    var characters = '';

    // Character options
    if (document.getElementById('uppercase').checked) {
        characters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    }
    if (document.getElementById('lowercase').checked) {
        characters += 'abcdefghijklmnopqrstuvwxyz';
    }
    if (document.getElementById('numbers').checked) {
        characters += '0123456789';
    }
    if (document.getElementById('special').checked) {
        characters += '!@#$%^&*()';
    }

    var rule = document.getElementById('rule').value;

    var password = '';
    var passwordStrength = document.getElementById('password-strength');

    for (var i = 0; i < length; i++) {
        var randomIndex = Math.floor(Math.random() * characters.length);
        password += characters.charAt(randomIndex);
    }

    // Apply custom rule
    if (rule) {
        var regex = new RegExp(rule, 'g');
        password = password.replace(regex, '');
    }

    document.getElementById('password').value = password;

    // Password strength indicator
    var strength = calculatePasswordStrength(password);
    if (strength === 'strong') {
        passwordStrength.style.color = 'green';
    } else if (strength === 'medium') {
        passwordStrength.style.color = 'orange';
    } else {
        passwordStrength.style.color = 'red';
    }
    passwordStrength.textContent = strength;

    // Add password to history
    var historyList = document.getElementById('password-history');
    var listItem = document.createElement('li');
    listItem.textContent = password;
    historyList.appendChild(listItem);
}

function calculatePasswordStrength(password) {
    var strength = 'weak';
    var length = password.length;
    var complexity = 0;

    // Length-based criteria
    if (length >= 8) {
        complexity++;
    }
    if (length >= 12) {
        complexity++;
    }
    if (length >= 16) {
        complexity++;
    }

    // Character variety criteria
    if (/[a-z]/.test(password)) {
        complexity++;
    }
    if (/[A-Z]/.test(password)) {
        complexity++;
    }
    if (/[0-9]/.test(password)) {
        complexity++;
    }
    if (/[!@#$%^&*()]/.test(password)) {
        complexity++;
    }

    // Assign strength based on complexity
    if (complexity >= 5) {
        strength = 'strong';
    } else if (complexity >= 3) {
        strength = 'medium';
    }

    return strength;
}

function copyToClipboard() {
    var passwordInput = document.getElementById('password');
    passwordInput.select();
    passwordInput.setSelectionRange(0, 99999); // For mobile devices
    document.execCommand('copy');
    alert('Password copied to clipboard!');
}