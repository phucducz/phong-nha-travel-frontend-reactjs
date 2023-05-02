//state form coupon
export const dataCoupon = [
    {
        code: 'duc',
        value: '25'
    }, {
        code: 'dai',
        value: '27'
    }
];

export const results = [{
    className: "coupon_wrong",
    i: <i className="fa-solid fa-check"></i>,
    status: 0
}, {
    className: "coupon_right",
    i: <i className="fa-solid fa-check"></i>,
    status: 1
}];

export const paymentMethod = [{
    i: < i className="fa-solid fa-credit-card" ></i>,
    content: <p style={{ textTransform: 'uppercase' }}>credit card</p>,
    status: true
}, {
    i: < i className="fa-solid fa-money-bill" ></i>,
    content: <p style={{ textTransform: 'uppercase' }}>cash</p>,
    status: false
}];

export const checkout = [{
    className: 'inputName',
    label: 'Họ',
    optional: 'bắt buộc',
    // refLabel: labelFirstName,
    nameInput: 'FirstName',
    // refInput: inputFirstName,
    classInput: 'firstName'
}, {
    className: 'inputName',
    label: 'Tên',
    optional: 'bắt buộc',
    // refLabel: labelLastName,
    nameInput: 'lastName',
    // refInput: inputLastName,
    classInput: 'lastName'
}, {
    className: 'divInput',
    label: 'Tên công ty',
    optional: 'bắt buộc',
    // refLabel: labelCompany,
    nameInput: 'nameCompany',
    // refInput: inputCompany,
    classInput: 'nameCompany'
}, {
    className: 'divInput',
    label: 'Quốc gia / Khu vực',
    optional: 'bắt buộc',
    // refLabel: lableCountry,
    nameInput: 'country',
    // refInput: inoutCountry,
    classInput: 'country'
}, {
    className: 'divInput',
    label: 'Địa chỉ',
    // refLabel: labelAddress,
    nameInput: 'address',
    // refInput: inputAddress,
    classInput: 'address'
}, {
    className: 'divInput',
    label: 'Địa chỉ căn hộ, phòng...',
    // refLabel: labelApartment,
    nameInput: 'apartment',
    // refInput: inputApartment,
    classInput: 'apartment'
}, {
    className: 'divInput',
    label: 'Mã bưu diện',
    // refLabel: labelPostOffice,
    nameInput: 'postOffice',
    // refInput: inputPostOffice,
    classInput: 'postOffice'
}, {
    className: 'divInput',
    label: 'Tỉnh / Thành phố',
    // refLabel: labelCity,
    nameInput: 'city',
    // refInput: inputCity,
    classInput: 'city'
}, {
    className: 'divInput',
    label: 'Số điện thoại',
    // refLabel: labelPhoneNumber,
    nameInput: 'phoneNumber',
    // refInput: inputPhoneNumver,
    classInput: 'phoneNumber'
}, {
    className: 'divInput',
    label: 'Địa chỉ email',
    // refLabel: labelEmail,
    nameInput: 'email',
    // refInput: inputEmail,
    classInput: 'email'
}, {
    className: 'divInput',
    label: 'Đặt ngày đi',
    // refLabel: null,
    nameInput: 'bookDate',
    // refInput: inputBookDate,
    classInput: 'book_date'
}, {
    className: 'divInput',
    label: 'Số người đi',
    // refLabel: labelQuantity,
    nameInput: 'quantity',
    // refInput: inputQuantity,
    classInput: 'quantity'
}

];