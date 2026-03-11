document.addEventListener('DOMContentLoaded', () => {

    const itemaddBtn = document.querySelectorAll('.service-btn');
    const servicePrice = document.querySelectorAll('.price');
    const serviceName = document.querySelectorAll('.service-name');
    const newitemAdd = document.querySelector('.item-add');
    const itemError = document.querySelector('.item-error');
    const booknowBtn = document.querySelector('.book-now-btn');
    const clientserviceRequest = document.querySelectorAll('.Client-request-input');
    const bookingSection = document.querySelector('.adding-item-booking-section');
    const myForm = document.getElementById('requestform');

    const menuIcon = document.querySelector('.menu-icon');
    const menuLinks = document.querySelector('.mobile-menus');

    menuIcon.addEventListener('click', () => {
        menuLinks.classList.toggle('Navshow');

        menuIcon.classList.toggle('fa-bars');
        menuIcon.classList.toggle('fa-xmark');
    });

    let services = [];

    function ServiceTable() {
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

        UpdateTotal();
        formDisable();
    }

    clientserviceRequest.forEach((input) => {
        input.addEventListener('click', () => {
            if (services.length === 0) {
                bookingSection.classList.add('move-up');
                itemError.innerHTML = `<i class="fa-solid fa-circle-info"></i> Add the items to the cart and book`;
                itemError.classList.add('show');
                setTimeout(() => {
                    bookingSection.classList.remove('move-up');
                    itemError.classList.remove('show');
                }, 3000);
            }
        })
    })

    function UpdateTotal() {
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

    UpdateTotal();

    function NewServiceList() {
        itemaddBtn.forEach((serviceList, index) => {
            serviceList.addEventListener('click', () => {

                serviceList.innerText = "Add Item";

                const ClientService = serviceName[index].innerText
                const ServicePricelist = servicePrice[index].innerText

                const ServiceIndex = services.findIndex(item => item.name === ClientService);

                if (ServiceIndex === -1) {
                    const renderServiceList = {
                        name: ClientService,
                        price: ServicePricelist
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

                ServiceTable();
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
    UpdateTotal();
    NewServiceList();

    function formSubmit() {

        emailjs.init({
            publicKey: "CS1ZjwpreNA_8iGpU",
            blockHeadless: true,
            limitRate: {
                id: 'app',
                throttle: 10000,
            }
        });

        document.getElementById('requestForm').addEventListener('submit', function (event) {
            event.preventDefault();

            const serviceID = 'default_service';
            const templateID = 'template_p1sillj';

            const userName = document.querySelector('[name="fullname"]').value;
            const userEmail = document.querySelector('[name="email"]').value;
            const userNumber = document.querySelector('[name="number"]').value;

            const PhoneNumberValidation = document.querySelector('.phone-Numbar');
            const userNumberValue = PhoneNumberValidation.value;
            const PhoneNumberPattern = /^[6-9]\d{9}$/;

            if (!PhoneNumberPattern.test(userNumberValue)) {
                return
            };

            let EmailTotal = UpdateTotal();

            const UserEmailfields = {
                UserFullName: userName,
                Useremail: userEmail,
                UserNumber: userNumber,
                service: services.map(item => item.name).join(", "),
                total_price: `${EmailTotal}`
            };

            emailjs.send(serviceID, templateID, UserEmailfields)
                .then(() => {
                    document.getElementById('name').value = "";
                    document.getElementById('email').value = "";
                    document.getElementById('number').value = "";

                    const ServiceContainer = document.querySelector('.service-list-body');
                    ServiceContainer.innerHTML = `<tr class="empty-message">
                                        <td colspan="3" class="empty-message-cell">
                                            <div class="service-list">
                                                <i class="fa-solid fa-circle-info"></i>
                                                <p>No Items Added</p>
                                                <p>Add items to the cart from the services bar</p>
                                            </div>
                                        </td>
                                    </tr>`

                    document.querySelector('.Total-Price').innerText = '₹ 0.00';

                    if (typeof services !== 'undefined') {
                        services = [];
                        TotalDisplay = 0;
                    }

                    const resetAddbtn = document.querySelectorAll('.service-btn');

                    if (typeof resetAddbtn !== 'undefined') {
                        resetAddbtn.forEach((NewServiceAddbtn) => {
                            NewServiceAddbtn.innerHTML = `Add Item <i class="fa-solid fa-plus"></i>`
                            NewServiceAddbtn.classList.add('resetbtn');
                        })
                    }

                    if (typeof booknowBtn !== 'undefined') {
                        booknowBtn.disabled = true;
                        clientserviceRequest.forEach(input => {
                            booknowBtn.style.cursor = "not-allowed"
                            booknowBtn.classList.add('book-now-btn-disable');
                        });
                    }

                    if (typeof clientserviceRequest !== 'undefined') {
                        clientserviceRequest.forEach((resetInput) => {
                            resetInput.addEventListener('click', () => {
                                itemError.style.color = 'red';
                            })
                        })
                    }

                    newitemAdd.addEventListener('click', () => {
                        if (typeof myForm !== 'undefined') {
                            itemError.classList.add('error-hide');
                        }
                        else (
                            itemError.classList.remove('error-hide')
                        );
                    })

                    setTimeout(() => {
                        bookingSection.classList.add('move-up');
                        itemError.innerHTML = `<i class="fa-solid fa-circle-info"></i> Thank you For
Booking the Service We will get back to you soon!`;
                        itemError.classList.add('formSubmit')
                    }, 1000)

                }, (err) => {
                    alert(JSON.stringify(err));
                });
        });
    }

    formSubmit();

})