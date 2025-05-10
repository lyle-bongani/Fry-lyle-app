import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChefHat } from 'lucide-react';
import { isFirstVisit, setFirstVisitComplete, getLastRoute } from '../services/routeService';
import { useAuth } from '../contexts/AuthContext';

export default function SplashPage() {
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    const [fadeOut, setFadeOut] = useState(false);
    const [showLogo, setShowLogo] = useState(false);
    const [showCircle, setShowCircle] = useState(false);
    const [shakeAnimation, setShakeAnimation] = useState(false);

    useEffect(() => {
        // Show logo coming from left after 500ms
        const logoTimer = setTimeout(() => {
            setShowLogo(true);
        }, 500);

        // Show circle coming from right after 1200ms
        const circleTimer = setTimeout(() => {
            setShowCircle(true);
        }, 1200);

        // Start shake animation after both elements are visible
        const shakeTimer = setTimeout(() => {
            setShakeAnimation(true);
        }, 2200);

        // Stop shaking and begin fade out
        const fadeTimer = setTimeout(() => {
            setShakeAnimation(false);
            setFadeOut(true);
        }, 3500);

        // Navigate after animation (total of 4.5 seconds)
        const navigationTimer = setTimeout(() => {
            const firstVisit = isFirstVisit();

            // If user is logged in and it's not the first visit of the session,
            // go to the last visited page
            if (currentUser && !firstVisit) {
                const lastRoute = getLastRoute();
                navigate(lastRoute);
            } else if (currentUser) {
                // User is logged in but first visit of the session
                navigate('/home');
            } else {
                // Not logged in, go to welcome page
                navigate('/welcome');
            }

            // Mark the first visit as complete
            setFirstVisitComplete();
        }, 4500);

        return () => {
            clearTimeout(logoTimer);
            clearTimeout(circleTimer);
            clearTimeout(shakeTimer);
            clearTimeout(fadeTimer);
            clearTimeout(navigationTimer);
        };
    }, [navigate, currentUser]);

    return (
        <div
            className={`fixed inset-0 bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center z-50 transition-opacity duration-1000 ease-in-out ${fadeOut ? 'opacity-0' : 'opacity-100'
                }`}
        >
            <div className="relative">
                {/* White circle container - comes from right */}
                <div
                    className={`transition-all duration-700 ease-out ${showCircle ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
                        } ${shakeAnimation ? 'animate-wiggle' : ''}`}
                >
                    <div className="bg-white p-6 rounded-full shadow-lg">
                        {/* Empty space for logo to overlay */}
                        <div className="w-24 h-24"></div>
                    </div>
                </div>

                {/* Chef hat logo - comes from left */}
                <div
                    className={`absolute top-6 left-6 transition-all duration-700 ease-out ${showLogo ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
                        } ${shakeAnimation ? 'animate-wiggle' : ''}`}
                >
                    <ChefHat className="w-24 h-24 text-orange-500" />
                </div>
            </div>
        </div>
    );
}

// Add this to your global CSS file or in a style tag in your component
// You can add this in your tailwind.config.js under theme.extend.keyframes and theme.extend.animation
/*
@keyframes wiggle {
  0%, 100% { transform: rotate(-3deg); }
  50% { transform: rotate(3deg); }
}
.animate-wiggle {
  animation: wiggle 0.5s ease-in-out infinite;
}
*/