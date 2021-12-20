import { useState } from "react";
function App() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  let buttonsToRender = (isUserLoggedIn) => {
    if (isUserLoggedIn) {
      return (
        <section>
          <div>
            <button>Register</button>
          </div>
          <div>
            <button>Login</button>
          </div>
        </section>
      );
    }
    return (
      <section>
        <div>
          <button>Workout</button>
        </div>
      </section>
    );
  };

  return (
    <div>
      <section>
        <div className="text-3xl font-bold ">Get Stronger</div>
        <div className="text-3xl font-bold ">Be Consistent</div>
        <div className="text-3xl font-bold ">See Results</div>
      </section>
      {buttonsToRender(isUserLoggedIn)}
      <section>
        <div>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_7_163)">
              <path
                d="M11 4.99998H6C5.46957 4.99998 4.96086 5.21069 4.58579 5.58577C4.21071 5.96084 4 6.46955 4 6.99998V18C4 18.5304 4.21071 19.0391 4.58579 19.4142C4.96086 19.7893 5.46957 20 6 20H17C17.5304 20 18.0391 19.7893 18.4142 19.4142C18.7893 19.0391 19 18.5304 19 18V13L11 4.99998ZM17.586 3.58598C17.7705 3.39496 17.9912 3.24259 18.2352 3.13778C18.4792 3.03296 18.7416 2.97779 19.0072 2.97548C19.2728 2.97317 19.5361 3.02377 19.7819 3.12434C20.0277 3.2249 20.251 3.3734 20.4388 3.56119C20.6266 3.74897 20.7751 3.97228 20.8756 4.21807C20.9762 4.46386 21.0268 4.72722 21.0245 4.99278C21.0222 5.25834 20.967 5.52078 20.8622 5.76479C20.7574 6.0088 20.605 6.22949 20.414 6.41398L11.828 15H9V12.172L17.586 3.58598Z"
                stroke="#3B82F6"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_7_163">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>

          <p>Track sets, reps and weight</p>
        </div>
        <div>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 7V3V7ZM16 7V3V7ZM7 11H17H7ZM5 21H19C19.5304 21 20.0391 20.7893 20.4142 20.4142C20.7893 20.0391 21 19.5304 21 19V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H5C4.46957 5 3.96086 5.21071 3.58579 5.58579C3.21071 5.96086 3 6.46957 3 7V19C3 19.5304 3.21071 20.0391 3.58579 20.4142C3.96086 20.7893 4.46957 21 5 21Z"
              stroke="#3B82F6"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          <p>View previous workouts</p>
        </div>
        <div>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 9V12V9ZM18 12V15V12ZM18 12H21H18ZM18 12H15H18ZM13 7C13 8.06087 12.5786 9.07828 11.8284 9.82843C11.0783 10.5786 10.0609 11 9 11C7.93913 11 6.92172 10.5786 6.17157 9.82843C5.42143 9.07828 5 8.06087 5 7C5 5.93913 5.42143 4.92172 6.17157 4.17157C6.92172 3.42143 7.93913 3 9 3C10.0609 3 11.0783 3.42143 11.8284 4.17157C12.5786 4.92172 13 5.93913 13 7V7ZM3 20C3 18.4087 3.63214 16.8826 4.75736 15.7574C5.88258 14.6321 7.4087 14 9 14C10.5913 14 12.1174 14.6321 13.2426 15.7574C14.3679 16.8826 15 18.4087 15 20V21H3V20Z"
              stroke="#3B82F6"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          <p>Add your own exercises</p>
        </div>
        <div>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 19V13C9 12.4696 8.78929 11.9609 8.41421 11.5858C8.03914 11.2107 7.53043 11 7 11H5C4.46957 11 3.96086 11.2107 3.58579 11.5858C3.21071 11.9609 3 12.4696 3 13V19C3 19.5304 3.21071 20.0391 3.58579 20.4142C3.96086 20.7893 4.46957 21 5 21H7C7.53043 21 8.03914 20.7893 8.41421 20.4142C8.78929 20.0391 9 19.5304 9 19ZM9 19V9C9 8.46957 9.21071 7.96086 9.58579 7.58579C9.96086 7.21071 10.4696 7 11 7H13C13.5304 7 14.0391 7.21071 14.4142 7.58579C14.7893 7.96086 15 8.46957 15 9V19H9ZM9 19C9 19.5304 9.21071 20.0391 9.58579 20.4142C9.96086 20.7893 10.4696 21 11 21H13C13.5304 21 14.0391 20.7893 14.4142 20.4142C14.7893 20.0391 15 19.5304 15 19H9ZM15 19V5C15 4.46957 15.2107 3.96086 15.5858 3.58579C15.9609 3.21071 16.4696 3 17 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H17C16.4696 21 15.9609 20.7893 15.5858 20.4142C15.2107 20.0391 15 19.5304 15 19Z"
              stroke="#3B82F6"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          <p>Comprehensive statistics</p>
        </div>
      </section>
    </div>
  );
}

export default App;
