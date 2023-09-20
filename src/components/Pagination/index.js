import { memo } from "react";

import PaginationStyle from "../PaginationStyles";

function Pagination({ toursPerPage, totalTours, handleOnclick }) {

    const numbersPage = [];

    for (let i = 1; i <= Math.ceil(totalTours / toursPerPage); i++)
        numbersPage.push(i);

    return (
        <PaginationStyle>
            <div className="wrapperPaginate">
                <ul className="paginate">
                    {numbersPage.map(number => (
                        <li 
                            key={number}
                            onClick={() => handleOnclick(number)}
                        >
                            <a>{number}</a>
                        </li>
                    ))}
                </ul>
            </div>
        </PaginationStyle>
    )
}

export default memo(Pagination);