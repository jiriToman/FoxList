import React, { useState, useRef, useEffect } from 'react';
import { INPUT_FIELD_CLASS, PRIMARY_BUTTON_CLASS, SECONDARY_BUTTON_CLASS } from '../classConstants';

interface UpdateFormData {
    name: string;
    price: number;
    stockQuantity: number;
}

interface UpdateFormProps {
    initialData: UpdateFormData;
    onSubmit: (data: UpdateFormData) => void;
    onCancel: () => void;
    isSubmitting: boolean;
}

const UpdateForm: React.FC<UpdateFormProps> = ({ initialData, onSubmit, onCancel, isSubmitting }) => {
    const [formData, setFormData] = useState<UpdateFormData>(initialData);
    const formRef = useRef<HTMLDivElement>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: id === 'price' || id === 'stockQuantity' ? Number(value) : value,
        }));
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onSubmit(formData);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (formRef.current && !formRef.current.contains(event.target as Node)) {
                onCancel();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onCancel]);

    return (
        <div ref={formRef} className="absolute bg-white border border-gray-300 p-4 rounded-lg shadow-lg z-20">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col">
                    <label htmlFor="name" className="font-medium text-gray-800">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={INPUT_FIELD_CLASS}
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="price" className="font-medium text-gray-800">Price:</label>
                    <input
                        type="number"
                        id="price"
                        value={formData.price}
                        onChange={handleChange}
                        className={INPUT_FIELD_CLASS}
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="stockQuantity" className="font-medium text-gray-800">Stock Quantity:</label>
                    <input
                        type="number"
                        id="stockQuantity"
                        value={formData.stockQuantity}
                        onChange={handleChange}
                        className={INPUT_FIELD_CLASS}
                    />
                </div>
                <div className="flex gap-3">
                    <button
                        type="submit"
                        className={PRIMARY_BUTTON_CLASS}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Saving...' : 'Save'}
                    </button>
                    <button
                        type="button"
                        onClick={onCancel}
                        className={SECONDARY_BUTTON_CLASS}
                        disabled={isSubmitting}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateForm;