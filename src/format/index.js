const formatMoney = (money) => {
    const config = {
        style: 'currency',
        currency: 'VND',
        maximumFractionDigist: 9
    }

    const formated = new Intl.NumberFormat('vi-VN', config).format(money);

    return formated;
}

const snakeToCamel = str => {
    return str.toLowerCase().replace(/([-_][a-z])/g, group =>
        group
            .toUpperCase()
            .replace('-', '')
            .replace('_', '')
    );
}

export {
    formatMoney,
    snakeToCamel
}