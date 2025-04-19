document.addEventListener('DOMContentLoaded', function() {
    // Update last updated date
    const now = new Date();
    document.getElementById('lastUpdated').textContent = now.toLocaleDateString();
    
    // Get the current month and year
    const today = new Date();
    const month = today.getMonth() + 1; // Months are 0-indexed
    const year = today.getFullYear();
    const day = today.getDate();
    
    // Define the namespace for your counters
    const namespace = 'https://github.com/VitorGallucci/DivulgaCastro';
    
    // Define keys for each counter
    const totalKey = 'total';
    const monthlyKey = `${year}-${month}`;
    const dailyKey = `${year}-${month}-${day}`;
    
    // Function to create a counter if it doesn't exist
    async function createCounterIfNeeded(key) {
        try {
            const response = await fetch(`https://api.countapi.xyz/get/${namespace}/${key}`);
            const data = await response.json();
            
            // If counter doesn't exist (returns value === null), create it
            if (data.value === null) {
                await fetch(`https://api.countapi.xyz/create?namespace=${namespace}&key=${key}&value=0`);
                return 0;
            }
            
            return data.value;
        } catch (error) {
            console.error('Error checking counter:', error);
            return 0;
        }
    }
    
    // Function to increment a counter
    async function incrementCounter(key) {
        try {
            const response = await fetch(`https://api.countapi.xyz/hit/${namespace}/${key}`);
            const data = await response.json();
            return data.value;
        } catch (error) {
            console.error('Error incrementing counter:', error);
            return 'Error';
        }
    }
    
    // Function to get a counter value without incrementing
    async function getCounterValue(key) {
        try {
            const response = await fetch(`https://api.countapi.xyz/get/${namespace}/${key}`);
            const data = await response.json();
            return data.value || 0;
        } catch (error) {
            console.error('Error getting counter:', error);
            return 'Error';
        }
    }
    
    // Initialize counters if needed
    async function initializeCounters() {
        await createCounterIfNeeded(totalKey);
        await createCounterIfNeeded(monthlyKey);
        await createCounterIfNeeded(dailyKey);
        
        // Now increment the counters for this visit
        document.getElementById('totalViews').textContent = await incrementCounter(totalKey);
        document.getElementById('monthlyViews').textContent = await incrementCounter(monthlyKey);
        document.getElementById('dailyViews').textContent = await incrementCounter(dailyKey);
    }
    
    // Initialize and update counters
    initializeCounters();
});