import { format, parseISO } from 'date-fns';
import { ar } from 'date-fns/locale';


export const handleFormateDate = (date?: string) => {
    return format(parseISO(date || ''), 'dd-mm-yyyy', { locale: ar });
};
