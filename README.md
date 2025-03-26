# Next.js To-Do App

## Overview
This is a simple and efficient To-Do application built using **Next.js** with **Redux** for state management. The app allows users to add, view, delete, and prioritize tasks while ensuring authentication-based access control. Task data is persistently stored using local storage.

## Features

### 📝 Task Management
- **Add Task**: Users can input a task and add it to the list by clicking the "Add" button or pressing Enter.
- **View Tasks**: All tasks are displayed in a structured list.
- **Delete Task**: Each task has a delete button that removes it from the list.
- **Task Prioritization**: Tasks can be marked with different priority levels (High, Medium, Low) for better organization.

### 🔐 User Authentication
- **Mock Authentication**: Uses Redux to simulate login/logout functionality.
- **Protected Access**: Tasks are only visible to logged-in users, ensuring privacy.

### 💾 Persistent Storage
- Uses **local storage** to save tasks and authentication status, ensuring data persists even after page reloads.

## Technologies Used
- **Next.js** (React Framework)
- **Redux** (State Management)
- **Tailwind CSS** (Styling)
- **Local Storage** (Data Persistence)

## Screenshots
### Home Page (Logged Out)
![Home Page](https://res.cloudinary.com/dphrayb6o/image/upload/v1742993518/Screenshot_2025-03-26_182139_ikbwpm.png)

### Task List (Logged In)
![Task List](https://res.cloudinary.com/dphrayb6o/image/upload/v1742993348/Screenshot_2025-03-26_181732_fktm1c.png)

### Task Prioritization
![Task Prioritization](https://res.cloudinary.com/dphrayb6o/image/upload/v1742993348/Screenshot_2025-03-26_181732_fktm1c.png)

## Installation & Setup
1. **Clone the repository:**
   ```sh
   git clone https://github.com/akashkumar30698/todo.git
   cd todo
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Run the development server:**
   ```sh
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage
1. Sign in to access the To-Do list.
2. Add tasks with priority levels.
3. Delete tasks when completed.
4. Sign out to secure your tasks.

## Folder Structure
```
/todo-app-nextjs
├── public/ (Contains images and static files)
├── src/
│   ├── components/ (UI components)
│   ├── pages/ (Next.js pages)
│   ├── store/ (Redux store & slices)
│   ├── styles/ (CSS & Tailwind configurations)
│   ├── utils/ (Helper functions)
│
├── package.json
├── README.md
├── .gitignore
```

## Contributing
Feel free to fork this repository and submit pull requests for improvements or bug fixes.

## License
This project is licensed under the MIT License.

---

Enjoy your productive To-Do app! 🚀

