// Function to get user agent information
function getUserAgentInfo() {
    return {
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        language: navigator.language,
        screenResolution: `${window.screen.width}x${window.screen.height}`,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    };
}

// Function to get IP address using a public API
async function getIPAddress() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
    } catch (error) {
        console.error('Error fetching IP address:', error);
        return 'Unable to fetch IP';
    }
}

// Function to handle form submission
async function handleSubmit(event) {
    event.preventDefault();
    
    // Get user agent information
    const userAgentInfo = getUserAgentInfo();
    
    // Get IP address
    const ipAddress = await getIPAddress();
    
    // Create hidden input fields for the additional information
    const form = event.target;
    
    // Add user agent info
    const userAgentInput = document.createElement('input');
    userAgentInput.type = 'hidden';
    userAgentInput.name = 'user_agent';
    userAgentInput.value = userAgentInfo.userAgent;
    form.appendChild(userAgentInput);
    
    // Add platform info
    const platformInput = document.createElement('input');
    platformInput.type = 'hidden';
    platformInput.name = 'platform';
    platformInput.value = userAgentInfo.platform;
    form.appendChild(platformInput);
    
    // Add language info
    const languageInput = document.createElement('input');
    languageInput.type = 'hidden';
    languageInput.name = 'language';
    languageInput.value = userAgentInfo.language;
    form.appendChild(languageInput);
    
    // Add screen resolution
    const resolutionInput = document.createElement('input');
    resolutionInput.type = 'hidden';
    resolutionInput.name = 'screen_resolution';
    resolutionInput.value = userAgentInfo.screenResolution;
    form.appendChild(resolutionInput);
    
    // Add timezone
    const timezoneInput = document.createElement('input');
    timezoneInput.type = 'hidden';
    timezoneInput.name = 'timezone';
    timezoneInput.value = userAgentInfo.timezone;
    form.appendChild(timezoneInput);
    
    // Add IP address
    const ipInput = document.createElement('input');
    ipInput.type = 'hidden';
    ipInput.name = 'ip_address';
    ipInput.value = ipAddress;
    form.appendChild(ipInput);
    
    // Submit the form
    form.submit();
}

// Add event listener when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('experience-form');
    form.addEventListener('submit', handleSubmit);
}); 