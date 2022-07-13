import React, {FC} from "react";
import "./Modal.css"

interface Props {
    handleClose: () => void;
    show: boolean;
    children: React.ReactNode;
}

export const Modal:FC<Props> = ({ handleClose, show, children }) => {
    return (
        <>
            {
                show ? (
                    <div className='wrapper' onClick={handleClose}>
                        <div className="modal-container">
                            {children}
                        </div>
                    </div>
                ) : null
            }
        </>
);
};
