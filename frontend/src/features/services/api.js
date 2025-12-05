const API_BASE_URL = 'http://localhost:8080/api';

export const saveActivitiesToBackend = async (activities) => {
    try {
        const response = await fetch(`${API_BASE_URL}/activities`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(activities),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || 'Failed to save activities');
        }

        return await response.json();
    } catch (error) {
        console.error('Error saving activities:', error);
        throw error;
    }
};


