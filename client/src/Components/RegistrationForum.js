import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/auth-service";

export default function RegistrationForum() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Redirect the user if they are logged in
  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user) {
      navigate("/home");
    }
  }, []);

  // Update the email/password of the user
  const handleUserChange = (e) => {
    setError("");
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  // Sign the user in if valid credentials
  const handleFormSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();
    authService
      .signup(user.email, user.password)
      .then(() => {
        setIsLoading(false);
        navigate("/login");
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err.response.data);
      });
  };

  return (
    <form
      className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 mx-3"
      onSubmit={handleFormSubmit}
    >
      <span className="text-xs flex justify-center mb-2 text-red-500">
        {error}
      </span>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="email"
        >
          Email
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline invalid:border-red-500"
          id="email"
          type="email"
          placeholder="example@mail.com"
          name="email"
          value={user.email}
          onChange={handleUserChange}
          required
        />
      </div>
      <div className="mb-6">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="password"
        >
          Password
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline invalid:border-red-500"
          id="password"
          type="password"
          placeholder="******************"
          name="password"
          value={user.password}
          onChange={handleUserChange}
          required
          minLength="6"
        />
      </div>
      <div className="flex items-center justify-between">
        <input
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:cursor-pointer"
          type="submit"
          value={isLoading ? "..." : "Sign up"}
        />
      </div>
    </form>
  );
}
