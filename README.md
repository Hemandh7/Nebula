# FitGym 🏋️‍♂️🥗

FitGym is a comprehensive Fitness and tracking mobile application developed using React Native. It empowers users to track their fitness goals, connect with fitness trainers, and access personalized workout and nutrition plans.

![FitGym Logo](![logo2](https://github.com/Hemandh7/Nebula/assets/112857752/18a61c08-b196-437a-990d-e1fd19f9a315)
)


![FitGym Logo](link_to_your_logo_image)

![Project Screenshot 1](![proj1](https://github.com/Hemandh7/Nebula/assets/112857752/5405ce82-54bf-4608-8f84-b89e05651d09)
)
![Project Screenshot 2](![proj2](https://github.com/Hemandh7/Nebula/assets/112857752/70f3a6ed-f67e-4262-ace1-7edcbdef1609)
)

## Entities
### User
- Name (Text)
- Age (Number)
- Gender (Dropdown: Male, Female, Other)
- Height (Number)
- Weight (Number)
- Email (Text)
- Contact Number (Text)

### Trainer
- Name (Text)
- Gender (Dropdown: Male, Female, Other)
- Specialization (Text)
- Experience (Number)
- Email (Text)
- Contact Number (Text)

## Key Features
- **User and Trainer Profiles:** Manage user and trainer profiles with basic CRUD operations and detailed profile information.
- **Fitness Plans:** Create workout and nutrition plans tailored to users' fitness goals.
- **Logs and Tracking:** Log daily workouts and dietary activities, set fitness goals, and track progress over time.
- **Dashboard and Insights:** Provide users with an overview of their fitness journey, including active plans, current goals, and progress status.


  

Backend API will be accessible at `https://fitgym-backend.onrender.com`.

## API Endpoints
- **User Registration [POST]**: `/user/signup`
- **Trainer Registration [POST]**: `/trainer/signup`
- **Login (both user and trainer) [POST]**: `/user/login`

- **Create New Workout [POST]**: `/create/workout`
- **All Workout Plans only, no exercises [GET]**: `/all/workoutplans`
- **All Exercises only [GET]**: `/all/exercise`

- **Create New Nutrition Plan [POST]**: `/create/nutrition`
- **All Nutrition Plans only, no food [GET]**: `/all/nutritionplans`
- **All Food only [GET]**: `/all/food`

- **Create New Goal [POST]**: `/goal/create`
- **Update Goal [POST]**: `/goal/update`
- **All Goals [GET]**: `/all/goal`

- **Create New Activity [POST]**: `/activity/create`
- **All Activities [GET]**: `/all/activity`

You can use these API endpoints to interact with the FitGym backend.

## Deployment
- [Frontend Deployment](https://drive.google.com/file/d/1jc0sBqlSflhrwSeTaRCce73JaQujWGkZ/view?usp=sharing)
- [Backend Deployment](https://fitgym-backend.onrender.com)




## Contact
If you have any questions or suggestions, please feel free to open an issue or contact us at hemandh@example.com. 📬

Happy fitness tracking! 💪🏼🥦

