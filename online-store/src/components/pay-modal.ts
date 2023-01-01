import { main, payWrapper} from "../index";

export const createPayModal = () => {
  payWrapper.classList.add("pay-wrapper");
  const modalContent = document.createElement("form");
  modalContent.classList.add("modal-content");
  const payClose = document.createElement("div");
  payClose.classList.add("pay-close");
  const personalDetails = document.createElement("div");
  personalDetails.classList.add("personal-details");
  const personalDetailsTitle = document.createElement("h2");
  personalDetailsTitle.classList.add("personal-details-title");
  personalDetailsTitle.innerHTML = "Personal details";
  const InputNameContainer = document.createElement("div");
  InputNameContainer.classList.add("pay-input-container");
  const inputName = document.createElement("input");
  inputName.classList.add("details-input-name");
  inputName.type = "text";
  inputName.placeholder = "Name";
  inputName.required = true;
  const inputPhoneContainer = document.createElement("div");
  inputPhoneContainer.classList.add("pay-input-container");
  const inputPhone = document.createElement("input");
  inputPhone.classList.add("details-input-phone");
  inputPhone.type = "text";
  inputPhone.placeholder = "Phone number";
  inputPhone.required = true;
  const inputAddressContainer = document.createElement("div");
  inputAddressContainer.classList.add("pay-input-container");
  const inputAddress = document.createElement("input");
  inputAddress.classList.add("details-input-address");
  inputAddress.type = "text";
  inputAddress.placeholder = "Delivery address";
  inputAddress.required = true;
  const inputEmailContainer = document.createElement("div");
  inputEmailContainer.classList.add("pay-input-container");
  const inputEmail = document.createElement("input");
  inputEmail.classList.add("details-input-email");
  inputEmail.type = "email";
  inputEmail.placeholder = "E-mail";
  inputEmail.required = true;
  const cardDetailsContainer = document.createElement("div");
  cardDetailsContainer.classList.add("card-details-container");
  const cardDetailsTitle = document.createElement("h2");
  cardDetailsTitle.classList.add("card-details-title");
  cardDetailsTitle.innerHTML = "Card details";
  const cardData = document.createElement("div");
  cardData.classList.add("card-data");
  const cardNumber = document.createElement("div");
  cardNumber.classList.add("card-number");
  const cardLogo = document.createElement("img");
  cardLogo.classList.add("card-logo");
  const cardNumberInput = document.createElement("input");
  cardNumberInput.type = "text";
  cardNumberInput.placeholder = "Card number";
  cardNumberInput.required = true;
  const cardOtherData = document.createElement("div");
  cardOtherData.classList.add("card-other-data");
  const dataValid = document.createElement("div");
  dataValid.classList.add("input-valid-container");
  dataValid.innerHTML = "Valid:";
  const validInput = document.createElement("input");
  validInput.type = "text";
  validInput.placeholder = "Valid Thru";
  validInput.maxLength = 5;
  validInput.minLength = 5;
  validInput.required = true;
  const dataCvv = document.createElement("div");
  dataCvv.innerHTML = "CVV:";
  dataCvv.classList.add("input-cvv-container");
  const cvvInput = document.createElement("input");
  cvvInput.type = "number";
  cvvInput.placeholder = "Code";
  cvvInput.maxLength = 3;
  cvvInput.required = true;
  const payButton = document.createElement("button");
  payButton.classList.add("pay-submit-button");
  payButton.type = "submit";
  payButton.innerHTML = "Confirm";
  const message = document.createElement("div");
  message.classList.add("pay-message");
  message.innerHTML = "Congratulations! Purchase completed successfully!";

  main.append(payWrapper);
  payWrapper.append(modalContent);
  modalContent.append(personalDetails);
  modalContent.append(payClose);
  personalDetails.append(personalDetailsTitle);
  personalDetails.append(InputNameContainer);
  InputNameContainer.append(inputName);
  personalDetails.append(inputPhoneContainer);
  inputPhoneContainer.append(inputPhone);
  personalDetails.append(inputAddressContainer);
  inputAddressContainer.append(inputAddress);
  personalDetails.append(inputEmailContainer);
  inputEmailContainer.append(inputEmail);
  modalContent.append(cardDetailsContainer);
  cardDetailsContainer.append(cardDetailsTitle);
  cardDetailsContainer.append(cardData);
  cardData.append(cardNumber);
  cardNumber.append(cardLogo);
  cardNumber.append(cardNumberInput);
  cardData.append(cardOtherData);
  cardOtherData.append(dataValid);
  dataValid.append(validInput);
  cardOtherData.append(dataCvv);
  dataCvv.append(cvvInput);
  modalContent.append(payButton);
  main.append(message);

  payClose.addEventListener("click", () => {
    payWrapper.style.display = "none";
  })


  inputName.addEventListener('blur', function() {
    let value = this.value;
    let check = /(^[A-Z]{1}[a-z|\'|\-]{2,} [A-Za-z|\'|\-]{3,}[A-Za-z|\s|\'|\-]{0,}$)|(^[А-Я]{1}[а-я|\'|\-]{2,14} [А-Яа-я|\'|\-]{3,}[А-Яа-я|\s|\'|\-]{0,}$)/.test(value);
    if (check) {
      inputName.style.border = "2px solid green";
    } else {
      inputName.style.border = "2px solid red";
    }
  });

  inputPhone.addEventListener('blur', function() {
    let value = this.value;
    let check = /^\+{1}\d{9,}$/.test(value);
    if (check) {
      inputPhone.style.border = "2px solid green";
    } else {
      inputPhone.style.border = "2px solid red";
    }
  });

  inputAddress.addEventListener('blur', function() {
    let value = this.value;
    let check = /^[A-Za-z|А-Яа-я|\'|\"|\-]{5,}[\s|\W]{1,2}[А-Яа-я|\w|\'|\"|\-]{5,}[\s|\W]{1,2}[А-Яа-я|\w|\'|\"|\-]{5,}[А-Яа-я|\w|\'|\"|\-|\s]{0,}$/.test(value);
    if (check) {
      inputAddress.style.border = "2px solid green";
    } else {
      inputAddress.style.border = "2px solid red";
    }
  });

  inputEmail.addEventListener('blur', function() {
    let value = this.value;
    let check = /^\w+@\w+\.\w+$/.test(value);
     if (check) {
      inputEmail.style.border = "2px solid green";
    } else {
      inputEmail.style.border = "2px solid red";
    }
  });

  cardNumberInput.addEventListener('blur', function() {
    let value = this.value;
    let check = /^[0-9]{16}$/.test(value);
     if (check) {
      cardNumberInput.style.border = "2px solid green";
    } else {
      cardNumberInput.style.border = "2px solid red";
    }
    if (value[0] == "4") {
      cardLogo.src = 'https://cdn.visa.com/v2/assets/images/logos/visa/blue/logo.png';
    }
    if (value[0] == "5") {
      cardLogo.src = 'http://localhost:8080/img/maestro-logo.png';
    }
    if (value[0] !== "4" && value[0] !== "5") {
      cardLogo.src = 'http://localhost:8080/img/MasterCard_logo.png';
    }6
  });

  validInput.addEventListener('input', function () {
    let val = this.value.replace(/[^0-9]/g, '');
    val = val !== '' ? val.match(/.{1,2}/g)?.join(`/`)! : ``;
    this.value = val;
  });


  cvvInput.addEventListener('blur', function() {
    let value = this.value;
    let check = /^[0-9]{3}$/.test(value);
    console.log(123)
     if (check) {
      cvvInput.style.border = "2px solid green";
    } else {
      cvvInput.style.border = "2px solid red";
    }
  });

  payButton.addEventListener("click", function() {
    message.style.display = "flex";
  })


  return modalContent;
}

