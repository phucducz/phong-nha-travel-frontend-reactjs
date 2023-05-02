import { Formik as formik } from "formik";
import * as Yup from 'yup';

function Formik(props) {
    console.log(props);
    const { inputs } = props;

    {/* {inputs.map(input => {
                <>
                    <tr>
                        <td>
                            <label>
                                {input.label}
                                <span>{input.optional}</span>
                            </label>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label ref={input.refLabel}>
                                {input.label}
                            </label>
                            <input
                                name={input.nameInput}
                                ref={input.refInput}
                                className={cx(`${input.classInput}`)}
                            />
                        </td>
                    </tr>
                </>
            })} */}
}

export default Formik;