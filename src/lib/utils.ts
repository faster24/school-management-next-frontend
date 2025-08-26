import { Data } from '@/types/school-index';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatBytes(
    bytes: number,
    opts: {
        decimals?: number;
        sizeType?: 'accurate' | 'normal';
    } = {}
) {
    const { decimals = 0, sizeType = 'normal' } = opts;

    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const accurateSizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB'];
    if (bytes === 0) return '0 Byte';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(decimals)} ${sizeType === 'accurate'
        ? (accurateSizes[i] ?? 'Bytest')
        : (sizes[i] ?? 'Bytes')
        }`;
}

export const formatDate = (
    date: Date | string | number | undefined
): string => {
    if (!date) return '';

    const d = new Date(date);
    if (isNaN(d.getTime())) return '';

    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');

    return `${yyyy}-${mm}-${dd}`;
};

export const formatIds = (subjects: any[]): Data[] => {
    const subjectsArray = Array.isArray(subjects) ? subjects : [];

    return subjectsArray
        .sort((a, b) => a.id - b.id)
        .map((s) => ({
            value: String(s.id),
            label: String(s.name)
        }));
};
