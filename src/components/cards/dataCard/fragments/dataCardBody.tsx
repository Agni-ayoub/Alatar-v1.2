import React from 'react';
import { icons } from '../../../../utils/icons';
import { DataCardProps } from '../main/DataCardType';

const DataCardBody: React.FC<DataCardProps> = ({ phone, email }) => {
    return (
        <>
            <span className="flex gap-1 items-center" aria-label={`Phone: ${phone}`}>
                {icons['phone']} {phone}
            </span>
            <span className="flex gap-1 items-center" aria-label={`Email: ${email}`}>
                {icons['email']} {email}
            </span>
        </>
    );
};

export default DataCardBody;