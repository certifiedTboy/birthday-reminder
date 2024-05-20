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
      alert("Please fill in all the fields");
      return;
    }
    // //send a successful message if birthday is scheduled
    // alert("Birthday Scheduled Successfully");

    const response = await fetch("http://localhost:3001/admin/birthday", {
      method: "POST",
      body: JSON.stringify(birthdayData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    console.log(data);
  } catch (error) {
    console.error(error);
  }
};

form.addEventListener("submit", scheduleBirthDay);
