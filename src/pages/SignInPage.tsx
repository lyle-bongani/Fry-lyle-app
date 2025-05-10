import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ChefHat, ArrowRight } from 'lucide-react';
import PageLayout from '../components/PageLayout';
import { useAuth } from '../contexts/AuthContext';

export default function SignInPage() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            // Sign in with our auth context
            await login(email, password);

            // If login successful, redirect to home page
            navigate('/home');
        } catch (error: any) {
            console.error('Login error:', error);

            // Handle specific Firebase auth errors
            if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
                setError('Invalid email or password');
            } else if (error.code === 'auth/too-many-requests') {
                setError('Too many failed login attempts. Please try again later.');
            } else {
                setError('Failed to sign in. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <PageLayout className="bg-white">
            <div className="flex flex-col items-center justify-center min-h-[80vh] w-full max-w-md mx-auto px-4">
                {/* Logo and Heading */}
                <div className="mb-8 text-center">
                    <div className="flex items-center justify-center mb-6">
                        <div className="bg-orange-500 p-3 rounded-full relative">
                            <ChefHat className="w-8 h-8 text-white" />
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome back</h1>
                    <p className="text-gray-600">Sign in to your Fry Lyle account</p>
                </div>

                {/* Sign In Form */}
                <form onSubmit={handleSignIn} className="w-full space-y-4">
                    {/* Error message */}
                    {error && (
                        <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded-md" role="alert">
                            <p>{error}</p>
                        </div>
                    )}

                    {/* Email Input */}
                    <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email Address
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="email"
                                id="email"
                                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    {/* Password Input */}
                    <div className="space-y-2">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <EyeOff className="h-5 w-5 text-gray-400" />
                                ) : (
                                    <Eye className="h-5 w-5 text-gray-400" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Remember me and Forgot Password */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300 rounded"
                                checked={rememberMe}
                                onChange={() => setRememberMe(!rememberMe)}
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                                Remember me
                            </label>
                        </div>
                        <div className="text-sm">
                            <Link to="/forgot-password" className="font-medium text-orange-500 hover:text-orange-600">
                                Forgot your password?
                            </Link>
                        </div>
                    </div>

                    {/* Sign In Button */}
                    <button
                        type="submit"
                        className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''
                            }`}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : null}
                        {isLoading ? "Signing in..." : "Sign in"}
                    </button>

                    {/* Divider */}
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">Or continue with</span>
                        </div>
                    </div>

                    {/* Social Logins */}
                    <div className="grid grid-cols-3 gap-3">
                        <button
                            type="button"
                            className="py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                        >
                            <span className="sr-only">Sign in with Google</span>
                            <svg className="h-5 w-5 mx-auto" viewBox="0 0 24 24" fill="currentColor">
                                <path
                                    d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                                />
                            </svg>
                        </button>
                        <button
                            type="button"
                            className="py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                        >
                            <span className="sr-only">Sign in with Facebook</span>
                            <svg className="h-5 w-5 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                                <path
                                    fillRule="evenodd"
                                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                        <button
                            type="button"
                            className="py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                        >
                            <span className="sr-only">Sign in with Apple</span>
                            <svg className="h-5 w-5 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                                <path
                                    fillRule="evenodd"
                                    d="M12.146 0c.66.028 1.377.292 1.987.592 1.012.484 1.904 1.324 2.309 2.309.22-.088.704-.264.924-.308a5.42 5.42 0 012.244.044c1.012.264 1.947.836 2.618 1.596a5.118 5.118 0 011.454 2.926 2.88 2.88 0 00-1.234 1.364c-.396.704-.572 1.54-.484 2.332.088.792.352 1.584.88 2.156a4.687 4.687 0 01-1.947 2.64 5.2 5.2 0 01-1.851.748c-.594.117-1.197.166-1.785.095a7.552 7.552 0 01-1.168-.205c-.264-.059-.528-.132-.792-.22-.242-.073-.477-.161-.704-.264a6.886 6.886 0 01-3.046 0 5.415 5.415 0 01-.704.264c-.264.088-.528.161-.792.22-.374.088-.77.161-1.168.205-.6.07-1.203.022-1.785-.095a5.128 5.128 0 01-1.851-.748 4.687 4.687 0 01-1.947-2.64c.528-.572.792-1.364.88-2.156.088-.792-.088-1.628-.484-2.332A2.88 2.88 0 00.66 7.467a5.118 5.118 0 011.454-2.926A5.571 5.571 0 14.73 2.945a5.42 5.42 0 012.244-.044c.22.044.704.22.924.308.29-.66.82-1.276 1.541-1.76.55-.37 1.377-.66 2.167-.775C11.827.63 12.015.63 12.146 0zM8.891 5.952c-.044-.07-.088-.147-.132-.191a3.622 3.622 0 00-.88-.836 4.063 4.063 0 00-1.407-.66 2.895 2.895 0 00-.88-.117c-.279 0-.57.029-.836.088-.264.044-.512.146-.748.264-.242.111-.468.25-.671.411a3.724 3.724 0 00-.968 1.32c-.103.22-.19.44-.25.66-.07.237-.117.481-.147.726a4.755 4.755 0 00.307 2.398 3.913 3.913 0 001.76 1.852c.073.042.151.075.22.102.088.044.176.073.264.117.088.029.176.059.264.088a4.479 4.479 0 001.144.176c.22 0 .44-.044.66-.088.205-.044.396-.117.572-.205.176-.088.337-.19.483-.315a.874.874 0
                  00.41-.71v-4.482c-.01-.243-.08-.477-.165-.677zM15.39 5.16a3.63 3.63 0 00-.88.836c-.044.044-.088.117-.132.19-.089.2-.155.435-.169.678v4.484a.874.874 0 00.41.705.2.2 0 00.088.059c.132.088.264.161.396.22.176.088.366.161.572.205.22.044.44.088.66.088.396 0 .77-.044 1.144-.176.088-.29.176-.059.264-.088l.264-.117c.073-.027.146-.058.22-.102a3.913 3.913 0 001.76-1.851 4.755 4.755 0 00.308-2.398c-.03-.245-.078-.49-.147-.726a2.989 2.989 0 00-.25-.66 3.657 3.657 0 00-.968-1.32 3.992 3.992 0 00-.671-.41 2.895 2.895 0 00-.748-.265 4.502 4.502 0 00-.836-.088c-.308 0-.594.05-.88.117a4.063 4.063 0 00-1.407.66z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                    </div>
                </form>

                {/* Sign Up Link */}
                <div className="mt-8 text-center">
                    <p className="text-sm text-gray-600">
                        Don't have an account?{" "}
                        <Link to="/signup" className="font-medium text-orange-500 hover:text-orange-600">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </PageLayout>
    );
} 