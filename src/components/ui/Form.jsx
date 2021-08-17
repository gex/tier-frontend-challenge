import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Input from './Input';

const Form = ({
    inputId,
    inputLabel,
    onChange,
    onSubmit,
    placeholder,
    submitLabel,
    value,
}) => {
    const onFormSubmit = (e) => {
        e.preventDefault();
        onSubmit();
    };

    return (
        <form onSubmit={onFormSubmit}>
            <Input
                id={inputId}
                label={inputLabel}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
            />
            <input type="submit" value={submitLabel} />
        </form>
    );
};

Form.propTypes = {
    inputId: PropTypes.string.isRequired,
    inputLabel: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    placeholder: PropTypes.string.isRequired,
    submitLabel: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
};

export default memo(Form);
