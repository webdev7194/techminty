// ================= FIREBASE IMPORTS (TOP ONLY) =================
import { initializeApp } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
(function(){
      emailjs.init({
        publicKey: "-6OGkhSfr80DEYgsD",
      });
   })();
import {
  getFirestore,
  collection,
  addDoc
} from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// ================= FIREBASE CONFIG =================
const firebaseConfig = {
  apiKey: "AIzaSyDLJGTj9m_TXSNA2xH7klTJxdhu-B8iwv8",
  authDomain: "techminty-blogs.firebaseapp.com",
  projectId: "techminty-blogs",
  storageBucket: "techminty-blogs.firebasestorage.app",
  messagingSenderId: "845264904960",
  appId: "1:845264904960:web:a28e8f270b837ff78249e5"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ================= UI ELEMENTS =================
const buttons = document.querySelectorAll(".support-btn");
const checkoutBox = document.getElementById("checkoutBox");
const qrImage = document.getElementById("qrImage");
const form = document.getElementById("supportForm");

let selectedAmount = null;

// ================= QR SELECTION =================
buttons.forEach(btn => {
  btn.addEventListener("click", (e) => {
    const card = e.target.closest(".support-card");
    selectedAmount = card.dataset.amount;

    qrImage.src = `images/qr-${selectedAmount}.png`;
    document.getElementById("supportAmount").value = selectedAmount;

    checkoutBox.style.display = "block";
    checkoutBox.scrollIntoView({ behavior: "smooth" });
  });
});

// ================= FORM SUBMIT =================
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("supportEmail").value;

  if (!email || !selectedAmount) {
    alert("Please select a support amount and enter your email");
    return;
  }

  var templateParams = {
  'name': email,
  'email': email,
};

    emailjs.send('service_ve4ant8', 'template_m0y2z4k', templateParams).then(
  (response) => {
    console.log('SUCCESS!', response.status, response.text);
  },
  (error) => {
    console.log('FAILED...', error);
  },
    );
  

  // 🔹 Save to Firebase
  await addDoc(collection(db, "email"), {
    email: email,
    amt: selectedAmount
  });

  // 🔹 Thank-you UI
  form.innerHTML = `
    <p style="font-size:1.2rem;font-weight: bold">
      Thank you for supporting Techminty ❤️ 
    </p>
    <p>Thanks <strong>${email}</strong></p>
  `;
});