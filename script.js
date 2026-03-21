document.addEventListener('DOMContentLoaded', () => {
    const itemaddBtn = document.querySelectorAll('.service-btn');
    const servicePrice = document.querySelectorAll('.price');
    const serviceName = document.querySelectorAll('.service-name');
    const itemError = document.querySelector('.item-error');
    const booknowBtn = document.querySelector('.book-now-btn');
    const clientserviceRequest = document.querySelectorAll('.Client-request-input');
    const bookingSection = document.querySelector('.adding-item-booking-section');
    const bookingForm = document.getElementById('requestForm');
    const resetList = document.querySelector('.reset-list');
    const newsletterform = document.getElementById('newsletterSubscribe');
    const newssubscribeforminputvalue = document.querySelectorAll('.subscribeuserInput');
    const menuIcon = document.querySelector('.menu-icon');
    const menuLinks = document.querySelector('.mobile-menus');

    menuIcon.addEventListener('click', () => {
        menuLinks.classList.toggle('Navshow');

        menuIcon.classList.toggle('fa-bars');
        menuIcon.classList.toggle('fa-xmark');
    });

    let services = [];

    function serviceTable() {
        const tbody = document.querySelector('.service-list-body');
        tbody.innerHTML = "";

        services.forEach((item, index) => {
            const tr = document.createElement('tr');
            tr.classList.add('userService');
            tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${item.name}</td>
            <td>${item.price}</td>
        `;
            tbody.append(tr);
        });
        updateTotal();
        formDisable();
    }

    clientserviceRequest.forEach((input) => {
        input.addEventListener('click', () => {
            if (services.length === 0) {
                input.style.cursor = 'not-allowed';
                bookingSection.classList.add('move-up');
                itemError.innerHTML = `<i class="fa-solid fa-circle-info"></i> Add the items to the cart and book`;
                itemError.classList.add('show');
                setTimeout(() => {
                    bookingSection.classList.remove('move-up');
                    itemError.classList.remove('show');
                }, 3000);
            }
            else {
                input.style.cursor = 'text';
            }
        })
    })

    function updateTotal() {
        const totalAmount = services.reduce((acc, item) => {

            const removeDecimal = item.price.replace(/[^0-9.]/g, '');

            const priceNumber = Math.floor(parseFloat(removeDecimal)) || 0;

            return acc + priceNumber;

        }, 0);

        const totalDisplay = document.querySelector('.Total-Price');

        if (totalDisplay) {
            totalDisplay.innerText = `₹ ${totalAmount.toFixed(2)}`;
        }

        return totalAmount.toFixed(2);
    }

    updateTotal();

    function newserviceList() {
        itemaddBtn.forEach((serviceList, index) => {
            serviceList.addEventListener('click', () => {

                serviceList.innerText = "Add Item";

                const clientService = serviceName[index].innerText
                const servicePricelist = servicePrice[index].innerText

                const ServiceIndex = services.findIndex(item => item.name === clientService);

                if (ServiceIndex === -1) {
                    const renderServiceList = {
                        name: clientService,
                        price: servicePricelist
                    }

                    services.push(renderServiceList);

                    serviceList.innerHTML = `Remove Item <i class="fa-solid fa-minus"></i>`;
                    serviceList.classList.add('remove-btn')
                }
                else {
                    services.splice(ServiceIndex, 1);

                    serviceList.innerHTML = `Add Item <i
                                    class="fa-solid fa-plus"></i>`
                    serviceList.classList.remove('remove-btn')
                }

                serviceTable();
            });
        });
    };

    function formDisable() {
        if (services.length === 0) {
            booknowBtn.disabled = true;
            clientserviceRequest.forEach(input => {
                booknowBtn.style.cursor = "not-allowed"
                booknowBtn.classList.add('book-now-btn-disable');
            });

        } else {
            booknowBtn.disabled = false;
            booknowBtn.style.cursor = "pointer";
            booknowBtn.classList.remove('book-now-btn-disable');
            if (itemError) itemError.textContent = "";
        }
    }

    formDisable();
    updateTotal();
    newserviceList();

    const serviceID = 'service_npftzkc';

    const nameRegex = /^(?!.*(.)\1{2,})[a-zA-Z\s-']+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const numberRegex = /^[6-9]\d{9}$/;

    emailjs.init({
        publicKey: 'CS1ZjwpreNA_8iGpU',
        blockHeadless: true,
        limitRate: {
            id: 'app',
            throttle: 1000,
        },
    });


    function bookingformSubmit() {


        const templateID = 'template_p1sillj';

        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const UserName = document.querySelector('[name="fullname"]').value;
            const UserEmail = document.querySelector('[name="email"]').value;
            const UserNumber = document.querySelector('[name="number"]').value;

            let IsformValid = true;

            clientserviceRequest.forEach((Inputs) => {
                const InputsValue = Inputs.value.trim();

                if (InputsValue !== "" && nameRegex.test(UserName)) {
                    Inputs.style.border = "1px solid green";
                }
                else if (InputsValue !== "" && emailRegex.test(UserEmail)) {
                    Inputs.style.border = "1px solid green";
                }
                else if (InputsValue !== "" && numberRegex.test(UserNumber)) {
                    Inputs.style.border = "1px solid green";
                }
                else {
                    IsformValid = false;
                    Inputs.style.border = "1px solid red";
                }
            })

            let emailtotal = updateTotal();

            const formParams = {
                fullName: UserName,
                emailAddress: UserEmail,
                userphoneNumber: UserNumber,
                emailservice: services.map(Ordername => Ordername.name).join(','),
                totalservicePrice: `${emailtotal}`,
            }

            if (IsformValid) {
                emailjs.send(serviceID, templateID, formParams).then((res) => {


                    clientserviceRequest.forEach((resetInput) => {
                        resetInput.value = "";
                        resetInput.style.borderColor = "#e9ecef";
                    })

                    const resetemptyMessage = document.querySelector('.service-list-body');
                    resetemptyMessage.innerHTML = `<tr class="empty-message">
                                        <td class="empty-message-cell">
                                            <div class="service-list">
                                                <i class="fa-solid fa-circle-info"></i>
                                                <p>No Items Added</p>
                                                <p>Add items to the cart from the services bar</p>
                                            </div>
                                        </td>
                                    </tr>`

                    const resettotalAmount = document.querySelector('.Total-Price')
                    resettotalAmount.innerText = '₹ 0.00';


                    itemaddBtn.forEach((resetBtn) => {
                        resetBtn.innerHTML = `Add Item <i
                                    class="fa-solid fa-plus"></i>`;
                        resetBtn.classList.add('resetbtn');
                    })

                    resetList.addEventListener('click', () => {
                        itemError.classList.add('error-hide');
                    })

                    setTimeout(() => {
                        bookingSection.classList.add('move-up');
                        itemError.innerHTML = `<i class="fa-solid fa-circle-info"></i> Thank you for Booking the service We Will get back to you soon!`;
                        itemError.classList.add('formSubmit');
                    }, 500)

                    bookingForm.reset();

                }, (err) => {
                    console.log(err)
                })
            }
        })
    }

    bookingformSubmit()


    const newslettersubscribeForm = () => {

        const newslettertemplate = 'template_rk2kp2k';

        newsletterform.addEventListener('submit', (e) => {
            e.preventDefault();

            emailjs.sendForm(serviceID, newslettertemplate, '#newsletterSubscribe').then((res) => {

                newssubscribeforminputvalue.forEach((userInputs) => {
                    userInputs.value = "";
                })

                setTimeout(() => {
                    alert('Thank you for Successfully Subscribed our News letter services!');
                }, 200)


            }, (err) => {
                console.log(err);
            })

        })

    }
    newslettersubscribeForm()
})