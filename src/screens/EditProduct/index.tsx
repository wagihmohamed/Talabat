import { useNavigate } from "react-router-dom";
import {
    Sidebar,
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from '@/components'
import { ChevronRight } from "lucide-react";
import { ProductDetailsForm } from "./ProductDetailsForm";
import { ProductOptionsForm } from "./ProductOptionsForm";



export const EditProductScreen = () => {
    const navigate = useNavigate();
    const handleNavigateBack = () => {
        navigate(-1);
    }

    return (
        <div className="border-t">
            <div className="h-screen">
                <Sidebar>
                    <h1 className="text-2xl font-bold mb-2">
                        <ChevronRight onClick={handleNavigateBack} className="inline-block cursor-pointer ml-2" size={30} />
                        تعديل المنتج
                    </h1>
                    <p className="mb-5 text-gray-500 text-md">
                        يمكنك تعديل المنتج من هنا, يمكنك تعديل الاسم والسعر والوصف والصورة
                    </p>
                    <Tabs dir="rtl" defaultValue="details">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="details">التفاصيل</TabsTrigger>
                            <TabsTrigger value="options">الخيارات</TabsTrigger>
                        </TabsList>
                        <TabsContent value="details">
                            <ProductDetailsForm />
                        </TabsContent>
                        <TabsContent value="options">
                            <ProductOptionsForm />
                        </TabsContent>
                    </Tabs>
                </Sidebar>
            </div>
        </div>
    )
}