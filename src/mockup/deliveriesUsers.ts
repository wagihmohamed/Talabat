import { DeliveryPerson } from "@/models";

export const deliveriesPersons: DeliveryPerson[] = [
    {
        id: 1,
        name: "احمد محمود",
        phone: "1234567890",
        status: "active",
        restaurantId: 1,
        restaurantName: "مطعم المدينة"
    },
    {
        id: 2,
        name: "محمد علي",
        phone: "1234567890",
        status: "suspended",
        restaurantId: 1,
        restaurantName: "مطعم الحاج"
    },
    {
        id: 3,
        name: "علي احمد",
        phone: "1234567890",
        status: "active",
        restaurantId: 2,
        restaurantName: "مطعم البيك"
    },
];