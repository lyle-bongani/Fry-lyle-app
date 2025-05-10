// Keys for localStorage
const LAST_ROUTE_KEY = 'frylyle_last_route';
const FIRST_VISIT_KEY = 'frylyle_first_visit';

// Routes that should not be remembered
const EXCLUDED_ROUTES = ['/splash', '/welcome', '/signin', '/signup'];

/**
 * Saves the current route to localStorage
 * @param path - The current route path
 */
export const saveLastRoute = (path: string): void => {
    // Don't save authentication routes
    if (EXCLUDED_ROUTES.includes(path)) {
        return;
    }

    try {
        localStorage.setItem(LAST_ROUTE_KEY, path);
    } catch (error) {
        console.error('Error saving route to localStorage:', error);
    }
};

/**
 * Gets the last visited route from localStorage
 * @returns The last visited route or '/home' if none exists
 */
export const getLastRoute = (): string => {
    try {
        const lastRoute = localStorage.getItem(LAST_ROUTE_KEY);
        return lastRoute || '/home';
    } catch (error) {
        console.error('Error retrieving route from localStorage:', error);
        return '/home';
    }
};

/**
 * Checks if this is the first visit of the app session
 * @returns boolean indicating if this is the first visit
 */
export const isFirstVisit = (): boolean => {
    try {
        return localStorage.getItem(FIRST_VISIT_KEY) !== 'false';
    } catch (error) {
        console.error('Error checking first visit status:', error);
        return true;
    }
};

/**
 * Sets the first visit flag to false
 */
export const setFirstVisitComplete = (): void => {
    try {
        localStorage.setItem(FIRST_VISIT_KEY, 'false');
    } catch (error) {
        console.error('Error setting first visit status:', error);
    }
};

/**
 * Resets the first visit flag when a user logs out
 */
export const resetFirstVisit = (): void => {
    try {
        localStorage.setItem(FIRST_VISIT_KEY, 'true');
    } catch (error) {
        console.error('Error resetting first visit status:', error);
    }
}; 