import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiMail, HiLockClosed, HiUser, HiOfficeBuilding } from 'react-icons/hi';
import { useAuth } from '../../context/AuthContext';

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    accountType: 'candidate',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setIsLoading(true);
    
    // Create a new user object
    setTimeout(() => {
      const userData = {
        id: Date.now().toString(),
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        fullName: `${formData.firstName} ${formData.lastName}`,
        accountType: formData.accountType,
        createdAt: new Date().toISOString()
      };
      
      // Log in the user immediately after registration
      signIn(userData);
      setIsLoading(false);
      
      // Redirect based on account type
      if (formData.accountType === 'candidate') {
        navigate('/profile');
      } else {
        navigate('/dashboard');
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white py-12 px-4">
      <div className="max-w-lg w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-slate-100">
        <div>
          <h2 className="text-center text-3xl font-bold text-primary mb-2">Create your account</h2>
          <p className="text-center text-sm text-slate-500 mb-6">
            Already have an account?{' '}
            <Link to="/signin" className="font-medium text-secondary hover:underline">Sign in</Link>
          </p>
        </div>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium mb-1">First name</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <HiUser className="h-5 w-5 text-slate-400" />
                </span>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleChange}
                  autoComplete="given-name"
                  className={`appearance-none rounded-lg block w-full pl-10 py-3 px-4 border ${errors.firstName ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-white'} text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent`}
                  placeholder="First name"
                />
              </div>
              {errors.firstName && <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>}
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium mb-1">Last name</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <HiUser className="h-5 w-5 text-slate-400" />
                </span>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleChange}
                  autoComplete="family-name"
                  className={`appearance-none rounded-lg block w-full pl-10 py-3 px-4 border ${errors.lastName ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-white'} text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent`}
                  placeholder="Last name"
                />
              </div>
              {errors.lastName && <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>}
            </div>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">Email address</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <HiMail className="h-5 w-5 text-slate-400" />
              </span>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                className={`appearance-none rounded-lg block w-full pl-10 py-3 px-4 border ${errors.email ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-white'} text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent`}
                placeholder="Email address"
              />
            </div>
            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <HiLockClosed className="h-5 w-5 text-slate-400" />
              </span>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="new-password"
                className={`appearance-none rounded-lg block w-full pl-10 py-3 px-4 border ${errors.password ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-white'} text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent`}
                placeholder="Password"
              />
            </div>
            {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">Confirm Password</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <HiLockClosed className="h-5 w-5 text-slate-400" />
              </span>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                autoComplete="new-password"
                className={`appearance-none rounded-lg block w-full pl-10 py-3 px-4 border ${errors.confirmPassword ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-white'} text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent`}
                placeholder="Confirm Password"
              />
            </div>
            {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">I am a:</label>
            <div className="grid grid-cols-2 gap-4">
              <div
                className={`cursor-pointer p-4 rounded-lg border ${formData.accountType === 'candidate' ? 'border-secondary bg-secondary/10' : 'border-slate-200 bg-white'} flex items-center justify-center gap-2 text-slate-700`}
                onClick={() => setFormData({ ...formData, accountType: 'candidate' })}
              >
                <HiUser className="h-5 w-5" />
                <span>Job Seeker</span>
              </div>
              <div
                className={`cursor-pointer p-4 rounded-lg border ${formData.accountType === 'employer' ? 'border-secondary bg-secondary/10' : 'border-slate-200 bg-white'} flex items-center justify-center gap-2 text-slate-700`}
                onClick={() => setFormData({ ...formData, accountType: 'employer' })}
              >
                <HiOfficeBuilding className="h-5 w-5" />
                <span>Employer</span>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              className="h-4 w-4 border-slate-300 rounded focus:ring-secondary"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-slate-500">
              I agree to the <a href="#" className="font-medium text-secondary hover:underline">Terms and Privacy Policy</a>
            </label>
          </div>
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full text-base font-semibold"
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5 mx-auto text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                'Create Account'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;