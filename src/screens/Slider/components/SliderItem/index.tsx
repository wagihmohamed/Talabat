import { SliderItem as SliderItemTypes } from "@/models";
import { handleFormateDate } from "@/lib/formatDate";
import { DeleteSliderDialog } from "..";
import { EditSlider } from "../EditSlider";

interface SliderItemProps {
    slider: SliderItemTypes;
}

export const SliderItem = ({ slider }: SliderItemProps) => {
    return (
        <div className="max-w-sm col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3 rounded-lg overflow-hidden shadow-lg">
            <img className="w-full h-40 object-contain" src={slider.image?.toString()} alt="category name" />
            <div className="px-6 py-4">
                <div className="flex justify-between items-center">
                    <div className="font-bold text-xl mb-2">{slider.title}</div>
                    <DeleteSliderDialog slider={slider} />
                    <EditSlider slider={slider} />
                </div>
                {slider.createdAt && <p className="text-base mt-2">
                    تم إنشاء القسم في: {handleFormateDate(slider.createdAt.toString())}
                </p>}
            </div>
        </div>
    );
};
