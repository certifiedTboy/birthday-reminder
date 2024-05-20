const form = document.getElementById("form"); // this is the form
const emailInput = document.getElementById("email-input"); // this is the email input field
const firstNameInput = document.getElementById("first-name-input"); // this is the first name input field
const lastNameInput = document.getElementById("last-name-input"); // this is the last name input field
const dateOfBirthInput = document.getElementById("day-of-birth-input"); // this is the date of birth input field

const scheduleBirthDay = async (event) => {
  event.preventDefault();
  const birthdayData = {
    firstName: firstNameInput.value,
    lastName: lastNameInput.value,
    dateOfBirth: dateOfBirthInput.value,
    email: emailInput.value,
  };

  try {
    //validate the email
    if (
      !birthdayData.email.includes("@") ||
      !birthdayData.email.includes(".") ||
      birthdayData.email.length < 5
    ) {
      alert("Please enter a valid email address");
      return;
    }

    //validate the inputs
    if (
      !birthdayData.firstName ||
      !birthdayData.lastName ||
      !birthdayData.dateOfBirth ||
      !birthdayData.email
    ) {
      return alert("Please fill in all the fields");
    }

    const response = await fetch(
      "https://birthday-reminder-nmsv.onrender.com/admin/birthday",
      {
        method: "POST",
        body: JSON.stringify(birthdayData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return alert("failed to add birthday data");
    }

    // send success message alert to client
    return alert("Birthday data added successfully");
  } catch (error) {
    alert("Something went wrong");
    console.error(error);
  }
};

form.addEventListener("submit", scheduleBirthDay);
