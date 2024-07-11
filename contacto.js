const form = document.querySelector("form");
const fullName = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const subject = document.getElementById("subject");
const mess = document.getElementById("message");

function sendEmail() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    name: fullName.value,
    email: email.value,
    phone: phone.value,
    subject: subject.value,
    message: mess.value,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("https://email-sender-livid-seven.vercel.app/send", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      if (result?.data?.id) {
        Swal.fire({
          title: "Sucesso!",
          text: "Mensagem enviada com sucesso!",
          icon: "success",
        });
      }
    })
    .catch((error) => console.log("error", error));
}

function checkInputs() {
  const items = document.querySelectorAll(".item");

  for (const item of items) {
    if (item.value == "") {
      item.classList.add("error");
      item.parentElement.classList.add("error");
    }

    if (items[1].value != "") {
      checkEmail();
    }

    items[1].addEventListener("keyup", () => {
      checkEmail();
    });

    item.addEventListener("keyup", () => {
      if (item.value != "") {
        item.classList.remove("error");
        item.parentElement.classList.remove("error");
      } else {
        item.classList.add("error");
        item.parentElement.classList.add("error");
      }
    });
  }
}

function checkEmail() {
  const emailRegex = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/;
  const errorTxtEmail = document.querySelector(".error-txt.email");

  if (!email.value.match(emailRegex)) {
    email.classList.add("error");
    email.parentElement.classList.add("error");
    errorTxtEmail.innerText = email.value
      ? "Digite um endereço de e-mail válido"
      : "Endereço de e-mail não pode ficar em branco";
  } else {
    email.classList.remove("error");
    email.parentElement.classList.remove("error");
    errorTxtEmail.innerText = "";
  }
}

// Ouça o evento de envio no formulário
form.addEventListener("submit", (e) => {
  e.preventDefault(); // Impedir o envio do formulário
  checkInputs();
  if (document.querySelectorAll(".error").length === 0) {
    sendEmail(); // Chame a função sendEmail

    form.reset();
    return false;
  }
});
