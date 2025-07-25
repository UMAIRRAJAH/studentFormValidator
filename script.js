// script.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getDatabase, ref, push, set, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";

import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-analytics.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBZcXcyEty5utWjJyMczuyRRS3kfDACHMw",
  authDomain: "fir-online-signup.firebaseapp.com",
  projectId: "fir-online-signup",
  storageBucket: "fir-online-signup.appspot.com",
  messagingSenderId: "992028341067",
  appId: "1:992028341067:web:03dc8d3cb38866a777aece",
  measurementId: "G-9KGNP5C3SQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
getAnalytics(app);

// Form submission handler
const studentForm = document.getElementById("studentForm");

studentForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const fullName = document.getElementById("fullName").value.trim();
  const rollNo = document.getElementById("rollNo").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const gender = document.querySelector('input[name="gender"]:checked')?.value;
  const department = document.getElementById("department").value.trim();
  const address = document.getElementById("address").value.trim();

  if (!fullName || !rollNo || !email || !phone || !gender || !department || !address) {
    alert("Please fill out all fields.");
    return;
  }

  try {
    const db = getDatabase(app);
const studentsRef = ref(db, "students");

await push(studentsRef, {
  fullName,
  rollNo,
  email,
  phone,
  gender,
  department,
  address,
  createdAt: serverTimestamp()
});


    document.getElementById("successMsg").classList.remove("d-none");
    studentForm.reset();
  } catch (error) {
    console.error("Error adding student:", error);
    alert("Error submitting data. Check console.");
  }
});
