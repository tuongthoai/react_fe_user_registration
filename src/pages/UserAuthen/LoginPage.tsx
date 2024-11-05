import { useForm } from "react-hook-form";
import NavBar from "../Common/NavBar";
import { useNavigate } from "react-router-dom";

type LoginFormInputs = {
  username: string;
  password: string;
};

const LoginPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const tok = localStorage.getItem("token");

  const navigate = useNavigate(); // Hook for navigation
  const url = import.meta.env.VITE_API_BASE_URL + "/user/login";
  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Login successful", result);
        localStorage.setItem("token", result.access_token);
        localStorage.setItem("username", result.username); // Store the token
        // Redirect or update UI as needed
        navigate("/profile");
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error logging in", error);
    }
  };

  return (
    <>
      <NavBar loggedIn={!!tok} />
      <div className="max-w-md mx-auto mt-10 p-8 border rounded shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Username Field */}
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              {...register("username", { required: "Username is required" })}
              className="w-full px-3 py-2 border rounded"
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username.message}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="w-full px-3 py-2 border rounded"
              autoComplete="new-password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
