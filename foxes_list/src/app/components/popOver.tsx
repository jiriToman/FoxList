import React, { useEffect, useRef } from 'react';
import { POPOVER_CLASS } from '../classConstants';

interface PopoverProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    className?: string;
}

const Popover: React.FC<PopoverProps> = ({ isOpen, onClose, children, className }) => {
    const popoverRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutsidePopover = (event: MouseEvent) => {
            if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutsidePopover);
        return () => {
            document.removeEventListener('mousedown', handleClickOutsidePopover);
        };
    }, [onClose]);

    if (!isOpen) {
        return null;
    }

    return (
        <div
            ref={popoverRef}
            className={`${POPOVER_CLASS} ${className}`}
        >
            {children}
        </div>
    );
};

export default Popover;
