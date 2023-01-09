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
  inputName.dataset.rule = "name";
  const inputPhoneContainer = document.createElement("div");
  inputPhoneContainer.classList.add("pay-input-container");
  const inputPhone = document.createElement("input");
  inputPhone.classList.add("details-input-phone");
  inputPhone.type = "text";
  inputPhone.placeholder = "Phone number";
  inputPhone.dataset.rule = "phone";
  const inputAddressContainer = document.createElement("div");
  inputAddressContainer.classList.add("pay-input-container");
  const inputAddress = document.createElement("input");
  inputAddress.classList.add("details-input-address");
  inputAddress.type = "text";
  inputAddress.placeholder = "Delivery address";
  inputAddress.dataset.rule = "address";
  const inputEmailContainer = document.createElement("div");
  inputEmailContainer.classList.add("pay-input-container");
  const inputEmail = document.createElement("input");
  inputEmail.classList.add("details-input-email");
  inputEmail.type = "email";
  inputEmail.placeholder = "E-mail";
  inputEmail.dataset.rule = "email";
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
  cardNumberInput.dataset.rule = "card-num";
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
  validInput.dataset.rule = "card-data";
  const dataCvv = document.createElement("div");
  dataCvv.innerHTML = "CVV:";
  dataCvv.classList.add("input-cvv-container");
  const cvvInput = document.createElement("input");
  cvvInput.type = "number";
  cvvInput.placeholder = "Code";
  cvvInput.maxLength = 3;
  cvvInput.dataset.rule = "card-code";
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
  });

  let validName = /(^[A-Z]{1}[a-z|\'|\-]{2,} [A-Za-z|\'|\-]{3,}[A-Za-z|\s|\'|\-]{0,}$)|(^[А-Я]{1}[а-я|\'|\-]{2,14} [А-Яа-я|\'|\-]{3,}[А-Яа-я|\s|\'|\-]{0,}$)/;
  let validPhone = /^\+{1}\d{9,}$/;
  let validAddress = /^[A-Za-z|А-Яа-я|\'|\"|\-]{5,}[\s|\W]{1,2}[А-Яа-я|\w|\'|\"|\-]{5,}[\s|\W]{1,2}[А-Яа-я|\w|\'|\"|\-]{5,}[А-Яа-я|\w|\'|\"|\-|\s]{0,}$/;
  let validEmail = /^\w+@\w+\.\w+$/;
  let validCardNumber = /^[0-9]{16}$/;
  let validCvv = /^[0-9]{3}$/;

  const inputs = document.querySelectorAll("input[data-rule]") as NodeListOf<HTMLInputElement>;
  
  inputName.addEventListener('blur', function() {
    if (validName.test(inputName.value)) {
      inputName.style.border = "2px solid green";
    } else {
      inputName.style.border = "2px solid red";
    };
  });

  inputPhone.addEventListener('blur', function() {
    if (validPhone.test(inputPhone.value)) {
      inputPhone.style.border = "2px solid green";
    } else {
      inputPhone.style.border = "2px solid red";
    };
  });

  inputAddress.addEventListener('blur', function() {
    if (validAddress.test(inputAddress.value)) {
      inputAddress.style.border = "2px solid green";
    } else {
      inputAddress.style.border = "2px solid red";
    };
  });

  inputEmail.addEventListener('blur', function() {
     if (validEmail.test(inputEmail.value)) {
      inputEmail.style.border = "2px solid green";
    } else {
      inputEmail.style.border = "2px solid red";
    };
  });

  cardNumberInput.addEventListener('blur', function() {
     if (validCardNumber.test(cardNumberInput.value)) {
      cardNumberInput.style.border = "2px solid green";
    } else {
      cardNumberInput.style.border = "2px solid red";
    };

    if (cardNumberInput.value[0] == "4") {
      cardLogo.src = 'https://cdn.visa.com/v2/assets/images/logos/visa/blue/logo.png';
    };
    if (cardNumberInput.value[0] == "5") {
      cardLogo.src = 'https://w7.pngwing.com/pngs/698/964/png-transparent-maestro-debit-card-logo-mastercard-mastercard-text-trademark-payment.png';
    };
    if (cardNumberInput.value[0] !== "4" && cardNumberInput.value[0] !== "5") {
      cardLogo.src = 'https://w7.pngwing.com/pngs/648/903/png-transparent-mastercard-logo-logo-payment-visa-mastercard-paypal-mastercard-icon-text-service-mobile-payment.png';
    };
  });

  validInput.addEventListener('input', function () {
    let val = this.value.replace(/[^0-9]/g, '');
    val = val !== '' ? val.match(/.{1,2}/g)?.join(`/`)! : ``;
    this.value = val;
  });

  cvvInput.addEventListener('blur', function() {
     if (validCvv.test(cvvInput.value)) {
      cvvInput.style.border = "2px solid green";
    } else {
      cvvInput.style.border = "2px solid red";
    };
  });

  modalContent.addEventListener('submit', function (event) {
    event.preventDefault();

    const errors = modalContent.querySelectorAll('.error') as NodeListOf<HTMLDivElement>;
    for (let i = 0; i < errors.length; i++) {
      errors[i].remove();
    };

    for (let i = 0; i < inputs.length; i++) {
      if (!inputs[i].value) {
        let error = document.createElement('div');
        error.className='error';
        error.style.color = 'red';
        error.innerHTML = 'error';
        modalContent[i].parentElement!.insertBefore(error, inputs[i]);
      };

      if (validName.test(inputName.value) && validPhone.test(inputPhone.value) && validAddress.test(inputAddress.value) && validEmail.test(inputEmail.value) && validCardNumber.test(cardNumberInput.value) && validCvv.test(cvvInput.value)) {
       message.style.display = "flex";
       setTimeout( 'location="index.html";', 3000 );
      };
    };
  });

  return modalContent;
};