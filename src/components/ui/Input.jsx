import React, { memo } from 'react';
import PropTypes from 'prop-types';

const Input = ({ id, label, onChange, placeholder, value }) => {
    const onInputChange = (e) => {
        onChange(e.target.value);
    };

    return (
        <label htmlFor={id}>
            <span>{label}</span>
            <input
                id={id}
                type="text"
                value={value}
                placeholder={placeholder}
                onChange={onInputChange}
            />
        </label>
    );
};

Input.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
};

export default memo(Input);
